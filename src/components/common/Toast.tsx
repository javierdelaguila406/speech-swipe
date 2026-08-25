import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useToastStore, ToastType } from '@/store/toastStore'

const getToastStyles = (type: ToastType) => {
  const styles = {
    success: {
      bg: 'bg-green-900 bg-opacity-80',
      border: 'border-green-500 border-opacity-50',
      text: 'text-green-300',
      icon: '✓'
    },
    error: {
      bg: 'bg-red-900 bg-opacity-80',
      border: 'border-red-500 border-opacity-50',
      text: 'text-red-300',
      icon: '✕'
    },
    info: {
      bg: 'bg-blue-900 bg-opacity-80',
      border: 'border-blue-500 border-opacity-50',
      text: 'text-blue-300',
      icon: 'ℹ'
    },
    warning: {
      bg: 'bg-yellow-900 bg-opacity-80',
      border: 'border-yellow-500 border-opacity-50',
      text: 'text-yellow-300',
      icon: '⚠'
    }
  }
  return styles[type]
}

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToastStore()

  return (
    <div className="fixed top-4 left-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => {
          const styles = getToastStyles(toast.type)
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, x: 0 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: 0 }}
              transition={{ duration: 0.3 }}
              className={`${styles.bg} ${styles.border} border rounded-lg p-3 backdrop-blur-sm pointer-events-auto`}
            >
              <div className="flex items-start gap-3">
                <span className={`${styles.text} font-bold text-lg flex-shrink-0`}>
                  {styles.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className={`${styles.text} text-sm break-words`}>
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className={`${styles.text} hover:opacity-80 transition-opacity flex-shrink-0 ml-2`}
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
