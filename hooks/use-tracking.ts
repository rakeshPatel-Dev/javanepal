"use client"

import { useState, useEffect, useCallback } from "react"
import { getQuestions, getQuestionsByUnitId, getQuestionsByTopicId } from "@/lib/data"
import type { Question, Progress } from "@/lib/types"

const BOOKMARKS_KEY = "java_hub_bookmarks"
const COMPLETED_KEY = "java_hub_completed"

function loadIds(key: string): number[] {
  if (typeof window === "undefined") return []
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

export function useTracking() {
  const [hydrated, setHydrated] = useState(false)
  const [bookmarks, setBookmarks] = useState<number[]>([])
  const [completed, setCompleted] = useState<number[]>([])

  useEffect(() => {
    setBookmarks(loadIds(BOOKMARKS_KEY))
    setCompleted(loadIds(COMPLETED_KEY))
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  }, [bookmarks, hydrated])

  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(COMPLETED_KEY, JSON.stringify(completed))
  }, [completed, hydrated])

  const isBookmarked = useCallback(
    (id: number) => bookmarks.includes(id),
    [bookmarks],
  )

  const toggleBookmark = useCallback((id: number) => {
    setBookmarks((prev) =>
      prev.includes(id) ? prev.filter((bId) => bId !== id) : [...prev, id],
    )
  }, [])

  const isCompleted = useCallback(
    (id: number) => completed.includes(id),
    [completed],
  )

  const toggleCompleted = useCallback((id: number) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((cId) => cId !== id) : [...prev, id],
    )
  }, [])

  const getBookmarkedQuestions = useCallback((): Question[] => {
    const allQuestions = getQuestions()
    return allQuestions.filter((q) => bookmarks.includes(q.id))
  }, [bookmarks])

  const getUnitProgress = useCallback(
    (unitId: number): Progress => {
      const unitQuestions = getQuestionsByUnitId(unitId)
      const total = unitQuestions.length
      if (total === 0) return { completed: 0, total: 0, percentage: 0 }
      const done = unitQuestions.filter((q) => completed.includes(q.id)).length
      return { completed: done, total, percentage: Math.round((done / total) * 100) }
    },
    [completed],
  )

  const getTopicProgress = useCallback(
    (topicId: number): Progress => {
      const topicQuestions = getQuestionsByTopicId(topicId)
      const total = topicQuestions.length
      if (total === 0) return { completed: 0, total: 0, percentage: 0 }
      const done = topicQuestions.filter((q) => completed.includes(q.id)).length
      return { completed: done, total, percentage: Math.round((done / total) * 100) }
    },
    [completed],
  )

  const getOverallProgress = useCallback((): Progress => {
    const allQuestions = getQuestions()
    const total = allQuestions.length
    if (total === 0) return { completed: 0, total: 0, percentage: 0 }
    const done = allQuestions.filter((q) => completed.includes(q.id)).length
    return { completed: done, total, percentage: Math.round((done / total) * 100) }
  }, [completed])

  return {
    bookmarks,
    completed,
    hydrated,
    isBookmarked,
    toggleBookmark,
    isCompleted,
    toggleCompleted,
    getBookmarkedQuestions,
    getUnitProgress,
    getTopicProgress,
    getOverallProgress,
  }
}
