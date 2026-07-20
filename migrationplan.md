# Migration Plan: Practice (Vite SPA) → javalab (Next.js App Router)

## Overview

Migrate the Java OOP question bank from a Vite + React SPA (`Practice/`) to a Next.js 16 App Router app (`javalab/`) with full TypeScript, shadcn/ui, and proper SSR support.

## Source vs Destination

| Concern | Practice (source) | javalab (target) |
|---|---|---|
| Framework | Vite 8 + React 19.2.7 (JSX) | Next.js 16.2.10 + React 19.2.4 (TSX) |
| Routing | react-router-dom v7 BrowserRouter | App Router (file-system) |
| CSS | Tailwind v4 (Vite plugin) | Tailwind v4 (PostCSS) |
| Font | @fontsource-variable/geist | next/font/google Geist |
| UI Library | shadcn/ui Radix Nova (manual JS) | shadcn/ui new-york (CLI, TS) |
| Icons | lucide-react | lucide-react |
| Toasts | sonner | sonner |
| Animation | framer-motion | framer-motion (isolated in wrapper) |
| Theme | next-themes | next-themes (shadcn pattern) |
| SEO | react-helmet-async | Next.js Metadata API |

## Route Mapping

```
SPA Route                   Next.js File
/                           app/page.tsx
/units                      app/units/page.tsx
/unit/:unitId               app/unit/[unitId]/page.tsx
/topic/:topicId             app/topic/[topicId]/page.tsx
/question/:questionId       app/question/[questionId]/page.tsx
/search                     app/search/page.tsx
/bookmarks                  app/bookmarks/page.tsx
/about                      app/about/page.tsx
* (404)                     app/not-found.tsx
```

## Target File Structure

```
javalab/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   ├── units/page.tsx
│   ├── unit/[unitId]/page.tsx
│   ├── topic/[topicId]/page.tsx
│   ├── question/[questionId]/page.tsx
│   ├── search/page.tsx
│   ├── bookmarks/page.tsx
│   └── about/page.tsx
├── components/
│   ├── ui/                     # shadcn CLI-generated
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── accordion.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── textarea.tsx
│   │   ├── separator.tsx
│   │   ├── pagination.tsx
│   │   ├── skeleton.tsx
│   │   ├── tooltip.tsx
│   │   ├── spinner.tsx
│   │   ├── empty.tsx
│   │   ├── sheet.tsx
│   │   └── sonner.tsx
│   ├── layout/
│   │   ├── navbar.tsx
│   │   └── footer.tsx
│   ├── common/
│   │   ├── motion-div.tsx          # framer-motion wrapper
│   │   ├── bookmark-button.tsx
│   │   ├── breadcrumb.tsx
│   │   ├── code-block.tsx
│   │   ├── completed-button.tsx
│   │   ├── container.tsx
│   │   ├── difficulty-badge.tsx
│   │   ├── empty-state.tsx
│   │   ├── filter-bar.tsx
│   │   ├── icon.tsx
│   │   ├── loading-skeleton.tsx
│   │   ├── logo.tsx
│   │   ├── page-header.tsx
│   │   ├── progress-bar.tsx
│   │   ├── search-bar.tsx
│   │   ├── tag.tsx
│   │   └── animated-theme-toggler.tsx
│   ├── units/
│   │   └── unit-card.tsx
│   ├── topics/
│   │   └── topic-card.tsx
│   ├── questions/
│   │   └── question-card.tsx
│   └── sections/
│       └── home/
│           ├── hero.tsx
│           ├── stats-grid.tsx
│           ├── quick-access.tsx
│           ├── features.tsx
│           ├── featured-units.tsx
│           ├── difficulty.tsx
│           ├── testimonials.tsx
│           └── cta-bento.tsx
├── lib/
│   ├── utils.ts               # cn() helper
│   └── types.ts               # TS interfaces
├── hooks/
│   └── use-tracking.ts
├── data/                      # YOU provide these
│   ├── units.json
│   ├── topics.json
│   └── questions.json
├── public/                    # YOU provide these
│   ├── logo-white.png
│   ├── logo-black.png
│   ├── Javalab-whatsapp-og.png
│   ├── image/opps.png
│   └── favicon/*
├── components.json
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

## Commit Chunks

### Chunk 01 — shadcn Init
```
chore(deps): init shadcn and install libs
```
- `npx shadcn@latest init` (style: new-york, baseColor: neutral, cssVariables: true, rsc: true)
- Add components via CLI: `button card badge breadcrumb input label select textarea separator pagination accordion skeleton tooltip spinner empty sheet sonner`
- Install runtime deps: `lucide-react framer-motion next-themes class-variance-authority clsx tailwind-merge`
- Verify `components.json` exists with correct paths

### Chunk 02 — Global Styles
```
style(css): port theme tokens and utilities
```
- Replace `app/globals.css` with shadcn defaults + Practice theme tokens
- Add `:root` / `.dark` color vars (primary `#0037b0` / `#699bff`)
- Add utilities: `.page-shell`, `.panel-frame`, `.soft-card`, `.section-heading`, `.mesh-gradient`, `.hero-grid`, `.floating-shape`, `.card-lift`
- Add `@keyframes float`, `@keyframes waggle`
- Use `next/font/google` Geist via CSS vars

### Chunk 03 — Root Layout
```
feat(layout): root layout with theme and providers
```
- `app/layout.tsx`: Geist font, `<ThemeProvider>`, `<TooltipProvider>`, `<Toaster>`
- `suppressHydrationWarning` on `<html>`
- Export metadata: title, description, OG, icons, manifest, themeColor
- Navbar + main + Footer wrapper

### Chunk 04 — Utilities & Types
```
feat(lib): utils, types, and tracking hook
```
- `lib/types.ts`: TypeScript interfaces for Unit, Topic, Question
- `hooks/use-tracking.ts`: `"use client"` localStorage hook for bookmarks + completion

### Chunk 05 — Motion Wrapper
```
feat(common): framer-motion wrapper component
```
- `components/common/motion-div.tsx`: thin `"use client"` wrapper around `motion.div`
- Keeps `"use client"` at leaf level, pages stay Server Components

### Chunk 06 — Static Common Components
```
feat(common): stateless common components
```
No `"use client"` needed:
- container, empty-state, loading-skeleton, difficulty-badge, tag
- icon (lucide resolver), logo, page-header, progress-bar

### Chunk 07 — Interactive Common Components
```
feat(common): interactive common components
```
- bookmark-button, completed-button, breadcrumb, search-bar, filter-bar
- code-block (Java syntax highlight + copy), animated-theme-toggler

### Chunk 08 — Layout Components
```
feat(layout): navbar and footer
```
- `navbar.tsx`: sticky nav, mobile sheet, theme toggle, logo, links
- `footer.tsx`: links, copyright
- Integrate into root layout

### Chunk 09 — Home Page
```
feat(page): home page with all sections
```
- hero, stats-grid, quick-access, features, featured-units
- difficulty, testimonials, cta-bento
- `app/page.tsx` composes sections with motion-div wrappers

### Chunk 10 — Units & Topics
```
feat(page): units listing and unit detail
```
- `unit-card.tsx`, `topic-card.tsx`
- `app/units/page.tsx`, `app/unit/[unitId]/page.tsx`
- `app/topic/[topicId]/page.tsx` with filters

### Chunk 11 — Questions
```
feat(page): question detail, search, bookmarks
```
- `question-card.tsx`, `app/question/[questionId]/page.tsx`
- `app/search/page.tsx` (useSearchParams)
- `app/bookmarks/page.tsx` (localStorage)

### Chunk 12 — About & 404
```
feat(page): about and not-found
```
- `app/about/page.tsx`
- `app/not-found.tsx`

### Chunk 13 — Config & Cleanup
```
chore(config): finalize next config and cleanup
```
- `next.config.ts`, eslint, cleanup leftover files
- Remove SPA boilerplate, update README

### Chunk 14 — Build
```
chore(build): verify build succeeds
```
- `npm run build`, fix TS errors, verify all routes

## Architecture Rules

**"use client" strategy** — only leaf interactive components get the directive:
- `motion-div.tsx` wraps framer-motion → parent pages stay Server Components
- `navbar.tsx` gets it for click handlers, theme toggle
- `bookmark-button.tsx` gets it for localStorage
- `search-bar.tsx` gets it for `useSearchParams`
- `use-tracking.ts` gets it for localStorage

**Data flow**: JSON files imported statically in server components → passed as props to client components (no JSON import inside `"use client"`)

**SEO**: `react-helmet-async` replaced by Next.js `export const metadata` / `generateMetadata` on each page

**Routing**: react-router-dom `<Link to>` → `next/link` `<Link href>`, `useParams` → `params` prop, `useNavigate` → `useRouter` from `next/navigation`
