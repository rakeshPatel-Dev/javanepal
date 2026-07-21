# JavaNepal — Project Context

## Overview
BITM 2nd Semester OOP with Java question bank. Search, track progress, bookmark questions, view syllabus, and practice for exams.

## Tech Stack
- **Framework:** Next.js 16.2.10 (App Router, webpack)
- **Language:** TypeScript (strict)
- **UI:** React 19, shadcn/ui (base-nova style), Tailwind CSS v4, framer-motion
- **Icons:** lucide-react
- **Font:** Geist Variable
- **Theme:** next-themes (light/dark/system), Geist-aware
- **PWA:** @serwist/next (service worker)
- **Lint:** eslint-config-next (core-web-vitals) + typescript

## Architecture

```
app/                    # Next.js App Router pages
  about/                #   About page
  bookmarks/            #   Bookmarks page (+ bookmarks-provider)
  question/[id]/        #   Question detail (dynamic)
  search/               #   Full-text search page
  syllabus/             #   Syllabus page (server wrapper + client UI)
  topic/[id]/           #   Topic questions (dynamic)
  unit/[id]/            #   Unit questions (dynamic)
  units/                #   All units overview
  layout.tsx            #   Root layout (metadata, schemas, navbar, footer)
  sitemap.ts            #   Dynamic XML sitemap
  sw.ts                 #   Service worker source
components/             # React components
  common/               #   Container, MotionDiv, ThemeToggle
  layout/               #   Navbar, Footer, MobileNav
  questions/            #   QuestionCard, QuestionFilters, etc.
  sections/home/        #   Home page sections (Hero, QuickAccess, Stats, Features)
  seo/                  #   JSON-LD schemas (Organization, Website, Course, etc.)
  themes/               #   shadcn/ui components
  topics/               #   TopicCard, TopicGrid
  ui/                   #   shadcn/ui primitives (accordion, badge, button, card, etc.)
  units/                #   UnitCard, UnitGrid
data/                   # Static JSON
  questions/            #   Per-unit question files (unit-1.json..unit-9.json) + index.json
  syllabus.json         #   Course syllabus structure
  topics.json           #   Topic metadata
  units.json            #   Unit metadata
hooks/                  # Custom hooks (use-tracking, use-search)
lib/                    # Core logic
  data.ts               #   Data layer — Map-based O(1) lookups for index data
  question-loader.ts    #   Lazy dynamic import for full question details
  syllabus.ts           #   Syllabus data loader
  types.ts              #   All TypeScript types/constants
  utils.ts              #   Utility functions
public/                 # Static assets
  docs/                 #   OOP with Java Syllabus.pdf
  favicon/              #   Favicon set + manifest
  image/                #   Screenshots (app previews)
scripts/                # Build scripts
  rebuild-index.mjs     #   Regenerates questions/index.json from per-unit files
```

## Data Flow
- **Index data** (question list, units, topics) → loaded eagerly at build time via static JSON imports → stored in `Map`s for O(1) lookups.
- **Full question data** (question+answer bodies) → lazy-loaded per-question via dynamic `import()`.
- **Syllabus** → loaded from `data/syllabus.json` via `lib/syllabus.ts`.
- All data transformers are synchronous (no async needed for index/static data).

## Key Design Decisions
1. **Per-unit question files** — `data/questions/unit-*.json` + `index.json` instead of monolithic `questions.json`. Enables lazy loading, parallel downloads, and reduced memory. Index rebuilt via `npm run build:index`.
2. **Map-backed lookups** — `lib/data.ts` builds `Map<id, entry>` and `Map<slug, entry>` at module init, replacing `array.find()`/`filter()` for all index queries.
3. **Lazy question loading** — `lib/question-loader.ts` uses dynamic `import()` to load full question+answer bodies only when a question detail page is visited.
4. **Server/Client split** — Pages needing `useState`/`useEffect` (e.g., syllabus accordion) are split into a server wrapper (metadata export + data fetch) + client component (UI/interactions).

## Routes

| Route | Type | Description |
|---|---|---|
| `/` | Static | Home page (hero, quick access, stats) |
| `/units` | Static | All units overview |
| `/unit/[unitId]` | Dynamic | Unit detail with topics + questions |
| `/topic/[topicId]` | Dynamic | Topic detail with questions |
| `/question/[questionId]` | Dynamic | Full question with answer |
| `/search` | Static | Full-text search (client-side) |
| `/bookmarks` | Static | Bookmarked questions |
| `/syllabus` | Static | Full course syllabus |
| `/about` | Static | About page |
| `/sitemap.xml` | Static | Auto-generated XML sitemap |

## Design Tokens
- **Primary:** `#0037b0` (light), `#699bff` (dark)
- **Font:** Geist Variable (sans), Geist Variable (mono)
- **Radius base:** `0.625rem` (10px)
- **Layout:** max-w-6xl centered, px-4 sm:px-6 lg:px-8
- **Animation:** `cubic-bezier(0.16, 1, 0.3, 1)` — spring-like
- **Grid pattern:** 48px dotted + radial fade mask on hero sections
- **Mesh gradient:** 3 radial gradients at top-left/top-center/top-right

## Key Conventions
- `"use client"` only where interactivity is needed (state, effects, event handlers)
- All reusable components use `MotionDiv` wrapper for consistent animation
- Utility classes: `page-shell` (max-w-6xl), `panel-frame` (card border), `soft-card`, `section-heading`, `card-lift`
- Icons from lucide-react, imported individually
- shadcn/ui components under `components/ui/`
- Data functions in `lib/` are synchronous

## Package Scripts
- `npm run dev` — Next.js dev server (webpack)
- `npm run build` — Production build + TypeScript check
- `npm run build:index` — Rebuild `data/questions/index.json` from per-unit files
- `npm run lint` — ESLint check
- `npm start` — Production server

## SEO
- **Metadata:** per-page where possible (syllabus), otherwise inherited from root layout
- **Sitemap:** dynamic, includes all static pages + units + topics + questions
- **robots.txt:** allows `/`, `/units`, `/topic/`, `/search`, `/bookmarks`, `/about`, `/syllabus`
- **Structured data:** Organization, Website, Course, Person, Breadcrumb, FAQ (JSON-LD)
- **PWA manifest:** shortcuts to Units, Search, Bookmarks, Syllabus
