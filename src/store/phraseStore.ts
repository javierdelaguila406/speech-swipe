import { create } from 'zustand'
import { EXAMPLE_PHRASES } from '@/config/examplePhrases'

export interface Phrase {
  id: string
  text: string
  category: string
  imageUrl: string
  keyword: string
  isFavorite: boolean
  practiceCount: number
  bestScore: number
  lastPracticed?: number
}

interface PhraseStore {
  phrases: Phrase[]
  currentPhraseIndex: number
  favorites: Set<string>
  practiceStats: Map<string, { count: number; bestScore: number; lastPracticed: number }>

  // Actions
  initializePhrases: () => void
  getCurrentPhrase: () => Phrase | undefined
  nextPhrase: () => void
  previousPhrase: () => void
  toggleFavorite: (phraseId: string) => void
  updatePracticeStats: (phraseId: string, score: number) => void
  getPracticeStats: (phraseId: string) => { count: number; bestScore: number; lastPracticed: number }
  getFavorites: () => Phrase[]
  getStats: () => { totalPhrases: number; totalPractices: number; averageScore: number }
}

export const usePhraseStore = create<PhraseStore>((set, get) => ({
  phrases: [],
  currentPhraseIndex: 0,
  favorites: new Set(),
  practiceStats: new Map(),

  initializePhrases: () => {
    const phrases = EXAMPLE_PHRASES.map(p => ({
      ...p,
      isFavorite: false,
      practiceCount: 0,
      bestScore: 0
    }))
    set({ phrases, currentPhraseIndex: 0 })
  },

  getCurrentPhrase: () => {
    const { phrases, currentPhraseIndex } = get()
    return phrases[currentPhraseIndex]
  },

  nextPhrase: () => {
    const { phrases, currentPhraseIndex } = get()
    const nextIndex = (currentPhraseIndex + 1) % phrases.length
    set({ currentPhraseIndex: nextIndex })
  },

  previousPhrase: () => {
    const { phrases, currentPhraseIndex } = get()
    const prevIndex = currentPhraseIndex === 0 ? phrases.length - 1 : currentPhraseIndex - 1
    set({ currentPhraseIndex: prevIndex })
  },

  toggleFavorite: (phraseId: string) => {
    const { phrases, favorites } = get()
    const newFavorites = new Set(favorites)

    if (newFavorites.has(phraseId)) {
      newFavorites.delete(phraseId)
    } else {
      newFavorites.add(phraseId)
    }

    const updatedPhrases = phrases.map(p =>
      p.id === phraseId ? { ...p, isFavorite: !p.isFavorite } : p
    )

    set({ phrases: updatedPhrases, favorites: newFavorites })
  },

  updatePracticeStats: (phraseId: string, score: number) => {
    const { phrases, practiceStats } = get()
    const stats = practiceStats.get(phraseId) || { count: 0, bestScore: 0, lastPracticed: 0 }

    const newStats = {
      count: stats.count + 1,
      bestScore: Math.max(stats.bestScore, score),
      lastPracticed: Date.now()
    }

    const newPracticeStats = new Map(practiceStats)
    newPracticeStats.set(phraseId, newStats)

    const updatedPhrases = phrases.map(p =>
      p.id === phraseId
        ? {
            ...p,
            practiceCount: newStats.count,
            bestScore: newStats.bestScore,
            lastPracticed: newStats.lastPracticed
          }
        : p
    )

    set({ phrases: updatedPhrases, practiceStats: newPracticeStats })
  },

  getPracticeStats: (phraseId: string) => {
    const { practiceStats } = get()
    return practiceStats.get(phraseId) || { count: 0, bestScore: 0, lastPracticed: 0 }
  },

  getFavorites: () => {
    const { phrases, favorites } = get()
    return phrases.filter(p => favorites.has(p.id))
  },

  getStats: () => {
    const { phrases, practiceStats } = get()
    const totalPhrases = phrases.length
    const totalPractices = Array.from(practiceStats.values()).reduce((sum, s) => sum + s.count, 0)
    const averageScore = practiceStats.size > 0
      ? Array.from(practiceStats.values()).reduce((sum, s) => sum + s.bestScore, 0) / practiceStats.size
      : 0

    return { totalPhrases, totalPractices, averageScore: Math.round(averageScore) }
  }
}))
