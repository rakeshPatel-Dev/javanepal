export interface Source {
  type: string
  year?: number
  group?: string
  marks?: number
}

export interface Question {
  id: number
  unitId: number
  topicId: number
  title: string
  slug: string
  type: string
  difficulty: string
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
  source?: Source
}

export interface Topic {
  id: number
  unitId: number
  title: string
  slug: string
  estimatedQuestions: number
}

export interface EnrichedTopic extends Omit<Topic, "estimatedQuestions"> {
  estimatedQuestions: number
  questionCount: number
  stats: {
    easy: number
    medium: number
    hard: number
  }
}

export interface Unit {
  id: number
  slug: string
  title: string
  description: string
  estimatedHours: number
  difficulty: string
  icon: string
  color: string
  questionCount: number
  topics: number
}

export interface EnrichedUnit extends Unit {
  questionCount: number
  topicsCount: number
  stats: {
    easy: number
    medium: number
    hard: number
  }
}

export interface GlobalStats {
  totalUnits: number
  totalTopics: number
  totalQuestions: number
  difficulty: {
    easy: number
    medium: number
    hard: number
  }
  types: Record<string, number>
}

export interface Progress {
  completed: number
  total: number
  percentage: number
}
