// components/sections/FinalGift.tsx
"use client"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"
import { useStory } from "@/context/StoryContext"
import { lettersData } from "@/config/lettersData"
import { storyData } from "@/config/storyData"

type GiftStage = "floating" | "turning" | "open" | "letter"

export function FinalGift() {
  const { nextChapter } = useStory()
  const [stage, setStage] = useState<GiftStage>("floating")
  const keyRef = useRef<HTMLDivElement>(null)
  const lockRef = useRef<HTMLDivElement>(null)

  const handleKeyClick = () => {
    if (stage !== "floating") return
    setStage("turning")

    const tl = gsap.timeline({
      onComplete: () => {
        setStage("open")
        setTimeout(() => setStage("letter"), 800)
      },
    })

    // Chave gira para abrir
    tl.to(keyRef.current, {
      rotation: 90,
      x: 0,
      duration: 1,
      ease: "power2.inOut",
    })
    // Cadeado treme e abre
    .to(lockRef.current, {
      y: -10,
      duration: 0.15,
      yoyo: true,
      repeat: 3,
      ease: "power1.inOut",
    }, "-=0.3")
    .to(lockRef.current, {
      scaleY: 0,
      opacity: 0,
      duration: 0.4,
      ease: "back.in(2)",
    })
  }

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
        padding: "4rem 2rem",
      }}
    >
      <AnimatePresence mode="wait">
        {(stage === "floating" || stage === "turning") && (
          <motion.div
            key="key-scene"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2rem" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-display"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                color: "var(--parchment-base)",
                textAlign: "center",
                maxWidth: 500,
              }}
            >
              Um presente guardado só para você.
            </motion.p>

            {/* Cadeado */}
            <div ref={lockRef}>
              <LockIcon />
            </div>

            {/* Chave flutuante e clicável */}
            <motion.div
              ref={keyRef as any}
              onClick={handleKeyClick}
              animate={{
                y: stage === "floating" ? [0, -12, 0] : 0,
                rotate: stage === "floating" ? [-3, 3, -3] : 90,
              }}
              transition={
                stage === "floating"
                  ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                  : { duration: 1 }
              }
              style={{ cursor: stage === "floating" ? "pointer" : "default" }}
              whileHover={stage === "floating" ? { scale: 1.1 } : {}}
            >
              <KeyIcon />
            </motion.div>

            {stage === "floating" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                style={{
                  fontFamily: "var(--font-script)",
                  color: "var(--gold-ancient)",
                  fontSize: "0.9rem",
                  letterSpacing: "0.1em",
                }}
              >
                clique na chave
              </motion.p>
            )}
          </motion.div>
        )}

        {stage === "letter" && (
          <motion.div
            key="final-letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 560, width: "100%" }}
          >
            <div
              className="paper-texture"
              style={{
                padding: "3rem 3.5rem",
                boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(139,105,20,0.3)",
              }}
            >
              <p
                className="text-script"
                style={{ color: "#5A3A1A", marginBottom: "2rem", opacity: 0.7 }}
              >
                Para {storyData.couple.receiver},
              </p>

              <div
                className="text-narrative"
                style={{ color: "#3A2A1A" }}
              >
                {lettersData.final.split("\n").map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.25, duration: 0.7 }}
                    style={{ marginBottom: "1rem" }}
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.p
                className="text-script"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                style={{
                  color: "#5A3A1A",
                  marginTop: "2rem",
                  textAlign: "right",
                  fontSize: "1.4rem",
                }}
              >
                Com amor eterno, {storyData.couple.giver}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3 }}
              style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}
            >
              <motion.button
                onClick={nextChapter}
                style={{
                  background: "linear-gradient(135deg, rgba(201,168,76,0.15), rgba(255,208,102,0.2))",
                  border: "1px solid var(--gold-ancient)",
                  color: "var(--gold-bright)",
                  fontFamily: "var(--font-body)",
                  fontSize: "1rem",
                  letterSpacing: "0.15em",
                  padding: "1rem 3rem",
                  cursor: "pointer",
                  animation: "glowPulse 2s ease-in-out infinite",
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Nossa história continua →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ── Ícones SVG ──────────────────────────────────────────────────────────────

function KeyIcon() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
      <defs>
        <linearGradient id="keyGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD066" />
          <stop offset="100%" stopColor="#C9A84C" />
        </linearGradient>
      </defs>
      {/* Círculo da chave */}
      <circle cx="28" cy="28" r="16" stroke="url(#keyGrad)" strokeWidth="4" fill="none" />
      <circle cx="28" cy="28" r="8" fill="rgba(201,168,76,0.2)" />
      {/* Haste */}
      <line x1="40" y1="28" x2="68" y2="28" stroke="url(#keyGrad)" strokeWidth="4" strokeLinecap="round" />
      {/* Dentes */}
      <line x1="56" y1="28" x2="56" y2="38" stroke="url(#keyGrad)" strokeWidth="4" strokeLinecap="round" />
      <line x1="64" y1="28" x2="64" y2="35" stroke="url(#keyGrad)" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="60" height="70" viewBox="0 0 60 70" fill="none">
      <defs>
        <linearGradient id="lockGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
      </defs>
      {/* Arco do cadeado */}
      <path
        d="M 15 30 L 15 18 A 15 15 0 0 1 45 18 L 45 30"
        stroke="url(#lockGrad)"
        strokeWidth="4"
        fill="none"
        strokeLinecap="round"
      />
      {/* Corpo */}
      <rect x="5" y="28" width="50" height="36" rx="4" fill="url(#lockGrad)" />
      {/* Buraco da fechadura */}
      <circle cx="30" cy="44" r="6" fill="rgba(0,0,0,0.4)" />
      <rect x="27" y="44" width="6" height="8" rx="1" fill="rgba(0,0,0,0.4)" />
    </svg>
  )
}
