import { api } from '@/common/utils/api'

const TOKEN_KEYS = ['accessToken', 'refreshToken']

/**
 * Exchanges the refresh token (httpOnly cookie, plus the localStorage copy for
 * browsers that block cross-site cookies) for fresh tokens. Resolves to true on success.
 */
export async function refreshTokens() {
  let refreshToken = null
  try {
    refreshToken = localStorage.getItem('refreshToken')
  } catch {
    // storage unavailable (private mode); the cookie still works
  }
  const res = await api('/api/auth/refresh-token', {
    method: 'POST',
    body: { refreshToken },
    headers: refreshToken ? { 'X-Refresh-Token': refreshToken } : {},
  })
  if (res.ok) storeTokens(res.data)
  return res.ok
}

/** Keeps the cookie-less fallback copies of the tokens in localStorage. */
export function storeTokens(data) {
  for (const key of TOKEN_KEYS) {
    if (!data?.[key]) continue
    try {
      localStorage.setItem(key, data[key])
    } catch {
      // storage unavailable
    }
  }
}
