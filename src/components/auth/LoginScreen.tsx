import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'

interface LoginScreenProps {
  onLoginSuccess: () => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { login, signup } = useAuth()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('user')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]')
    if (users.length === 0) {
      localStorage.setItem('speech_swipe_users', JSON.stringify([
        { id: '1', email: 'user@test.com', password: 'password', fullName: 'Usuario Demo', role: 'user' },
        { id: '2', email: 'caregiver@test.com', password: 'password', fullName: 'Cuidador Demo', role: 'caregiver' }
      ]))
    }
  }, [])

  const handleLogin = (e: any) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }
    setLoading(true)
    try {
      login(email, password)
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    }
    setLoading(false)
  }

  const handleSignup = (e: any) => {
    e.preventDefault()
    if (!email || !password || !fullName) {
      setError('Por favor completa todos los campos')
      return
    }
    setLoading(true)
    try {
      signup(email, password, fullName, role)
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    }
    setLoading(false)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
        padding: '40px',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>👤</div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#059669', margin: '0 0 8px 0' }}>DILO</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Rehabilitación del habla</p>
        </div>

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fca5a5',
            color: '#991b1b',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {mode === 'login' ? (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="tu@email.com"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: loading ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: loading ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                background: loading ? '#d1d5db' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'background 0.2s'
              }}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>

            <button
              type="button"
              onClick={() => { setMode('signup'); setError('') }}
              disabled={loading}
              style={{
                background: 'none',
                border: 'none',
                color: '#059669',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Nombre
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => { setFullName(e.target.value); setError('') }}
                placeholder="Tu nombre"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: loading ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError('') }}
                placeholder="tu@email.com"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: loading ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                placeholder="••••••••"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: loading ? 'not-allowed' : 'text'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Rol
              </label>
              <select
                value={role}
                onChange={(e) => { setRole(e.target.value); setError('') }}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '16px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial',
                  backgroundColor: loading ? '#f3f4f6' : 'white',
                  color: '#111827',
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                <option value="user">Paciente</option>
                <option value="caregiver">Cuidador</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '600',
                background: loading ? '#d1d5db' : '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>

            <button
              type="button"
              onClick={() => { setMode('login'); setError('') }}
              disabled={loading}
              style={{
                background: 'none',
                border: 'none',
                color: '#059669',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </form>
        )}

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', textAlign: 'center', marginBottom: '8px' }}>
            📌 Cuentas de Prueba
          </p>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0', textAlign: 'center' }}>
            👤 user@test.com / password
          </p>
          <p style={{ fontSize: '11px', color: '#6b7280', margin: '4px 0', textAlign: 'center' }}>
            👨‍⚕️ caregiver@test.com / password
          </p>
        </div>
      </div>
    </div>
  )
}
