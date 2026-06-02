// components/sections/ChapterIV.tsx
"use client"
import React from "react"
import { motion } from "framer-motion"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

export function ChapterIV() {
  const { nextChapter } = useStory()
  const { IV: chapter } = storyData.chapters

  // Configurações de animações baseadas nas diretrizes de suavidade nativa (Fase 4)
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.25,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  }

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center py-20 px-4 md:px-8">
      <div className="max-w-3xl w-full space-y-12">
        
        {/* Cabeçalho Minimalista Assíncrono */}
        <div className="text-center space-y-2">
          <span className="text-script text-2xl text-[var(--gold-ancient)] block">Capítulo IV</span>
          <h1 className="text-display text-3xl md:text-5xl text-white tracking-wide">{chapter.title}</h1>
          <div className="w-16 h-[1px] bg-[var(--gold-ancient)] mx-auto mt-4 opacity-50" />
        </div>

        {/* Layout de Grade Dinâmica para Parágrafos Narrativos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapter.body?.map((paragraph: string, idx: number) => (
            <motion.div
              key={idx}
              custom={idx}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              variants={cardVariants}
              className="p-6 rounded-sm bg-neutral-900/40 border border-neutral-800/60 backdrop-blur-md hover:border-[var(--gold-ancient)]/40 transition-colors duration-500 shadow-xl flex flex-col justify-between"
            >
              <p className="text-narrative text-neutral-300 text-sm leading-relaxed text-justify">
                {paragraph}
              </p>
              <span className="text-xs font-mono text-[var(--gold-ancient)] opacity-30 mt-4 block text-right">
                // 0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Botão de Avanço Centralizado com Efeito Pulsante de Brilho */}
        <div className="flex justify-center pt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextChapter}
            className="px-8 py-3 rounded-full border border-[var(--gold-ancient)]/50 text-[var(--gold-ancient)] font-serif text-sm tracking-widest uppercase hover:bg-[var(--gold-ancient)] hover:text-black transition-all duration-300 shadow-lg"
          >
            Avançar na Linha do Tempo →
          </motion.button>
        </div>

      </div>
    </section>
  )
}