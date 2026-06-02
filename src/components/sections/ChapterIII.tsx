// components/sections/ChapterIII.tsx — Retrospectiva estilo Wrapped
"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { useStory } from "@/context/StoryContext"
import { statsData } from "@/config/statsData"
import { storyData } from "@/config/storyData"

function useDaysTogether(): number {
  const start = storyData.relationship.startDate
  const now = new Date()
  return Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
}

export function ChapterIII() {
  const { nextChapter } = useStory()
  const daysTogether = useDaysTogether()

  return (
    <section
      style={{
        minHeight: "100dvh",
        padding: "clamp(3rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "5rem",
      }}
    >
      {/* Cabeçalho */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ textAlign: "center", maxWidth: 600 }}
      >
        <p
          className="text-script"
          style={{ color: "var(--gold-ancient)", marginBottom: "1rem", opacity: 0.8 }}
        >
          Capítulo III
        </p>
        <h1
          className="text-display"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "var(--parchment-base)",
            marginBottom: "1rem",
          }}
        >
          Nossa Retrospectiva
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--gold-ancient)",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          Em números, porque às vezes só os números conseguem mostrar a magnitude do que construímos.
        </p>
      </motion.div>

      {/* Card principal — dias juntos */}
      <HeroStat
        value={daysTogether}
        label={statsData.daysTogetherLabel}
        delay={0.3}
      />

      {/* Grid de estatísticas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          maxWidth: 900,
        }}
      >
        {statsData.stats
          .filter((s) => s.valueType !== "calculated")
          .map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} />
          ))}
      </div>

      {/* Card especial — infinito */}
      <InfinityCard />

      {/* Próxima página */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={nextChapter}
        style={{
          background: "transparent",
          border: "1px solid rgba(201, 168, 76, 0.4)",
          color: "var(--gold-ancient)",
          fontFamily: "var(--font-body)",
          fontSize: "1rem",
          fontStyle: "italic",
          letterSpacing: "0.1em",
          padding: "0.875rem 2.5rem",
          cursor: "pointer",
          borderRadius: "1px",
        }}
        whileHover={{ scale: 1.02, borderColor: "rgba(201, 168, 76, 0.8)" }}
        whileTap={{ scale: 0.98 }}
      >
        Continuar nossa história →
      </motion.button>
    </section>
  )
}

// ── Contadores animados ────────────────────────────────────────────────────

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Easing: ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [start, target, duration])

  return count
}

function HeroStat({ value, label, delay }: { value: number; label: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-100px" })
  const count = useCountUp(value, 2500, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: "center",
        padding: "3rem 4rem",
        border: "1px solid rgba(201, 168, 76, 0.3)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Fundo com brilho radial */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(255, 208, 102, 0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <p
        className="text-stats text-gold"
        style={{ fontSize: "clamp(4rem, 12vw, 8rem)", lineHeight: 1 }}
      >
        {count.toLocaleString("pt-BR")}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--parchment-dark)",
          fontSize: "1.1rem",
          letterSpacing: "0.1em",
          marginTop: "0.75rem",
          fontStyle: "italic",
        }}
      >
        {label}
      </p>
    </motion.div>
  )
}

interface Stat {
  label: string
  value?: number | string
  suffix?: string
  valueType?: string
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-50px" })
  const numericValue = typeof stat.value === "number" ? stat.value : 0
  const count = useCountUp(numericValue, 1800, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        padding: "2rem",
        border: "1px solid rgba(201, 168, 76, 0.2)",
        background: "rgba(201, 168, 76, 0.03)",
        position: "relative",
      }}
      whileHover={{ borderColor: "rgba(201, 168, 76, 0.5)" }}
    >
      <p
        className="text-stats text-gold"
        style={{ fontSize: "clamp(2rem, 5vw, 3rem)", marginBottom: "0.5rem" }}
      >
        {typeof stat.value === "string"
          ? stat.value
          : count.toLocaleString("pt-BR")}
        {stat.suffix && (
          <span
            style={{
              fontSize: "0.45em",
              marginLeft: "0.3em",
              color: "var(--gold-ancient)",
              opacity: 0.7,
            }}
          >
            {stat.suffix}
          </span>
        )}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--parchment-dark)",
          fontSize: "0.95rem",
          opacity: 0.8,
        }}
      >
        {stat.label}
      </p>
    </motion.div>
  )
}

function InfinityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        textAlign: "center",
        padding: "2.5rem 3rem",
        background: "linear-gradient(135deg, rgba(201, 168, 76, 0.05), rgba(255, 208, 102, 0.08))",
        border: "1px solid rgba(201, 168, 76, 0.4)",
        maxWidth: 500,
        animation: "glowPulse 3s ease-in-out infinite",
      }}
    >
      <p
        className="text-stats text-gold"
        style={{ fontSize: "5rem", lineHeight: 1 }}
      >
        ∞
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          color: "var(--parchment-dark)",
          fontStyle: "italic",
          marginTop: "0.5rem",
        }}
      >
        Vezes que você me fez sentir em casa
      </p>
    </motion.div>
  )
}
