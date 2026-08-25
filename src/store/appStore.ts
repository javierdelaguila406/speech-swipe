import { create } from 'zustand'
import { Phrase } from '@/types'
import { DEFAULT_PHRASES } from '@/config/defaultData'

interface AppStore {
  phrases: Phrase[]
  currentIndex: number
  favorites: Set<string>
  isPlaying: boolean
  isRecording: boolean
  currentlyPlayingId: string | null

  // Acciones de frase
  nextPhrase: () => void
  previousPhrase: () => void
  goToPhrase: (index: number) => void
  getCurrentPhrase: () => Phrase | null

  // Acciones de favoritas
  toggleFavorite: (phraseId: string) => void
  isFavorite: (phraseId: string) => boolean

  // Acciones de reproducción
  setIsPlaying: (value: boolean) => void
  setCurrentlyPlayingId: (id: string | null) => void

  // Acciones de grabación
  setIsRecording: (value: boolean) => void

  // Inicializar datos
  loadPhrases: () => void
  loadFavorites: () => void
  saveFavorites: () => void
}

export const useAppStore = create<AppStore>((set, get) => ({
  phrases: DEFAULT_PHRASES,
  currentIndex: 0,
  favorites: new Set<string>(),
  isPlaying: false,
  isRecording: false,
  currentlyPlayingId: null,

  nextPhrase: () =>
    set((state) => ({
      currentIndex: Math.min(state.currentIndex + 1, state.phrases.length - 1)
    })),

  previousPhrase: () =>
    set((state) => ({
      currentIndex: Math.max(state.currentIndex - 1, 0)
    })),

  goToPhrase: (index: number) => {
    const { phrases } = get()
    if (index >= 0 && index < phrases.length) {
      set({ currentIndex: index })
    }
  },

  getCurrentPhrase: () => {
    const { phrases, currentIndex } = get()
    return phrases[currentIndex] || null
  },

  toggleFavorite: (phraseId: string) =>
    set((state) => {
      const newFavorites = new Set(state.favorites)
      if (newFavorites.has(phraseId)) {
        newFavorites.delete(phraseId)
      } else {
        newFavorites.add(phraseId)
      }
      // Guardar en localStorage
      localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)))
      return { favorites: newFavorites }
    }),

  isFavorite: (phraseId: string) => {
    return get().favorites.has(phraseId)
  },

  setIsPlaying: (value: boolean) => set({ isPlaying: value }),

  setCurrentlyPlayingId: (id: string | null) => set({ currentlyPlayingId: id }),

  setIsRecording: (value: boolean) => set({ isRecording: value }),

  loadPhrases: () => {
    try {
      const stored = localStorage.getItem('phrases')
      if (stored) {
        const phrases = JSON.parse(stored)
        set({ phrases })
      }
    } catch (error) {
      console.error('Error loading phrases:', error)
    }
  },

  loadFavorites: () => {
    try {
      const stored = localStorage.getItem('favorites')
      if (stored) {
        const favorites = new Set(JSON.parse(stored))
        set({ favorites })
      }
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  },

  saveFavorites: () => {
    const { favorites } = get()
    localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)))
  }
}))
