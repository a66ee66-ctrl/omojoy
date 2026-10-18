import type { Metadata } from "next"
import Link from "next/link"

import { PageIntro } from "@/components/brand"
import { PageTransition } from "@/components/experience/page-transition"
import { PortfolioGallery } from "@/components/portfolio/portfolio-gallery"
import { collectionName, collections } from "@/content/collections"
import { looks } from "@/content/portfolio"

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Bridal and celebration makeup, hair styling, maternity, family and studio portrait photography by Joyful Artistry in Beaverton, Oregon.",
  alternates: { canonical: "/portfolio" },
}

export default function PortfolioPage() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow={`Portfolio · ${looks.length} looks`}
        title={"The *Archive.*"}
        intro="Every look is numbered, every frame has a story. Filter by craft, save the ones you love to your moodboard, or let us surprise you."
      />
      <section aria-label="All looks" className="container-editorial pb-24 sm:pb-32">
        <PortfolioGallery />
      </section>
      <section aria-labelledby="browse-collections" className="border-t border-border">
        <div className="container-editorial py-16 sm:py-20">
          <h2 id="browse-collections" className="eyebrow text-taupe">
            Or browse by story
          </h2>
          <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            {collections.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group inline-flex items-baseline gap-3 font-serif text-[clamp(1.8rem,3.4vw,2.8rem)] leading-none"
                >
                  <span className="text-[1rem] text-rose-deep italic">{c.chapter}</span>
                  <span className="link-underline pb-1 transition-colors group-hover:text-rose-deep">{collectionName(c)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  )
}
