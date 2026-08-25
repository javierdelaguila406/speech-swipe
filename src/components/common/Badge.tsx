import React from 'react'

interface BadgeProps {
  text: string
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({ text, className = '' }) => {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider rounded text-accent-listen bg-purple-900 bg-opacity-50 ${className}`}>
      {text}
    </span>
  )
}
