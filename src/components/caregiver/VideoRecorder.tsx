import React, { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/common/Button'
import { COLORS } from '@/config/theme'

interface VideoRecorderProps {
  title: string
  onRecordingDone: (videoUrl: string) => void
  onClose: () => void
}

export const VideoRecorder: React.FC<VideoRecorderProps> = ({
  title,
  onRecordingDone,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<BlobPart[]>([])

  const [isRecording, setIsRecording] = useState(false)
  const [isPermissionGranted, setIsPermissionGranted] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' },
          audio: true
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        streamRef.current = stream
        setIsPermissionGranted(true)
      } catch (err) {
        setError('No se pudo acceder a la cámara')
        console.error('Camera error:', err)
      }
    }

    initCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [])

  const handleStartRecording = () => {
    if (!streamRef.current) return

    chunksRef.current = []
    const mediaRecorder = new MediaRecorder(streamRef.current)
    mediaRecorderRef.current = mediaRecorder

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        chunksRef.current.push(event.data)
      }
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      setVideoUrl(url)
    }

    mediaRecorder.start()
    setIsRecording(true)
    setRecordingTime(0)

    let seconds = 0
    timerRef.current = setInterval(() => {
      seconds += 1
      setRecordingTime(seconds)
      if (seconds >= 30) {
        // Máximo 30 segundos
        mediaRecorder.stop()
        setIsRecording(false)
        if (timerRef.current) clearInterval(timerRef.current)
      }
    }, 1000)
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }

  const handleRetry = () => {
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl)
    }
    setVideoUrl(null)
    setRecordingTime(0)
  }

  const handleSave = () => {
    if (videoUrl) {
      onRecordingDone(videoUrl)
      onClose()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-dark-surface rounded-2xl w-full max-w-sm mx-4 p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>

        {error ? (
          <div className="bg-red-900 bg-opacity-20 border border-red-500 border-opacity-50 rounded-lg p-4">
            <p className="text-sm text-red-300">{error}</p>
            <Button
              size="md"
              onClick={onClose}
              className="mt-4 w-full"
            >
              Cerrar
            </Button>
          </div>
        ) : !isPermissionGranted ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Cargando cámara...</p>
          </div>
        ) : (
          <>
            {/* Video Preview */}
            {!videoUrl && (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full rounded-lg bg-black"
              />
            )}

            {videoUrl && (
              <video
                src={videoUrl}
                className="w-full rounded-lg bg-black"
                controls
              />
            )}

            {/* Recording Info */}
            {isRecording && (
              <div className="text-center">
                <p className="text-2xl font-bold text-accent-practice">
                  {formatTime(recordingTime)}
                </p>
                <p className="text-sm text-gray-400 mt-1">Grabando... (máx 30s)</p>
              </div>
            )}

            {/* Controls */}
            <div className="space-y-3">
              {!videoUrl && (
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-full h-16 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isRecording
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-accent-practice hover:bg-opacity-90'
                  }`}
                >
                  {isRecording ? '⏹ Detener (Toca para parar)' : '🎥 Comenzar a grabar'}
                </button>
              )}

              {videoUrl && (
                <div className="flex gap-2">
                  <Button
                    size="md"
                    variant="secondary"
                    onClick={handleRetry}
                    className="flex-1"
                  >
                    🔄 Reintentar
                  </Button>
                  <Button
                    size="md"
                    onClick={handleSave}
                    className="flex-1"
                  >
                    ✓ Usar video
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

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
