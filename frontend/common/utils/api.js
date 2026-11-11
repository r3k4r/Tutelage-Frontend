import { API_URL } from '@/common/utils/config'

/** Builds `${API_URL}${path}?query`, dropping empty query values. */
export function apiUrl(path, query) {
  const qs = new URLSearchParams()
  for (const [key, value] of Object.entries(query || {})) {
    if (value === undefined || value === null || value === '') continue
    qs.set(key, Array.isArray(value) ? value.join(',') : String(value))
  }
  const s = qs.toString()
  return `${API_URL}${path}${s ? `?${s}` : ''}`
}

function readAccessToken() {
  try {
    return localStorage.getItem('accessToken')
  } catch {
    return null
  }
}

/**
 * Single entry point for backend calls. Never throws: resolves to
 * `{ ok, status, data, message }` where `data` is the parsed JSON body.
 * Sends cookies and the localStorage access token (cookie-less fallback);
 * FormData bodies keep the browser's multipart Content-Type.
 */
export async function api(path, { method = 'GET', query, body, headers } = {}) {
  const isForm = typeof FormData !== 'undefined' && body instanceof FormData
  const token = readAccessToken()
  try {
    const res = await fetch(apiUrl(path, query), {
      method,
      credentials: 'include',
      headers: {
        ...(body && !isForm ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      body: isForm ? body : body === undefined ? undefined : JSON.stringify(body),
    })
    let data = null
    try {
      data = await res.json()
    } catch {
      // empty or non-JSON body
    }
    const ok = res.ok && data?.success !== false
    return { ok, status: res.status, data, message: data?.message || (ok ? '' : `Request failed (${res.status})`) }
  } catch (error) {
    return { ok: false, status: 0, data: null, message: error?.message || 'Network error' }
  }
}
