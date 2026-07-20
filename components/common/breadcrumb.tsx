import Link from "next/link"
import { Home } from "lucide-react"
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export function Breadcrumb({ items = [] }: { items?: { label: string; href?: string }[] }) {
  return (
    <ShadcnBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" className="flex items-center gap-1"><Home className="w-3.5 h-3.5" /></Link>} />
        </BreadcrumbItem>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1
          return (
            <span key={idx} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage className="truncate max-w-[200px] font-semibold">{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    render={<Link href={item.href} className="truncate max-w-[200px]">{item.label}</Link>}
                  />
                )}
              </BreadcrumbItem>
            </span>
          )
        })}
      </BreadcrumbList>
    </ShadcnBreadcrumb>
  )
}
