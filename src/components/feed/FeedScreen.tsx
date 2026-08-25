import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { usePhraseStore } from '@/store/phraseStore'
import { useSwipe } from '@/hooks/useSwipe'
import { useAuth } from '@/hooks/useAuth'
import { PhraseCard } from './PhraseCard'
import { ActionBar } from './ActionBar'
import { PracticeRecorderModal } from '@/components/modals/PracticeRecorderModal'
import { Button } from '@/components/common/Button'

interface FeedScreenProps {
  onCaregiverMode?: () => void
}

export const FeedScreen: React.FC<FeedScreenProps> = ({ onCaregiverMode }) => {
  const { user, logout } = useAuth()
  const containerRef = useRef<HTMLDivElement>(null)
  const [showPracticeModal, setShowPracticeModal] = useState(false)

  const {
    getCurrentPhrase,
    nextPhrase,
    previousPhrase,
    toggleFavorite,
    getStats
  } = usePhraseStore()

  const currentPhrase = getCurrentPhrase()
  const stats = getStats()

  useSwipe(containerRef, {
    onSwipeLeft: nextPhrase,
    onSwipeRight: previousPhrase
  })

  if (!currentPhrase) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col" ref={containerRef}>
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">🎤 Speech Swipe</h1>
          <p className="text-sm text-purple-200">{user?.fullName}</p>
        </div>
        <div className="flex gap-2">
          {user?.role === 'caregiver' && (
            <Button onClick={onCaregiverMode} size="sm" variant="secondary">
              👨‍⚕️ Cuidador
            </Button>
          )}
          <Button onClick={logout} size="sm" variant="secondary">
            Salir
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gray-800 text-white p-3 flex justify-around text-sm">
        <div className="text-center">
          <p className="text-gray-400">Frases</p>
          <p className="text-xl font-bold">{stats.totalPhrases}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Intentos</p>
          <p className="text-xl font-bold">{stats.totalPractices}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-400">Promedio</p>
          <p className="text-xl font-bold">{stats.averageScore}%</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          key={currentPhrase.id}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md"
        >
          <PhraseCard
            phrase={currentPhrase}
            onFavoriteToggle={() => toggleFavorite(currentPhrase.id)}
          />
        </motion.div>
      </div>

      {/* Action Bar */}
      <ActionBar
        phrase={currentPhrase}
        onPractice={() => setShowPracticeModal(true)}
        onNext={nextPhrase}
        onPrev={previousPhrase}
      />

      {/* Modals */}
      {showPracticeModal && (
        <PracticeRecorderModal
          phrase={currentPhrase}
          onClose={() => setShowPracticeModal(false)}
        />
      )}
    </div>
  )
}
