# Data Model

## Overview

All data is stored as static JSON in `data/`. Three files: `units.json`, `topics.json`, `questions.json`.

## Schema

### Unit (`data/units.json`)

```typescript
interface Unit {
  id: number
  slug: string
  title: string
  description: string
  estimatedHours: number
  difficulty: "Easy" | "Medium" | "Hard"
  icon: string
  color: string
  questionCount: number
  topics: number
}
```

### Topic (`data/topics.json`)

```typescript
interface Topic {
  id: number
  unitId: number
  title: string
  slug: string
  estimatedQuestions: number
}
```

### Question (`data/questions.json`)

```typescript
interface Question {
  id: number
  unitId: number
  topicId: number
  title: string
  slug: string
  type: "Theory" | "Programming" | "MCQ" | "Interview" | "Viva"
      | "Debugging" | "Output" | "Lab" | "Assignment"
  difficulty: "Easy" | "Medium" | "Hard"
  examFrequency: string
  marks: number
  estimatedTime: number
  isProgramming: boolean
  isImportant: boolean
  isRepeated: boolean
  tags: string[]
  question: string
  shortAnswer: string
  detailedAnswer: string
  code?: string
  output?: string
  explanation?: string
  commonMistakes?: string[]
  relatedTopics?: string[]
  previousYear?: string[]
  references?: string[]
  source?: { type: string; year?: number; group?: string; marks?: number }
}
```

## Relationships

```
Unit 1 ──── Topic N ──── Question N
  │                       │
  └── unitId              ├── unitId
                          └── topicId
```

- A `Unit` has many `Topics` via `topic.unitId === unit.id`
- A `Topic` has many `Questions` via `question.topicId === topic.id`
- A `Unit` also has many `Questions` via `question.unitId === unit.id` (denormalized for faster queries)

## Enriched Types

At runtime, `lib/data.ts` computes enriched types:
- `EnrichedUnit` = `Unit` + `stats` (easy/medium/hard counts)
- `EnrichedTopic` = `Topic` + `questionCount` + `stats`

## Progress & Bookmarks

Stored in `localStorage` under keys:
- `java_hub_bookmarks` — `number[]` (question IDs)
- `java_hub_completed` — `number[]` (question IDs)

Managed by `hooks/use-tracking.ts` — loaded on mount via `useEffect`, persisted on every change.
