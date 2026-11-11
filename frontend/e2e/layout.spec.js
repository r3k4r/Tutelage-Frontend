import { test, expect } from '@playwright/test'
import { settle } from './helpers'

const MAX_CONTENT = 1280 // max-w-7xl, the container-page width

// On a wide screen the header, page content and footer share one centered column.
test.describe('wide-screen layout', () => {
  test.use({ viewport: { width: 1920, height: 1080 } })

  for (const path of ['/', '/courses', '/esl-resources/blogs', '/skills/reading/a1', '/levels/b1', '/contact']) {
    test(`content stays inside the page column on ${path}`, async ({ page }) => {
      await page.goto(path)
      await settle(page)
      const gutter = (1920 - MAX_CONTENT) / 2
      const outside = await page.evaluate((gutter) => {
        const bad = []
        for (const el of document.querySelectorAll('header a, nav a, main h1, main h2, main p, footer a, footer p')) {
          const r = el.getBoundingClientRect()
          if (!r.width || !r.height || getComputedStyle(el).visibility === 'hidden') continue
          if (r.left < gutter - 2 || r.right > 1920 - gutter + 2) {
            bad.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.left)}-${Math.round(r.right)}`)
          }
        }
        return bad.slice(0, 10)
      }, gutter)
      expect(outside, 'elements escaping the centered column').toEqual([])
    })
  }
})
