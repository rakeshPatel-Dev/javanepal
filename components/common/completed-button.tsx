"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CompletedButton({
  isCompleted,
  onClick,
  showText = false,
  className = "",
}: {
  isCompleted: boolean
  onClick: () => void
  showText?: boolean
  className?: string
}) {
  return (
    <Button
      variant="outline"
      size={showText ? "default" : "icon"}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      className={cn(
        "transition-all duration-200 cursor-pointer",
        isCompleted
          ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20 dark:text-emerald-400 dark:bg-emerald-950/20 dark:border-emerald-900/40 hover:text-emerald-500"
          : "hover:bg-accent text-muted-foreground hover:text-foreground",
        className,
      )}
      aria-label={isCompleted ? "Mark as incomplete" : "Mark as completed"}
      title={isCompleted ? "Mark Incomplete" : "Mark Completed"}
    >
      <CheckCircle2
        className={`w-4 h-4 transition-all duration-200 ${isCompleted ? "fill-emerald-500 text-white dark:text-slate-950" : ""}`}
      />
      {showText && <span>{isCompleted ? "Completed" : "Mark Complete"}</span>}
    </Button>
  )
}
