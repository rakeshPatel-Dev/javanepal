"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DIFFICULTIES, QUESTION_TYPES, SORT_OPTIONS, DIFFICULTY_STYLES } from "@/lib/types"

export function FilterBar({
  selectedDifficulties = [],
  onDifficultyChange,
  selectedTypes = [],
  onTypeChange,
  sortBy = "default",
  onSortChange,
  onClear,
  className = "",
}: {
  selectedDifficulties?: string[]
  onDifficultyChange: (d: string) => void
  selectedTypes?: string[]
  onTypeChange: (t: string) => void
  sortBy?: string
  onSortChange: (s: string) => void
  onClear: () => void
  className?: string
}) {
  const hasFilters = selectedDifficulties.length > 0 || selectedTypes.length > 0 || sortBy !== "default"

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full sm:w-auto">
          Difficulty
        </span>
        <div className="flex flex-wrap gap-1.5">
          {DIFFICULTIES.map((d) => (
            <button key={d} onClick={() => onDifficultyChange(d)} className="cursor-pointer">
              <Badge
                variant={selectedDifficulties.includes(d) ? "default" : "outline"}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer ${
                  selectedDifficulties.includes(d) ? "shadow-sm" : `${DIFFICULTY_STYLES[d]} hover:opacity-80`
                }`}
              >
                {d}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex flex-wrap items-start gap-2">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full sm:w-auto pt-1">
          Type
        </span>
        <div className="flex flex-wrap gap-1.5">
          {QUESTION_TYPES.map((t) => (
            <button key={t} onClick={() => onTypeChange(t)} className="cursor-pointer">
              <Badge
                variant={selectedTypes.includes(t) ? "default" : "outline"}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:opacity-80"
              >
                {t}
              </Badge>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Sort</span>
        <div className="flex gap-1.5 flex-wrap">
          {SORT_OPTIONS.map((opt) => (
            <button key={opt.value} onClick={() => onSortChange(opt.value)} className="cursor-pointer">
              <Badge
                variant={sortBy === opt.value ? "default" : "outline"}
                className="text-xs font-medium px-3 py-1.5 rounded-lg transition-all duration-200 cursor-pointer hover:opacity-80"
              >
                {opt.label}
              </Badge>
            </button>
          ))}
        </div>
        {hasFilters && (
          <Button
            variant="ghost"
            size="xs"
            onClick={onClear}
            className="ml-auto text-muted-foreground hover:text-destructive gap-1"
          >
            <X className="w-3.5 h-3.5" />
            Clear
          </Button>
        )}
      </div>
    </div>
  )
}
