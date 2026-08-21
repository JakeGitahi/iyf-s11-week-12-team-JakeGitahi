import { createContext, useContext, useEffect, useState } from 'react'
import { getCurrentUser, loginUser, registerUser } from '../services/authService'

const TOKEN_KEY = 'campusconnect_token'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    getCurrentUser(token)
      .then((data) => setUser(data.user))
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY)
        setToken(null)
      })
      .finally(() => setIsLoading(false))
  }, [token])

  const startSession = ({ user: nextUser, token: nextToken }) => {
    localStorage.setItem(TOKEN_KEY, nextToken)
    setUser(nextUser)
    setToken(nextToken)
  }

  const login = async (details) => {
    const data = await loginUser(details)
    startSession(data)
  }

  const register = async (details) => {
    const data = await registerUser(details)
    startSession(data)
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setUser(null)
    setToken(null)
  }

  return <AuthContext.Provider value={{ user, token, isLoading, login, register, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
