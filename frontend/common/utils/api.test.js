import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock('@/common/utils/config', () => ({ API_URL: 'http://api.test' }))
const { api, apiUrl } = await import('@/common/utils/api')

const jsonResponse = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

let fetchMock
beforeEach(() => {
  fetchMock = vi.spyOn(globalThis, 'fetch')
})

describe('apiUrl', () => {
  test('joins the base and drops empty query values', () => {
    expect(apiUrl('/api/blogs', { page: 2, search: '', level: null, tags: undefined })).toBe(
      'http://api.test/api/blogs?page=2',
    )
  })

  test('encodes values and joins arrays with commas', () => {
    expect(apiUrl('/api/x', { search: 'a b&c', level: ['A1', 'B2'] })).toBe(
      'http://api.test/api/x?search=a+b%26c&level=A1%2CB2',
    )
  })
})

describe('api', () => {
  test('GET sends cookies, no body and no JSON content type', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true, data: [1] }))
    const res = await api('/api/blogs', { query: { page: 1 } })
    expect(res).toEqual({ ok: true, status: 200, data: { success: true, data: [1] }, message: '' })
    const [url, init] = fetchMock.mock.calls[0]
    expect(url).toBe('http://api.test/api/blogs?page=1')
    expect(init.credentials).toBe('include')
    expect(init.body).toBeUndefined()
    expect(init.headers['Content-Type']).toBeUndefined()
  })

  test('JSON body is serialized with a JSON content type', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true }))
    await api('/api/auth/login', { method: 'POST', body: { email: 'a@b.co' } })
    const [, init] = fetchMock.mock.calls[0]
    expect(init.method).toBe('POST')
    expect(init.body).toBe('{"email":"a@b.co"}')
    expect(init.headers['Content-Type']).toBe('application/json')
  })

  test('FormData is passed through so the browser sets the multipart boundary', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: true }))
    const form = new FormData()
    form.append('title', 'x')
    await api('/api/blogs', { method: 'POST', body: form })
    const [, init] = fetchMock.mock.calls[0]
    expect(init.body).toBe(form)
    expect(init.headers['Content-Type']).toBeUndefined()
  })

  test('adds the stored access token as a bearer header', async () => {
    localStorage.setItem('accessToken', 'tok')
    fetchMock.mockResolvedValue(jsonResponse({ success: true }))
    await api('/api/auth/me')
    expect(fetchMock.mock.calls[0][1].headers.Authorization).toBe('Bearer tok')
  })

  test('HTTP errors resolve with ok=false and the server message', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: false, message: 'Invalid email or password' }, 401))
    expect(await api('/api/auth/login', { method: 'POST', body: {} })).toMatchObject({
      ok: false,
      status: 401,
      message: 'Invalid email or password',
    })
  })

  test('success:false in a 200 body is still a failure', async () => {
    fetchMock.mockResolvedValue(jsonResponse({ success: false, message: 'nope' }))
    expect(await api('/api/x')).toMatchObject({ ok: false, status: 200, message: 'nope' })
  })

  test('network errors never throw', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'))
    expect(await api('/api/x')).toEqual({ ok: false, status: 0, data: null, message: 'Failed to fetch' })
  })

  test('non-JSON bodies yield data=null with a generic message', async () => {
    fetchMock.mockResolvedValue(new Response('<html>', { status: 502 }))
    expect(await api('/api/x')).toEqual({ ok: false, status: 502, data: null, message: 'Request failed (502)' })
  })
})
