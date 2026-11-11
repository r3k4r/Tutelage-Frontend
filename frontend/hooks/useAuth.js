'use client'

import { useContext } from 'react'
import { AuthContext } from '@/components/providers/AuthProvider'

/** `{ user, loading, refresh }` for the signed-in user (null when signed out). */
export function useAuth() {
  return useContext(AuthContext)
}
