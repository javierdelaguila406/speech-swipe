import { create } from 'zustand';
import { DEFAULT_PHRASES } from '@/config/defaultData';
export const useAppStore = create((set, get) => ({
    phrases: DEFAULT_PHRASES,
    currentIndex: 0,
    favorites: new Set(),
    isPlaying: false,
    isRecording: false,
    currentlyPlayingId: null,
    nextPhrase: () => set((state) => ({
        currentIndex: Math.min(state.currentIndex + 1, state.phrases.length - 1)
    })),
    previousPhrase: () => set((state) => ({
        currentIndex: Math.max(state.currentIndex - 1, 0)
    })),
    goToPhrase: (index) => {
        const { phrases } = get();
        if (index >= 0 && index < phrases.length) {
            set({ currentIndex: index });
        }
    },
    getCurrentPhrase: () => {
        const { phrases, currentIndex } = get();
        return phrases[currentIndex] || null;
    },
    toggleFavorite: (phraseId) => set((state) => {
        const newFavorites = new Set(state.favorites);
        if (newFavorites.has(phraseId)) {
            newFavorites.delete(phraseId);
        }
        else {
            newFavorites.add(phraseId);
        }
        // Guardar en localStorage
        localStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)));
        return { favorites: newFavorites };
    }),
    isFavorite: (phraseId) => {
        return get().favorites.has(phraseId);
    },
    setIsPlaying: (value) => set({ isPlaying: value }),
    setCurrentlyPlayingId: (id) => set({ currentlyPlayingId: id }),
    setIsRecording: (value) => set({ isRecording: value }),
    loadPhrases: () => {
        try {
            const stored = localStorage.getItem('phrases');
            if (stored) {
                const phrases = JSON.parse(stored);
                set({ phrases });
            }
        }
        catch (error) {
            console.error('Error loading phrases:', error);
        }
    },
    loadFavorites: () => {
        try {
            const stored = localStorage.getItem('favorites');
            if (stored) {
                const favorites = new Set(JSON.parse(stored));
                set({ favorites });
            }
        }
        catch (error) {
            console.error('Error loading favorites:', error);
        }
    },
    saveFavorites: () => {
        const { favorites } = get();
        localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    }
}));
