import { JsonLd } from "./json-ld"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ questions }: { questions: FAQItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  }
  return <JsonLd data={data} />
}
