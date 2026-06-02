// components/sections/ChapterVII.tsx — Céu estrelado + constelação do nome
"use client"
import { useEffect, useRef, useCallback } from "react"
import { motion } from "framer-motion"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

// Letras do nome como coordenadas de constelação
// Cada letra é um conjunto de "estrelas" posicionadas para formá-la
type Point = [number, number]
type LetterDef = { stars: Point[]; edges: [number, number][] }

const LETTER_DEFS: Record<string, LetterDef> = {
  G: {
    stars: [[0,0],[0,4],[2,4],[2,2],[1,2],[2,0]],
    edges: [[0,1],[1,2],[2,3],[3,4],[0,5]],
  },
  U: {
    stars: [[0,0],[0,4],[1,5],[2,4],[2,0]],
    edges: [[0,1],[1,2],[2,3],[3,4]],
  },
  S: {
    stars: [[2,0],[0,0],[0,2],[2,2],[2,4],[0,4]],
    edges: [[0,1],[1,2],[2,3],[3,4],[4,5]],
  },
  T: {
    stars: [[0,0],[2,0],[1,0],[1,4]],
    edges: [[0,1],[2,3]],
  },
  A: {
    stars: [[0,4],[1,0],[2,4],[0.5,2],[1.5,2]],
    edges: [[0,1],[1,2],[3,4]],
  },
  V: {
    stars: [[0,0],[1,4],[2,0]],
    edges: [[0,1],[1,2]],
  },
  O: {
    stars: [[1,0],[2,2],[1,4],[0,2]],
    edges: [[0,1],[1,2],[2,3],[3,0]],
  },
}

function buildConstellation(
  name: string,
  canvasW: number,
  canvasH: number
): { stars: { x: number; y: number; delay: number }[]; edges: { x1: number; y1: number; x2: number; y2: number; delay: number }[] } {
  const letters = name.toUpperCase().split("")
  const scale = Math.min(canvasW, canvasH) * 0.05
  const spacing = scale * 3.5
  const totalW = letters.length * spacing
  const offsetX = (canvasW - totalW) / 2
  const offsetY = canvasH * 0.38

  const allStars: { x: number; y: number; delay: number }[] = []
  const allEdges: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = []

  letters.forEach((letter, li) => {
    const def = LETTER_DEFS[letter]
    if (!def) return

    const lx = offsetX + li * spacing
    const pts = def.stars.map(([px, py]) => ({
      x: lx + px * scale,
      y: offsetY + py * scale,
    }))

    pts.forEach((pt, si) => {
      allStars.push({ ...pt, delay: li * 0.3 + si * 0.08 })
    })

    def.edges.forEach(([a, b]) => {
      allEdges.push({
        x1: pts[a].x, y1: pts[a].y,
        x2: pts[b].x, y2: pts[b].y,
        delay: li * 0.3 + 0.5,
      })
    })
  })

  return { stars: allStars, edges: allEdges }
}

export function ChapterVII() {
  const { nextChapter } = useStory()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const frameRef = useRef(0)

  const draw = useCallback((
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    constellation: ReturnType<typeof buildConstellation>,
    t: number
  ) => {
    ctx.clearRect(0, 0, w, h)

    // Fundo cosmos — já feito pelo CanvasBackground, mas camada de nebulosa aqui
    ctx.fillStyle = "rgba(2, 2, 12, 0.15)"
    ctx.fillRect(0, 0, w, h)

    // Nebulosa sutil
    const grad = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.4)
    grad.addColorStop(0, "rgba(100, 60, 180, 0.04)")
    grad.addColorStop(1, "transparent")
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // Desenhar conexões da constelação
    constellation.edges.forEach(({ x1, y1, x2, y2, delay }) => {
      const localT = Math.max(0, t - delay)
      const progress = Math.min(1, localT / 1.2)
      if (progress <= 0) return

      const ex = x1 + (x2 - x1) * progress
      const ey = y1 + (y2 - y1) * progress

      ctx.beginPath()
      ctx.strokeStyle = `rgba(200, 180, 255, ${0.35 * progress})`
      ctx.lineWidth = 0.8
      ctx.moveTo(x1, y1)
      ctx.lineTo(ex, ey)
      ctx.stroke()
    })

    // Desenhar estrelas da constelação
    constellation.stars.forEach(({ x, y, delay }) => {
      const localT = Math.max(0, t - delay)
      const appear = Math.min(1, localT / 0.6)
      if (appear <= 0) return

      const twinkle = 0.7 + 0.3 * Math.sin(Date.now() * 0.003 + x + y)
      const alpha = appear * twinkle

      // Glow externo
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 12)
      glow.addColorStop(0, `rgba(220, 200, 255, ${0.4 * alpha})`)
      glow.addColorStop(1, "transparent")
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(x, y, 12, 0, Math.PI * 2)
      ctx.fill()

      // Estrela central
      ctx.fillStyle = `rgba(240, 230, 255, ${alpha})`
      ctx.beginPath()
      ctx.arc(x, y, 2.5, 0, Math.PI * 2)
      ctx.fill()
    })
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const name = storyData.couple.receiver
    let startTime: number | null = null

    const loop = (ts: number) => {
      if (!startTime) startTime = ts
      const t = (ts - startTime) / 1000
      progressRef.current = t

      const constellation = buildConstellation(name, canvas.width, canvas.height)
      draw(ctx, canvas.width, canvas.height, constellation, t)
      frameRef.current = requestAnimationFrame(loop)
    }

    // Pequeno delay antes de começar
    const timer = setTimeout(() => {
      frameRef.current = requestAnimationFrame(loop)
    }, 1000)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [draw])

  return (
    <section
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-end",
        paddingBottom: "8vh",
      }}
    >
      {/* Canvas de constelação */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
        }}
      />

      {/* Texto abaixo da constelação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 2 }}
        style={{ textAlign: "center", position: "relative", zIndex: 5 }}
      >
        <p
          className="text-script"
          style={{
            color: "rgba(200, 180, 255, 0.7)",
            fontSize: "1.1rem",
            marginBottom: "2rem",
          }}
        >
          Você sempre esteve escrito nas estrelas.
        </p>

        <motion.button
          onClick={nextChapter}
          style={{
            background: "transparent",
            border: "1px solid rgba(200, 180, 255, 0.3)",
            color: "rgba(200, 180, 255, 0.8)",
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontStyle: "italic",
            letterSpacing: "0.1em",
            padding: "0.875rem 2.5rem",
            cursor: "pointer",
          }}
          whileHover={{ scale: 1.02, borderColor: "rgba(200, 180, 255, 0.7)" }}
          whileTap={{ scale: 0.98 }}
        >
          Para o presente →
        </motion.button>
      </motion.div>
    </section>
  )
}
