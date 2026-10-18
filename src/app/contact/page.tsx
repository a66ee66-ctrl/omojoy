import type { Metadata } from "next"

import { PageTransition } from "@/components/experience/page-transition"
import { Contact } from "@/components/sections/contact"

export const metadata: Metadata = {
  title: "Contact & Enquiries",
  description:
    "Enquire about makeup artistry, hair styling or photography with Joyful Artistry in Beaverton, Oregon, or book an appointment online.",
  alternates: { canonical: "/contact" },
}

export default function ContactPage() {
  return (
    <PageTransition>
      <Contact />
    </PageTransition>
  )
}
