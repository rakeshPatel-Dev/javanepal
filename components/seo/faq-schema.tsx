import { JsonLd } from "./json-ld"

interface FAQItem {
  question: string
  answer: string
}

export function FAQSchema({ questions, datePublished }: { questions: FAQItem[]; datePublished?: string }) {
  const data: Record<string, unknown> = {
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
  if (datePublished) data.datePublished = datePublished
  return <JsonLd data={data} />
}
