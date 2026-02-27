import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

const api = axios.create({
  baseURL: '/api/v1',
  withCredentials: true,
})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await api.get('/auth/me')
      setUser(data.user)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (identifire, password) => {
    const { data } = await api.post('/auth/login', { identifire, password })
    setUser(data.user)
    return data
  }

  const register = async (userData) => {
    const { data } = await api.post('/auth/register', userData)
    setUser(data.user)
    return data
  }

  const logout = async () => {
    await api.post('/auth/logout')
    setUser(null)
  }

  const refreshToken = async () => {
    try {
      await api.post('/auth/refreshToken')
      await checkAuth()
    } catch (error) {
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      register, 
      logout, 
      refreshToken 
    }}>
      {children}
    </AuthContext.Provider>
  )
}
