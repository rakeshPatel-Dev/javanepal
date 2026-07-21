"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { toast } from "sonner"
import { MotionDiv } from "@/components/common/motion-div"
import {
  Send,
  CheckCircle2,
  Loader2,
  Bug,
  Lightbulb,
  Heart,
  FileText,
} from "lucide-react"

const CATEGORIES = [
  { value: "bug", label: "Bug Report", icon: Bug },
  { value: "suggestion", label: "Suggestion", icon: Lightbulb },
  { value: "feature", label: "Feature Request", icon: Heart },
  { value: "general", label: "General Feedback", icon: FileText },
] as const

function formatFeedback(data: {
  name: string
  email: string
  category: string
  message: string
  page: string
}) {
  const lines = [
    "Feedback submitted via JavaNepal",
    "",
    `Category: ${data.category}`,
    `Name: ${data.name || "(not provided)"}`,
    `Email: ${data.email || "(not provided)"}`,
    `Page: ${data.page}`,
    "",
    "---",
    "",
    data.message,
    "",
    "---",
    `Submitted: ${new Date().toLocaleString()}`,
    "From: JavaNepal (https://javanepal.vercel.app)",
  ]
  return lines.join("\n")
}

export function FeedbackForm() {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [category, setCategory] = useState("general")
  const [message, setMessage] = useState("")

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const formatted = formatFeedback({
      name,
      email,
      category: CATEGORIES.find((c) => c.value === category)?.label ?? category,
      message,
      page: typeof window !== "undefined" ? window.location.href : "",
    })

    try {
      const res = await fetch("https://formspree.io/f/mykrpdkg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          category,
          message: formatted,
          _subject: `[JavaNepal Feedback] ${CATEGORIES.find((c) => c.value === category)?.label ?? "General"}`,
          _replyto: email || undefined,
        }),
      })

      if (!res.ok) throw new Error("Failed to send")

      setSent(true)
      toast.success("Feedback sent! Thanks for your input.", {
        icon: <CheckCircle2 className="size-4" />,
      })
    } catch {
      toast.error("Could not send feedback. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }, [name, email, category, message])

  if (sent) {
    return (
      <MotionDiv
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 gap-4 text-center"
      >
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="size-8 text-primary" />
        </div>
        <h2 className="text-xl font-bold text-foreground">Thank You!</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Your feedback has been received. I read every submission and it helps make JavaNepal better.
        </p>
        <Button variant="outline" onClick={() => setSent(false)}>
          Send Another
        </Button>
      </MotionDiv>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={(v) => v && setCategory(v)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          placeholder="Share your feedback, report a bug, or suggest an improvement..."
          rows={6}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button type="submit" disabled={submitting} size="lg" className="w-full sm:w-auto">
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send Feedback
          </>
        )}
      </Button>
    </form>
  )
}
