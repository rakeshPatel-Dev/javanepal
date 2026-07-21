"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  Clock,
  BookOpen,
  GraduationCap,
  Library,
  Trophy,
  Target,
  Code2,
  ExternalLink,
  ChevronRight,
  BookMarked,
  Download,
  FileText,
} from "lucide-react"
import { Container } from "@/components/common/container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Syllabus, EnrichedUnit } from "@/lib/types"
import { MotionDiv } from "@/components/common/motion-div"
import { Button } from "@/components/ui/button"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

export default function SyllabusClient({
  syllabus,
  units,
}: {
  syllabus: Syllabus
  units: EnrichedUnit[]
}) {
  const [expandedUnit, setExpandedUnit] = useState<number | null>(1)

  const totalTopics = syllabus.units.reduce((sum, u) => sum + u.topics.length, 0)
  const totalHours = syllabus.units.reduce((sum, u) => sum + u.lectureHours, 0)

  const unitColors = [
    "from-amber-500/20 to-amber-600/5 border-amber-500/20",
    "from-blue-500/20 to-blue-600/5 border-blue-500/20",
    "from-violet-500/20 to-violet-600/5 border-violet-500/20",
    "from-pink-500/20 to-pink-600/5 border-pink-500/20",
    "from-red-500/20 to-red-600/5 border-red-500/20",
    "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20",
    "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
  ]

  return (
    <div className="min-h-screen bg-background pb-16">
      <section className="mesh-gradient relative overflow-hidden py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="hero-grid" />
        <div className="absolute top-1/3 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-5">
            <MotionDiv
              {...fadeUp(0)}
              className="px-4 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-widest border border-primary/20"
            >
              {syllabus.natureOfCourse}
            </MotionDiv>

            <MotionDiv
              {...fadeUp(0.08)}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tight"
            >
              {syllabus.courseTitle}
            </MotionDiv>

            <MotionDiv
              {...fadeUp(0.16)}
              className="text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed"
            >
              {syllabus.courseDescription}
            </MotionDiv>

            <MotionDiv
              {...fadeUp(0.22)}
              className="flex flex-wrap items-center justify-center gap-3 mt-2"
            >
              <Badge variant="outline" className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-card">
                <GraduationCap className="w-3.5 h-3.5 text-primary" />
                Semester {syllabus.semester}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-card">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                {syllabus.credits} Credits
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-card">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {syllabus.lectureHours} Hours
              </Badge>
            </MotionDiv>

            <MotionDiv {...fadeUp(0.28)}>
              <a
                href="/docs/OOP%20with%20Java%20Syllabus.pdf"
                download
                className="inline-flex items-center gap-2.5 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold shadow-lg shadow-primary/25 hover:brightness-110 hover:scale-[1.02] transition-all text-sm group"
              >
                <FileText className="w-4.5 h-4.5" />
                Download Syllabus PDF
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </MotionDiv>
          </div>
        </Container>
      </section>

      <Container className="-mt-8 relative z-20">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
          {[
            { value: syllabus.units.length, label: "Units", icon: BookOpen },
            { value: totalTopics, label: "Topics", icon: BookMarked },
            { value: totalHours, label: "Lecture Hours", icon: Clock },
            { value: units.length, label: "Question Units", icon: Code2 },
          ].map(({ value, label, icon: Icon }, i) => (
            <MotionDiv
              key={label}
              {...fadeUp(i * 0.06)}
              className="p-4 sm:p-5 rounded-2xl bg-card border border-border text-center hover:border-primary/20 hover:shadow-md transition-all duration-300"
            >
              <Icon className="w-5 h-5 mx-auto mb-2 text-primary" />
              <span className="text-xl sm:text-2xl font-black text-foreground font-mono block">{value}</span>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5 block">{label}</span>
            </MotionDiv>
          ))}
        </div>

        <MotionDiv {...fadeUp(0.1)} className="mb-12">
          <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-2">Course Objectives</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{syllabus.courseObjectives}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.14)} className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Curriculum</p>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Course Units</h2>
            </div>
            <p className="text-sm text-muted-foreground font-medium hidden sm:block">{syllabus.units.length} units</p>
          </div>

          <div className="space-y-3">
            {syllabus.units.map((unit, idx) => {
              const isOpen = expandedUnit === unit.unitNumber
              const unitData = units.find((u) => u.id === unit.unitNumber)
              return (
                <motion.div
                  key={unit.unitNumber}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                  className={`rounded-2xl border bg-card overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? `border-primary/30 shadow-md bg-linear-to-br ${unitColors[idx % unitColors.length]}`
                      : "border-border hover:border-primary/20 hover:shadow-sm"
                  }`}
                >
                  <button
                    onClick={() => setExpandedUnit(isOpen ? null : unit.unitNumber)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left cursor-pointer gap-4"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-sm font-black shrink-0">
                        {unit.unitNumber}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-foreground leading-snug">
                          {unit.unitTitle}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-medium">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {unit.lectureHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {unit.topics.length} topics
                          </span>
                          {unitData && (
                            <Link
                              href={`/unit/${unitData.slug || unitData.id}`}
                              onClick={(e) => e.stopPropagation()}
                              className="flex items-center gap-1 text-primary hover:underline"
                            >
                              <Code2 className="w-3 h-3" />
                              Practice
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-border/50 mt-0">
                          <div className="pt-3">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
                              Topics Covered
                            </p>
                            <ul className="space-y-1.5">
                              {unit.topics.map((topic, i) => (
                                <motion.li
                                  key={topic}
                                  initial={{ opacity: 0, x: -8 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.25, delay: i * 0.02 }}
                                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 mt-1.5 shrink-0" />
                                  {topic}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.18)} className="mb-12">
          <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-2">Laboratory Works</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{syllabus.laboratoryWorks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.22)} className="mb-12">
          <div className="mb-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Resources</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Textbooks & References</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...syllabus.textBooks, ...syllabus.referenceBooks].map((book, i) => (
              <motion.div
                key={`${book.title}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className="p-5 sm:p-6 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <Library className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-foreground leading-snug">{book.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                      {book.author} &middot; {book.edition}
                    </p>
                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                      {book.publisher}, {book.year}
                    </p>
                    <Badge
                      variant="outline"
                      className="mt-2 text-[10px] font-bold px-2 py-0.5 rounded-lg bg-primary/5 text-primary border-primary/20"
                    >
                      {i < syllabus.textBooks.length ? "Textbook" : "Reference"}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.26)}>
          <div className="bg-foreground dark:bg-card rounded-2xl px-8 py-14 md:px-16 text-center flex flex-col items-center gap-5 relative overflow-hidden border border-border">
            <div
              className="absolute inset-0 opacity-[0.06] pointer-events-none"
              style={{ backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(0,55,176,0.25),transparent)] pointer-events-none" />

            <GraduationCap className="w-8 h-8 text-background dark:text-foreground relative z-10 opacity-40" />
            <h2 className="text-xl sm:text-2xl font-black text-background dark:text-foreground relative z-10 max-w-lg leading-tight">
              Master Every Unit with Practice Questions
            </h2>
            <p className="text-sm text-background/60 dark:text-muted-foreground max-w-md relative z-10 leading-relaxed">
              Each syllabus unit has curated practice questions. Start with Unit 1 and work your way through.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 mt-1">
              <Link
                href="/units"
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-bold hover:brightness-110 hover:scale-[1.02] transition-all shadow-lg shadow-primary/25 text-sm inline-flex items-center gap-2"
              >
                Start Practicing
                <ChevronRight className="w-4 h-4" />
              </Link>
              <a
                href="/docs/OOP%20with%20Java%20Syllabus.pdf"
                download
                className="px-6 py-2.5 bg-transparent border border-background/20 dark:border-border text-background dark:text-foreground rounded-xl font-bold hover:bg-background/5 transition-all text-sm inline-flex items-center gap-2"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
              <Link
                href="/search"
                className="px-6 py-2.5 bg-transparent border border-background/20 dark:border-border text-background dark:text-foreground rounded-xl font-bold hover:bg-background/5 transition-all text-sm inline-flex items-center gap-2"
              >
                Search Questions
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </MotionDiv>
      </Container>
    </div>
  )
}
