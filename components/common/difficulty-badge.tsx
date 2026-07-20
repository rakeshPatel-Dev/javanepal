import { Badge } from "@/components/ui/badge"

export function DifficultyBadge({ difficulty, className = "" }: { difficulty?: string; className?: string }) {
  const styles: Record<string, string> = {
    easy: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-850/40",
    medium: "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-850/40",
    hard: "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:bg-rose-950/20 dark:text-rose-400 dark:border-rose-850/40",
  }

  return (
    <Badge
      variant="outline"
      className={`font-semibold px-2 py-0.5 rounded-full ${styles[difficulty?.toLowerCase() ?? ""] ?? "bg-muted text-muted-foreground border-border"} ${className}`}
    >
      {difficulty}
    </Badge>
  )
}
