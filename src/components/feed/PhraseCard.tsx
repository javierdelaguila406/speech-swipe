import React from 'react'
import { motion } from 'framer-motion'

interface Phrase {
  id: string
  text: string
  category: string
  imageUrl: string
  isFavorite?: boolean
}

interface PhraseCardProps {
  phrase: Phrase
  onFavoriteToggle: () => void
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, onFavoriteToggle }) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
      {/* Image */}
      <div className="relative w-full aspect-square bg-gray-200 overflow-hidden">
        <img
          src={phrase.imageUrl}
          alt={phrase.text}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1516035069371-29ad0ffe62fa?w=400&h=400&fit=crop'
          }}
        />

        {/* Favorite Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onFavoriteToggle}
          className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg"
        >
          <span className="text-2xl">{phrase.isFavorite ? '❤️' : '🤍'}</span>
        </motion.button>

        {/* Category Badge */}
        <div className="absolute bottom-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {phrase.category}
        </div>
      </div>

      {/* Text */}
      <div className="p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{phrase.text}</h2>
        <p className="text-gray-600 text-sm">Desliza para cambiar de frase</p>
      </div>

      {/* Hint */}
      <div className="px-6 pb-6 text-center text-gray-500 text-xs">
        Palabra clave: <span className="font-semibold text-purple-600">{phrase.text.split(' ')[0]}</span>
      </div>
    </div>
  )
}
