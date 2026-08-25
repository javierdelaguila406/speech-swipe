import React from 'react'
import { useAppStore } from '@/store/appStore'

interface ProgressViewProps {
  onBack: () => void
}

export const ProgressView: React.FC<ProgressViewProps> = ({ onBack }) => {
  const { phrases, favorites } = useAppStore()

  const stats = {
    totalPhrases: phrases.length,
    totalFavorites: favorites.size,
    totalCategories: new Set(phrases.map(p => p.category)).size,
    visiblePhrases: phrases.filter(p => p.isVisible).length
  }

  return (
    <div className="fixed inset-0 bg-dark-bg z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-dark-surface border-b border-white border-opacity-5 p-4 z-50">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-white hover:text-gray-300 transition-colors"
          >
            ← Volver
          </button>
          <h2 className="text-lg font-bold text-white">PROGRESO</h2>
          <div className="w-6" />
        </div>
      </div>

      {/* Stats */}
      <div className="p-4 space-y-4">
        {/* Total Frases */}
        <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Total de frases</p>
              <p className="text-3xl font-bold text-accent-listen">{stats.totalPhrases}</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>

        {/* Visibles */}
        <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Frases visibles</p>
              <p className="text-3xl font-bold text-accent-slow">{stats.visiblePhrases}</p>
            </div>
            <div className="text-4xl">👁️</div>
          </div>
        </div>

        {/* Favoritas */}
        <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Frases favoritas</p>
              <p className="text-3xl font-bold text-yellow-400">{stats.totalFavorites}</p>
            </div>
            <div className="text-4xl">⭐</div>
          </div>
        </div>

        {/* Categorías */}
        <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">Categorías</p>
              <p className="text-3xl font-bold text-accent-lips">{stats.totalCategories}</p>
            </div>
            <div className="text-4xl">🏷️</div>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4">
          <h3 className="font-bold text-white mb-3">Categorías utilizadas</h3>
          <div className="space-y-2">
            {Array.from(new Set(phrases.map(p => p.category))).map(category => {
              const count = phrases.filter(p => p.category === category).length
              return (
                <div key={category} className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{category}</span>
                  <span className="text-sm font-semibold text-accent-listen">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-900 bg-opacity-20 border border-blue-500 border-opacity-50 rounded-lg p-4 text-center">
          <p className="text-xs text-blue-300">
            💡 Usa el gestor de frases para agregar más contenido y expandir la biblioteca
          </p>
        </div>
      </div>
    </div>
  )
}
