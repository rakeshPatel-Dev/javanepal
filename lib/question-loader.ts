import type { Question, QuestionIndexEntry } from "@/lib/types"
import questionsIndexJson from "@/data/questions/index.json"

const index = questionsIndexJson as QuestionIndexEntry[]
const indexMap = new Map<number, QuestionIndexEntry>(index.map(q => [q.id, q]))

const unitLoaders: Record<number, () => Promise<Question[]>> = {
  1: () => import("@/data/questions/unit-1.json").then(m => m.default as Question[]),
  2: () => import("@/data/questions/unit-2.json").then(m => m.default as Question[]),
  3: () => import("@/data/questions/unit-3.json").then(m => m.default as Question[]),
  4: () => import("@/data/questions/unit-4.json").then(m => m.default as Question[]),
  5: () => import("@/data/questions/unit-5.json").then(m => m.default as Question[]),
  6: () => import("@/data/questions/unit-6.json").then(m => m.default as Question[]),
  7: () => import("@/data/questions/unit-7.json").then(m => m.default as Question[]),
  8: () => import("@/data/questions/unit-8.json").then(m => m.default as Question[]),
  9: () => import("@/data/questions/unit-9.json").then(m => m.default as Question[]),
}

const loadedCache = new Map<number, Question[]>()

async function loadUnit(unitId: number): Promise<Question[]> {
  if (loadedCache.has(unitId)) return loadedCache.get(unitId)!
  const questions = await unitLoaders[unitId]()
  loadedCache.set(unitId, questions)
  return questions
}

export async function loadUnitQuestions(unitId: number): Promise<Question[]> {
  return loadUnit(unitId)
}

export async function loadQuestionById(id: number): Promise<Question | null> {
  const entry = indexMap.get(id)
  if (!entry) return null
  const questions = await loadUnit(entry.unitId)
  return questions.find(q => q.id === id) || null
}

export async function loadQuestionsByIds(ids: number[]): Promise<Question[]> {
  const unitIds = new Set<number>()
  for (const id of ids) {
    const entry = indexMap.get(id)
    if (entry) unitIds.add(entry.unitId)
  }
  const results: Question[] = []
  for (const unitId of unitIds) {
    const questions = await loadUnit(unitId)
    for (const q of questions) {
      if (ids.includes(q.id)) results.push(q)
    }
  }
  return results
}

export async function loadAllQuestions(): Promise<Question[]> {
  const all: Question[] = []
  for (let i = 1; i <= 9; i++) {
    const questions = await loadUnit(i)
    all.push(...questions)
  }
  return all
}
