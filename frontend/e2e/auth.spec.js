import { test, expect } from '@playwright/test'

test.describe('auth & route protection (logged out)', () => {
  test('admin dashboard redirects to signin', async ({ page }) => {
    await page.goto('/admin-dashboard/blogs')
    await expect(page).toHaveURL(/\/signin$/)
  })

  test('/login is an alias for /signin', async ({ page }) => {
    await page.goto('/login')
    await expect(page).toHaveURL(/\/signin$/)
  })

  test('a forged token is rejected', async ({ page, context, baseURL }) => {
    const domain = new URL(baseURL).hostname
    await context.addCookies([
      { name: 'token', value: 'not.a.jwt', domain, path: '/' },
      { name: 'refreshToken', value: 'x', domain, path: '/' },
    ])
    await page.goto('/admin-dashboard')
    await expect(page).toHaveURL(/\/signin$/)
  })

  test('signin validates input before calling the API', async ({ page }) => {
    await page.goto('/signin')
    await page.getByPlaceholder('name@example.com').fill('not-an-email')
    await page.getByPlaceholder('Enter your password').fill('short')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await expect(page.getByText('Please enter a valid email address')).toBeVisible()
    await expect(page.getByText('Password must be at least 8 characters')).toBeVisible()
  })

  test('signin shows the API error for wrong credentials', async ({ page }) => {
    await page.goto('/signin')
    await page.getByPlaceholder('name@example.com').fill('nobody@example.com')
    await page.getByPlaceholder('Enter your password').fill('wrong-password-123')
    await page.getByRole('button', { name: 'Sign In' }).click()
    await expect(page.getByText(/invalid email or password/i)).toBeVisible()
    await expect(page).toHaveURL(/\/signin$/)
  })
})
