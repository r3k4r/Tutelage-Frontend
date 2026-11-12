import { test, expect } from '@playwright/test'
import { settle } from './helpers'

// container-page (max-w-7xl) for page content; container-wide (95rem) for the navbar and footer.
const COLUMNS = [
  { width: 1280, selector: 'main h1, main h2, main p' },
  { width: 1520, selector: 'header a, nav a, footer a, footer p' },
]

// On a wide screen the page content and the navbar/footer each stay inside their centered column.
test.describe('wide-screen layout', () => {
  test.use({ viewport: { width: 1920, height: 1080 } })

  for (const path of ['/', '/courses', '/esl-resources/blogs', '/skills/reading/a1', '/levels/b1', '/contact']) {
    test(`content stays inside its column on ${path}`, async ({ page }) => {
      await page.goto(path)
      await settle(page)
      const outside = await page.evaluate((columns) => {
        const bad = []
        for (const { width, selector } of columns) {
          const gutter = (1920 - width) / 2
          for (const el of document.querySelectorAll(selector)) {
            const r = el.getBoundingClientRect()
            if (!r.width || !r.height || getComputedStyle(el).visibility === 'hidden') continue
            if (r.left < gutter - 2 || r.right > 1920 - gutter + 2) {
              bad.push(`${el.tagName.toLowerCase()} "${el.textContent.trim().slice(0, 30)}" ${Math.round(r.left)}-${Math.round(r.right)}`)
            }
          }
        }
        return bad.slice(0, 10)
      }, COLUMNS)
      expect(outside, 'elements escaping their centered column').toEqual([])
    })
  }
})
