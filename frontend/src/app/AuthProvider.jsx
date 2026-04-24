import { useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import {
  getCurrentAdminProfile,
  loginAdmin,
  logoutAdminSession,
} from '../services/api/auth.js'
import {
  clearStoredAdminAuthHeader,
  getStoredAdminAuthHeader,
  setStoredAdminAuthHeader,
} from '../utils/adminSession.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    async function restoreSession() {
      const storedAuthHeader = getStoredAdminAuthHeader()

      if (!storedAuthHeader) {
        if (isMounted) {
          setIsLoading(false)
        }
        return
      }

      try {
        const profile = await getCurrentAdminProfile(storedAuthHeader)

        if (isMounted) {
          setUser(profile)
        }
      } catch {
        clearStoredAdminAuthHeader()

        if (isMounted) {
          setUser(null)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    restoreSession()

    return () => {
      isMounted = false
    }
  }, [])

  async function login(credentials) {
    const { authHeader, user: profile } = await loginAdmin(credentials)

    setStoredAdminAuthHeader(authHeader)
    setUser(profile)

    return profile
  }

  function logout() {
    logoutAdminSession()
    setUser(null)
  }

  async function refreshUser() {
    const storedAuthHeader = getStoredAdminAuthHeader()

    if (!storedAuthHeader) {
      setUser(null)
      return null
    }

    const profile = await getCurrentAdminProfile(storedAuthHeader)
    setUser(profile)
    return profile
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: Boolean(user),
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
