import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/Button'
import { Phrase } from '@/types'
import { useRecording } from '@/hooks/useRecording'

interface PracticeRecorderModalProps {
  isOpen: boolean
  onClose: () => void
  phrase: Phrase
}

export const PracticeRecorderModal: React.FC<PracticeRecorderModalProps> = ({
  isOpen,
  onClose,
  phrase
}) => {
  const { isRecording, recordingTime, audioUrl, startRecording, stopRecording, clearRecording } = useRecording()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlayingRecording, setIsPlayingRecording] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartRecording = async () => {
    try {
      setError(null)
      await startRecording()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al acceder al micrófono')
    }
  }

  const handleStopRecording = () => {
    stopRecording()
  }

  const handlePlayRecording = async () => {
    if (audioRef.current) {
      if (isPlayingRecording) {
        audioRef.current.pause()
        setIsPlayingRecording(false)
      } else {
        await audioRef.current.play()
        setIsPlayingRecording(true)
      }
    }
  }

  const handleRetry = () => {
    clearRecording()
    handleStartRecording()
  }

  const handleClose = () => {
    if (isRecording) {
      stopRecording()
    }
    if (audioUrl) {
      clearRecording()
    }
    onClose()
  }

  useEffect(() => {
    return () => {
      if (isRecording) {
        stopRecording()
      }
    }
  }, [])

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Practicar">
      <div className="space-y-6">
        {/* Subtitle */}
        <div className="text-center">
          <p className="text-gray-400 mb-3">Ahora dilo tú</p>
          <h3 className="text-2xl font-bold text-white">{phrase.text}</h3>
        </div>

        {/* Record Button */}
        {!audioUrl && (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={isRecording ? { scale: [1, 1.1, 1] } : {}}
                transition={isRecording ? { duration: 0.6, repeat: Infinity } : {}}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
                disabled={!!error}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl transition-all duration-200 ${
                  isRecording
                    ? 'bg-accent-practice'
                    : 'bg-accent-practice hover:bg-opacity-90'
                }`}
              >
                🎤
              </motion.button>
              {isRecording && (
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-accent-practice"
                  animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </div>

            {isRecording && (
              <div className="text-center">
                <p className="text-gray-300 font-semibold">{formatTime(recordingTime)}</p>
                <p className="text-sm text-accent-practice">Grabando...</p>
              </div>
            )}

            {error && (
              <div className="text-center">
                <p className="text-sm text-red-400">{error}</p>
                <Button
                  size="md"
                  onClick={handleStartRecording}
                  className="mt-2"
                >
                  Reintentar
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Playback */}
        {audioUrl && (
          <div className="space-y-4">
            <audio ref={audioRef} src={audioUrl} />
            <div className="flex gap-3">
              <Button
                size="md"
                variant="secondary"
                onClick={handlePlayRecording}
                className="flex-1"
              >
                {isPlayingRecording ? '⏸ Pausar' : '▶ Escuchar'}
              </Button>
              <Button
                size="md"
                variant="secondary"
                onClick={handleRetry}
                className="flex-1"
              >
                🔄 Reintentar
              </Button>
            </div>
          </div>
        )}

        {/* Close */}
        <Button
          size="lg"
          variant="secondary"
          onClick={handleClose}
          className="w-full"
        >
          Cerrar
        </Button>
      </div>
    </Modal>
  )
}
