import React, { useState } from 'react'
import { useAppStore } from '@/store/appStore'
import { Button } from '@/components/common/Button'
import { Phrase } from '@/types'

interface PhraseManagerProps {
  onBack: () => void
  onEditPhrase: (phrase: Phrase | null) => void
}

export const PhraseManager: React.FC<PhraseManagerProps> = ({
  onBack,
  onEditPhrase
}) => {
  const { phrases } = useAppStore()
  const [selectedPhraseId, setSelectedPhraseId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    if (confirm('¿Eliminar esta frase?')) {
      // Implement delete logic
      console.log('Delete phrase:', id)
    }
  }

  const handleNewPhrase = () => {
    onEditPhrase(null)
  }

  const handleEditPhrase = (phrase: Phrase) => {
    onEditPhrase(phrase)
  }

  return (
    <div className="fixed inset-0 bg-dark-bg z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-dark-surface border-b border-white border-opacity-5 p-4 z-50">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="text-white hover:text-gray-300 transition-colors"
            aria-label="Volver"
          >
            ← Volver
          </button>
          <h2 className="text-lg font-bold text-white">FRASES</h2>
          <div className="w-6" />
        </div>
        <Button
          size="md"
          onClick={handleNewPhrase}
          className="w-full"
        >
          + NUEVA FRASE
        </Button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3">
        {phrases.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No hay frases</p>
            <Button
              size="md"
              onClick={handleNewPhrase}
              className="mt-4"
            >
              Crear primera frase
            </Button>
          </div>
        ) : (
          phrases.map((phrase) => (
            <div
              key={phrase.id}
              className={`bg-dark-tertiary border border-white border-opacity-10 rounded-lg p-4 transition-all duration-200 ${
                selectedPhraseId === phrase.id ? 'ring-2 ring-accent-listen' : ''
              }`}
            >
              <div className="flex gap-4 mb-3">
                <img
                  src={phrase.image.url}
                  alt={phrase.image.alt}
                  className="w-16 h-16 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/64?text=Sin+img'
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-bold text-white">{phrase.text}</h3>
                  <p className="text-xs text-gray-400">{phrase.category}</p>
                  <div className="flex gap-2 mt-2">
                    {phrase.isFavorite && (
                      <span className="text-xs bg-yellow-900 bg-opacity-50 text-yellow-300 px-2 py-1 rounded">
                        ⭐ Favorita
                      </span>
                    )}
                    {!phrase.isVisible && (
                      <span className="text-xs bg-red-900 bg-opacity-50 text-red-300 px-2 py-1 rounded">
                        👁️ Oculta
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEditPhrase(phrase)}
                  className="flex-1"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleDelete(phrase.id)}
                  className="flex-1"
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
