// context/StoryContext.tsx
"use client"

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"

export type ChapterKey =
  | "opening"
  | 1 | 2 | 3 | 4 | 5 | 6 | 7
  | "gift"
  | "closing"

export type AtmosphereMood =
  | "candlelit"    // Cap 0
  | "amber"        // Cap I
  | "rose"         // Cap II
  | "golden"       // Cap III
  | "parchment"    // Cap IV
  | "violet"       // Cap V
  | "indigo"       // Cap VI
  | "cosmos"       // Cap VII
  | "luminous"     // Final

const CHAPTER_ORDER: ChapterKey[] = [
  "opening", 1, 2, 3, 4, 5, 6, 7, "gift", "closing",
]

const CHAPTER_MOOD: Record<ChapterKey, AtmosphereMood> = {
  opening: "candlelit",
  1: "amber",
  2: "rose",
  3: "golden",
  4: "parchment",
  5: "violet",
  6: "indigo",
  7: "cosmos",
  gift: "luminous",
  closing: "luminous",
}

interface StoryState {
  currentChapter: ChapterKey
  currentMood: AtmosphereMood
  chapterIndex: number
  isAudioEnabled: boolean
  hasOpeningCompleted: boolean
  isTransitioning: boolean
}

interface StoryActions {
  nextChapter: () => void
  goToChapter: (chapter: ChapterKey) => void
  setAudioEnabled: (enabled: boolean) => void
  completeOpening: () => void
  setTransitioning: (value: boolean) => void
}

type StoryContextValue = StoryState & StoryActions

const StoryContext = createContext<StoryContextValue | null>(null)

export function StoryProvider({ children }: { children: ReactNode }) {
  const [chapterIndex, setChapterIndex] = useState(0)
  const [isAudioEnabled, setAudioEnabled] = useState(false)
  const [hasOpeningCompleted, setHasOpeningCompleted] = useState(false)
  const [isTransitioning, setTransitioning] = useState(false)

  const currentChapter = CHAPTER_ORDER[chapterIndex]
  const currentMood = CHAPTER_MOOD[currentChapter]

  const nextChapter = useCallback(() => {
    setChapterIndex((prev) =>
      Math.min(prev + 1, CHAPTER_ORDER.length - 1)
    )
  }, [])

  const goToChapter = useCallback((chapter: ChapterKey) => {
    const index = CHAPTER_ORDER.indexOf(chapter)
    if (index !== -1) setChapterIndex(index)
  }, [])

  const completeOpening = useCallback(() => {
    setHasOpeningCompleted(true)
  }, [])

  return (
    <StoryContext.Provider
      value={{
        currentChapter,
        currentMood,
        chapterIndex,
        isAudioEnabled,
        hasOpeningCompleted,
        isTransitioning,
        nextChapter,
        goToChapter,
        setAudioEnabled,
        completeOpening,
        setTransitioning,
      }}
    >
      {children}
    </StoryContext.Provider>
  )
}

export function useStory(): StoryContextValue {
  const ctx = useContext(StoryContext)
  if (!ctx) throw new Error("useStory must be used inside <StoryProvider>")
  return ctx
}
