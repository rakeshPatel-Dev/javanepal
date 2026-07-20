import unitsData from "@/data/units.json"
import topicsData from "@/data/topics.json"
import questionsData from "@/data/questions.json"
import type { EnrichedUnit, EnrichedTopic, Question, GlobalStats } from "@/lib/types"

export const getQuestions = (): Question[] => [...questionsData]

export const getUnits = (): EnrichedUnit[] =>
  unitsData.map((unit) => {
    const unitQuestions = questionsData.filter((q) => q.unitId === unit.id)
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
    const topicQuestions = questionsData.filter((q) => q.topicId === topic.id)
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
  const units = getUnits()
  if (!unitId) return null
  const parsedId = parseInt(String(unitId))
  if (!isNaN(parsedId) && String(parsedId) === String(unitId).trim()) {
    const found = units.find((u) => u.id === parsedId)
    if (found) return found
  }
  return units.find((u) => u.slug === unitId) || null
}

export const getTopicById = (topicId: string | number): EnrichedTopic | null => {
  const topics = getTopics()
  if (!topicId) return null
  const parsedId = parseInt(String(topicId))
  if (!isNaN(parsedId) && String(parsedId) === String(topicId).trim()) {
    const found = topics.find((t) => t.id === parsedId)
    if (found) return found
  }
  return topics.find((t) => t.slug === topicId) || null
}

export const getQuestionById = (questionId: string | number): Question | null => {
  if (!questionId) return null
  const parsedId = parseInt(String(questionId))
  if (!isNaN(parsedId) && String(parsedId) === String(questionId).trim()) {
    const found = questionsData.find((q) => q.id === parsedId)
    if (found) return found
  }
  return questionsData.find((q) => q.slug === questionId) || null
}

export const getTopicsByUnitId = (unitId: string | number): EnrichedTopic[] => {
  const unit = getUnitById(unitId)
  if (!unit) return []
  return getTopics().filter((t) => t.unitId === unit.id)
}

export const getQuestionsByTopicId = (topicId: string | number): Question[] => {
  const topic = getTopicById(topicId)
  if (!topic) return []
  return questionsData.filter((q) => q.topicId === topic.id)
}

export const getQuestionsByUnitId = (unitId: string | number): Question[] => {
  const unit = getUnitById(unitId)
  if (!unit) return []
  return questionsData.filter((q) => q.unitId === unit.id)
}

export const getGlobalStats = (): GlobalStats => {
  const questions = getQuestions()
  const units = getUnits()
  const topics = getTopics()

  return {
    totalUnits: units.length,
    totalTopics: topics.length,
    totalQuestions: questions.length,
    difficulty: {
      easy: questions.filter((q) => q.difficulty === "Easy").length,
      medium: questions.filter((q) => q.difficulty === "Medium").length,
      hard: questions.filter((q) => q.difficulty === "Hard").length,
    },
    types: questions.reduce(
      (acc, q) => {
        acc[q.type] = (acc[q.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    ),
  }
}
