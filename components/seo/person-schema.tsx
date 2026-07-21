import { JsonLd } from "./json-ld"

export function PersonSchema({
  name,
  url,
  jobTitle,
  description,
}: {
  name: string
  url?: string
  jobTitle?: string
  description?: string
}) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
  }
  if (url) data.url = url
  if (jobTitle) data.jobTitle = jobTitle
  if (description) data.description = description
  return <JsonLd data={data} />
}
