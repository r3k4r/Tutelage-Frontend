import { test as setup, expect } from '@playwright/test'
import { SignJWT } from 'jose'
import { readFileSync } from 'node:fs'
import { ADMIN_STATE } from './helpers'

function jwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET
  const line = readFileSync('.env', 'utf8').split(/\r?\n/).find((l) => /^JWT_SECRET\s*=/.test(l))
  return line?.slice(line.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')
}

setup('admin session', async ({ page, context, baseURL }) => {
  const email = process.env.E2E_ADMIN_EMAIL
  const password = process.env.E2E_ADMIN_PASSWORD

  if (email && password) {
    // Real login through the UI (also guards the login -> dashboard redirect)
    await page.goto('/signin')
    await page.getByPlaceholder('name@example.com').fill(email)
    await page.getByPlaceholder('Enter your password').fill(password)
    await page.getByRole('button', { name: 'Sign In' }).click()
    await page.waitForURL('**/admin-dashboard', { timeout: 30_000 })
  } else {
    // shortcut: dev-only session minted with the project's JWT_SECRET for an existing admin
    // (E2E_ADMIN_ID, default 1); set E2E_ADMIN_EMAIL/PASSWORD in .env.e2e to log in for real.
    const secret = new TextEncoder().encode(jwtSecret())
    const sign = (payload) =>
      new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setExpirationTime('1h').sign(secret)
    const id = Number(process.env.E2E_ADMIN_ID || 1)
    const domain = new URL(baseURL).hostname
    await context.addCookies([
      { name: 'token', value: await sign({ id, role: 'ADMIN' }), domain, path: '/' },
      { name: 'refreshToken', value: await sign({ id }), domain, path: '/' },
    ])
    await page.goto('/admin-dashboard')
    await expect(page).toHaveURL(/\/admin-dashboard/)
  }

  await context.storageState({ path: ADMIN_STATE })
})
