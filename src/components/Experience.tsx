// components/Experience.tsx
"use client"
import { useEffect } from "react"
import { useStory } from "@/context/StoryContext"
import { useAudioEngine } from "@/hooks/useAudioEngine"
import { CanvasBackground } from "@/components/layout/CanvasBackground"
import { AudioControls } from "@/components/layout/AudioControls"
import { ChapterProgress } from "@/components/layout/ChapterProgress"
import { OpeningLetter } from "@/components/sections/OpeningLetter"
import { ChapterI } from "@/components/sections/ChapterI"
import { ChapterII } from "@/components/sections/ChapterII"
import { ChapterIII } from "@/components/sections/ChapterIII"
import { ChapterIV } from "@/components/sections/ChapterIV"
import { ChapterV } from "@/components/sections/ChapterV"
import { ChapterVI } from "@/components/sections/ChapterVI"
import { ChapterVII } from "@/components/sections/ChapterVII"
import { FinalGift } from "@/components/sections/FinalGift"
import { Closing } from "@/components/sections/Closing"
import { AnimatePresence, motion } from "framer-motion"

const CHAPTER_MAP = {
  opening: OpeningLetter,
  1: ChapterI,
  2: ChapterII,
  3: ChapterIII,
  4: ChapterIV,
  5: ChapterV,
  6: ChapterVI,
  7: ChapterVII,
  gift: FinalGift,
  closing: Closing,
} as const

export function Experience() {
  const { currentChapter, hasOpeningCompleted } = useStory()
  const audio = useAudioEngine()

  // Pré-carrega SFX após montagem
  useEffect(() => {
    audio.preloadSFX()
  }, []) // eslint-disable-line

  // Sincroniza áudio com capítulo
  useEffect(() => {
    if (audio.isReady) {
      audio.playForChapter(currentChapter)
    }
  }, [currentChapter, audio.isReady]) // eslint-disable-line

  const ActiveChapter = CHAPTER_MAP[currentChapter]

  return (
    <main style={{ position: "relative", minHeight: "100dvh", overflow: "hidden" }}>
      <CanvasBackground />

      <AnimatePresence mode="wait">
        <motion.div
          key={String(currentChapter)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 10 }}
        >
          <ActiveChapter />
        </motion.div>
      </AnimatePresence>

      {hasOpeningCompleted && (
        <>
          <ChapterProgress />
          <AudioControls audio={audio} />
        </>
      )}
    </main>
  )
}
