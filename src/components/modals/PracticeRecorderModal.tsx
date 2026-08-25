import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/common/Button'
import { useRecording } from '@/hooks/useRecording'
import { useSpeechRecognition } from '@/hooks/useSpeechRecognition'
import { usePhraseStore } from '@/store/phraseStore'

interface Phrase {
  id: string
  text: string
}

interface PracticeRecorderModalProps {
  phrase: Phrase
  onClose: () => void
}

export const PracticeRecorderModal: React.FC<PracticeRecorderModalProps> = ({ phrase, onClose }) => {
  const { isRecording, recordingTime, startRecording, stopRecording } = useRecording()
  const { isListening, transcript, finalTranscript, startListening, stopListening } = useSpeechRecognition()
  const { updatePracticeStats } = usePhraseStore()
  const [score, setScore] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleStart = async () => {
    try {
      await startRecording()
      await startListening()
    } catch (err) {
      console.error('Error:', err)
    }
  }

  const handleStop = () => {
    stopRecording()
    stopListening()

    if (finalTranscript) {
      const similarity = calculateSimilarity(finalTranscript, phrase.text)
      setScore(similarity)
      setShowResult(true)
      updatePracticeStats(phrase.id, similarity)
    }
  }

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
        if (i === 0) costs[j] = j
        else if (j > 0) {
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-lg max-w-md w-full p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-gray-900">🎤 Practica</h2>

        {!showResult ? (
          <>
            <div className="bg-purple-100 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Debes decir:</p>
              <p className="text-xl font-bold text-purple-600">{phrase.text}</p>
            </div>

            {transcript && (
              <div className="bg-blue-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Escuchando:</p>
                <p className="text-lg text-blue-600">{transcript}</p>
              </div>
            )}

            <div className="text-center">
              <p className="text-gray-600 mb-4">
                {isRecording ? `Grabando... ${recordingTime}s` : 'Listo para grabar'}
              </p>
              <Button
                onClick={isRecording ? handleStop : handleStart}
                className={`w-full ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-purple-600'}`}
              >
                {isRecording ? '⏹ Detener' : '🎤 Comenzar'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold text-purple-600">{score}%</div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <p className="text-gray-600 text-sm mb-1">Dijiste:</p>
                <p className="text-lg font-semibold text-gray-900">{finalTranscript}</p>
              </div>

              {score! >= 80 && <p className="text-2xl">✨ ¡Excelente!</p>}
              {score! >= 60 && score! < 80 && <p className="text-2xl">👍 ¡Muy bien!</p>}
              {score! >= 40 && score! < 60 && <p className="text-2xl">📚 Sigue practicando</p>}
              {score! < 40 && <p className="text-2xl">🔄 Intenta de nuevo</p>}
            </div>

            <Button onClick={onClose} className="w-full">
              Cerrar
            </Button>
          </>
        )}
      </motion.div>
    </div>
  )
}
