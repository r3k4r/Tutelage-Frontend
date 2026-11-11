import { test, expect } from '@playwright/test'
import { ADMIN_ROUTES, ADMIN_STATE, trackPageErrors, settle } from './helpers'

// Read-only: these never create, edit or delete data.
test.use({ storageState: ADMIN_STATE })

for (const path of ADMIN_ROUTES) {
  test(`admin page ${path}`, async ({ page }) => {
    const errors = trackPageErrors(page)
    await page.goto(path)
    await expect(page).toHaveURL(new RegExp(`${path}$`))
    await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
    await settle(page)
    expect(errors).toEqual([])
  })
}

const PAGED = ['blogs', 'eslAudios', 'eslVideos', 'listenings', 'readings', 'speakings', 'stories', 'writings']

for (const name of PAGED) {
  test(`admin ${name} uses page pagination, not infinite scroll`, async ({ page }) => {
    await page.goto(`/admin-dashboard/${name}`)
    await settle(page)
    await expect(page.getByRole('button', { name: /show more/i })).toHaveCount(0)
    const pager = page.getByRole('navigation', { name: /pagination/i })
    const next = pager.getByRole('button', { name: /next page/i })
    test.skip(!(await next.isVisible()) || (await next.isDisabled()), 'only one page of content')
    await next.click()
    await expect(page).toHaveURL(/[?&]page=2\b/)
  })
}
