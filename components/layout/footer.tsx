import Link from "next/link"
import {
   BookOpen, Search, Bookmark, Info, Heart, ExternalLink, MessageCircle, MessageSquare,
} from "lucide-react"
import { Container } from "@/components/common/container"
import { Logo } from "@/components/common/logo"

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur-md mt-auto py-12 md:py-16 px-3 sm:px-5 lg:px-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-10">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group w-fit">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-center">
                  <Logo className="w-15 h-15 object-contain" />
                </div>
              </div>
              <span className="text-foreground flex items-start flex-col text-xl font-black">
                JavaNepal
                <p className="text-xs text-muted-foreground font-semibold leading-relaxed uppercase">
                  Curated Java Questions
                </p>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A clean, fast question bank built for personal study and exam revision based on BITM 2nd Semester Java OOP syllabus.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Navigate
            </h3>
            <ul className="space-y-2.5">
              {[
                { href: "/units", label: "All Units", icon: BookOpen },
                { href: "/search", label: "Search", icon: Search },
                { href: "/bookmarks", label: "Bookmarks", icon: Bookmark },
                { href: "/feedback", label: "Feedback", icon: MessageSquare },
                { href: "/about", label: "About", icon: Info },
              ].map(({ href, label, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 group-hover:scale-105 transition-transform duration-200" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Information
            </h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Content: Java OOP (BITM 2nd Sem)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Data: 9 Units · 77 Topics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Progress saved in Local Storage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>Free & Open Source</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">
              Developer
            </h3>
            <div className="space-y-3">
              <a
                href="https://rakeshpatel.me"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="flex items-center gap-3 w-full p-3.5 rounded-2xl bg-secondary border border-border/80 hover:border-primary/30 transition-all duration-300">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                    RP
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground leading-tight">Rakesh Patel</p>
                    <span className="flex items-center gap-1 text-[11px] text-muted-foreground group-hover:text-primary transition-colors duration-250 mt-0.5">
                      rakeshpatel.me
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                    </span>
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <MessageCircle className="w-3.5 h-3.5" />
                <a href="mailto:dev@rakeshpatel.me">
                  Connect:{" "}
                  <span className="hover:text-primary transition-all duration-200 font-semibold hover:underline">
                    dev@rakeshpatel.me
                  </span>
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500/20 animate-pulse" />
                <span>Built for students</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>© {year} JavaNepal. All rights reserved.</span>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Syllabus Study Hub
            </span>
            <span className="hidden sm:inline text-muted-foreground/30">|</span>
            <span className="flex items-center gap-1">Made by Rakesh Patel</span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
