"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Star, ChevronRight } from "lucide-react"
import { DifficultyBadge } from "@/components/common/difficulty-badge"
import { Tag } from "@/components/common/tag"
import { BookmarkButton } from "@/components/common/bookmark-button"
import { CompletedButton } from "@/components/common/completed-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { TYPE_COLORS } from "@/lib/types"
import type { Question } from "@/lib/types"

export function QuestionCard({
  question,
  isBookmarked,
  onToggleBookmark,
  isCompleted,
  onToggleCompleted,
}: {
  question: Question
  isBookmarked: boolean
  onToggleBookmark: () => void
  isCompleted: boolean
  onToggleCompleted: () => void
}) {
  const typeClass = TYPE_COLORS[question.type] || "text-slate-600 bg-slate-50 border-slate-100"

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22 }}
    >
      <Card
        className={`group relative overflow-hidden transition-all duration-300 rounded-2xl gap-0 py-0 ${
          isCompleted
            ? "border-emerald-200/60 dark:border-emerald-900/30 bg-emerald-50/30 dark:bg-emerald-900/5 hover:shadow-md"
            : "border-border/60 hover:border-primary/20 hover:shadow-md"
        }`}
      >
        {isCompleted && <div className="h-0.5 w-full bg-emerald-500/50 flex-shrink-0" />}

        <CardContent className="p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <Badge variant="outline" className={`text-xs font-semibold px-2 py-0.5 rounded-md ${typeClass}`}>
                  {question.type}
                </Badge>
                <DifficultyBadge difficulty={question.difficulty} />
                {question.isImportant && (
                  <Badge
                    variant="outline"
                    className="flex items-center gap-0.5 text-[10px] font-semibold text-amber-500 bg-amber-50 border-amber-100/60 dark:bg-amber-900/20 dark:border-amber-900/30 px-1.5 py-0.5"
                  >
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    Important
                  </Badge>
                )}
                {question.marks && (
                  <span className="text-[11px] text-muted-foreground font-mono">{question.marks}M</span>
                )}
              </div>

              <Link
                href={`/question/${question.slug || question.id}`}
                className="block text-sm font-semibold text-foreground leading-snug hover:text-primary transition-colors duration-150 mb-2"
              >
                {question.title}
              </Link>

              <div className="flex flex-wrap items-center gap-2">
                {question.estimatedTime && (
                  <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {question.estimatedTime} min
                  </span>
                )}
                {question.tags?.slice(0, 3).map((tag) => (
                  <Tag key={tag} name={tag} />
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              <BookmarkButton isBookmarked={isBookmarked} onClick={onToggleBookmark} />
              <CompletedButton isCompleted={isCompleted} onClick={onToggleCompleted} />
            </div>
          </div>

          <Separator className="mt-3 mb-2" />
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="xs"
              nativeButton={false}
              className="text-primary hover:text-primary hover:bg-primary/10 gap-1"
              render={
                <Link href={`/question/${question.slug || question.id}`}>
                  View Question
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              }
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
