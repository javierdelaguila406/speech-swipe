import React, { useState } from 'react'
import { Phrase } from '@/types'
import { CaregiverMenu } from './CaregiverMenu'
import { PhraseManager } from './PhraseManager'
import { PhraseEditor } from './PhraseEditor'
import { FavoritesView } from './FavoritesView'
import { ProgressView } from './ProgressView'

type CaregiverScreen = 'menu' | 'manager' | 'editor' | 'favorites' | 'progress' | 'closed'

interface CaregiverModeProps {
  isOpen: boolean
  onClose: () => void
}

export const CaregiverMode: React.FC<CaregiverModeProps> = ({ isOpen, onClose }) => {
  const [screen, setScreen] = useState<CaregiverScreen>('menu')
  const [selectedPhrase, setSelectedPhrase] = useState<Phrase | null>(null)

  const handleOpenMenu = () => setScreen('menu')
  const handleOpenManager = () => setScreen('manager')
  const handleOpenEditor = (phrase: Phrase | null) => {
    setSelectedPhrase(phrase)
    setScreen('editor')
  }
  const handleOpenFavorites = () => setScreen('favorites')
  const handleOpenProgress = () => setScreen('progress')
  const handleSavePhrase = (phrase: Phrase) => {
    console.log('Save phrase:', phrase)
    // Aquí guardaremos la frase en el store
    setScreen('manager')
  }
  const handleClose = () => {
    setScreen('menu')
    onClose()
  }
  const handleBackToMenu = () => setScreen('menu')

  if (!isOpen) return null

  return (
    <>
      {screen === 'menu' && (
        <CaregiverMenu
          isOpen={isOpen}
          onClose={handleClose}
          onManagePhrases={handleOpenManager}
          onManageCategories={() => console.log('Categories')}
          onViewFavorites={handleOpenFavorites}
          onViewProgress={handleOpenProgress}
          onSettings={() => console.log('Settings')}
        />
      )}

      {screen === 'manager' && (
        <PhraseManager
          onBack={handleOpenMenu}
          onEditPhrase={handleOpenEditor}
        />
      )}

      {screen === 'editor' && (
        <PhraseEditor
          phrase={selectedPhrase}
          onSave={handleSavePhrase}
          onCancel={() => {
            setSelectedPhrase(null)
            setScreen('manager')
          }}
        />
      )}

      {screen === 'favorites' && (
        <FavoritesView onBack={handleBackToMenu} />
      )}

      {screen === 'progress' && (
        <ProgressView onBack={handleBackToMenu} />
      )}
    </>
  )
}
