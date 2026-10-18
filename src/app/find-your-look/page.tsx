import type { Metadata } from "next"
import { Suspense } from "react"

import { PageIntro } from "@/components/brand"
import { PageTransition } from "@/components/experience/page-transition"
import { Quiz } from "@/components/quiz/quiz"

export const metadata: Metadata = {
  title: "Find Your Look",
  description:
    "Answer three quick questions about your occasion and style, and discover makeup, hair and photography looks curated from the Joyful Artistry archive.",
  alternates: { canonical: "/find-your-look" },
}

export default function FindYourLookPage() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow="Find your look"
        title={"Three questions,\n*your edit.*"}
        intro="Tell us about your occasion and your style. We’ll curate looks from the archive for you to save, share or bring to your consultation."
      />
      <section aria-label="Find your look quiz" className="container-editorial pb-24 sm:pb-32">
        <Suspense fallback={<div className="h-[36rem]" />}>
          <Quiz />
        </Suspense>
      </section>
    </PageTransition>
  )
}
