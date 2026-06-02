export interface TimelineMemory {
  id: string
  date: Date
  title: string
  description: string
  imageUrl?: string
  mood: "joy" | "tenderness" | "nostalgia" | "excitement" | "love"
  envelopeColor?: string
}

export const timelineMemories: TimelineMemory[] = [
  {
    id: "memory-001",
    date: new Date("YYYY-MM-DD"),
    title: "Nossa primeira vez juntos",
    description: "Texto descritivo da memória...",
    imageUrl: "/memories/foto-01.jpg",
    mood: "joy",
  },
  // infinitas memórias podem ser adicionadas aqui
]
