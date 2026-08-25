import { useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  fullName: string
  role: 'user' | 'caregiver'
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('speech_swipe_user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setLoading(false)
  }, [])

  const signup = (email: string, password: string, fullName: string, role: 'user' | 'caregiver') => {
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]')

    if (users.some((u: any) => u.email === email)) {
      throw new Error('Email ya existe')
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      fullName,
      role
    }

    users.push({ ...newUser, password })
    localStorage.setItem('speech_swipe_users', JSON.stringify(users))
    localStorage.setItem('speech_swipe_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('speech_swipe_users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error('Email o contraseña incorrectos')
    }

    const { password: _, ...userWithoutPassword } = foundUser
    localStorage.setItem('speech_swipe_user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
    return userWithoutPassword
  }

  const logout = () => {
    localStorage.removeItem('speech_swipe_user')
    setUser(null)
  }

  return { user, loading, signup, login, logout }
}
