// components/layout/ChapterProgress.tsx
"use client"
import { motion } from "framer-motion"
import { useStory } from "@/context/StoryContext"

const TOTAL_CHAPTERS = 10 // opening + 7 + gift + closing

export function ChapterProgress() {
  const { chapterIndex } = useStory()
  const progress = (chapterIndex / (TOTAL_CHAPTERS - 1)) * 100

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        background: "rgba(201,168,76,0.1)",
        zIndex: 40,
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(90deg, var(--gold-ancient), var(--gold-bright))",
          boxShadow: "0 0 8px var(--gold-glow)",
        }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}
