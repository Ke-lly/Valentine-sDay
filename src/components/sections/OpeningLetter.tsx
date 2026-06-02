// components/sections/OpeningLetter.tsx
"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { useStory } from "@/context/StoryContext"
import { WaxSeal } from "@/components/ui/WaxSeal"
import { storyData } from "@/config/storyData"
import { lettersData } from "@/config/lettersData"

type OpeningStage = "idle" | "seal-broken" | "envelope-open" | "letter-visible" | "complete"

export function OpeningLetter() {
  const [stage, setStage] = useState<OpeningStage>("idle")
  const { completeOpening, nextChapter } = useStory()
  const envelopeRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  const handleSealBreak = () => {
    setStage("seal-broken")

    // Pequena pausa dramática antes do envelope abrir
    setTimeout(() => openEnvelope(), 600)
  }

  const openEnvelope = () => {
    if (!envelopeRef.current) return

    const tl = gsap.timeline({
      onComplete: () => {
        setStage("envelope-open")
        setTimeout(() => revealLetter(), 400)
      },
    })

    // Tampa do envelope se abre (rotação 3D)
    tl.to(envelopeRef.current.querySelector(".envelope-flap"), {
      rotateX: -180,
      duration: 1.2,
      ease: "power2.inOut",
      transformOrigin: "top center",
    })
  }

  const revealLetter = () => {
    setStage("letter-visible")

    if (!letterRef.current) return

    // Carta sobe para fora do envelope
    gsap.fromTo(
      letterRef.current,
      { y: 60, scaleY: 0.3, opacity: 0 },
      {
        y: 0,
        scaleY: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power2.out",
      }
    )

    // Texto aparece linha por linha
    const lines = letterRef.current.querySelectorAll(".letter-line")
    gsap.fromTo(
      lines,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.3,
        delay: 0.8,
        ease: "power2.out",
        onComplete: () => setStage("complete"),
      }
    )
  }

  const handleEnterStory = () => {
    completeOpening()
    nextChapter()
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
      }}
    >
      {/* Mesa antiga */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {/* Velas decorativas */}
        <CandleDecoration position="left" />
        <CandleDecoration position="right" />

        {/* Envelope */}
        <div ref={envelopeRef} style={{ position: "relative", width: 320, height: 220 }}>
          <Envelope stage={stage} />

          {/* Selo — só visível no estado idle */}
          <AnimatePresence>
            {stage === "idle" && (
              <motion.div
                exit={{ opacity: 0, scale: 0 }}
                style={{
                  position: "absolute",
                  bottom: -20,
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 5,
                }}
              >
                <WaxSeal
                  text={storyData.openingLetter.sealText}
                  onBreak={handleSealBreak}
                  size={80}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Carta revelada */}
        <AnimatePresence>
          {stage === "letter-visible" || stage === "complete" ? (
            <motion.div
              ref={letterRef as any}
              className="paper-texture"
              style={{
                width: "min(480px, 90vw)",
                padding: "3rem 3.5rem",
                borderRadius: "2px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,105,20,0.3)",
                position: "relative",
              }}
              initial={{ opacity: 0 }}
            >
              {/* Linhas pautadas decorativas */}
              <LetterLines />

              {/* Cabeçalho */}
              <p
                className="text-script"
                style={{ color: "#5A3A1A", marginBottom: "1.5rem", opacity: 0.7 }}
              >
                Para {storyData.couple.receiver},
              </p>

              {/* Conteúdo da carta */}
              <div style={{ fontFamily: "var(--font-body)", color: "#3A2A1A", lineHeight: 1.9 }}>
                {lettersData.opening.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="letter-line"
                    style={{ marginBottom: "0.75rem", opacity: 0 }}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Assinatura */}
              <motion.p
                className="text-script"
                style={{
                  color: "#5A3A1A",
                  marginTop: "2rem",
                  textAlign: "right",
                  opacity: 0,
                }}
                animate={stage === "complete" ? { opacity: 1 } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Com todo meu amor, {storyData.couple.giver}
              </motion.p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* CTA — Entrar na história */}
        <AnimatePresence>
          {stage === "complete" && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              onClick={handleEnterStory}
              style={{
                background: "transparent",
                border: "1px solid #C9A84C",
                color: "#FFD066",
                fontFamily: "var(--font-body)",
                fontSize: "1.1rem",
                letterSpacing: "0.15em",
                padding: "1rem 2.5rem",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span style={{ position: "relative", zIndex: 1 }}>
                {storyData.openingLetter.ctaText}
              </span>
              {/* Shimmer effect */}
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, transparent, rgba(255,208,102,0.1), transparent)",
                }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

/* ── Subcomponentes ── */

function Envelope({ stage }: { stage: OpeningStage }) {
  const isOpen = stage !== "idle" && stage !== "seal-broken"

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        filter: "drop-shadow(0 8px 30px rgba(0,0,0,0.5))",
      }}
    >
      <svg viewBox="0 0 320 220" style={{ width: "100%", height: "100%" }}>
        {/* Definições de gradientes */}
        <defs>
          <linearGradient id="envelopeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8D5B7" />
            <stop offset="100%" stopColor="#C9A87A" />
          </linearGradient>
          <linearGradient id="flapGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4B896" />
            <stop offset="100%" stopColor="#B89B7A" />
          </linearGradient>
        </defs>

        {/* Corpo do envelope */}
        <rect x="0" y="0" width="320" height="220" rx="3" fill="url(#envelopeGrad)" />

        {/* Bordas internas */}
        <rect x="1" y="1" width="318" height="218" rx="2" fill="none" stroke="#C9A84C" strokeWidth="0.5" opacity="0.5" />

        {/* Linhas diagonais decorativas */}
        <line x1="0" y1="220" x2="140" y2="100" stroke="#B89B7A" strokeWidth="0.8" opacity="0.4" />
        <line x1="320" y1="220" x2="180" y2="100" stroke="#B89B7A" strokeWidth="0.8" opacity="0.4" />

        {/* Tampa (flap) — sempre no topo, visível */}
        <path
          className="envelope-flap"
          d="M 0 0 L 160 105 L 320 0 Z"
          fill="url(#flapGrad)"
          stroke="#B89B7A"
          strokeWidth="0.5"
          style={{
            transformOrigin: "50% 0%",
            transformBox: "fill-box",
          }}
        />
      </svg>
    </div>
  )
}

function CandleDecoration({ position }: { position: "left" | "right" }) {
  const side = position === "left" ? { left: -80 } : { right: -80 }

  return (
    <div
      style={{
        position: "absolute",
        top: "10%",
        ...side,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Chama */}
      <div
        style={{
          width: 8,
          height: 20,
          background: "radial-gradient(ellipse at bottom, #FFD066 0%, #FF8C00 50%, transparent 100%)",
          borderRadius: "50% 50% 30% 30%",
          animation: "candleFlicker 1.5s ease-in-out infinite",
          filter: "blur(1px)",
        }}
      />
      {/* Corpo da vela */}
      <div
        style={{
          width: 16,
          height: 70,
          background: "linear-gradient(to bottom, #F5E6D3, #D4B896)",
          borderRadius: "2px 2px 4px 4px",
          boxShadow: "inset -3px 0 6px rgba(0,0,0,0.1)",
        }}
      />
      {/* Derretimento */}
      <div
        style={{
          width: 20,
          height: 8,
          background: "#D4B896",
          borderRadius: "0 0 4px 4px",
          filter: "blur(1px)",
        }}
      />
    </div>
  )
}

function LetterLines() {
  return (
    <div
      style={{
        position: "absolute",
        inset: "3rem 3.5rem",
        backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 28px, rgba(139,105,20,0.15) 28px, rgba(139,105,20,0.15) 29px)",
        pointerEvents: "none",
      }}
    />
  )
}
