// components/sections/Closing.tsx
"use client"
import React from "react"
import { motion } from "framer-motion"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

export function Closing() {
  const { restartStory } = useStory()

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-6 relative">
      
      {/* Camada interna de vinheta para escurecimento profundo das bordas na conclusão */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-10 relative z-10">
        
        {/* Mensagem Conclusiva de Impacto Emocional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "power4.out" }}
          className="space-y-4"
        >
          <h1 className="text-display text-4xl text-[var(--gold-ancient)]">
            Aqui começa nosso próximo capítulo.
          </h1>
          <p className="font-serif text-neutral-400 text-sm leading-relaxed">
            Obrigado por caminhar ao meu lado em cada detalhe, por rir dos erros e por construir uma história real.
          </p>
        </motion.div>

        {/* Assinatura de Saída Estilizada */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.5, duration: 2 }}
          className="py-6 border-y border-white/5"
        >
          <span className="text-script text-4xl text-[var(--parchment-base)] block">
            Eternamente, {storyData.couple.giver}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-neutral-600 block mt-2">
            Fim da Transmissão Estética
          </span>
        </motion.div>

        {/* Botão Circular Sutil de Reinicialização da Experiência */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="pt-4"
        >
          <button
            onClick={restartStory}
            className="text-xs font-mono tracking-widest text-neutral-500 hover:text-[var(--gold-ancient)] transition-colors duration-300 uppercase"
          >
            ↻ Ler novamente desde o início
          </button>
        </motion.div>

      </div>
    </section>
  )
}