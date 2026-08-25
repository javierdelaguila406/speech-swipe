import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'

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
  const [loading, setLoading] = useState(false)

  const handleLogin = (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      try {
        login(email, password)
        onLoginSuccess()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
      }
      setLoading(false)
    }, 500)
  }

  const handleSignup = (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      try {
        signup(email, password, fullName, role)
        onLoginSuccess()
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al registrarse')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #a855f7, #6b21a8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: 'white', borderRadius: '12px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', padding: '40px', width: '100%', maxWidth: '450px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px', color: '#a855f7' }}>
          🎤 Speech Swipe
        </h1>
        <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '32px', fontSize: '14px' }}>
          Rehabilitación del habla
        </p>

        {error && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '12px 16px', borderRadius: '6px', marginBottom: '20px', fontSize: '14px' }}>
            ⚠️ {error}
          </div>
        )}

        {!showSignup ? (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#c084fc' : '#a855f7',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowSignup(true)
                setError('')
              }}
              disabled={loading}
              style={{
                width: '100%',
                background: 'none',
                color: '#a855f7',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Nombre Completo
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Tu nombre"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Contraseña
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                disabled={loading}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Rol
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  fontFamily: 'Arial, sans-serif'
                }}
                disabled={loading}
              >
                <option value="user">Paciente/Usuario</option>
                <option value="caregiver">Cuidador/Terapeuta</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#c084fc' : '#a855f7',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '6px',
                border: 'none',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '16px',
                marginBottom: '12px'
              }}
            >
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowSignup(false)
                setError('')
              }}
              disabled={loading}
              style={{
                width: '100%',
                background: 'none',
                color: '#a855f7',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '14px'
              }}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </form>
        )}

        <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid #e5e7eb', fontSize: '12px', color: '#6b7280', textAlign: 'center' }}>
          <p style={{ marginBottom: '8px', fontWeight: '600' }}>📌 Cuentas de prueba:</p>
          <p>👤 user@test.com / password</p>
          <p>👨‍⚕️ caregiver@test.com / password</p>
        </div>
      </div>
    </div>
  )
}
