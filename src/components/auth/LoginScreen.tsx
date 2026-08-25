import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'

interface LoginScreenProps {
  onLoginSuccess: () => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { login, signup } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('user')
  const [showSignup, setShowSignup] = useState(false)
  const [error, setError] = useState('')

  // Crear cuentas de prueba
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]')
    if (users.length === 0) {
      localStorage.setItem('speech_swipe_users', JSON.stringify([
        { id: '1', email: 'user@test.com', password: 'password', fullName: 'Usuario Demo', role: 'user' },
        { id: '2', email: 'caregiver@test.com', password: 'password', fullName: 'Cuidador Demo', role: 'caregiver' }
      ]))
    }
  }, [])

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      login(email, password)
      setEmail('')
      setPassword('')
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    try {
      signup(email, password, fullName, role as 'user' | 'caregiver')
      setEmail('')
      setPassword('')
      setFullName('')
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #9333ea, #6b21a8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
      <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', padding: '32px', width: '100%', maxWidth: '448px' }}>
        <h1 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#a855f7' }}>
          🎤 Speech Swipe
        </h1>
        <p style={{ textAlign: 'center', color: '#4b5563', marginBottom: '32px' }}>Rehabilitación del habla</p>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '12px', borderRadius: '4px', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        {!showSignup ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#a855f7',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Iniciar Sesión
            </button>

            <button
              type="button"
              onClick={() => {
                setShowSignup(true)
                setError('')
              }}
              style={{
                width: '100%',
                color: '#a855f7',
                background: 'none',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                Nombre
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '4px' }}>
                Rol
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontSize: '16px'
                }}
              >
                <option value="user">Paciente</option>
                <option value="caregiver">Cuidador</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                background: '#a855f7',
                color: 'white',
                padding: '12px',
                borderRadius: '8px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Registrarse
            </button>

            <button
              type="button"
              onClick={() => {
                setShowSignup(false)
                setError('')
              }}
              style={{
                width: '100%',
                color: '#a855f7',
                background: 'none',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </form>
        )}

        <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '12px', color: '#4b5563', textAlign: 'center', marginBottom: '8px' }}>Cuentas de prueba:</p>
          <div style={{ fontSize: '12px', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <p>👤 user@test.com / password</p>
            <p>👨‍⚕️ caregiver@test.com / password</p>
          </div>
        </div>
      </div>
    </div>
  )
}
