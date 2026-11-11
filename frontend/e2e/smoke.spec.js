import { test, expect } from '@playwright/test'
import { PUBLIC_ROUTES, trackPageErrors, expectNoHorizontalScroll, settle } from './helpers'

// Every public page loads, has a heading, throws nothing, and fits the viewport (desktop + mobile).
for (const path of PUBLIC_ROUTES) {
  test(`public page ${path}`, async ({ page }) => {
    const errors = trackPageErrors(page)
    const res = await page.goto(path)
    expect(res.status()).toBeLessThan(400)
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
    await settle(page)
    await expectNoHorizontalScroll(page)
    expect(errors).toEqual([])
  })
}
