const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function POST(req) {
  try {
    // Optionally read body from client if needed (not required here)
    const body = await req.json().catch(() => ({}));

    // Forward signout request to backend so it can clear its session/cookies
    // Use a safe forward; backend should clear its own cookies/session
    let backendRes = null
    try {
      backendRes = await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body || {}),
        // If your backend needs credentials, enable them accordingly
        credentials: 'include',
      })
    } catch (err) {
      console.error('Error forwarding signout to backend:', err)
    }

    // Prepare headers to clear cookies on client
    const headers = { 'Content-Type': 'application/json' }

    const clearCookies = []
    // Clear access token cookie
    clearCookies.push('token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0')
    // Clear refresh token cookie
    clearCookies.push('refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0')

    if (clearCookies.length) headers['Set-Cookie'] = clearCookies.join(', ')

    return new Response(JSON.stringify({ success: true, message: 'Signed out' }), { status: 200, headers })
  } catch (err) {
    console.error('API /signout error:', err)
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}

export async function GET() {
  return new Response(JSON.stringify({ success: false, message: 'Use POST' }), { status: 405, headers: { 'Content-Type': 'application/json' } })
}
