import type { Metadata } from "next"
import { getSyllabus } from "@/lib/syllabus"
import { getUnits } from "@/lib/data"
import SyllabusClient from "./syllabus-client"

export const metadata: Metadata = {
  title: "Syllabus — OOP with Java (BITM 2nd Semester)",
  description:
    "Complete course syllabus for Object-Oriented Programming with Java — BITM 2nd Semester. Covers 9 units, topics, lecture hours, lab works, textbooks, and exam preparation resources.",
  openGraph: {
    title: "Syllabus — OOP with Java | JavaNepal",
    description:
      "Complete course syllabus for Object-Oriented Programming with Java — BITM 2nd Semester. Covers 9 units, topics, lecture hours, lab works, textbooks.",
    url: "https://javanepal.vercel.app/syllabus",
  },
  twitter: {
    title: "Syllabus — OOP with Java | JavaNepal",
    description:
      "Complete course syllabus for OOP with Java — BITM 2nd Semester. 9 units with topics, lab works, and textbooks.",
  },
}

export default function Page() {
  const syllabus = getSyllabus()
  const units = getUnits()

  return <SyllabusClient syllabus={syllabus} units={units} />
}
