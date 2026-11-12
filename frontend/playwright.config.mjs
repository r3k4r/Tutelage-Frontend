import { defineConfig, devices } from '@playwright/test'
import { existsSync } from 'node:fs'

// Optional local overrides (E2E_ADMIN_EMAIL, E2E_ADMIN_PASSWORD, E2E_BASE_URL, ...)
if (existsSync('.env.e2e')) process.loadEnvFile('.env.e2e')

const FRONTEND_URL = process.env.E2E_BASE_URL || 'http://localhost:3000'
const BACKEND_URL = process.env.E2E_API_URL || 'http://localhost:3001'

export default defineConfig({
  testDir: './e2e',
  outputDir: './e2e/.results',
  fullyParallel: true,
  // `next dev` compiles each route on first hit; too many parallel cold hits time out
  workers: 2, // more starves next dev (and the machine) — it compiles each page on first hit
  retries: process.env.CI ? 2 : 0,
  timeout: 60_000,
  expect: { timeout: 15_000 },
  reporter: [['list'], ['html', { open: 'never', outputFolder: './e2e/.report' }]],
  use: {
    baseURL: FRONTEND_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'setup', testMatch: /auth\.setup\.js/ },
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
      dependencies: ['setup'],
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 7'] },
      dependencies: ['setup'],
    },
  ],
  // Reuses the servers you already have running; starts them otherwise.
  webServer: [
    {
      name: 'backend',
      command: 'npm run dev',
      cwd: '../../Tutelage.academics/backend',
      url: `${BACKEND_URL}/api/status`,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      name: 'frontend',
      command: 'npm run dev',
      url: FRONTEND_URL,
      reuseExistingServer: true,
      timeout: 180_000,
    },
  ],
})
