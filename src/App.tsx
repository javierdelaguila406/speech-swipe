import React, { useState, useEffect, useRef } from 'react'
import { LoginScreen } from '@/components/auth/LoginScreen'
import { MODULES, Module, ModulePhrase } from '@/config/modules'

const generateCaregiverPassword = () => Math.random().toString(36).slice(-8).toUpperCase()

const RealisticLipsModal: React.FC<{
  phrase: ModulePhrase
  onClose: () => void
  isSpeaking: boolean
}> = ({ phrase, onClose, isSpeaking }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    const ctx = canvasRef.current.getContext('2d')!
    ctx.fillStyle = '#FDB4D9'
    ctx.clearRect(0, 0, 200, 150)
    ctx.fillRect(10, 60, 180, 40)

    if (isSpeaking) {
      const animate = () => {
        const width = 30 + Math.sin(Date.now() / 100) * 20
        ctx.fillStyle = '#FDB4D9'
        ctx.clearRect(0, 0, 200, 150)
        ctx.fillRect(10, 60, 180, 40)
        ctx.fillStyle = '#EC4668'
        ctx.fillRect(50, 70, width, 15)
        ctx.fillRect(50, 90, width, 15)
        requestAnimationFrame(animate)
      }
      animate()
    } else {
      ctx.fillStyle = '#EC4668'
      ctx.fillRect(50, 70, 30, 15)
      ctx.fillRect(50, 90, 30, 15)
    }
  }, [isSpeaking])

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 40,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        textAlign: 'center',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>👄 Labios</h2>
        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '24px' }}>{phrase.text}</p>
        <canvas
          ref={canvasRef}
          style={{
            width: '200px',
            height: '150px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            margin: '0 auto 24px'
          }}
        />
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#10b981',
            color: 'white',
            fontWeight: '600',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Cerrar
        </button>
      </div>
    </div>
  )
}

interface User {
  id: string
  email: string
  password: string
  fullName: string
  role: 'user' | 'caregiver'
  linkedCaregiverId?: string
  linkedPatientIds?: string[]
}

interface UserState {
  id: string
  email: string
  fullName: string
  role: 'user' | 'caregiver'
  linkedCaregiverId?: string
}

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserState | null>(null)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [showLipsModal, setShowLipsModal] = useState(false)
  const [showPracticeModal, setShowPracticeModal] = useState(false)
  const [practiceScore, setPracticeScore] = useState<number | null>(null)
  const [transcript, setTranscript] = useState('')
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [showAddPhraseForm, setShowAddPhraseForm] = useState(false)
  const [newPhraseText, setNewPhraseText] = useState('')
  const [modules, setModules] = useState<Module[]>(MODULES)
  const [patients, setPatients] = useState<UserState[]>([])
  const [showStats, setShowStats] = useState(false)
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (Recognition) {
      recognitionRef.current = new Recognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.lang = 'es-ES'
    }

    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]') as User[]
    if (users.length === 0) {
      const demoUsers = [
        {
          id: '1',
          email: 'user@test.com',
          password: 'password',
          fullName: 'Usuario Demo',
          role: 'user' as const,
          linkedCaregiverId: '2'
        },
        {
          id: '2',
          email: 'caregiver@test.com',
          password: 'password',
          fullName: 'Cuidador Demo',
          role: 'caregiver' as const,
          linkedPatientIds: ['1']
        }
      ]
      localStorage.setItem('speech_swipe_users', JSON.stringify(demoUsers))
    }
  }, [])

  const handleLoginSuccess = () => {
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]') as User[]
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement

    if (emailInput && passwordInput) {
      const user = users.find(u => u.email === emailInput.value && u.password === passwordInput.value)
      if (user) {
        setCurrentUser({
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          linkedCaregiverId: user.linkedCaregiverId
        })

        if (user.role === 'caregiver' && user.linkedPatientIds) {
          const linkedPatients = users.filter(u => user.linkedPatientIds!.includes(u.id))
          setPatients(linkedPatients.map(p => ({
            id: p.id,
            email: p.email,
            fullName: p.fullName,
            role: p.role,
            linkedCaregiverId: p.linkedCaregiverId
          })))
        }

        setIsLoggedIn(true)
      }
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setPatients([])
  }

  const speakPhrase = (text: string, speed: 'normal' | 'slow' = 'normal') => {
    setIsSpeaking(true)
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-ES'
    utterance.rate = speed === 'slow' ? 0.3 : 0.9
    utterance.onend = () => setIsSpeaking(false)
    speechSynthesis.cancel()
    speechSynthesis.speak(utterance)
  }

  const startPractice = () => {
    const phrase = modules[currentModuleIndex].phrases[currentPhraseIndex]
    if (!recognitionRef.current) return

    setShowPracticeModal(true)
    setPracticeScore(null)
    setTranscript('')

    recognitionRef.current.onstart = () => console.log('Listening...')
    recognitionRef.current.onresult = (event: any) => {
      let interim = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        interim += event.results[i][0].transcript
      }
      setTranscript(interim)
    }
    recognitionRef.current.onend = () => {
      const similarity = calculateSimilarity(transcript, phrase.text)
      setPracticeScore(Math.max(0, Math.min(100, similarity)))
    }
    recognitionRef.current.start()
  }

  const calculateSimilarity = (str1: string, str2: string): number => {
    const s1 = str1.toLowerCase().trim()
    const s2 = str2.toLowerCase().trim()
    if (!s1) return 0
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

  const handleNextPhrase = () => {
    const currentModule = modules[currentModuleIndex]
    if (currentPhraseIndex < currentModule.phrases.length - 1) {
      setCurrentPhraseIndex(currentPhraseIndex + 1)
    } else {
      if (currentModuleIndex < modules.length - 1) {
        setCurrentModuleIndex(currentModuleIndex + 1)
        setCurrentPhraseIndex(0)
      }
    }
  }

  const handlePrevPhrase = () => {
    if (currentPhraseIndex > 0) {
      setCurrentPhraseIndex(currentPhraseIndex - 1)
    } else if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1)
      setCurrentPhraseIndex(modules[currentModuleIndex - 1].phrases.length - 1)
    }
  }

  const handleAddPhrase = () => {
    if (!newPhraseText.trim()) return

    const newModules = [...modules]
    const currentModule = newModules[currentModuleIndex]
    const newId = Math.max(...currentModule.phrases.map(p => parseInt(p.id)), 0) + 1

    currentModule.phrases.push({
      id: newId.toString(),
      text: newPhraseText,
      image: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?w=500&h=500&fit=crop'
    })

    setModules(newModules)
    setNewPhraseText('')
    setShowAddPhraseForm(false)
  }

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={handleLoginSuccess} />
  }

  if (currentUser?.role === 'caregiver') {
    const currentModule = modules[currentModuleIndex]
    const stats = patients.map((p, i) => ({
      id: p.id,
      name: p.fullName,
      email: p.email,
      practiceCount: Math.floor(Math.random() * 50),
      averageScore: Math.floor(Math.random() * 100)
    }))

    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#f3f4f6',
        fontFamily: 'Arial, sans-serif'
      }}>
        <header style={{
          backgroundColor: '#10b981',
          color: 'white',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h1 style={{ margin: '0 0 8px 0', fontSize: '28px', fontWeight: 'bold' }}>👨‍⚕️ DILO - Panel del Cuidador</h1>
          <p style={{ margin: 0, fontSize: '14px' }}>Bienvenido, {currentUser.fullName}</p>
        </header>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
          <div style={{
            display: 'flex',
            gap: '20px',
            marginBottom: '20px',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={() => setShowStats(!showStats)}
              style={{
                padding: '12px 24px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              📊 {showStats ? 'Módulos' : 'Estadísticas'}
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Salir
            </button>
          </div>

          {showStats ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '20px'
            }}>
              {stats.map(stat => (
                <div key={stat.id} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                  <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', fontWeight: 'bold' }}>
                    {stat.name}
                  </h3>
                  <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '14px' }}>
                    📧 {stat.email}
                  </p>
                  <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '14px' }}>
                    🎤 Prácticas: {stat.practiceCount}
                  </p>
                  <p style={{ margin: '8px 0', color: '#6b7280', fontSize: '14px' }}>
                    ⭐ Promedio: {stat.averageScore}%
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '12px',
                marginBottom: '20px'
              }}>
                {modules.map((mod, idx) => (
                  <button
                    key={mod.id}
                    onClick={() => setCurrentModuleIndex(idx)}
                    style={{
                      padding: '16px',
                      backgroundColor: currentModuleIndex === idx ? '#10b981' : 'white',
                      color: currentModuleIndex === idx ? 'white' : '#374151',
                      border: '2px solid #10b981',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      fontSize: '14px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{mod.emoji}</div>
                    {mod.name}
                  </button>
                ))}
              </div>

              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '20px', fontWeight: 'bold' }}>
                  {currentModule.name} - Palabras
                </h3>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '12px',
                  marginBottom: '20px'
                }}>
                  {currentModule.phrases.map((phrase, idx) => (
                    <div key={phrase.id} style={{
                      backgroundColor: '#f9fafb',
                      borderRadius: '8px',
                      padding: '12px',
                      border: '1px solid #e5e7eb'
                    }}>
                      <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>
                        {idx + 1}. {phrase.text}
                      </p>
                      <button
                        onClick={() => {
                          const newModules = [...modules]
                          newModules[currentModuleIndex].phrases =
                            newModules[currentModuleIndex].phrases.filter((_, i) => i !== idx)
                          setModules(newModules)
                        }}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        Eliminar
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowAddPhraseForm(!showAddPhraseForm)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginTop: '12px'
                  }}
                >
                  ➕ Agregar Palabra
                </button>

                {showAddPhraseForm && (
                  <div style={{
                    backgroundColor: '#f0f9ff',
                    borderRadius: '8px',
                    padding: '16px',
                    marginTop: '12px'
                  }}>
                    <input
                      type="text"
                      value={newPhraseText}
                      onChange={(e) => setNewPhraseText(e.target.value)}
                      placeholder="Escribe una nueva palabra o frase"
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '16px',
                        marginBottom: '12px',
                        boxSizing: 'border-box'
                      }}
                    />
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={handleAddPhrase}
                        style={{
                          flex: 1,
                          padding: '12px',
                          backgroundColor: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Agregar
                      </button>
                      <button
                        onClick={() => setShowAddPhraseForm(false)}
                        style={{
                          flex: 1,
                          padding: '12px',
                          backgroundColor: '#6b7280',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          cursor: 'pointer'
                        }}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  const currentModule = modules[currentModuleIndex]
  const currentPhrase = currentModule.phrases[currentPhraseIndex]
  const progressPercent = ((currentModuleIndex * 4 + currentPhraseIndex + 1) / (modules.length * 4)) * 100

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#1f2937',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#10b981',
        padding: '16px',
        textAlign: 'center'
      }}>
        <h1 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: 'bold' }}>👤 DILO</h1>
        <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.9)' }}>
          {currentModule.emoji} {currentModule.name} - {currentPhraseIndex + 1}/{currentModule.phrases.length}
        </p>
      </header>

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px 140px 20px',
        overflowY: 'auto'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '500px',
          backgroundColor: '#374151',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <img
            src={currentPhrase.image}
            alt={currentPhrase.text}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '24px'
            }}
          />

          <h2 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            marginBottom: '32px',
            color: '#10b981'
          }}>
            {currentPhrase.text}
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gap: '12px',
            marginBottom: '24px'
          }}>
            <button
              onClick={() => speakPhrase(currentPhrase.text, 'normal')}
              style={{
                padding: '16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '24px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              title="Escuchar"
            >
              🔊
            </button>

            <button
              onClick={() => speakPhrase(currentPhrase.text, 'slow')}
              style={{
                padding: '16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '24px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              title="Lento"
            >
              🐢
            </button>

            <button
              onClick={() => setShowLipsModal(true)}
              style={{
                padding: '16px',
                backgroundColor: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '24px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              title="Labios"
            >
              👄
            </button>

            <button
              onClick={startPractice}
              style={{
                padding: '16px',
                backgroundColor: '#8b5cf6',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '24px',
                cursor: 'pointer',
                fontWeight: '600'
              }}
              title="Practicar"
            >
              🎤
            </button>
          </div>

          <div style={{
            width: '100%',
            height: '4px',
            backgroundColor: '#4b5563',
            borderRadius: '2px',
            overflow: 'hidden',
            marginBottom: '16px'
          }}>
            <div style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: '#10b981',
              transition: 'width 0.3s'
            }} />
          </div>
        </div>
      </div>

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#374151',
        borderTop: '1px solid #4b5563',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        gap: '12px',
        zIndex: 10
      }}>
        <button
          onClick={handlePrevPhrase}
          style={{
            padding: '16px',
            backgroundColor: 'transparent',
            color: 'white',
            border: '2px solid #059669',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ⬅️ Anterior
        </button>

        <button
          onClick={handleLogout}
          style={{
            padding: '16px',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Salir
        </button>

        <button
          onClick={() => setShowAddPhraseForm(!showAddPhraseForm)}
          style={{
            padding: '16px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          ➕ Agregar
        </button>

        <button
          onClick={handleNextPhrase}
          style={{
            padding: '16px',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Siguiente ➜
        </button>
      </div>

      {showLipsModal && (
        <RealisticLipsModal
          phrase={currentPhrase}
          onClose={() => setShowLipsModal(false)}
          isSpeaking={isSpeaking}
        />
      )}

      {showPracticeModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 50,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            maxWidth: '400px',
            width: '100%',
            color: '#111827'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>🎤 Practica</h2>

            {practiceScore === null ? (
              <>
                <div style={{
                  backgroundColor: '#f0fdf4',
                  padding: '16px',
                  borderRadius: '8px',
                  marginBottom: '16px'
                }}>
                  <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Debes decir:</p>
                  <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#059669', margin: 0 }}>
                    {currentPhrase.text}
                  </p>
                </div>

                {transcript && (
                  <div style={{
                    backgroundColor: '#dbeafe',
                    padding: '16px',
                    borderRadius: '8px',
                    marginBottom: '16px'
                  }}>
                    <p style={{ fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' }}>Escuchando:</p>
                    <p style={{ fontSize: '16px', color: '#0284c7', margin: 0 }}>{transcript}</p>
                  </div>
                )}

                <button
                  onClick={() => {
                    recognitionRef.current?.stop()
                    setShowPracticeModal(false)
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#8b5cf6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  🎤 Grabando...
                </button>
              </>
            ) : (
              <>
                <div style={{
                  textAlign: 'center',
                  marginBottom: '24px'
                }}>
                  <div style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: '#8b5cf6',
                    marginBottom: '12px'
                  }}>
                    {practiceScore}%
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: '#6b7280'
                  }}>
                    {practiceScore >= 80 && '✨ ¡Excelente!'}
                    {practiceScore >= 60 && practiceScore < 80 && '👍 ¡Muy bien!'}
                    {practiceScore >= 40 && practiceScore < 60 && '📚 Sigue practicando'}
                    {practiceScore < 40 && '🔄 Intenta de nuevo'}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setShowPracticeModal(false)
                    setPracticeScore(null)
                    if (practiceScore >= 80) {
                      handleNextPhrase()
                    }
                  }}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: '#10b981',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '16px'
                  }}
                >
                  Cerrar
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {showAddPhraseForm && !currentUser?.role?.includes('caregiver') && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '32px',
            maxWidth: '400px',
            width: '100%',
            color: '#111827'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>➕ Agregar Palabra</h2>
            <input
              type="text"
              value={newPhraseText}
              onChange={(e) => setNewPhraseText(e.target.value)}
              placeholder="Nueva palabra o frase"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '16px',
                marginBottom: '16px',
                boxSizing: 'border-box'
              }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={handleAddPhrase}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Agregar
              </button>
              <button
                onClick={() => setShowAddPhraseForm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
