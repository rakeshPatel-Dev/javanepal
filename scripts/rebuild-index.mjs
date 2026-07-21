import { readFileSync, writeFileSync, readdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const questionsDir = join(__dirname, "..", "data", "questions")

const files = readdirSync(questionsDir)
  .filter((f) => f.startsWith("unit-") && f.endsWith(".json"))

const all = []
for (const file of files) {
  const questions = JSON.parse(readFileSync(join(questionsDir, file), "utf8"))
  all.push(...questions)
}

if (all.length === 0) {
  console.error("No questions found in unit files.")
  process.exit(1)
}

const index = all.map((q) => ({
  id: q.id,
  unitId: q.unitId,
  topicId: q.topicId,
  title: q.title,
  slug: q.slug,
  difficulty: q.difficulty,
  type: q.type,
  tags: q.tags,
  marks: q.marks,
  estimatedTime: q.estimatedTime,
  isProgramming: q.isProgramming,
  isImportant: q.isImportant,
  examFrequency: q.examFrequency,
  shortAnswer: q.shortAnswer,
}))

writeFileSync(join(questionsDir, "index.json"), JSON.stringify(index, null, 2))
console.log(`Index rebuilt: ${index.length} entries from ${files.length} unit files.`)
