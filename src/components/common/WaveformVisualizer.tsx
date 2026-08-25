import React from 'react'
import { motion } from 'framer-motion'

interface WaveformVisualizerProps {
  isAnimating: boolean
  color?: string
}

export const WaveformVisualizer: React.FC<WaveformVisualizerProps> = ({
  isAnimating,
  color = 'rgb(124, 58, 237)'
}) => {
  const bars = Array.from({ length: 6 })

  return (
    <div className="flex items-center justify-center gap-1 py-6">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t rounded-full"
          style={{
            backgroundColor: color,
            height: '20px'
          }}
          animate={isAnimating ? {
            height: [20, 40, 20],
            opacity: [0.5, 1, 0.5]
          } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            repeat: Infinity
          }}
        />
      ))}
    </div>
  )
}
