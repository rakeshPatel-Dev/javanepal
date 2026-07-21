import unitsDataJson from "@/data/units.json"
import topicsDataJson from "@/data/topics.json"
import questionsIndexJson from "@/data/questions/index.json"
import type { EnrichedUnit, EnrichedTopic, QuestionIndexEntry, GlobalStats, Unit, Topic } from "@/lib/types"

const unitsData = unitsDataJson as Unit[]
const topicsData = topicsDataJson as Topic[]
const questionsIndex = questionsIndexJson as QuestionIndexEntry[]

const unitsMap = new Map<number, Unit>(unitsData.map(u => [u.id, u]))
const unitsSlugMap = new Map<string, Unit>(unitsData.map(u => [u.slug, u]))
const topicsMap = new Map<number, Topic>(topicsData.map(t => [t.id, t]))
const topicsSlugMap = new Map<string, Topic>(topicsData.map(t => [t.slug, t]))
const questionsIndexMap = new Map<number, QuestionIndexEntry>(questionsIndex.map(q => [q.id, q]))
const questionsByUnitMap = new Map<number, QuestionIndexEntry[]>()
const questionsByTopicMap = new Map<number, QuestionIndexEntry[]>()

for (const q of questionsIndex) {
  const unitList = questionsByUnitMap.get(q.unitId)
  if (unitList) unitList.push(q)
  else questionsByUnitMap.set(q.unitId, [q])

  const topicList = questionsByTopicMap.get(q.topicId)
  if (topicList) topicList.push(q)
  else questionsByTopicMap.set(q.topicId, [q])
}

function getById<T>(map: Map<number, T>, slugMap: Map<string, T>, id: string | number): T | null {
  if (!id) return null
  const parsedId = parseInt(String(id))
  if (!isNaN(parsedId) && String(parsedId) === String(id).trim()) {
    const found = map.get(parsedId)
    if (found) return found
  }
  return slugMap.get(String(id)) || null
}

export const getQuestions = (): QuestionIndexEntry[] => [...questionsIndex]

export const getUnits = (): EnrichedUnit[] =>
  unitsData.map((unit) => {
    const unitQuestions = questionsByUnitMap.get(unit.id) || []
    const unitTopics = topicsData.filter((t) => t.unitId === unit.id)
    const easyCount = unitQuestions.filter((q) => q.difficulty === "Easy").length
    const mediumCount = unitQuestions.filter((q) => q.difficulty === "Medium").length
    const hardCount = unitQuestions.filter((q) => q.difficulty === "Hard").length
    return {
      ...unit,
      questionCount: unitQuestions.length,
      topicsCount: unitTopics.length,
      stats: { easy: easyCount, medium: mediumCount, hard: hardCount },
    }
  })

export const getTopics = (): EnrichedTopic[] =>
  topicsData.map((topic) => {
    const topicQuestions = questionsByTopicMap.get(topic.id) || []
    const easyCount = topicQuestions.filter((q) => q.difficulty === "Easy").length
    const mediumCount = topicQuestions.filter((q) => q.difficulty === "Medium").length
    const hardCount = topicQuestions.filter((q) => q.difficulty === "Hard").length
    return {
      ...topic,
      questionCount: topicQuestions.length,
      stats: { easy: easyCount, medium: mediumCount, hard: hardCount },
    }
  })

export const getUnitById = (unitId: string | number): EnrichedUnit | null => {
  const unit = getById(unitsMap, unitsSlugMap, unitId)
  if (!unit) return null
  const unitQuestions = questionsByUnitMap.get(unit.id) || []
  const unitTopics = topicsData.filter((t) => t.unitId === unit.id)
  const easyCount = unitQuestions.filter((q) => q.difficulty === "Easy").length
  const mediumCount = unitQuestions.filter((q) => q.difficulty === "Medium").length
  const hardCount = unitQuestions.filter((q) => q.difficulty === "Hard").length
  return {
    ...unit,
    questionCount: unitQuestions.length,
    topicsCount: unitTopics.length,
    stats: { easy: easyCount, medium: mediumCount, hard: hardCount },
  }
}

export const getTopicById = (topicId: string | number): EnrichedTopic | null => {
  const topic = getById(topicsMap, topicsSlugMap, topicId)
  if (!topic) return null
  const topicQuestions = questionsByTopicMap.get(topic.id) || []
  const easyCount = topicQuestions.filter((q) => q.difficulty === "Easy").length
  const mediumCount = topicQuestions.filter((q) => q.difficulty === "Medium").length
  const hardCount = topicQuestions.filter((q) => q.difficulty === "Hard").length
  return {
    ...topic,
    questionCount: topicQuestions.length,
    stats: { easy: easyCount, medium: mediumCount, hard: hardCount },
  }
}

export const getQuestionById = (questionId: string | number): QuestionIndexEntry | null =>
  questionsIndexMap.get(parseInt(String(questionId))) ||
  questionsIndex.find((q) => q.slug === questionId) ||
  null

export const getTopicsByUnitId = (unitId: string | number): EnrichedTopic[] => {
  const unit = getUnitById(unitId)
  if (!unit) return []
  return topicsData
    .filter((t) => t.unitId === unit.id)
    .map((topic) => {
      const topicQuestions = questionsByTopicMap.get(topic.id) || []
      const easyCount = topicQuestions.filter((q) => q.difficulty === "Easy").length
      const mediumCount = topicQuestions.filter((q) => q.difficulty === "Medium").length
      const hardCount = topicQuestions.filter((q) => q.difficulty === "Hard").length
      return {
        ...topic,
        questionCount: topicQuestions.length,
        stats: { easy: easyCount, medium: mediumCount, hard: hardCount },
      }
    })
}

export const getQuestionsByTopicId = (topicId: string | number): QuestionIndexEntry[] => {
  const topic = getTopicById(topicId)
  if (!topic) return []
  return questionsByTopicMap.get(topic.id) || []
}

export const getQuestionsByUnitId = (unitId: string | number): QuestionIndexEntry[] => {
  const unit = getUnitById(unitId)
  if (!unit) return []
  return questionsByUnitMap.get(unit.id) || []
}

export const getGlobalStats = (): GlobalStats => ({
  totalUnits: unitsData.length,
  totalTopics: topicsData.length,
  totalQuestions: questionsIndex.length,
  difficulty: {
    easy: questionsIndex.filter((q) => q.difficulty === "Easy").length,
    medium: questionsIndex.filter((q) => q.difficulty === "Medium").length,
    hard: questionsIndex.filter((q) => q.difficulty === "Hard").length,
  },
  types: questionsIndex.reduce(
    (acc, q) => {
      acc[q.type] = (acc[q.type] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  ),
})
