import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-listen transition-colors ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextArea: React.FC<TextAreaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-semibold text-white">
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-dark-tertiary border border-white border-opacity-10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-listen transition-colors ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-red-400">{error}</p>
      )}
    </div>
  )
}
