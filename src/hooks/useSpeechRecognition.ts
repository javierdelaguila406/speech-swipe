import { useRef, useState, useCallback, useEffect } from 'react'

interface SpeechRecognitionOptions {
  language?: string
  continuous?: boolean
  interimResults?: boolean
}

export const useSpeechRecognition = (options: SpeechRecognitionOptions = {}) => {
  const {
    language = 'es-ES',
    continuous = false,
    interimResults = true
  } = options

  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setError('Reconocimiento de voz no soportado en este navegador')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = language
    recognition.continuous = continuous
    recognition.interimResults = interimResults

    recognition.onstart = () => {
      setIsListening(true)
      setError(null)
      setTranscript('')
      setInterimTranscript('')
    }

    recognition.onresult = (event) => {
      let interim = ''
      let finalTranscript = ''
      let maxConfidence = 0

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        const confidence = event.results[i][0].confidence

        if (confidence > maxConfidence) {
          maxConfidence = confidence
        }

        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        } else {
          interim += transcript
        }
      }

      setInterimTranscript(interim)
      if (finalTranscript) {
        setTranscript((prev) => prev + finalTranscript)
        setConfidence(maxConfidence)
      }
    }

    recognition.onerror = (event) => {
      const errorMessages: { [key: string]: string } = {
        'no-speech': 'No se detectó voz. Intenta nuevamente.',
        'audio-capture': 'No se encontró micrófono.',
        'network': 'Error de conexión.',
        'permission-denied': 'Permiso de micrófono denegado.',
        'not-allowed': 'Permiso denegado. Habilita el micrófono.'
      }

      const errorMsg = errorMessages[event.error] || `Error: ${event.error}`
      setError(errorMsg)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognitionRef.current = recognition
  }, [language, continuous, interimResults])

  const startListening = useCallback(() => {
    if (recognitionRef.current) {
      setTranscript('')
      setInterimTranscript('')
      recognitionRef.current.start()
    }
  }, [])

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [])

  const abortListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.abort()
    }
  }, [])

  const resetTranscript = useCallback(() => {
    setTranscript('')
    setInterimTranscript('')
    setError(null)
    setConfidence(0)
  }, [])

  return {
    isListening,
    transcript: (transcript + interimTranscript).trim(),
    finalTranscript: transcript.trim(),
    interimTranscript,
    error,
    confidence,
    startListening,
    stopListening,
    abortListening,
    resetTranscript,
    isBrowserSupported: !!recognitionRef.current
  }
}
