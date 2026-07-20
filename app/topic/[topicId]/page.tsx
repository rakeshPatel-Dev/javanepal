"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { SlidersHorizontal, BookOpen, X } from "lucide-react"
import { Container } from "@/components/common/container"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { PageHeader } from "@/components/common/page-header"
import { FilterBar } from "@/components/common/filter-bar"
import { QuestionCard } from "@/components/questions/question-card"
import { EmptyState } from "@/components/common/empty-state"
import { getTopicById, getUnitById, getQuestionsByTopicId } from "@/lib/data"
import { useTracking } from "@/hooks/use-tracking"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import type { Question } from "@/lib/types"

function sortQuestions(questions: Question[], sortBy: string): Question[] {
  const order: Record<string, number> = { Easy: 0, Medium: 1, Hard: 2 }
  switch (sortBy) {
    case "alphabetical":
      return [...questions].sort((a, b) => a.title.localeCompare(b.title))
    case "difficulty-asc":
      return [...questions].sort((a, b) => (order[a.difficulty] ?? 1) - (order[b.difficulty] ?? 1))
    case "difficulty-desc":
      return [...questions].sort((a, b) => (order[b.difficulty] ?? 1) - (order[a.difficulty] ?? 1))
    default:
      return questions
  }
}

export default function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const topic = useMemo(() => getTopicById(topicId!), [topicId])
  const allQuestions = useMemo(() => getQuestionsByTopicId(topicId!), [topicId])
  const unit = useMemo(() => (topic ? getUnitById(topic.unitId) : null), [topic])

  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [sortBy, setSortBy] = useState("default")

  const { isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useTracking()
  const hasFilters = selectedDifficulties.length > 0 || selectedTypes.length > 0 || sortBy !== "default"

  const filtered = useMemo(() => {
    let qs = allQuestions
    if (selectedDifficulties.length > 0) qs = qs.filter((q) => selectedDifficulties.includes(q.difficulty))
    if (selectedTypes.length > 0) qs = qs.filter((q) => selectedTypes.includes(q.type))
    return sortQuestions(qs, sortBy)
  }, [allQuestions, selectedDifficulties, selectedTypes, sortBy])

  const toggleDifficulty = (d: string) =>
    setSelectedDifficulties((prev) => (prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]))
  const toggleType = (t: string) =>
    setSelectedTypes((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))
  const clearFilters = () => {
    setSelectedDifficulties([])
    setSelectedTypes([])
    setSortBy("default")
  }

  if (!topic) {
    return (
      <div className="pb-16 min-h-screen flex items-center justify-center">
        <EmptyState icon={BookOpen} title="Topic not found" />
      </div>
    )
  }

  return (
    <div className="pb-16 min-h-screen">
      <Container className="py-8">
        <Breadcrumb
          items={[
            { label: "Units", href: "/units" },
            ...(unit ? [{ label: unit.title, href: `/unit/${unit.slug || unit.id}` }] : []),
            { label: topic.title },
          ]}
        />

        <div className="mt-6">
          <PageHeader title={topic.title} description={`${allQuestions.length} questions in this topic`} />

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filtered.length}</span> of {allQuestions.length} questions
            </p>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger render={<Button variant={hasFilters ? "secondary" : "outline"} size="sm" className="gap-1.5 cursor-pointer" />}>
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  Filters
                  {hasFilters && <span className="ml-0.5 text-[10px]">({selectedDifficulties.length + selectedTypes.length})</span>}
                </SheetTrigger>
                <SheetContent side="bottom" className="h-auto max-h-[80vh] overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Filter Questions</SheetTitle>
                    {hasFilters && (
                      <button onClick={clearFilters} className="text-xs font-bold text-primary hover:text-destructive transition-colors flex items-center gap-1 cursor-pointer">
                        <X className="w-3 h-3" />
                        Clear all
                      </button>
                    )}
                  </SheetHeader>
                  <div className="px-5 pb-6">
                    <FilterBar
                      selectedDifficulties={selectedDifficulties}
                      onDifficultyChange={toggleDifficulty}
                      selectedTypes={selectedTypes}
                      onTypeChange={toggleType}
                      sortBy={sortBy}
                      onSortChange={setSortBy}
                      onClear={clearFilters}
                    />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          <div className="hidden md:block mb-5">
            <Card className="gap-0 py-0 rounded-3xl border border-border bg-card shadow-xs">
              <CardContent className="p-4">
                <FilterBar
                  selectedDifficulties={selectedDifficulties}
                  onDifficultyChange={toggleDifficulty}
                  selectedTypes={selectedTypes}
                  onTypeChange={toggleType}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  onClear={clearFilters}
                />
              </CardContent>
            </Card>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon={SlidersHorizontal}
              title="No questions match your filters"
              description="Try adjusting your difficulty or type filters."
            />
          ) : (
            <motion.div
              className="space-y-3"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            >
              <AnimatePresence mode="popLayout">
                {filtered.map((question) => (
                  <QuestionCard
                    key={question.id}
                    question={question}
                    isBookmarked={isBookmarked(question.id)}
                    onToggleBookmark={() => toggleBookmark(question.id)}
                    isCompleted={isCompleted(question.id)}
                    onToggleCompleted={() => toggleCompleted(question.id)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </Container>
    </div>
  )
}
