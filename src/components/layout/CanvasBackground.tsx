// components/layout/CanvasBackground.tsx
"use client"

import { useEffect, useRef, useCallback } from "react"
import { useStory, type AtmosphereMood } from "@/context/StoryContext"
import { ParticleSystem, PARTICLE_PRESETS } from "@/animations/canvas/particleSystem"
import gsap from "gsap"

const MOOD_BACKGROUNDS: Record<AtmosphereMood, string> = {
  candlelit: "radial-gradient(ellipse at 50% 60%, #2A1A05 0%, #1A1005 40%, #0A0806 100%)",
  amber:     "radial-gradient(ellipse at 40% 50%, #2A1A05 0%, #1A0D00 50%, #0A0806 100%)",
  rose:      "radial-gradient(ellipse at 60% 40%, #1A0A0F 0%, #120508 50%, #0A0806 100%)",
  golden:    "radial-gradient(ellipse at 50% 50%, #1A1500 0%, #100E00 50%, #0A0806 100%)",
  parchment: "radial-gradient(ellipse at 50% 50%, #140F08 0%, #0F0A05 50%, #0A0806 100%)",
  violet:    "radial-gradient(ellipse at 50% 50%, #0F0A1A 0%, #080514 50%, #050210 100%)",
  indigo:    "radial-gradient(ellipse at 50% 50%, #08061A 0%, #050314 50%, #020210 100%)",
  cosmos:    "radial-gradient(ellipse at 50% 50%, #050510 0%, #020208 60%, #000003 100%)",
  luminous:  "radial-gradient(ellipse at 50% 30%, #0A0A1A 0%, #05050F 50%, #020208 100%)",
}

const MOOD_PARTICLES: Record<AtmosphereMood, keyof typeof PARTICLE_PRESETS | null> = {
  candlelit: "candleDust",
  amber:     "candleDust",
  rose:      "petals",
  golden:    "goldSparks",
  parchment: "candleDust",
  violet:    "goldSparks",
  indigo:    "goldSparks",
  cosmos:    "starField",
  luminous:  "starField",
}

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const particleSystemRef = useRef<ParticleSystem | null>(null)
  const { currentMood } = useStory()
  const prevMoodRef = useRef<AtmosphereMood | null>(null)

  const initParticles = useCallback((mood: AtmosphereMood) => {
    const canvas = canvasRef.current
    if (!canvas) return

    particleSystemRef.current?.stop()

    const presetKey = MOOD_PARTICLES[mood]
    if (!presetKey) return

    const preset = PARTICLE_PRESETS[presetKey]
    particleSystemRef.current = new ParticleSystem(canvas, preset)
    particleSystemRef.current.start()
  }, [])

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      particleSystemRef.current?.resize(window.innerWidth, window.innerHeight)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Mood change — transição suave de atmosfera
  useEffect(() => {
    if (!bgRef.current) return

    const isFirstRender = prevMoodRef.current === null
    prevMoodRef.current = currentMood

    if (isFirstRender) {
      bgRef.current.style.background = MOOD_BACKGROUNDS[currentMood]
      initParticles(currentMood)
      return
    }

    // Crossfade de background
    gsap.to(bgRef.current, {
      duration: 2,
      ease: "power2.inOut",
      onStart: () => {
        // Cria elemento de overlay para crossfade
        const overlay = document.createElement("div")
        overlay.style.cssText = `
          position: absolute; inset: 0;
          background: ${MOOD_BACKGROUNDS[currentMood]};
          opacity: 0;
        `
        bgRef.current!.appendChild(overlay)

        gsap.to(overlay, {
          opacity: 1,
          duration: 2,
          ease: "power2.inOut",
          onComplete: () => {
            bgRef.current!.style.background = MOOD_BACKGROUNDS[currentMood]
            overlay.remove()
            initParticles(currentMood)
          },
        })
      },
    })
  }, [currentMood, initParticles])

  // Cleanup
  useEffect(() => {
    return () => {
      particleSystemRef.current?.stop()
    }
  }, [])

  return (
    <div className="vignette film-grain" style={{ position: "fixed", inset: 0, zIndex: 0 }}>
      {/* Fundo de gradiente que muda com o mood */}
      <div
        ref={bgRef}
        style={{
          position: "absolute",
          inset: 0,
          transition: "background 2s ease-in-out",
        }}
      />

      {/* Canvas de partículas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Luz de vela — só em moods quentes */}
      {(currentMood === "candlelit" || currentMood === "amber") && (
        <CandleGlow />
      )}
    </div>
  )
}

function CandleGlow() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "600px",
        height: "600px",
        background: "radial-gradient(circle at 50% 80%, rgba(255, 160, 30, 0.12) 0%, transparent 70%)",
        animation: "candleFlicker 3s ease-in-out infinite",
        pointerEvents: "none",
      }}
    />
  )
}
