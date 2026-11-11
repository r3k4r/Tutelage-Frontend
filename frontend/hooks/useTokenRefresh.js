'use client'

import { useEffect } from 'react'
import { refreshTokens } from '@/common/utils/auth'

// Access tokens live 1h; refresh comfortably before they expire.
export const TOKEN_REFRESH_INTERVAL_MS = 50 * 60 * 1000

/** Keeps the session alive while the app is open. */
export function useTokenRefresh() {
  useEffect(() => {
    const id = setInterval(refreshTokens, TOKEN_REFRESH_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])
}
