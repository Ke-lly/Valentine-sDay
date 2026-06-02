// components/sections/ChapterVI.tsx
"use client"
import React from "react"
import { motion } from "framer-motion"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

export function ChapterVI() {
  const { nextChapter } = useStory()
  const { VI: chapter } = storyData.chapters

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full text-center space-y-12">
        
        {/* Animação com máscara suave de entrada para o título principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: "power3.out" }}
          className="space-y-3"
        >
          <p className="text-script text-xl text-[var(--gold-ancient)] tracking-widest">Capítulo VI</p>
          <h1 className="text-display text-4xl md:text-5xl text-neutral-100 font-bold">{chapter.title}</h1>
          <p className="font-serif italic text-neutral-400 text-sm tracking-wide">{chapter.subtitle}</p>
        </motion.div>

        {/* Ornamentação de divisão minimalista fina */}
        <div className="flex items-center justify-center space-x-4 max-w-xs mx-auto">
          <div className="h-[1px] bg-gradient-to-r from-transparent to-[var(--gold-ancient)] flex-1 animate-pulse" />
          <span className="text-xs text-[var(--gold-ancient)]">⚙</span>
          <div className="h-[1px] bg-gradient-to-l from-transparent to-[var(--gold-ancient)] flex-1 animate-pulse" />
        </div>

        {/* Exibição textual centralizada e focada em imersão tipográfica pura */}
        <div className="space-y-6 text-narrative text-neutral-300 text-lg md:text-xl leading-relaxed max-w-xl mx-auto italic font-light">
          {chapter.body?.map((paragraph: string, idx: number) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.4, duration: 1 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        {/* Acoplador de navegação para a constelação final do capítulo VII */}
        <motion.div 
          className="pt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <button
            onClick={nextChapter}
            className="group font-mono text-xs uppercase tracking-[0.3em] text-[var(--gold-ancient)] hover:text-white transition-colors duration-300"
          >
            Olhar para o Firmamento <span className="inline-block transform group-hover:translate-y-[-2px] transition-transform">↑</span>
          </button>
        </motion.div>

      </div>
    </section>
  )
}