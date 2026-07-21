import syllabusData from "@/data/syllabus.json"
import type { Syllabus } from "@/lib/types"

export const getSyllabus = (): Syllabus => syllabusData as Syllabus
