import React from 'react'
import { motion } from 'framer-motion'

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 p-4">
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="bg-dark-tertiary rounded-lg h-20"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

export const PhraseCardSkeleton: React.FC = () => {
  return (
    <motion.div
      className="bg-dark-surface rounded-3xl aspect-video overflow-hidden"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
    />
  )
}
