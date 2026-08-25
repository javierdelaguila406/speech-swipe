import React, { useEffect } from 'react'
import { FeedScreen } from '@/components/feed/FeedScreen'
import { ToastContainer } from '@/components/common/Toast'
import { ErrorBoundary } from '@/components/common/ErrorBoundary'
import { useAppStore } from '@/store/appStore'

function AppContent() {
  const { loadPhrases, loadFavorites } = useAppStore()

  useEffect(() => {
    loadPhrases()
    loadFavorites()
  }, [loadPhrases, loadFavorites])

  return (
    <>
      <FeedScreen />
      <ToastContainer />
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AppContent />
    </ErrorBoundary>
  )
}

export default App
