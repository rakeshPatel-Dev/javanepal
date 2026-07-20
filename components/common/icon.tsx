import * as LucideIcons from "lucide-react"

export function Icon({ name, className = "" }: { name: string; className?: string }) {
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[name] || LucideIcons.HelpCircle
  return <IconComponent className={className} />
}
