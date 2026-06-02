// components/ui/WaxSeal.tsx
"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import gsap from "gsap"

interface WaxSealProps {
  text?: string
  onBreak?: () => void
  size?: number
}

export function WaxSeal({ text = "G&K", onBreak, size = 100 }: WaxSealProps) {
  const [isBroken, setIsBroken] = useState(false)
  const [isBreaking, setIsBreaking] = useState(false)
  const sealRef = useRef<HTMLDivElement>(null)

  const handleClick = () => {
    if (isBroken || isBreaking) return
    setIsBreaking(true)

    // GSAP sequence: tremor → crack → explode
    const tl = gsap.timeline({
      onComplete: () => {
        setIsBroken(true)
        setIsBreaking(false)
        onBreak?.()
      },
    })

    tl.to(sealRef.current, {
      rotation: -3,
      duration: 0.08,
      ease: "power4.out",
    })
    .to(sealRef.current, {
      rotation: 3,
      duration: 0.08,
    })
    .to(sealRef.current, {
      rotation: -2,
      duration: 0.06,
    })
    .to(sealRef.current, {
      rotation: 0,
      scale: 1.15,
      duration: 0.1,
    })
    .to(sealRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: "back.in(3)",
    })
  }

  return (
    <AnimatePresence>
      {!isBroken && (
        <motion.div
          ref={sealRef as any}
          onClick={handleClick}
          style={{
            width: size,
            height: size,
            cursor: isBreaking ? "default" : "pointer",
            position: "relative",
            userSelect: "none",
          }}
          whileHover={!isBreaking ? { scale: 1.05 } : {}}
          exit={{ scale: 0, opacity: 0 }}
        >
          {/* Corpo do selo */}
          <svg
            viewBox="0 0 100 100"
            width={size}
            height={size}
            style={{ overflow: "visible" }}
          >
            {/* Brilho externo */}
            <circle cx="50" cy="50" r="48" fill="none" stroke="#B8860B" strokeWidth="1" opacity="0.5" />

            {/* Corpo principal do selo */}
            <circle cx="50" cy="50" r="44" fill="#8B1A1A" />

            {/* Textura de cera — gradiente radial */}
            <radialGradient id="waxGrad" cx="35%" cy="35%">
              <stop offset="0%" stopColor="#C42020" />
              <stop offset="100%" stopColor="#5A0E0E" />
            </radialGradient>
            <circle cx="50" cy="50" r="44" fill="url(#waxGrad)" />

            {/* Anel interno */}
            <circle cx="50" cy="50" r="38" fill="none" stroke="#B8860B" strokeWidth="0.5" opacity="0.6" />

            {/* Reflexo de luz */}
            <ellipse cx="38" cy="38" rx="10" ry="7" fill="rgba(255,255,255,0.1)" />

            {/* Texto do selo */}
            <text
              x="50"
              y="56"
              textAnchor="middle"
              fontFamily="'Playfair Display', serif"
              fontSize="14"
              fontWeight="700"
              fill="#FFD066"
              letterSpacing="2"
              style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.5))" }}
            >
              {text}
            </text>
          </svg>

          {/* Glow animado */}
          <div
            style={{
              position: "absolute",
              inset: -10,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 26, 26, 0.4) 0%, transparent 70%)",
              animation: "glowPulse 2s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
