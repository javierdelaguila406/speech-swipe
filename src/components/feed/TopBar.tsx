import React from 'react'
import { motion } from 'framer-motion'

interface TopBarProps {
  current: number
  total: number
  isFavorite: boolean
  onFavoriteToggle: () => void
}

export const TopBar: React.FC<TopBarProps> = ({
  current,
  total,
  isFavorite,
  onFavoriteToggle
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-white border-opacity-5">
      <span className="text-sm text-gray-400">
        {current + 1} / {total}
      </span>
      <motion.button
        onClick={onFavoriteToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="text-2xl transition-colors"
        aria-label={isFavorite ? 'Quitar de favoritas' : 'Agregar a favoritas'}
      >
        {isFavorite ? '★' : '☆'}
      </motion.button>
    </div>
  )
}
