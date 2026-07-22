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
  FlaskConical,
  Lightbulb,
  ClipboardList,
  Presentation,
  PenLine,
  ScrollText,
} from "lucide-react"
import { Container } from "@/components/common/container"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Syllabus, EnrichedUnit } from "@/lib/types"
import { MotionDiv } from "@/components/common/motion-div"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
})

const unitColors = [
  "from-amber-500/20 to-amber-600/5 border-amber-500/20",
  "from-blue-500/20 to-blue-600/5 border-blue-500/20",
  "from-violet-500/20 to-violet-600/5 border-violet-500/20",
  "from-pink-500/20 to-pink-600/5 border-pink-500/20",
  "from-red-500/20 to-red-600/5 border-red-500/20",
  "from-cyan-500/20 to-cyan-600/5 border-cyan-500/20",
  "from-emerald-500/20 to-emerald-600/5 border-emerald-500/20",
  "from-orange-500/20 to-orange-600/5 border-orange-500/20",
  "from-purple-500/20 to-purple-600/5 border-purple-500/20",
]

export default function SyllabusClient({
  syllabus,
  units,
}: {
  syllabus: Syllabus
  units: EnrichedUnit[]
}) {
  const [expandedUnit, setExpandedUnit] = useState<number | null>(1)

  const totalTopics = syllabus.units.reduce((sum, u) => sum + u.topics.length, 0)

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
              Syllabus — {syllabus.natureOfCourse}
            </MotionDiv>

            <MotionDiv
              {...fadeUp(0.08)}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground leading-tight tracking-tight"
            >
              {syllabus.courseTitle}
            </MotionDiv>

            <MotionDiv
              {...fadeUp(0.12)}
              className="px-3 py-1 bg-muted/60 border border-border/60 rounded-lg text-xs font-mono text-muted-foreground"
            >
              {syllabus.courseCode} &middot; {syllabus.program} &middot; Semester {syllabus.semester}
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
                Sem {syllabus.semester}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-card">
                <Trophy className="w-3.5 h-3.5 text-primary" />
                {syllabus.credits} Credits
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-card">
                <Clock className="w-3.5 h-3.5 text-primary" />
                {syllabus.lectureHours.total}h Total
              </Badge>
            </MotionDiv>

            <MotionDiv {...fadeUp(0.28)}>
              <a
                href="/docs/SYLLABUS_OOP_in_Java_ITM152.pdf"
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
            { value: syllabus.lectureHours.theory, label: "Theory Hours", icon: Clock },
            { value: syllabus.lectureHours.practical, label: "Lab Hours", icon: FlaskConical },
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
                <div className="space-y-3">
                  <h2 className="text-sm font-black text-foreground uppercase tracking-wider">Course Objectives</h2>
                  <ol className="space-y-1.5 list-decimal list-inside">
                    {syllabus.courseObjectives.map((obj, i) => (
                      <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                        {obj}
                      </li>
                    ))}
                  </ol>
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
                        <div className="flex items-center gap-3 mt-1 text-[11px] text-muted-foreground font-medium flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {unit.lectureHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {unit.topics.length} topics
                          </span>
                          {unit.learningOutcomes?.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Lightbulb className="w-3 h-3" />
                              {unit.learningOutcomes.length} outcomes
                            </span>
                          )}
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
                        <div className="px-4 sm:px-5 pb-5 pt-0 border-t border-border/50 mt-0 space-y-4">
                          <div className="pt-3">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                              <BookOpen className="size-3" />
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
                          {unit.learningOutcomes?.length > 0 && (
                            <div>
                              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                                <Lightbulb className="size-3" />
                                Learning Outcomes
                              </p>
                              <ul className="space-y-1.5">
                                {unit.learningOutcomes.map((outcome, i) => (
                                  <motion.li
                                    key={outcome}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.25, delay: i * 0.02 }}
                                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                                  >
                                    <span className="size-1.5 rounded-sm bg-emerald-500/60 mt-1.5 shrink-0" />
                                    {outcome}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          )}
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
          <div className="mb-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Learning Design</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Pedagogy & Delivery</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Presentation className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Pedagogical Strategies</h3>
                    <ul className="space-y-1.5">
                      {syllabus.pedagogicalStrategies.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-violet-500/40 mt-1.5 shrink-0" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ClipboardList className="w-5 h-5" />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Mode of Delivery</h3>
                    <ul className="space-y-1.5">
                      {syllabus.modeOfDelivery.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500/40 mt-1.5 shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.2)} className="mb-12">
          <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div className="space-y-4 flex-1">
                  <h2 className="text-sm font-black text-foreground uppercase tracking-wider">Laboratory Work</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{syllabus.laboratoryWork.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {syllabus.laboratoryWork.practicalTasks.map((task) => (
                      <div
                        key={task.unit}
                        className="p-3 rounded-xl bg-muted/50 border border-border/60 text-sm text-muted-foreground leading-relaxed"
                      >
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider block mb-1">Unit {task.unit}</span>
                        {task.description}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.22)} className="mb-12">
          <div className="mb-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Assessment</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Evaluation Scheme</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
                    <PenLine className="w-5 h-5" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-foreground uppercase tracking-wider">Internal Assessment</h3>
                      <Badge variant="outline" className="text-xs font-bold bg-rose-500/10 text-rose-600 border-rose-500/20">
                        {syllabus.internalAssessment.weightage}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      {syllabus.internalAssessment.methods.map((method, i) => (
                        <div key={i} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0 text-sm">
                          <span className="text-muted-foreground">{method.type}</span>
                          <span className="font-bold text-foreground font-mono text-xs">{method.weightage}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
              <CardContent className="p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
                    <ScrollText className="w-5 h-5" />
                  </div>
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-foreground uppercase tracking-wider">External Assessment</h3>
                      <Badge variant="outline" className="text-xs font-bold bg-blue-500/10 text-blue-600 border-blue-500/20">
                        {syllabus.externalAssessment.weightage}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between py-1.5 border-b border-border/40 text-sm">
                        <span className="text-muted-foreground">Written Examination</span>
                        <span className="font-bold text-foreground font-mono text-xs">{syllabus.externalAssessment.breakdown.writtenExamination.weightage}</span>
                      </div>
                      <div className="flex items-center justify-between py-1.5 text-sm">
                        <span className="text-muted-foreground">Practical Examination</span>
                        <span className="font-bold text-foreground font-mono text-xs">{syllabus.externalAssessment.breakdown.practicalExamination.weightage}</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-muted/40 border border-border/60">
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        <span className="font-bold text-foreground">Written:</span> {syllabus.externalAssessment.breakdown.writtenExamination.description}
                      </p>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                        <span className="font-bold text-foreground">Practical:</span> {syllabus.externalAssessment.breakdown.practicalExamination.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.24)} className="mb-12">
          <Card className="rounded-2xl border border-border bg-card gap-0 py-0 shadow-xs overflow-hidden">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-sm font-black text-foreground uppercase tracking-wider mb-3">Learning Outcome Dimensions</h2>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Knowledge", value: syllabus.courseLearningOutcomeDimensions.knowledge, color: "bg-blue-500" },
                      { label: "Skills", value: syllabus.courseLearningOutcomeDimensions.skills, color: "bg-emerald-500" },
                      { label: "Competence", value: syllabus.courseLearningOutcomeDimensions.competence, color: "bg-amber-500" },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted/50 border border-border/60">
                        <span className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-xs text-muted-foreground">{item.label}</span>
                        <span className="text-xs font-bold text-foreground font-mono">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.26)} className="mb-12">
          <div className="mb-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Resources</p>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">Suggested Readings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {syllabus.suggestedReadings.map((book, i) => (
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
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-foreground leading-snug">{book.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{book.authors}</p>
                    <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                      {book.publisher}, {book.year}
                      {book.edition && <> &middot; {book.edition}</>}
                    </p>
                    {book.url && (
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 mt-2 text-[11px] font-semibold text-primary hover:underline"
                      >
                        <ExternalLink className="w-3 h-3" />
                        Visit
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </MotionDiv>

        <MotionDiv {...fadeUp(0.28)}>
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
                href="/docs/SYLLABUS_OOP_in_Java_ITM152.pdf"
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
