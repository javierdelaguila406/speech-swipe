import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/common/Badge'
import { Phrase } from '@/types'

interface PhraseCardProps {
  phrase: Phrase
  isActive: boolean
}

export const PhraseCard: React.FC<PhraseCardProps> = ({ phrase, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.3 }}
      className="relative bg-dark-surface rounded-3xl overflow-hidden shadow-lg"
      style={{
        aspectRatio: '16 / 10',
      }}
    >
      {/* Imagen */}
      <img
        src={phrase.image.url}
        alt={phrase.image.alt}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/343x215?text=Sin+imagen'
        }}
      />

      {/* Gradiente oscuro en la parte inferior */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      {/* Contenido */}
      <div className="absolute inset-0 flex flex-col justify-between p-4">
        {/* Categoría */}
        <div className="flex justify-start">
          <Badge text={phrase.category} />
        </div>

        {/* Texto y indicador */}
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-white leading-tight drop-shadow-lg">
            {phrase.text}
          </h2>
          <p className="text-sm text-gray-300 opacity-80">
            Desliza hacia arriba para la siguiente frase
          </p>
          <div className="flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-gray-300"
            >
              ↑
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
