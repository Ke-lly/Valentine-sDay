// components/sections/ChapterI.tsx
"use client"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { useStory } from "@/context/StoryContext"
import { storyData } from "@/config/storyData"

export function ChapterI() {
  const { nextChapter } = useStory()
  const bookRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // Animação de livro abrindo ao entrar
  useEffect(() => {
    if (!bookRef.current || !contentRef.current) return

    const tl = gsap.timeline()

    // Livro começa fechado (perspective + rotateY)
    tl.fromTo(
      bookRef.current,
      { rotateY: -25, opacity: 0, transformPerspective: 1200 },
      {
        rotateY: 0,
        opacity: 1,
        duration: 1.6,
        ease: "power3.out",
      }
    )
    // Conteúdo surge após o livro abrir
    .fromTo(
      contentRef.current.querySelectorAll(".page-element"),
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.6"
    )
  }, [])

  const { I: chapter } = storyData.chapters

  return (
    <section
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(2rem, 5vw, 5rem)",
      }}
    >
      <div
        ref={bookRef}
        style={{
          maxWidth: 700,
          width: "100%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Cabeçalho do capítulo */}
        <div ref={contentRef}>
          {/* Número do capítulo */}
          <motion.p
            className="page-element text-script"
            style={{
              color: "var(--gold-ancient)",
              opacity: 0.7,
              marginBottom: "0.5rem",
              fontSize: "1rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Capítulo I
          </motion.p>

          {/* Título */}
          <h1
            className="page-element text-display"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "var(--parchment-base)",
              marginBottom: "0.5rem",
            }}
          >
            {chapter.title}
          </h1>

          {/* Subtítulo */}
          <p
            className="page-element"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--gold-ancient)",
              fontSize: "1.1rem",
              fontStyle: "italic",
              marginBottom: "3rem",
              opacity: 0.8,
            }}
          >
            {chapter.subtitle}
          </p>

          {/* Epígrafe */}
          <blockquote
            className="page-element"
            style={{
              borderLeft: "2px solid var(--gold-ancient)",
              paddingLeft: "1.5rem",
              marginBottom: "3rem",
              fontFamily: "var(--font-body)",
              fontStyle: "italic",
              color: "var(--parchment-dark)",
              fontSize: "1.1rem",
              opacity: 0.9,
            }}
          >
            "{chapter.epigraph}"
          </blockquote>

          {/* Separador ornamental */}
          <OrnamentalDivider className="page-element" />

          {/* Narrativa — texto do capítulo */}
          <div
            className="page-element text-narrative"
            style={{ color: "var(--parchment-base)", marginTop: "2rem" }}
          >
            {chapter.body?.map((paragraph: string, i: number) => (
              <p key={i} style={{ marginBottom: "1.5rem" }}>
                {paragraph}
              </p>
            ))}
          </div>

          {/* Memórias em forma de polaroid */}
          {chapter.memories && chapter.memories.length > 0 && (
            <MemoryGrid memories={chapter.memories} />
          )}

          {/* CTA para próximo capítulo */}
          <motion.div
            className="page-element"
            style={{ marginTop: "4rem", display: "flex", justifyContent: "flex-end" }}
            whileHover={{ x: 4 }}
          >
            <button
              onClick={nextChapter}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--gold-ancient)",
                fontFamily: "var(--font-body)",
                fontSize: "1rem",
                fontStyle: "italic",
                letterSpacing: "0.1em",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                opacity: 0.8,
                transition: "opacity 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "1")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.opacity = "0.8")
              }
            >
              Próxima página
              <span style={{ fontSize: "1.4rem" }}>→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── Subcomponentes ──────────────────────────────────────────────────────────

function OrnamentalDivider({ className }: { className?: string }) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "2rem 0",
        opacity: 0.5,
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "var(--gold-ancient)" }} />
      <span style={{ color: "var(--gold-ancient)", fontSize: "1.2rem" }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: "var(--gold-ancient)" }} />
    </div>
  )
}

interface Memory {
  imageUrl?: string
  caption?: string
  date?: string
  rotation?: number
}

function MemoryGrid({ memories }: { memories: Memory[] }) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
        margin: "3rem 0",
      }}
    >
      {memories.map((memory, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30, rotate: memory.rotation ?? 0 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04, zIndex: 10 }}
          style={{
            background: "var(--parchment-base)",
            padding: "0.75rem 0.75rem 2.5rem",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            rotate: `${memory.rotation ?? (i % 2 === 0 ? -2 : 2)}deg`,
            maxWidth: 200,
            cursor: "default",
          }}
        >
          {memory.imageUrl ? (
            <img
              src={memory.imageUrl}
              alt={memory.caption ?? ""}
              style={{
                width: "100%",
                aspectRatio: "1",
                objectFit: "cover",
                display: "block",
                filter: "sepia(0.2)",
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "var(--parchment-dark)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                opacity: 0.4,
              }}
            >
              📷
            </div>
          )}
          {memory.caption && (
            <p
              className="text-script"
              style={{
                marginTop: "0.75rem",
                textAlign: "center",
                fontSize: "0.85rem",
                color: "#3A2A1A",
                lineHeight: 1.3,
              }}
            >
              {memory.caption}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  )
}
