// hooks/useAudioEngine.ts
"use client"
import { useRef, useCallback, useEffect, useState } from "react"
import { type ChapterKey } from "@/context/StoryContext"
import { playlist, soundEffects, type Track } from "@/config/musicData"

interface AudioNode_Internal {
  source: AudioBufferSourceNode
  gainNode: GainNode
  buffer: AudioBuffer
}

interface BeatCallback {
  (bpm: number, beatTime: number): void
}

interface AudioEngineState {
  isReady: boolean
  isPlaying: boolean
  currentTrack: Track | null
  volume: number
  isMuted: boolean
}

export function useAudioEngine() {
  const ctxRef = useRef<AudioContext | null>(null)
  const masterGainRef = useRef<GainNode | null>(null)
  const currentNodeRef = useRef<AudioNode_Internal | null>(null)
  const sfxBuffersRef = useRef<Map<string, AudioBuffer>>(new Map())
  const beatCallbacksRef = useRef<Set<BeatCallback>>(new Set())
  const beatIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const fadeTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [state, setState] = useState<AudioEngineState>({
    isReady: false,
    isPlaying: false,
    currentTrack: null,
    volume: 0.7,
    isMuted: false,
  })

  // ── Inicialização do contexto (lazy — requer gesto do usuário) ──────────
  const initContext = useCallback((): AudioContext => {
    if (!ctxRef.current) {
      ctxRef.current = new AudioContext()
      masterGainRef.current = ctxRef.current.createGain()
      masterGainRef.current.gain.value = 0.7
      masterGainRef.current.connect(ctxRef.current.destination)
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume()
    }
    return ctxRef.current
  }, [])

  // ── Carregamento de buffer ──────────────────────────────────────────────
  const loadBuffer = useCallback(
    async (src: string): Promise<AudioBuffer | null> => {
      const ctx = initContext()
      try {
        const response = await fetch(src)
        if (!response.ok) return null
        const arrayBuffer = await response.arrayBuffer()
        return await ctx.decodeAudioData(arrayBuffer)
      } catch {
        console.warn(`[AudioEngine] Failed to load: ${src}`)
        return null
      }
    },
    [initContext]
  )

  // ── Pré-carregamento de efeitos sonoros ────────────────────────────────
  const preloadSFX = useCallback(async () => {
    const entries = Object.entries(soundEffects) as [string, string][]
    await Promise.allSettled(
      entries.map(async ([key, src]) => {
        const buffer = await loadBuffer(src)
        if (buffer) sfxBuffersRef.current.set(key, buffer)
      })
    )
    setState((s) => ({ ...s, isReady: true }))
  }, [loadBuffer])

  // ── Reproduzir efeito sonoro pontual ──────────────────────────────────
  const playSFX = useCallback(
    (key: keyof typeof soundEffects, volume = 1) => {
      const ctx = ctxRef.current
      const master = masterGainRef.current
      if (!ctx || !master) return
      const buffer = sfxBuffersRef.current.get(key)
      if (!buffer) return

      const source = ctx.createBufferSource()
      const gain = ctx.createGain()
      gain.gain.value = volume
      source.buffer = buffer
      source.connect(gain)
      gain.connect(master)
      source.start()
    },
    []
  )

  // ── Crossfade para nova faixa ──────────────────────────────────────────
  const crossfadeTo = useCallback(
    async (track: Track, fadeDuration = 2.0) => {
      const ctx = initContext()
      const master = masterGainRef.current
      if (!ctx || !master) return

      const buffer = await loadBuffer(track.src)
      if (!buffer) return

      // Nova fonte + gain
      const source = ctx.createBufferSource()
      const gainNode = ctx.createGain()
      gainNode.gain.value = 0
      source.buffer = buffer
      source.loop = true
      source.connect(gainNode)
      gainNode.connect(master)
      source.start()

      // Fade in da nova faixa
      gainNode.gain.linearRampToValueAtTime(
        1,
        ctx.currentTime + fadeDuration
      )

      // Fade out da faixa atual
      if (currentNodeRef.current) {
        const { gainNode: oldGain, source: oldSource } = currentNodeRef.current
        oldGain.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeDuration)
        fadeTimerRef.current = setTimeout(() => {
          try {
            oldSource.stop()
            oldSource.disconnect()
            oldGain.disconnect()
          } catch {}
        }, fadeDuration * 1000 + 100)
      }

      currentNodeRef.current = { source, gainNode, buffer }

      // Beat detection via BPM
      if (track.bpm) startBeatClock(track.bpm)
      else stopBeatClock()

      setState((s) => ({
        ...s,
        isPlaying: true,
        currentTrack: track,
      }))
    },
    [initContext, loadBuffer]
  )

  // ── Selecionar faixa por capítulo ──────────────────────────────────────
  const playForChapter = useCallback(
    (chapter: ChapterKey) => {
      const track =
        playlist.find((t) => t.chapter === chapter) ??
        playlist.find((t) => t.chapter === "global")
      if (track && track.id !== state.currentTrack?.id) {
        crossfadeTo(track)
      }
    },
    [crossfadeTo, state.currentTrack]
  )

  // ── Beat clock (BPM → callbacks visuais) ──────────────────────────────
  const startBeatClock = useCallback((bpm: number) => {
    stopBeatClock()
    const interval = (60 / bpm) * 1000
    beatIntervalRef.current = setInterval(() => {
      const now = ctxRef.current?.currentTime ?? 0
      beatCallbacksRef.current.forEach((cb) => cb(bpm, now))
    }, interval)
  }, [])

  const stopBeatClock = useCallback(() => {
    if (beatIntervalRef.current) {
      clearInterval(beatIntervalRef.current)
      beatIntervalRef.current = null
    }
  }, [])

  // ── Registrar ouvinte de beats ─────────────────────────────────────────
  const onBeat = useCallback((callback: BeatCallback) => {
    beatCallbacksRef.current.add(callback)
    return () => beatCallbacksRef.current.delete(callback)
  }, [])

  // ── Volume master ──────────────────────────────────────────────────────
  const setVolume = useCallback((value: number) => {
    const clamped = Math.max(0, Math.min(1, value))
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = clamped
    }
    setState((s) => ({ ...s, volume: clamped }))
  }, [])

  const toggleMute = useCallback(() => {
    setState((s) => {
      const muted = !s.isMuted
      if (masterGainRef.current) {
        masterGainRef.current.gain.value = muted ? 0 : s.volume
      }
      return { ...s, isMuted: muted }
    })
  }, [])

  const pause = useCallback(() => {
    ctxRef.current?.suspend()
    setState((s) => ({ ...s, isPlaying: false }))
  }, [])

  const resume = useCallback(() => {
    ctxRef.current?.resume()
    setState((s) => ({ ...s, isPlaying: true }))
  }, [])

  // ── Cleanup ────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stopBeatClock()
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
      currentNodeRef.current?.source.stop()
      ctxRef.current?.close()
    }
  }, [stopBeatClock])

  return {
    ...state,
    preloadSFX,
    playSFX,
    crossfadeTo,
    playForChapter,
    setVolume,
    toggleMute,
    pause,
    resume,
    onBeat,
    initContext,
  }
}
