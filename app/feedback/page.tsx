import type { Metadata } from "next"
import { FeedbackForm } from "@/components/common/feedback-form"
import { PageHeader } from "@/components/common/page-header"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Share your feedback, report a bug, or suggest an improvement for JavaNepal.",
}

export default function FeedbackPage() {
  return (
    <div className="min-h-dvh py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <PageHeader
          title="Feedback"
          description="Help improve JavaNepal. Share your thoughts, report issues, or suggest features."
          badge="Share Your Thoughts"
        />
        <Card>
          <CardHeader>
            <CardTitle>Send Feedback</CardTitle>
            <CardDescription>
              All fields except &ldquo;Name&rdquo; and &ldquo;Email&rdquo; are optional.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FeedbackForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
