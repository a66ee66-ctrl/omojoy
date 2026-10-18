import type { Metadata } from "next"
import { Suspense } from "react"

import { PageIntro } from "@/components/brand"
import { PageTransition } from "@/components/experience/page-transition"
import { MoodboardView } from "@/components/moodboard/moodboard-view"

export const metadata: Metadata = {
  title: "Your Moodboard",
  description: "Save the Joyful Artistry looks you love, share your board, and send it with an enquiry.",
  alternates: { canonical: "/moodboard" },
  robots: { index: false, follow: true },
}

export default function MoodboardPage() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow="Saved looks"
        title={"Your *Moodboard.*"}
        intro="Collect the looks you love as you browse. Share your board with friends, or send it with your enquiry so we can see your style at a glance."
      />
      <section aria-label="Saved looks" className="container-editorial pb-24 sm:pb-32">
        <Suspense fallback={<div className="h-96 border-t border-border" />}>
          <MoodboardView />
        </Suspense>
      </section>
    </PageTransition>
  )
}
