# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

The Next.js app lives in `frontend/` — run all commands from there. Its backend is the Express API in the sibling repo `../Tutelage.academics/backend` (port 3001); `Tutelage.academics/frontend` is the old, retired frontend. API changes often need edits in both repos. `docs/brand/` holds brand assets.

## Commands (in `frontend/`)

```bash
npm run dev              # next dev on :3000
npm run build
npm test                 # Vitest unit tests (~2s)
npm run test:watch
npm run test:e2e:prod    # full Playwright suite (desktop + mobile) against a prod build on :3100 — use this for full runs
npm run test:e2e         # same suite against `next dev` on :3000; fine for a few specs, but a full run overloads next dev
npm run test:e2e:smoke   # fast subset: smoke + auth, desktop only
npx playwright test resources --project=desktop   # one spec / project
npm run test:e2e:report  # open the last HTML report
```

Verification builds must not touch `next dev`'s `.next`: `NEXT_DIST_DIR=.next-build npx next build`. After editing `.env`, restart `next dev` — the middleware keeps the old `JWT_SECRET`.

Backend (in `../Tutelage.academics/backend`): `npm test` (unit, no DB), `npm run test:api` (boots the app on a random port; read-only against the configured DB), `npm run test:db` (writes; runs only with `TEST_DATABASE_URL` set — never point it at the real DB).

E2E admin tests log in with `E2E_ADMIN_EMAIL`/`E2E_ADMIN_PASSWORD` from `frontend/.env.e2e` (see `.env.e2e.example`); without them `e2e/auth.setup.js` mints a dev token from `JWT_SECRET`. Admin e2e tests are read-only by design.

## Stack

Next.js 15 App Router, React 19, plain JavaScript (`.js`/`.jsx`). Tailwind v4 (config in `app/globals.css`). shadcn/ui "new-york" in `components/ui/` with `cn()` from `lib/utils.js`. Forms: react-hook-form + zod. Toasts: sonner — use `toast.success` / `toast.error` (there is no `variant` option). Alias `@/*` → `frontend/*`.

## Where things go

Modeled on the sibling `visa-advisers-uae-dashboard` (Vue), adapted to Next — routes stay in `app/` and stay thin (metadata plus one component).

- `common/utils/` — plain functions: `api`, `config`, `auth`, `pagination`, `formData`, `youtube`, `seo`, `gtag`. `lib/utils.js` holds only shadcn's `cn` (shadcn expects it there).
- `common/constants/` — registries: `resources.js` (content types), `admin-sidebar.js` (admin nav + which roles see what). `common/data/` — page content (`skills`, `levels`, `eslLibraries`).
- `hooks/` — React hooks only (`use*`, the Vue-composables equivalent); a hook never lives inside a component file.
- `components/ui/` — shadcn primitives only.
- `components/app/` — generic, non-domain pieces: `Pagination`, `Collapsible`, `PageHero`, `ThemeToggle`, `GoogleAnalytics`, `pdf/`, `players/`, `dialogs/` (`ConfirmDialog`).
- `components/layouts/site/` (Navbar, Footer, ...) and `components/layouts/admin/` (Header, Sidebar, ProfileBlock, `ListingPageHeader`).
- `components/shared/<domain>/` — a section used by pages in different folders: `resources/` (public grid/card/detail), `admin-resources/` (admin list/card/detail), `cta/`.
- `components/pages/<area>/<page>/` — components only one page uses (`pages/home`, `pages/about-us`, `pages/admin/quiz`, ...). Never loose in the area folder.
- `components/form/` — forms. `components/providers/`, `components/skeletons/`.
- Every import uses `@/` (no `./` or `../`), except `e2e/` specs, which Playwright resolves relatively.

### Admin UI rules

- The admin shell is one screen tall (`h-dvh`); the body never scrolls. Content is full width with `p-2 md:p-4` — no `max-w-*` / `mx-auto` wrappers and no extra page padding.
- Every admin page starts with `ListingPageHeader` (title, optional description, actions on the right).
- List pages are `flex h-full flex-col gap-4`: header and toolbar `shrink-0`, the grid in a `min-h-0 flex-1 overflow-y-auto` box, `Pagination` last (it right-aligns itself). Admin lists show 6 per page in a 1 / 2 / 3 / 6-column grid so rows are always full.
- Spacing scale: `gap-4` between blocks and grid items, `p-4` inside cards, `rounded-lg border bg-card` for cards, `size-4` icons in buttons. Destructive confirms use `ConfirmDialog`.
- Buttons and other controls get `cursor: pointer` globally (`globals.css`, Tailwind v4 dropped it); don't add `cursor-pointer` per element.

## Backend calls

Always go through `api(path, { method, query, body })` from `common/utils/api.js`. It never throws and resolves to `{ ok, status, data, message }`; it sends cookies **and** the localStorage `accessToken` as a Bearer header (cookie-less fallback), JSON-encodes plain bodies and passes `FormData` through untouched. Don't `fetch` the API directly. `API_URL`/`TUTELAGE_AI_URL` come from `common/utils/config.js` (`TUTELAGE_AI_URL` reads the legacy `NEXT_PUBLIC_BASE_URL_PROD`).

Auth: `components/providers/AuthProvider.jsx` refreshes tokens, then loads `/api/auth/me`; read it with `useAuth()` from `hooks/useAuth.js`. `useTokenRefresh` refreshes every 50 min (tokens live 1h).

## Content resources (the core pattern)

`common/constants/resources.js` registers every content type (blogs, stories, eslAudios, eslVideos, readings, writings, speakings, listenings): its page-based list endpoint, the list's response key, the item endpoint, and the text fields the admin form submits. Everything is driven from it:

- Public lists: `<ResourceGrid resource=… hrefBase=… level=… />` → `usePaginatedList` → `<Pagination>`. The page lives in the URL (`?page=N`); changing filters resets to page 1. Components using `useSearchParams` must sit in `<Suspense>` (ResourceGrid/AdminResourcePage already wrap themselves).
- Public detail: `<ResourceDetail resource=… kind="video|audio|text|story" backHref=… />`.
- Admin: `<AdminResourcePage>` (list + create/edit/delete) and `<AdminResourceDetail>`, both using `useResourceMutations`, which builds multipart bodies with `toResourceFormData` (`pdf`→`pdfFile`, `taskPdfs`, `deletedTaskPdfIds` as JSON).

Paginated responses come in two shapes — `{ data: { <key>: [], pagination } }` and, for esl-audios/esl-videos, `{ data: [], pagination }`. `readPage()` in `common/utils/pagination.js` handles both; don't parse lists by hand. Adding a content type = a RESOURCES entry + thin pages.

Skills (`/skills/[skill]/[level]/[id]`) and levels (`/levels/[level]`) are dynamic routes over `common/data/skills.js` / `levels.js` with `generateStaticParams` + `dynamicParams = false`; edit the data file, not the routes.

## Layout & responsiveness

Wrap page content in `container-page` (defined in `globals.css`: `max-w-7xl` + responsive side padding). Don't re-type `max-w-7xl mx-auto px-…` — header, content and footer must share the same edges (`e2e/layout.spec.js` checks this at 1920px). Only one `h1` per page; the navbar and footer contain none. Every page must not scroll sideways at phone width (checked by `e2e/smoke.spec.js` on the mobile project).

## Routing & access control

`middleware.js` verifies the `token` cookie with `jose` + `JWT_SECRET`: `/admin-dashboard/*` needs login; `/admin-dashboard/{quiz,users,approvals}` are `ADMIN` only (exact-path match), others allow `ADMIN` and `MAIN_MANAGER`. Logged-in users are bounced from `/signin`; `/login` → `/signin`. When adding an ADMIN-only admin page, add its path to that list.

## i18n

Single `i18n.js` with inline `en` and `ku` resources, keys nested by page (e.g. `ArabicCourse.title`). `ku` adds `rtl` to `<body>`. Add new keys to **both** languages. `components/pages/languages/LanguageCoursePage.jsx` serves both language pages via its `ns` prop.

## SEO

Pages export `metadata` from `constructMetadata({ title, description, path, ogImage })` in `common/utils/seo.js`; dynamic routes use `generateMetadata` with the `seo` blocks in the data files.

## Env (`frontend/.env.example`)

`JWT_SECRET` (must equal the backend's), `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_BASE_URL_PROD`, `NEXT_PUBLIC_GA_MEASUREMENT_ID`.
