import { test, expect } from '@playwright/test'
import { RESOURCE_LISTS, trackPageErrors, settle } from './helpers'

for (const { list, detail } of RESOURCE_LISTS) {
  test.describe(`resource list ${list}`, () => {
    test('cards open their detail page', async ({ page }) => {
      const errors = trackPageErrors(page)
      await page.goto(list)
      await settle(page)
      const cards = page.locator(`a[href^="${detail}"]`)
      test.skip((await cards.count()) === 0, 'no content for this list in the database')

      const href = await cards.first().getAttribute('href')
      await cards.first().click()
      await expect(page).toHaveURL(new RegExp(`${href}$`), { timeout: 45_000 }) // first compile of the route in dev is slow
      const title = page.getByRole('heading', { level: 1 }).first()
      await expect(title).toBeVisible()
      await expect(title).not.toHaveText(/^\s*(Loading\.*)?\s*$/)
      expect(errors).toEqual([])
    })

    test('page-based pagination moves to page 2 and is in the URL', async ({ page }) => {
      await page.goto(list)
      await settle(page)
      const next = page.getByRole('button', { name: /next page/i })
      test.skip(!(await next.isVisible()) || (await next.isDisabled()), 'only one page of content')

      const cards = page.locator(`a[href^="${detail}"]`)
      const firstOnPage1 = await cards.first().getAttribute('href')
      await next.click()
      await expect(page).toHaveURL(/[?&]page=2\b/)
      await expect(cards.first()).not.toHaveAttribute('href', firstOnPage1)
      const firstOnPage2 = await cards.first().getAttribute('href')

      // reload stays on page 2
      await page.reload()
      await settle(page)
      await expect(cards.first()).toHaveAttribute('href', firstOnPage2)
      await expect(page.getByRole('button', { name: /previous page/i })).toBeEnabled()
    })
  })
}
