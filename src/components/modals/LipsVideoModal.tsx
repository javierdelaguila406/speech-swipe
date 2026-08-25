import React, { useRef, useState } from 'react'
import { Modal } from '@/components/common/Modal'
import { Button } from '@/components/common/Button'
import { Phrase } from '@/types'

interface LipsVideoModalProps {
  isOpen: boolean
  onClose: () => void
  phrase: Phrase
}

export const LipsVideoModal: React.FC<LipsVideoModalProps> = ({
  isOpen,
  onClose,
  phrase
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  if (!phrase.lipVideo) return null

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      setIsPlaying(false)
    }
  }

  const handleRepeat = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSlow = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const formatTime = (seconds: number) => {
    if (!seconds) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Ver Labios">
      <div className="space-y-4">
        {/* Frase */}
        <div className="text-center py-2">
          <h3 className="text-2xl font-bold text-white">{phrase.text}</h3>
        </div>

        {/* Video */}
        <div className="relative w-full bg-black rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            src={phrase.lipVideo.url}
            className="w-full aspect-video object-cover"
            onTimeUpdate={() => {
              if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime)
              }
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration)
              }
            }}
            onEnded={() => setIsPlaying(false)}
          />
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex gap-2 text-xs text-gray-400">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 bg-dark-tertiary rounded-full h-1 relative">
              <div
                className="bg-accent-listen h-full rounded-full"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center">
          <Button
            size="md"
            variant="secondary"
            onClick={handleRepeat}
          >
            ⟳ Repetir
          </Button>
          <Button
            size="md"
            onClick={isPlaying ? handlePause : handlePlay}
          >
            {isPlaying ? '⏸ Pausa' : '▶ Play'}
          </Button>
          <Button
            size="md"
            variant="secondary"
            onClick={handleSlow}
          >
            🐢 Lento
          </Button>
        </div>

        {/* Close Button */}
        <Button
          size="lg"
          variant="secondary"
          onClick={onClose}
          className="w-full"
        >
          Volver
        </Button>
      </div>
    </Modal>
  )
}
