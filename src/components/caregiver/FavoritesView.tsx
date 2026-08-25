import React from 'react'
import { useAppStore } from '@/store/appStore'
import { Button } from '@/components/common/Button'

interface FavoritesViewProps {
  onBack: () => void
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({ onBack }) => {
  const { phrases, favorites } = useAppStore()

  const favoritesPhrases = phrases.filter(p => favorites.has(p.id))

  return (
    <div className="fixed inset-0 bg-dark-bg z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-dark-surface border-b border-white border-opacity-5 p-4 z-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-white hover:text-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h2 className="text-lg font-bold text-white">FAVORITAS</h2>
          <div className="w-6" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {favoritesPhrases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay frases favoritas</p>
          </div>
        ) : (
          favoritesPhrases.map((phrase) => (
            <div
              key={phrase.id}
              className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 flex gap-4"
            >
              <img
                src={phrase.image.url}
                alt={phrase.image.alt}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="font-bold text-white">{phrase.text}</h3>
                <p className="text-xs text-gray-400">{phrase.category}</p>
                <p className="text-xs text-yellow-300 mt-1">⭐ Favorita</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
