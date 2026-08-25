import React, { useEffect, useState, useRef } from 'react'
import { LoginScreen } from '@/components/auth/LoginScreen'
import { useAuth } from '@/hooks/useAuth'
import { usePhraseStore } from '@/store/phraseStore'

const PHRASE_IMAGES = [
  'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3807516/pexels-photo-3807516.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3771919/pexels-photo-3771919.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3807514/pexels-photo-3807514.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3807513/pexels-photo-3807513.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/3807512/pexels-photo-3807512.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/5632400/pexels-photo-5632400.jpeg?w=400&h=400&fit=crop',
  'https://images.pexels.com/photos/5632401/pexels-photo-5632401.jpeg?w=400&h=400&fit=crop'
]

function App() {
  const { user, loading } = useAuth()
  const { initializePhrases, getCurrentPhrase, nextPhrase, previousPhrase, toggleFavorite, updatePracticeStats, getStats } = usePhraseStore()
  const [showPractice, setShowPractice] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [isListening, setIsListening] = useState(false)
  const touchStartY = useRef(0)

  useEffect(() => {
    // Crear cuentas de prueba
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]')
    if (users.length === 0) {
      localStorage.setItem('speech_swipe_users', JSON.stringify([
        { id: '1', email: 'user@test.com', password: 'password', fullName: 'Usuario Demo', role: 'user' },
        { id: '2', email: 'caregiver@test.com', password: 'password', fullName: 'Cuidador Demo', role: 'caregiver' }
      ]))
    }
    initializePhrases()
  }, [initializePhrases])

  // Detectar swipe vertical
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY
    const diff = touchStartY.current - touchEndY

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Deslizar arriba = siguiente
        nextPhrase()
      } else {
        // Deslizar abajo = anterior
        previousPhrase()
      }
    }
  }

  if (loading) {
    return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#1f2937', color: 'white' }}>Cargando...</div>
  }

  if (!user) {
    return <LoginScreen onLoginSuccess={() => {}} />
  }

  const phrase = getCurrentPhrase()
  const stats = getStats()

  if (!phrase) {
    return <div>Error cargando frases</div>
  }

  const handlePractice = async () => {
    setShowPractice(true)
    setTranscript('')
    setScore(null)
    setIsListening(true)

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      if (!SpeechRecognition) {
        setTranscript('Tu navegador no soporta reconocimiento de voz')
        setIsListening(false)
        return
      }

      const recognition = new SpeechRecognition()
      recognition.language = 'es-ES'
      recognition.continuous = false
      recognition.interimResults = false

      let finalTranscript = ''

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          }
        }
      }

      recognition.onend = () => {
        if (finalTranscript.trim()) {
          const sim = calculateSimilarity(finalTranscript.trim(), phrase.text)
          setTranscript(finalTranscript.trim())
          setScore(sim)
          updatePracticeStats(phrase.id, sim)
        }
        setIsListening(false)
      }

      recognition.onerror = () => {
        setIsListening(false)
      }

      recognition.start()
    } catch (error) {
      console.error('Error:', error)
      setIsListening(false)
      setTranscript('Error al acceder al micrófono')
    }
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().trim()
    const s2 = str2.toLowerCase().trim()
    if (s1 === s2) return 100
    const longer = s1.length > s2.length ? s1 : s2
    const shorter = s1.length > s2.length ? s2 : s1
    if (longer.length === 0) return 100
    let cost = 0
    for (let i = 0; i < longer.length; i++) {
      if (shorter[i] !== longer[i]) cost++
    }
    return Math.round(((longer.length - cost) / longer.length) * 100)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #1f2937, #111827)', color: 'white' }}>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1 } 50% { opacity: 0.5 } }`}</style>
      {/* Header */}
      <div style={{ background: '#a855f7', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>🎤 Speech Swipe</h1>
          <p style={{ fontSize: '12px', color: '#e9d5ff' }}>{user.fullName}</p>
        </div>
        <button onClick={() => { localStorage.removeItem('speech_swipe_user'); window.location.reload() }} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
          Salir
        </button>
      </div>

      {/* Stats */}
      <div style={{ background: '#374151', padding: '12px', display: 'flex', justifyContent: 'space-around', fontSize: '14px' }}>
        <div style={{ textAlign: 'center' }}><p style={{ color: '#9ca3af' }}>Frases</p><p style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.totalPhrases}</p></div>
        <div style={{ textAlign: 'center' }}><p style={{ color: '#9ca3af' }}>Intentos</p><p style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.totalPractices}</p></div>
        <div style={{ textAlign: 'center' }}><p style={{ color: '#9ca3af' }}>Promedio</p><p style={{ fontSize: '20px', fontWeight: 'bold' }}>{stats.averageScore}%</p></div>
      </div>

      {/* Phrase Card */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {showPractice && (score !== null || isListening) ? (
          <div style={{ background: 'white', color: 'black', borderRadius: '12px', padding: '32px', maxWidth: '400px', textAlign: 'center', width: '100%' }}>
            {isListening ? (
              <>
                <div style={{ fontSize: '48px', marginBottom: '16px', animation: 'pulse 1s infinite' }}>🎤</div>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#a855f7' }}>Escuchando...</p>
                <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '8px' }}>Dile: {phrase.text}</p>
              </>
            ) : score !== null ? (
              <>
                <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#a855f7', marginBottom: '16px' }}>{score}%</div>
                <div style={{ background: '#f3f4f6', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                  <p style={{ fontSize: '12px', color: '#6b7280' }}>Dijiste:</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#111827' }}>{transcript}</p>
                </div>
                {score >= 80 && <p style={{ fontSize: '24px' }}>✨ ¡Excelente!</p>}
                {score >= 60 && score < 80 && <p style={{ fontSize: '24px' }}>👍 ¡Muy bien!</p>}
                {score >= 40 && score < 60 && <p style={{ fontSize: '24px' }}>📚 Sigue practicando</p>}
                {score < 40 && <p style={{ fontSize: '24px' }}>🔄 Intenta de nuevo</p>}
              </>
            ) : null}
            <button onClick={() => { setShowPractice(false); setScore(null); setTranscript('') }} style={{ width: '100%', background: '#a855f7', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer', marginTop: '16px' }}>
              Cerrar
            </button>
          </div>
        ) : (
          <div style={{ background: 'white', color: 'black', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', maxWidth: '400px', width: '100%' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '100%', background: '#e5e7eb', overflow: 'hidden' }}>
              <img src={PHRASE_IMAGES[parseInt(phrase.id) % PHRASE_IMAGES.length]} alt={phrase.text} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              <button onClick={() => toggleFavorite(phrase.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'white', border: 'none', borderRadius: '50%', width: '48px', height: '48px', fontSize: '24px', cursor: 'pointer' }}>
                {phrase.isFavorite ? '❤️' : '🤍'}
              </button>
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: '#a855f7', color: 'white', padding: '8px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                {phrase.category}
              </div>
            </div>
            <div style={{ padding: '24px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{phrase.text}</h2>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>👆 Desliza arriba/abajo para cambiar</p>
            </div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      <div style={{ background: '#374151', padding: '24px', display: 'flex', justifyContent: 'space-around', borderTop: '1px solid #4b5563' }}>
        <button onClick={previousPhrase} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '12px' }}>
          <div style={{ fontSize: '32px' }}>🔙</div>
          <p>Anterior</p>
        </button>
        <button onClick={handlePractice} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '12px' }}>
          <div style={{ fontSize: '32px' }}>🎤</div>
          <p>Practicar</p>
        </button>
        <button onClick={nextPhrase} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '12px' }}>
          <div style={{ fontSize: '32px' }}>▶️</div>
          <p>Siguiente</p>
        </button>
      </div>
    </div>
  )
}

export default App
