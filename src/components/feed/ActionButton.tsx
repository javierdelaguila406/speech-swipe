import React from 'react'
import { motion } from 'framer-motion'

interface ActionButtonProps {
  icon: React.ReactNode
  label: string
  color: string
  isActive?: boolean
  disabled?: boolean
  onClick: () => void
  ariaLabel?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  icon,
  label,
  color,
  isActive = false,
  disabled = false,
  onClick,
  ariaLabel
}) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        whileHover={{ scale: disabled ? 1 : 1.05 }}
        whileTap={{ scale: disabled ? 1 : 0.95 }}
        animate={isActive ? { scale: [1, 1.1, 1] } : {}}
        transition={isActive ? { duration: 0.6, repeat: Infinity } : {}}
        onClick={onClick}
        disabled={disabled}
        className="w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          backgroundColor: color,
          opacity: disabled ? 0.5 : 1
        }}
        aria-label={ariaLabel || label}
        title={ariaLabel || label}
      >
        <div className="text-3xl flex items-center justify-center">
          {icon}
        </div>
      </motion.button>
      <span className="text-xs font-semibold text-gray-300 text-center w-16">
        {label}
      </span>
    </div>
  )
}
