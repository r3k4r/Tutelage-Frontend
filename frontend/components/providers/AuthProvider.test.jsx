import { beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'

vi.mock('@/common/utils/api', () => ({ api: vi.fn() }))
const { api } = await import('@/common/utils/api')
const { refreshTokens } = await import('@/common/utils/auth')
const { default: AuthProvider } = await import('@/components/providers/AuthProvider')
const { useAuth } = await import('@/hooks/useAuth')

function WhoAmI() {
  const { user, loading } = useAuth()
  return <p>{loading ? 'loading' : user ? `hi ${user.name}` : 'signed out'}</p>
}

beforeEach(() => api.mockReset())

describe('refreshTokens', () => {
  test('sends the stored refresh token and stores the new pair', async () => {
    localStorage.setItem('refreshToken', 'old-refresh')
    api.mockResolvedValue({ ok: true, data: { success: true, accessToken: 'a2', refreshToken: 'r2' } })
    expect(await refreshTokens()).toBe(true)
    expect(api).toHaveBeenCalledWith('/api/auth/refresh-token', {
      method: 'POST',
      body: { refreshToken: 'old-refresh' },
      headers: { 'X-Refresh-Token': 'old-refresh' },
    })
    expect(localStorage.getItem('accessToken')).toBe('a2')
    expect(localStorage.getItem('refreshToken')).toBe('r2')
  })

  test('a failed refresh keeps the stored tokens', async () => {
    localStorage.setItem('accessToken', 'keep')
    api.mockResolvedValue({ ok: false, status: 401, data: { success: false } })
    expect(await refreshTokens()).toBe(false)
    expect(localStorage.getItem('accessToken')).toBe('keep')
  })
})

describe('AuthProvider', () => {
  test('refreshes tokens before asking who the user is', async () => {
    const calls = []
    api.mockImplementation(async (path) => {
      calls.push(path)
      return path === '/api/auth/me'
        ? { ok: true, data: { success: true, user: { name: 'Rekar' } } }
        : { ok: true, data: { success: true } }
    })
    render(<AuthProvider><WhoAmI /></AuthProvider>)
    expect(screen.getByText('loading')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByText('hi Rekar')).toBeInTheDocument())
    expect(calls).toEqual(['/api/auth/refresh-token', '/api/auth/me'])
  })

  test('signed out when /me fails, even if the refresh failed first', async () => {
    api.mockResolvedValue({ ok: false, status: 401, data: { success: false } })
    render(<AuthProvider><WhoAmI /></AuthProvider>)
    await waitFor(() => expect(screen.getByText('signed out')).toBeInTheDocument())
  })
})
