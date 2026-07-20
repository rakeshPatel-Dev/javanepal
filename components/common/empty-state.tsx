"use client"

import { MotionDiv } from "@/components/common/motion-div"
import type { LucideIcon } from "lucide-react"

export function EmptyState({
  icon: Icon,
  title = "Nothing here yet",
  description = "",
  action,
}: {
  icon?: LucideIcon
  title?: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <MotionDiv
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center text-center py-16 px-6"
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5 shadow-sm">
          <Icon className="w-7 h-7 text-muted-foreground" />
        </div>
      )}
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-muted-foreground max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </MotionDiv>
  )
}
