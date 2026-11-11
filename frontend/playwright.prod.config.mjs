// E2E against a production build on :3100 — stable under parallel load and independent of `next dev`.
// The build goes to .next-e2e so it never touches the dev server's .next.
import { defineConfig } from '@playwright/test'
import base from './playwright.config.mjs'

const URL = 'http://localhost:3100'

export default defineConfig({
  ...base,
  workers: 6,
  // A card click occasionally fails to commit its navigation under 6 parallel workers (not reproducible
  // alone); one retry keeps the suite usable and the report still lists such tests as "flaky".
  retries: 1,
  use: { ...base.use, baseURL: URL },
  webServer: [
    base.webServer[0], // backend
    {
      name: 'frontend (prod build)',
      command: 'npx next build --no-lint && npx next start -p 3100',
      env: { ...process.env, NEXT_DIST_DIR: '.next-e2e' },
      url: URL,
      reuseExistingServer: true,
      timeout: 600_000,
    },
  ],
})
