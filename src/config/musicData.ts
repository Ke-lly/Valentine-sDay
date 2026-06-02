export interface Track {
  id: string
  title: string
  artist: string
  src: string            // /audio/track-name.mp3
  chapter: number | "global" | "closing"
  bpm?: number           // Para sincronização visual
  mood: string
}

export const playlist: Track[] = [
  {
    id: "track-main",
    title: "Nossa música",
    artist: "Artista",
    src: "/audio/main-theme.mp3",
    chapter: "global",
    bpm: 72,
    mood: "tender",
  },
]

export const soundEffects = {
  waxSeal: "/audio/sfx/wax-seal-break.mp3",
  paperUnfold: "/audio/sfx/paper-unfold.mp3",
  envelopeOpen: "/audio/sfx/envelope-open.mp3",
  pageFlip: "/audio/sfx/page-flip.mp3",
  keyTurn: "/audio/sfx/key-turn.mp3",
  sparkle: "/audio/sfx/sparkle.mp3",
  ambient: "/audio/sfx/candle-ambient.mp3",
}
