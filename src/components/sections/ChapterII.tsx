// components/sections/ChapterII.tsx
"use client"
import React, { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

export function ChapterII() {
  const { nextChapter } = useStory()
  const containerRef = useRef<HTMLDivElement>(null)
  const { II: chapter } = storyData.chapters

  useEffect(() => {
    if (!containerRef.current) return
    
    // Revelação elegante por linhas através de máscaras de opacidade transversais
    gsap.fromTo(
      containerRef.current.querySelectorAll(".narrative-paragraph"),
      { opacity: 0, x: -15 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 1,
        ease: "power2.out"
      }
    )
  }, [])

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 md:p-12">
      <div ref={containerRef} className="max-w-2xl w-full flex flex-col space-y-8">
        
        {/* Metadados Estéticos do Capítulo */}
        <div className="space-y-2">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            className="text-script text-xl text-[var(--gold-ancient)] uppercase tracking-wider"
          >
            Capítulo II
          </motion.p>
          <h1 className="text-display text-4xl md:text-5xl text-[var(--parchment-base)] leading-tight">
            {chapter.title}
          </h1>
          <p className="font-serif italic text-sm text-[var(--gold-bright)] opacity-75">
            {chapter.subtitle}
          </p>
        </div>

        {/* Bloco de Citação / Epígrafe */}
        <blockquote className="border-l-2 border-[var(--gold-ancient)] pl-6 italic text-[var(--parchment-dark)] font-medium text-lg bg-white/5 py-4 pr-4 rounded-r-sm">
          "{chapter.epigraph}"
        </blockquote>

        {/* Corpo Narrativo */}
        <div className="space-y-6 text-narrative text-[var(--parchment-base)] text-justify leading-relaxed selection:bg-[var(--gold-glow)]">
          {chapter.body?.map((paragraph: string, idx: number) => (
            <p key={idx} className="narrative-paragraph opacity-0 transform-gpu">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Rodapé Interativo de Passagem de Página */}
        <div className="pt-8 flex justify-end">
          <button
            onClick={nextChapter}
            className="text-script text-2xl text-[var(--gold-ancient)] hover:text-[var(--gold-bright)] flex items-center space-x-3 transition-colors duration-300 group"
          >
            <span>Virar a página</span>
            <span className="transform group-hover:translate-x-2 transition-transform duration-300">→</span>
          </button>
        </div>

      </div>
    </section>
  )
}