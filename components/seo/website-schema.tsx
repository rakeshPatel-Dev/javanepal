import { JsonLd } from "./json-ld"

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JavaNepal",
    url: "https://javanepal.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://javanepal.vercel.app/search?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  }
  return <JsonLd data={data} />
}
