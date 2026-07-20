"use client"

import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft, ChevronRight, Eye, EyeOff, Clock, Star,
  BookOpen, AlertCircle, Tag as TagIcon, HelpCircle, Sparkles,
} from "lucide-react"
import { Container } from "@/components/common/container"
import { Breadcrumb } from "@/components/common/breadcrumb"
import { DifficultyBadge } from "@/components/common/difficulty-badge"
import { Tag } from "@/components/common/tag"
import { BookmarkButton } from "@/components/common/bookmark-button"
import { CompletedButton } from "@/components/common/completed-button"
import { CodeBlock } from "@/components/common/code-block"
import { EmptyState } from "@/components/common/empty-state"
import { getQuestionById, getTopicById, getUnitById, getQuestions } from "@/lib/data"
import { useTracking } from "@/hooks/use-tracking"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TYPE_COLORS } from "@/lib/types"
import { BreadcrumbSchema } from "@/components/seo/breadcrumb-schema"
import { FAQSchema } from "@/components/seo/faq-schema"
import { PersonSchema } from "@/components/seo/person-schema"

function renderAnswer(text: string) {
  if (!text) return null
  return text.split("\n").map((line, i) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return (
      <p key={i} className={`leading-relaxed ${line.trim() === "" ? "my-1" : "mb-1.5"}`}>
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**")
            ? <strong key={j} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>
            : part,
        )}
      </p>
    )
  })
}

export default function QuestionPage() {
  const { questionId } = useParams<{ questionId: string }>()
  const question = useMemo(() => getQuestionById(questionId!), [questionId])
  const topic = useMemo(() => (question ? getTopicById(question.topicId) : null), [question])
  const unit = useMemo(() => (topic ? getUnitById(topic.unitId) : null), [topic])

  const allQuestions = useMemo(() => getQuestions(), [])
  const topicQuestions = useMemo(
    () => (question ? allQuestions.filter((q) => q.topicId === question.topicId) : []),
    [allQuestions, question],
  )

  const currentIdx = topicQuestions.findIndex((q) => q.id === question?.id)
  const prevQ = currentIdx > 0 ? topicQuestions[currentIdx - 1] : null
  const nextQ = currentIdx < topicQuestions.length - 1 ? topicQuestions[currentIdx + 1] : null

  const [answerVisible, setAnswerVisible] = useState(false)
  const { isBookmarked, toggleBookmark, isCompleted, toggleCompleted } = useTracking()

  if (!question) {
    return (
      <div className="pb-16 min-h-screen flex items-center justify-center">
        <EmptyState icon={HelpCircle} title="Question not found" description="This question does not exist." />
      </div>
    )
  }

  const typeClass = TYPE_COLORS[question.type] || ""

  return (
    <div className="pb-24 min-h-screen">
      <Container className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-6">
            <Breadcrumb
              items={[
                { label: "Units", href: "/units" },
                ...(unit ? [{ label: unit.title, href: `/unit/${unit.slug || unit.id}` }] : []),
                ...(topic ? [{ label: topic.title, href: `/topic/${topic.slug || topic.id}` }] : []),
                { label: `Q${question.id}` },
              ]}
            />
            <BreadcrumbSchema
              items={[
                { name: "Home", url: "https://javanepal.vercel.app" },
                { name: "Units", url: "https://javanepal.vercel.app/units" },
                ...(unit ? [{ name: unit.title, url: `https://javanepal.vercel.app/unit/${unit.slug || unit.id}` }] : []),
                ...(topic ? [{ name: topic.title, url: `https://javanepal.vercel.app/topic/${topic.slug || topic.id}` }] : []),
                { name: `Q${question.id}: ${question.title}`, url: `https://javanepal.vercel.app/question/${question.slug || question.id}` },
              ]}
            />
            <FAQSchema
              questions={[{
                question: question.title,
                answer: question.shortAnswer,
              }]}
              datePublished={question.source?.year ? `${question.source.year}-01-01` : undefined}
            />
            <PersonSchema
              name="Rakesh Patel"
              url="https://rakeshpatel.me"
              jobTitle="Developer & Content Curator"
              description="Creator of JavaNepal — a curated Java OOP question bank for BITM 2nd Semester students."
            />

            <div className="space-y-4">
              <h1 className="text-2xl sm:text-3xl font-black text-foreground leading-snug">{question.title}</h1>

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg ${typeClass}`}>
                  {question.type}
                </Badge>
                {question.isImportant && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 text-[10px] font-bold text-amber-500 bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/40 px-2 py-0.5 rounded-lg"
                  >
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    Important
                  </Badge>
                )}
                {question.isRepeated && (
                  <Badge
                    variant="outline"
                    className="text-[10px] font-bold text-violet-600 bg-violet-50 border-violet-100 dark:bg-violet-950/20 dark:border-violet-900/40 px-2 py-0.5 rounded-lg"
                  >
                    Repeated
                  </Badge>
                )}
              </div>
            </div>

            <Card className="rounded-2xl border border-border bg-card shadow-xs gap-0 py-0 overflow-hidden">
              <CardContent className="p-6 space-y-3 border-l-4 border-primary bg-linear-to-r from-primary/25 to-transparent">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block">
                  Question
                </span>
                <p className="text-foreground text-base sm:text-lg font-bold leading-relaxed">{question.question}</p>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4">
              <Button
                onClick={() => setAnswerVisible((v) => !v)}
                className="w-fit px-6 py-3 bg-primary text-primary-foreground font-bold rounded-2xl flex items-center gap-2 shadow-md shadow-primary/20 hover:shadow-primary/30 transition-all active:scale-[0.98] h-11 cursor-pointer"
              >
                {answerVisible ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                {answerVisible ? "Hide Answer" : "Show Answer"}
              </Button>
            </div>

            <AnimatePresence>
              {answerVisible && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {question.shortAnswer && (
                    <Card className="rounded-2xl border border-border bg-card gap-0 py-0">
                      <CardContent className="p-6">
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-1 mb-2">
                          <Sparkles className="w-3.5 h-3.5" />
                          Quick Answer
                        </span>
                        <p className="text-sm text-muted-foreground leading-relaxed">{question.shortAnswer}</p>
                      </CardContent>
                    </Card>
                  )}

                  {question.detailedAnswer && (
                    <Card className="rounded-2xl border border-border bg-card gap-0 py-0">
                      <CardContent className="p-6">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block mb-2">
                          Detailed Answer
                        </span>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          {renderAnswer(question.detailedAnswer)}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {question.code && (
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider block pl-1">
                        Code Example
                      </span>
                      <CodeBlock code={question.code} fileName={`${question.slug || "Example"}.java`} />
                    </div>
                  )}

                  {question.output && (
                    <Card className="rounded-2xl border border-border bg-[#111827] text-emerald-400 gap-0 py-0 overflow-hidden shadow-md">
                      <CardContent className="p-5 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                          Output
                        </span>
                        {question.output}
                      </CardContent>
                    </Card>
                  )}

                  {question.explanation && (
                    <Card className="rounded-2xl border border-amber-200 bg-amber-500/5 dark:border-amber-900/30 gap-0 py-0">
                      <CardContent className="p-6 text-sm text-muted-foreground leading-relaxed">
                        <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-2">
                          Explanation
                        </span>
                        {question.explanation}
                      </CardContent>
                    </Card>
                  )}

                  {(question.commonMistakes ?? []).length > 0 && (
                    <Card className="rounded-2xl border border-rose-200 bg-rose-500/5 dark:border-rose-900/30 gap-0 py-0">
                      <CardContent className="p-6">
                        <span className="text-[10px] font-bold text-destructive uppercase tracking-wider block mb-3">
                          Common Mistakes
                        </span>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          {(question.commonMistakes ?? []).map((mistake, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-destructive mt-2 shrink-0" />
                              {mistake}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}

                  {(question.relatedTopics ?? []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 items-center">
                      <TagIcon className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="text-xs font-bold text-muted-foreground mr-1">Related:</span>
                      {(question.relatedTopics ?? []).map((t) => (
                        <Link
                          key={t}
                          href={`/search?q=${encodeURIComponent(t)}`}
                          className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border border-border/80 bg-muted/40 text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:border-primary/30 transition-all duration-200"
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <Card className="rounded-2xl border border-border bg-card shadow-xs gap-0 py-0">
              <CardContent className="p-6 space-y-5">
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Question Details</h3>

                <div className="space-y-3.5">
                  <div className="flex justify-between items-center py-2 border-b border-border/60 text-sm">
                    <span className="text-muted-foreground font-semibold">Difficulty</span>
                    <DifficultyBadge difficulty={question.difficulty} />
                  </div>
                  {question.marks && (
                    <div className="flex justify-between items-center py-2 border-b border-border/60 text-sm">
                      <span className="text-muted-foreground font-semibold">Weightage</span>
                      <span className="font-bold text-foreground font-mono">{question.marks} Marks</span>
                    </div>
                  )}
                  {question.estimatedTime && (
                    <div className="flex justify-between items-center py-2 border-b border-border/60 text-sm">
                      <span className="text-muted-foreground font-semibold">Estimated Time</span>
                      <span className="font-bold text-foreground flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5" />
                        {question.estimatedTime} mins
                      </span>
                    </div>
                  )}
                  {question.examFrequency && (
                    <div className="flex justify-between items-center py-2 border-b border-border/60 text-sm">
                      <span className="text-muted-foreground font-semibold">Exam Frequency</span>
                      <span className="font-bold text-primary font-mono">{question.examFrequency}</span>
                    </div>
                  )}
                  {question.source?.year && (
                    <div className="flex justify-between items-center py-2 border-b border-border/60 text-sm">
                      <span className="text-muted-foreground font-semibold">Last Updated</span>
                      <span className="font-bold text-foreground font-mono">{question.source.year}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 text-sm">
                    <span className="text-muted-foreground font-semibold">Status</span>
                    <span
                      className={`font-bold flex items-center gap-1.5 ${
                        isCompleted(question.id) ? "text-emerald-500" : "text-primary"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCompleted(question.id) ? "bg-emerald-500" : "bg-primary animate-pulse"
                        }`}
                      />
                      {isCompleted(question.id) ? "Completed" : "In Progress"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 pt-2">
                  <CompletedButton
                    isCompleted={isCompleted(question.id)}
                    onClick={() => toggleCompleted(question.id)}
                    showText
                    className="w-full justify-center rounded-2xl h-11"
                  />
                  <BookmarkButton
                    isBookmarked={isBookmarked(question.id)}
                    onClick={() => toggleBookmark(question.id)}
                    showText
                    className="w-full justify-center rounded-2xl h-11"
                  />
                </div>
              </CardContent>
            </Card>

            {topicQuestions.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">
                  Topic Roadmap
                </h3>
                <div className="space-y-3">
                  {topicQuestions.slice(0, 4).map((q) => {
                    const active = q.id === question.id
                    return (
                      <Link
                        key={q.id}
                        href={`/question/${q.slug || q.id}`}
                        className={`block p-4 rounded-2xl border transition-all duration-300 ${
                          active
                            ? "bg-primary/5 border-primary shadow-xs"
                            : "bg-card border-border hover:border-primary/20 hover:shadow-xs"
                        }`}
                      >
                        <p
                          className={`text-xs font-bold leading-snug line-clamp-2 ${
                            active ? "text-primary font-extrabold" : "text-foreground"
                          }`}
                        >
                          {q.title}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground font-bold uppercase">
                          <span>{q.difficulty}</span>
                          <span>·</span>
                          <span>{q.estimatedTime || 10}m</span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="p-5 bg-secondary border border-border/80 rounded-2xl text-foreground">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest block mb-1">
                PRO MEMBERSHIP
              </span>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Unlock full access to 500+ syllabus questions, capstones, and expert videos.
              </p>
              <Button
                className="w-full bg-primary text-primary-foreground font-bold py-2 rounded-xl text-xs hover:opacity-95 transition-all h-9 cursor-pointer"
                nativeButton={false}
                render={<Link href="/about">Upgrade to Pro</Link>}
              />
            </div>
          </aside>
        </div>
      </Container>

      <footer className="fixed bottom-0 left-0 right-0 bg-background/95 border-t border-border z-40 py-4 shadow-lg backdrop-blur-md safe-bottom">
        <Container>
          <div className="flex justify-between items-center gap-4">
            {prevQ ? (
              <Button
                variant="ghost"
                size="sm"
                nativeButton={false}
                className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-primary cursor-pointer"
                render={
                  <Link href={`/question/${prevQ.slug || prevQ.id}`}>
                    <ChevronLeft className="w-4 h-4 shrink-0" />
                    <span className="hidden sm:inline">Previous Question</span>
                  </Link>
                }
              />
            ) : (
              <div />
            )}

            <div className="hidden sm:flex items-center gap-4">
              <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Question {currentIdx + 1} of {topicQuestions.length}
              </span>
              <div className="w-32 h-2 bg-secondary rounded-full overflow-hidden border border-border/40">
                <div className="h-full bg-primary rounded-full" style={{ width: `${((currentIdx + 1) / topicQuestions.length) * 100}%` }} />
              </div>
            </div>

            {nextQ ? (
              <Button
                variant="secondary"
                size="sm"
                nativeButton={false}
                className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all cursor-pointer rounded-xl px-4 py-2"
                render={
                  <Link href={`/question/${nextQ.slug || nextQ.id}`}>
                    <span className="hidden sm:inline">Next Question</span>
                    <ChevronRight className="w-4 h-4 shrink-0" />
                  </Link>
                }
              />
            ) : (
              <div />
            )}
          </div>
        </Container>
      </footer>
    </div>
  )
}
