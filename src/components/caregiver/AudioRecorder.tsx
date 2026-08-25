import React from 'react'
import { motion } from 'framer-motion'
import { useRecording } from '@/hooks/useRecording'
import { Button } from '@/components/common/Button'
import { WaveformVisualizer } from '@/components/common/WaveformVisualizer'
import { COLORS } from '@/config/theme'

interface AudioRecorderProps {
  title: string
  description: string
  onRecordingDone: (audioUrl: string) => void
  onClose: () => void
  currentAudioUrl?: string
}

export const AudioRecorder: React.FC<AudioRecorderProps> = ({
  title,
  description,
  onRecordingDone,
  onClose,
  currentAudioUrl
}) => {
  const { isRecording, recordingTime, audioUrl, error, startRecording, stopRecording, clearRecording } = useRecording()

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = async () => {
    try {
      await startRecording()
    } catch (err) {
      console.error('Recording error:', err)
    }
  }

  const handleStop = () => {
    stopRecording()
  }

  const handleSave = () => {
    if (audioUrl) {
      onRecordingDone(audioUrl)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6 space-y-6">
        <div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{description}</p>
        </div>

        {/* Recording Section */}
        <div className="space-y-4">
          {error && (
            <div className="bg-red-900 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg p-3">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {!audioUrl && !currentAudioUrl && (
            <>
              <WaveformVisualizer
                isAnimating={isRecording}
                color={COLORS.action.practice}
              />

              {isRecording && (
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">{formatTime(recordingTime)}</p>
                  <p className="text-sm text-gray-400 mt-1">Grabando...</p>
                </div>
              )}

              <div className="flex gap-3">
                {!isRecording ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStart}
                    disabled={!!error}
                    className="flex-1 h-20 rounded-full bg-accent-practice hover:bg-opacity-90 flex items-center justify-center text-4xl transition-all duration-200 disabled:opacity-50"
                  >
                    🎤
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleStop}
                    className="flex-1 h-20 rounded-full bg-red-600 hover:bg-opacity-90 flex items-center justify-center text-4xl transition-all duration-200"
                  >
                    ⏹
                  </motion.button>
                )}
              </div>
            </>
          )}

          {(audioUrl || currentAudioUrl) && (
            <div className="space-y-3">
              <p className="text-sm text-green-400 text-center">✓ Audio grabado</p>
              <div className="flex gap-2">
                <Button
                  size="md"
                  variant="secondary"
                  onClick={clearRecording}
                  className="flex-1"
                >
                  🔄 Reintentar
                </Button>
                <Button
                  size="md"
                  onClick={handleSave}
                  className="flex-1"
                >
                  ✓ Usar este audio
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Close Button */}
        <Button
          size="lg"
          variant="secondary"
          onClick={onClose}
          className="w-full"
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
