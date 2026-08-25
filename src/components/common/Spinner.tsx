import React from 'react'
import { motion } from 'framer-motion'

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = '#7c3aed'
}) => {
  const sizeMap = {
    sm: '20px',
    md: '40px',
    lg: '60px'
  }

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
        borderRadius: '50%',
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: `${color}33`,
        borderTopColor: color
      }}
    />
  )
}
