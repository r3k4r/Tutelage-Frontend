import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

process.env.NEXT_PUBLIC_BASE_URL = 'http://api.test'

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  localStorage.clear()
})
