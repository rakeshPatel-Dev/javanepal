# Architecture

## Overview

JavaNepal is a static Next.js application. All content data lives in `data/*.json` files and is read at request/build time by the data access layer. There is no database, no API routes, and no external dependencies at runtime beyond the npm packages.

## Data Flow

```
data/*.json  ──→  lib/data.ts  ──→  Server Components / Client Components
                        │
                   (read via
                    fs / import)
```

The data access layer (`lib/data.ts`) reads the JSON files and exports typed functions (`getUnits()`, `getQuestions()`, etc.). Every component imports from this module — there are no API calls.

## SSR & Hydration Strategy

| Concern | Approach |
|---------|----------|
| Theme (dark/light) | `next-themes` inline `<script>` sets `class="dark"` on `<html>` before React hydrates. `suppressHydrationWarning` on `<body>` accounts for browser-extension attributes. |
| Framer Motion | No `MotionConfig isStatic` guard. Motion components render with `initial` inline styles during SSR; framer-motion animates to `animate` immediately after hydration. This means a brief opacity-0 flash on first paint. |
| Client state (bookmarks, completed) | `use-tracking.ts` hook loads from `localStorage` inside `useEffect`. Initial render uses empty arrays, so server and client match. |

## Component Tree (Root)

```
<html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
    <ThemeProvider attribute="class" defaultTheme="system">
      <TooltipProvider>
        <Navbar />           ← client component (scroll-aware)
        <main>{children}</main>
        <Footer />            ← server component
        <Toaster />           ← sonner toast notifications
      </TooltipProvider>
    </ThemeProvider>
  </body>
</html>
```

## Routing

| Route | Type | Content |
|-------|------|---------|
| `/` | Static | Landing page (Hero, Stats, Features, FeaturedUnits, Testimonials, CTA) |
| `/units` | Static | Grid of all units |
| `/unit/[unitId]` | Dynamic | Unit detail + topic cards |
| `/topic/[topicId]` | Dynamic | Topic detail + filterable question cards |
| `/question/[questionId]` | Dynamic | Question detail with answer reveal, code block, nav |
| `/search` | Static | Full-text search across all questions |
| `/bookmarks` | Static | Bookmarked questions grid |
| `/about` | Static | About page with stats |
| `/_not-found` | Static | Custom 404 |

## Key Design Decisions

1. **Static JSON over database** — The question bank is fixed per semester. JSON is simpler to edit, version-controlled, and requires zero backend infrastructure.
2. **localStorage for tracking** — Bookmarks and completion progress are per-device. No accounts, no sync. Keeps the app simple and offline-first.
3. **shadcn/ui on Base UI** — Uses `@base-ui/react` (not Radix) for primitive components like Button, Select, Sheet. The `nativeButton={false}` default accommodates Link-based button renders.
4. **Self-hosted font** — `@fontsource-variable/geist` instead of `next/font/google` to match the original app's font loading and avoid CDN dependency.
