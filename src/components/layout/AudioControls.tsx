// components/layout/AudioControls.tsx
"use client"
import { motion } from "framer-motion"
import { type useAudioEngine } from "@/hooks/useAudioEngine"

type AudioEngine = ReturnType<typeof useAudioEngine>

export function AudioControls({ audio }: { audio: AudioEngine }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 40,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      {audio.currentTrack && (
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 0.6, x: 0 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "0.8rem",
            color: "var(--parchment-dark)",
            fontStyle: "italic",
          }}
        >
          {audio.currentTrack.title}
        </motion.span>
      )}

      <button
        onClick={audio.toggleMute}
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(201,168,76,0.2)",
          color: "var(--gold-ancient)",
          width: 36,
          height: 36,
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1rem",
          backdropFilter: "blur(4px)",
        }}
        title={audio.isMuted ? "Ativar som" : "Silenciar"}
      >
        {audio.isMuted ? "🔇" : "🔊"}
      </button>
    </motion.div>
  )
}
