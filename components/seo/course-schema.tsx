import { JsonLd } from "./json-ld"

export function CourseSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Java OOP - BITM 2nd Semester",
    description: "Comprehensive Java Object-Oriented Programming question bank covering 9 units and 77 topics for exam preparation.",
    provider: {
      "@type": "Organization",
      name: "JavaNepal",
      sameAs: "https://javanepal.vercel.app",
    },
  }
  return <JsonLd data={data} />
}
