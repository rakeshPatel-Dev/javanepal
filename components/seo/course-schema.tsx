import { JsonLd } from "./json-ld"
import unitsData from "@/data/units.json"
import topicsData from "@/data/topics.json"

export function CourseSchema() {
  const unitCount = unitsData.length
  const topicCount = topicsData.length

  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Java OOP - BITM 2nd Semester",
    description: `Comprehensive Java Object-Oriented Programming question bank covering ${unitCount} units and ${topicCount} topics for exam preparation.`,
    provider: {
      "@type": "Organization",
      name: "JavaNepal",
      sameAs: "https://javanepal.vercel.app",
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseSchedule: {
        "@type": "Schedule",
        repeatFrequency: "Semester",
      },
    },
    url: "https://javanepal.vercel.app/syllabus",
  }
  return <JsonLd data={data} />
}
