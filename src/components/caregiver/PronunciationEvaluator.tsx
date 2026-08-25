import React from 'react'
import { motion } from 'framer-motion'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { Button } from '@/components/common/Button'
import { COLORS } from '@/config/theme'

interface PronunciationEvaluatorProps {
  expectedText: string
  onClose: () => void
}

export const PronunciationEvaluator: React.FC<PronunciationEvaluatorProps> = ({
  expectedText,
  onClose
}) => {
  const {
    isListening,
    transcript,
    finalTranscript,
    error,
    confidence,
    startListening,
    stopListening,
    resetTranscript,
    isBrowserSupported
  } = useSpeechRecognition({
    language: 'es-ES',
    continuous: false,
    interimResults: true
  })

  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().trim()
    const s2 = str2.toLowerCase().trim()

    if (s1 === s2) return 100

    const longer = s1.length > s2.length ? s1 : s2
    const shorter = s1.length > s2.length ? s2 : s1

    if (longer.length === 0) return 100

    const editDistance = getEditDistance(shorter, longer)
    return Math.round(((longer.length - editDistance) / longer.length) * 100)
  }

  const getEditDistance = (s1: string, s2: string): number => {
    const costs: number[] = []
    for (let i = 0; i <= s1.length; i++) {
      let lastValue = i
      for (let j = 0; j <= s2.length; j++) {
        if (i === 0) {
          costs[j] = j
        } else if (j > 0) {
          let newValue = costs[j - 1]
          if (s1.charAt(i - 1) !== s2.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1
          }
          costs[j - 1] = lastValue
          lastValue = newValue
        }
      }
      if (i > 0) costs[s2.length] = lastValue
    }
    return costs[s2.length]
  }

  const similarity = finalTranscript ? calculateSimilarity(finalTranscript, expectedText) : 0
  const statusMessage = () => {
    if (error) return error
    if (isListening) return 'Escuchando...'
    if (!finalTranscript) return 'Presiona el botón para comenzar'
    if (similarity >= 80) return '✓ ¡Excelente pronunciación!'
    if (similarity >= 60) return '◐ Muy bien, casi perfecto'
    if (similarity >= 40) return '◑ Buen intento, sigue practicando'
    return '◎ Intenta de nuevo'
  }

  const getStatusColor = () => {
    if (similarity >= 80) return '#14b8a6' // Turquesa
    if (similarity >= 60) return '#fbbf24' // Amarillo
    if (similarity >= 40) return '#f97316' // Naranja
    return '#ef4444' // Rojo
  }

  if (!isBrowserSupported) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
        <div className="bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6">
          <h3 className="text-lg font-bold text-white mb-3">⚠️ No Soportado</h3>
          <p className="text-sm text-gray-400 mb-4">
            El reconocimiento de voz no está soportado en tu navegador. Usa Chrome, Edge o Safari.
          </p>
          <Button size="lg" onClick={onClose} className="w-full">
            Cerrar
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6 space-y-4">
        <h3 className="text-lg font-bold text-white">Evaluar Pronunciación</h3>

        {/* Expected */}
        <div className="bg-dark-tertiary rounded-lg p-4">
          <p className="text-xs text-gray-400 mb-1">Esperado:</p>
          <p className="text-lg font-bold text-white">{expectedText}</p>
        </div>

        {/* Recorded */}
        {finalTranscript && (
          <div className="bg-dark-tertiary rounded-lg p-4">
            <p className="text-xs text-gray-400 mb-1">Escuchado:</p>
            <p className="text-lg font-bold text-accent-listen">{finalTranscript}</p>
          </div>
        )}

        {/* Live Transcript */}
        {transcript && !finalTranscript && (
          <div className="bg-dark-tertiary rounded-lg p-4 opacity-75">
            <p className="text-xs text-gray-400 mb-1">En vivo:</p>
            <p className="text-sm text-gray-300">{transcript}</p>
          </div>
        )}

        {/* Status */}
        <motion.div
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: `${getStatusColor()}20`,
            borderColor: getStatusColor(),
            borderWidth: 2
          }}
        >
          <p style={{ color: getStatusColor() }} className="font-semibold">
            {statusMessage()}
          </p>
          {similarity > 0 && (
            <p className="text-sm text-gray-400 mt-1">
              Similitud: {similarity}% | Confianza: {Math.round(confidence * 100)}%
            </p>
          )}
        </motion.div>

        {/* Progress Bar */}
        {finalTranscript && (
          <div className="space-y-1">
            <div className="w-full bg-dark-tertiary rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${similarity}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ backgroundColor: getStatusColor(), height: '100%' }}
              />
            </div>
            <p className="text-xs text-gray-400 text-right">{similarity}%</p>
          </div>
        )}

        {/* Controls */}
        <div className="space-y-2">
          {!finalTranscript ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={isListening ? stopListening : startListening}
              className={`w-full h-14 rounded-lg font-semibold text-white transition-all ${
                isListening
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-accent-practice hover:bg-opacity-90'
              }`}
            >
              {isListening ? '⏹ Detener' : '🎤 Comenzar'}
            </motion.button>
          ) : (
            <Button
              size="lg"
              variant="secondary"
              onClick={() => {
                resetTranscript()
              }}
              className="w-full"
            >
              🔄 Intentar de nuevo
            </Button>
          )}
          <Button
            size="lg"
            variant="secondary"
            onClick={onClose}
            className="w-full"
          >
            Cerrar
          </Button>
        </div>
      </div>
    </div>
  )
}
