import { expect } from '@playwright/test'

export const ADMIN_STATE = 'e2e/.auth/admin.json'

export const LEVELS = ['a1', 'a2', 'b1', 'b2', 'c1']
export const SKILLS = ['listening', 'reading', 'speaking', 'writing']

export const PUBLIC_ROUTES = [
  '/',
  '/about-us',
  '/contact',
  '/search',
  '/signin',
  '/courses',
  '/courses/academicenglish',
  '/courses/businessenglish',
  '/courses/englishforadults',
  '/courses/englishforkids',
  '/courses/enroll',
  '/courses/Englishproficiencytests',
  '/courses/Englishproficiencytests/ieltsacademic',
  '/courses/Englishproficiencytests/ieltsgeneral',
  '/courses/Englishproficiencytests/ptepreparationcourse',
  '/courses/Englishproficiencytests/toeflpreparationcourse',
  '/esl-resources',
  '/esl-resources/audios',
  '/esl-resources/blogs',
  '/esl-resources/stories',
  '/esl-resources/videos',
  '/languages',
  '/languages/arabic',
  '/languages/kurdish',
  '/levels',
  ...LEVELS.map((l) => `/levels/${l}`),
  '/skills',
  ...SKILLS.flatMap((s) => [`/skills/${s}`, ...LEVELS.map((l) => `/skills/${s}/${l}`)]),
  '/tutelage-tests',
  '/tutelage-tests/free-practice-test',
  '/tutelage-tests/language-placement',
  '/tutelage-tests/mock-exam',
]

export const ADMIN_ROUTES = [
  '/admin-dashboard',
  '/admin-dashboard/analytics',
  '/admin-dashboard/approvals',
  '/admin-dashboard/blogs',
  '/admin-dashboard/eslAudios',
  '/admin-dashboard/eslVideos',
  '/admin-dashboard/landing',
  '/admin-dashboard/listenings',
  '/admin-dashboard/quiz',
  '/admin-dashboard/quiz/config',
  '/admin-dashboard/quiz/questions',
  '/admin-dashboard/quiz/sections',
  '/admin-dashboard/readings',
  '/admin-dashboard/speakings',
  '/admin-dashboard/stories',
  '/admin-dashboard/users',
  '/admin-dashboard/writings',
]

// List page -> the href prefix its cards link to (detail pages)
export const RESOURCE_LISTS = [
  { list: '/esl-resources/blogs', detail: '/esl-resources/blogs/' },
  { list: '/esl-resources/stories', detail: '/esl-resources/stories/' },
  { list: '/esl-resources/audios', detail: '/esl-resources/audios/' },
  { list: '/esl-resources/videos', detail: '/esl-resources/videos/' },
  ...SKILLS.map((s) => ({ list: `/skills/${s}/a1`, detail: `/skills/${s}/a1/` })),
  ...SKILLS.map((s) => ({ list: `/skills/${s}/b1`, detail: `/skills/${s}/b1/` })),
]

/** Records uncaught exceptions and React hydration errors for the page's lifetime. */
export function trackPageErrors(page) {
  const errors = []
  page.on('pageerror', (e) => errors.push(e.message))
  page.on('console', (msg) => {
    if (msg.type() === 'error' && /hydrat/i.test(msg.text())) errors.push(msg.text())
  })
  return errors
}

export async function expectNoHorizontalScroll(page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  )
  expect(overflow, 'page should not scroll sideways').toBeLessThanOrEqual(1)
}

/** Waits until client-side fetches settle; dev HMR websockets don't count. */
export async function settle(page) {
  await page.waitForLoadState('networkidle', { timeout: 20_000 }).catch(() => {})
}
