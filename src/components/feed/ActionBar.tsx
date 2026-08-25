import React from 'react'
import { ActionButton } from './ActionButton'
import { COLORS } from '@/config/theme'

interface ActionBarProps {
  onListenClick: () => void
  onSlowClick: () => void
  onLipsClick: () => void
  onPracticeClick: () => void
  isPlaying: boolean
  isRecording: boolean
  hasAudio: boolean
  hasSlowAudio: boolean
  hasVideo: boolean
}

export const ActionBar: React.FC<ActionBarProps> = ({
  onListenClick,
  onSlowClick,
  onLipsClick,
  onPracticeClick,
  isPlaying,
  isRecording,
  hasAudio,
  hasSlowAudio,
  hasVideo
}) => {
  return (
    <div className="flex items-center justify-center gap-8 px-4 py-6">
      <ActionButton
        icon="🔊"
        label="Escuchar"
        color={COLORS.action.listen}
        isActive={isPlaying}
        disabled={!hasAudio}
        onClick={onListenClick}
        ariaLabel="Escuchar frase a velocidad normal"
      />
      <ActionButton
        icon="🐢"
        label="Lento"
        color={COLORS.action.slow}
        disabled={!hasSlowAudio}
        onClick={onSlowClick}
        ariaLabel="Escuchar frase lentamente"
      />
      <ActionButton
        icon="👄"
        label="Labios"
        color={COLORS.action.lips}
        disabled={!hasVideo}
        onClick={onLipsClick}
        ariaLabel="Ver labios pronunciando la frase"
      />
      <ActionButton
        icon="🎤"
        label="Practicar"
        color={COLORS.action.practice}
        isActive={isRecording}
        onClick={onPracticeClick}
        ariaLabel="Grabar tu intento de pronunciación"
      />
    </div>
  )
}
