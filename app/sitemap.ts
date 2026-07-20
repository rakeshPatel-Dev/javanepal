import { getUnits, getTopics, getQuestions } from "@/lib/data"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://javanepal.vercel.app"

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/units`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/bookmarks`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  const units = getUnits().map((unit) => ({
    url: `${baseUrl}/unit/${unit.slug || unit.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }))

  const topics = getTopics().map((topic) => ({
    url: `${baseUrl}/topic/${topic.slug || topic.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  const questions = getQuestions().map((question) => ({
    url: `${baseUrl}/question/${question.slug || question.id}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...units, ...topics, ...questions]
}
