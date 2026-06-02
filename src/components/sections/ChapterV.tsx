// components/sections/ChapterV.tsx
"use client"
import React, { useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

export function ChapterV() {
  const { nextChapter } = useStory()
  const { V: chapter } = storyData.chapters
  const cardRef = useRef<HTMLDivElement>(null)

  // Coordenadas flutuantes do Framer Motion para efeitos de paralaxe 3D rápidos
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  // Mapeamento de rotação com limites de inclinação para manter a legibilidade textual
  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left - width / 2
    const mouseY = e.clientY - rect.top - height / 2
    x.set(mouseX)
    y.set(mouseY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 perspective-[1500px]">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="max-w-xl w-full bg-gradient-to-br from-neutral-900/90 to-neutral-950/95 border border-[var(--rose-glow)]/30 rounded-lg p-8 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.8)] backdrop-blur-xl relative"
      >
        {/* Efeito interno de iluminação reflexiva de acordo com a posição do mouse */}
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(255,182,193,0.08)_0%,transparent_60%)] pointer-events-none" />

        <div style={{ transform: "translateZ(50px)" }} className="space-y-6 transform-gpu">
          <span className="text-script text-3xl text-[var(--rose-glow)] block text-center">Capítulo V</span>
          <h1 className="text-display text-3xl md:text-4xl text-center text-[var(--parchment-base)] border-b border-white/10 pb-4">
            {chapter.title}
          </h1>
          
          <blockquote className="text-center italic text-neutral-400 text-sm max-w-sm mx-auto">
            "{chapter.epigraph}"
          </blockquote>

          <div className="text-narrative text-neutral-200 text-justify text-base space-y-4 pt-4 leading-relaxed font-light">
            {chapter.body?.map((paragraph: string, idx: number) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-8 flex justify-center">
            <button
              onClick={nextChapter}
              className="px-6 py-2 rounded-sm bg-gradient-to-r from-[var(--wax-red)] to-rose-900 text-white font-mono text-xs uppercase tracking-widest hover:brightness-120 transition-all duration-300"
            >
              Seguir o Sentimento →
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}