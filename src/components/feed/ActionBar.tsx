import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'

interface Phrase {
  text: string
}

interface ActionBarProps {
  phrase: Phrase
  onPractice: () => void
  onNext: () => void
  onPrev: () => void
}

export const ActionBar: React.FC<ActionBarProps> = ({ onPractice, onNext, onPrev }) => {
  const actions = [
    { icon: '🔙', label: 'Anterior', onClick: onPrev },
    { icon: '🎤', label: 'Practicar', onClick: onPractice },
    { icon: '▶️', label: 'Siguiente', onClick: onNext }
  ]

  return (
    <div className="bg-gray-800 border-t border-gray-700 p-6 flex justify-around">
      {actions.map((action, idx) => (
        <motion.button
          key={idx}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={action.onClick}
          className="flex flex-col items-center gap-2 text-white hover:text-purple-400 transition"
        >
          <div className="text-4xl">{action.icon}</div>
          <p className="text-xs text-gray-300">{action.label}</p>
        </motion.button>
      ))}
    </div>
  )
}
