# JavaNepal

Master OOP in Java — theory, coding, viva & exam questions with syllabus organization and revision tracking.

Built for BITM 2nd Semester students. Offline-first, searchable, bookmarkable.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 + shadcn/ui (Base UI) |
| Animation | Framer Motion v12 |
| Theme | next-themes (class-based dark mode) |
| Data | Static JSON files (`data/`) |
| Font | Geist Variable (self-hosted via `@fontsource-variable/geist`) |

## Quick Start

```bash
npm install
npm run dev      # → http://localhost:3000
npm run build    # production build
npm run start    # serve production build
```

## Project Structure

```
javanepal/
├── app/                # Next.js App Router pages
│   ├── page.tsx        # Landing / home
│   ├── about/          # About page
│   ├── bookmarks/      # Bookmarked questions
│   ├── question/       # Question detail (dynamic)
│   ├── search/         # Full-text search
│   ├── topic/          # Topic detail (dynamic)
│   ├── unit/           # Unit detail (dynamic)
│   ├── units/          # Units listing
│   └── layout.tsx      # Root layout (theme, nav, footer)
├── components/         # React components
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Home page sections (Hero, Stats, etc.)
│   ├── common/         # Shared UI (Container, Breadcrumb, etc.)
│   ├── questions/      # QuestionCard
│   ├── topics/         # TopicCard
│   └── ui/             # shadcn/ui primitives (Button, Card, etc.)
├── lib/                # Utilities
│   ├── data.ts         # Data access layer (reads JSON)
│   ├── types.ts        # TypeScript types & constants
│   └── utils.ts        # cn() helper
├── hooks/              # React hooks
│   └── use-tracking.ts # Bookmarks, completed, progress
├── data/               # Static JSON data
│   ├── units.json
│   ├── topics.json
│   └── questions.json
└── public/             # Static assets
    ├── favicon/
    ├── image/
    └── javanepal-whatsapp-og.png
```

## Key Features

- **500+ questions** across 5 units, 20+ topics
- **9 question types**: Theory, Programming, MCQ, Interview, Viva, Debugging, Output, Lab, Assignment
- **3 difficulty levels**: Easy, Medium, Hard
- **Track progress**: completed questions, bookmarks (localStorage)
- **Full-text search** with filters (difficulty, type, sort)
- **Dark mode** with system preference detection
- **Responsive** — mobile-first layout
- **Offline-ready** — all data is static JSON, no API needed

## Deployment

Connect the repo to [Vercel](https://vercel.com) — zero config required.
