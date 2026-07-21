export interface QuestionIndexEntry {
  id: number
  unitId: number
  topicId: number
  title: string
  slug: string
  difficulty: Difficulty
  type: QuestionType
  tags: string[]
  marks: number
  estimatedTime: number
  isProgramming: boolean
  isImportant: boolean
  examFrequency: string
  shortAnswer: string
}

export interface Source {
  type: string
  year?: number
  group?: string
  marks?: number
}

export type Difficulty = "Easy" | "Medium" | "Hard"

export type QuestionType =
  | "Theory"
  | "Programming"
  | "MCQ"
  | "Interview"
  | "Viva"
  | "Debugging"
  | "Output"
  | "Lab"
  | "Assignment"

export type SortBy = "default" | "alphabetical" | "difficulty-asc" | "difficulty-desc"

export interface FilterState {
  difficulties: Difficulty[]
  types: QuestionType[]
  sortBy: SortBy
}

export interface Question extends QuestionIndexEntry {
  isRepeated: boolean
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
  difficulty: Difficulty
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

export interface SyllabusUnit {
  unitNumber: number
  unitTitle: string
  lectureHours: number
  topics: string[]
}

export interface Textbook {
  title: string
  edition: string
  author: string
  publisher: string
  year: number
}

export interface Syllabus {
  courseTitle: string
  natureOfCourse: string
  semester: string
  credits: number
  lectureHours: number
  courseObjectives: string
  courseDescription: string
  units: SyllabusUnit[]
  laboratoryWorks: string
  textBooks: Textbook[]
  referenceBooks: Textbook[]
}

export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"]

export const QUESTION_TYPES: QuestionType[] = [
  "Theory",
  "Programming",
  "MCQ",
  "Interview",
  "Viva",
  "Debugging",
  "Output",
  "Lab",
  "Assignment",
]

export const SORT_OPTIONS: { value: SortBy; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "alphabetical", label: "A → Z" },
  { value: "difficulty-asc", label: "Easy First" },
  { value: "difficulty-desc", label: "Hard First" },
]

export const DIFFICULTY_STYLES: Record<Difficulty, string> = {
  Easy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  Medium: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  Hard: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
}

export const TYPE_COLORS: Record<QuestionType, string> = {
  Theory: "text-blue-600 bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30",
  Programming:
    "text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-900/20 dark:text-violet-400 dark:border-violet-900/30",
  MCQ: "text-amber-600 bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30",
  Interview:
    "text-pink-600 bg-pink-50 border-pink-100 dark:bg-pink-900/20 dark:text-pink-400 dark:border-pink-900/30",
  Viva: "text-teal-600 bg-teal-50 border-teal-100 dark:bg-teal-900/20 dark:text-teal-400 dark:border-teal-900/30",
  Debugging:
    "text-rose-600 bg-rose-50 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30",
  Output: "text-cyan-600 bg-cyan-50 border-cyan-100 dark:bg-cyan-900/20 dark:text-cyan-400 dark:border-cyan-900/30",
  Lab: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30",
  Assignment:
    "text-orange-600 bg-orange-50 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30",
}
