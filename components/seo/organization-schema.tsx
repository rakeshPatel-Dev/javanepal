import { JsonLd } from "./json-ld"

export function OrganizationSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "JavaNepal",
    url: "https://javanepal.vercel.app",
    logo: "https://javanepal.vercel.app/favicon/apple-touch-icon.png",
    description: "Curated Java OOP question bank for BITM 2nd Semester exam revision.",
    sameAs: ["https://github.com/rakeshPatel-Dev/javanepal"],
  }
  return <JsonLd data={data} />
}
