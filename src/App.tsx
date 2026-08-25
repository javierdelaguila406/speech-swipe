import React, { useEffect, useState } from 'react'
import { FeedScreen } from '@/components/feed/FeedScreen'
import { ToastContainer } from '@/components/common/Toast'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { LoginScreen } from '@/components/auth/LoginScreen'
import { CaregiverMode } from '@/components/caregiver/CaregiverMode'
import { useAuth } from '@/hooks/useAuth'
import { usePhraseStore } from '@/store/phraseStore'

function AppContent() {
  const { user } = useAuth()
  const { initializePhrases } = usePhraseStore()
  const [isCaregiverMode, setIsCaregiverMode] = useState(false)

  useEffect(() => {
    initializePhrases()
  }, [initializePhrases])

  if (!user) {
    return <LoginScreen onLoginSuccess={() => {}} />
  }

  // Crear cuentas de prueba si no existen
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]')
    if (users.length === 0) {
      localStorage.setItem('speech_swipe_users', JSON.stringify([
        { id: '1', email: 'user@test.com', password: 'password', fullName: 'Usuario Demo', role: 'user' },
        { id: '2', email: 'caregiver@test.com', password: 'password', fullName: 'Cuidador Demo', role: 'caregiver' }
      ]))
    }
  }, [])

  return (
    <>
      {isCaregiverMode && user.role === 'caregiver' ? (
        <CaregiverMode onBack={() => setIsCaregiverMode(false)} />
      ) : (
        <FeedScreen onCaregiverMode={() => setIsCaregiverMode(true)} />
      )}
      <ToastContainer />
    </>
  )
}

function App() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white">Cargando...</div>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}

export default App
