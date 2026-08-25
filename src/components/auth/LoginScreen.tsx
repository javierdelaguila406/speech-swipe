import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/common/Button'
import { Input } from '@/components/common/Input'

interface LoginScreenProps {
  onLoginSuccess: () => void
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showSignup, setShowSignup] = useState(false)
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'user' | 'caregiver'>('user')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      login(email, password)
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    }
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { signup } = useAuth()
      signup(email, password, fullName, role)
      onLoginSuccess()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-600">🎤 Speech Swipe</h1>
        <p className="text-center text-gray-600 mb-8">Rehabilitación del habla</p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!showSignup ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>

            <button
              type="button"
              onClick={() => {
                setShowSignup(true)
                setError('')
              }}
              className="w-full text-purple-600 hover:text-purple-800 font-semibold"
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className="space-y-4">
            <Input
              label="Nombre Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              required
            />
            <Input
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Rol</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as 'user' | 'caregiver')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="user">Paciente/Usuario</option>
                <option value="caregiver">Cuidador/Terapeuta</option>
              </select>
            </div>

            <Button type="submit" className="w-full">
              Registrarse
            </Button>

            <button
              type="button"
              onClick={() => {
                setShowSignup(false)
                setError('')
              }}
              className="w-full text-purple-600 hover:text-purple-800 font-semibold"
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </form>
        )}

        {/* Demo accounts */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 text-center mb-2">Cuentas de prueba:</p>
          <div className="text-xs text-gray-600 space-y-1">
            <p>👤 Usuario: user@test.com / password</p>
            <p>👨‍⚕️ Cuidador: caregiver@test.com / password</p>
          </div>
        </div>
      </div>
    </div>
  )
}
