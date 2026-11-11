'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import { api } from '@/common/utils/api'
import { refreshTokens } from '@/common/utils/auth'
import { useTokenRefresh } from '@/hooks/useTokenRefresh'

export const AuthContext = createContext({ user: null, loading: true, refresh: async () => {} })

/** Loads the current user once (after a token refresh) and keeps tokens fresh. Read it with useAuth(). */
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    setLoading(true)
    const res = await api('/api/auth/me')
    setUser(res.ok ? res.data?.user ?? null : null)
    setLoading(false)
  }, [])

  // Refresh first so an expired access token doesn't make /me fail on page load.
  useEffect(() => {
    refreshTokens().finally(refresh)
  }, [refresh])

  useTokenRefresh()

  return <AuthContext.Provider value={{ user, loading, refresh }}>{children}</AuthContext.Provider>
}
