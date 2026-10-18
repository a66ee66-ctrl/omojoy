import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { PageIntro } from "@/components/brand"
import { PageTransition } from "@/components/experience/page-transition"
import { collectionLooks, collections } from "@/content/collections"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Seven stories told in looks: bridal, heritage and gele, maternity, milestones, glam, studio portraits and hair styling by Joyful Artistry.",
  alternates: { canonical: "/collections" },
}

export default function CollectionsPage() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow="The Collections"
        title={"Seven *stories.*"}
        intro="The archive, gathered into chapters — each one a mood, a moment or a tradition. Step inside and take your time."
      />
      <ol className="container-editorial pb-24 sm:pb-32">
        {collections.map((c, i) => {
          const count = collectionLooks(c.slug).length
          const reverse = i % 2 === 1
          return (
            <li key={c.slug} className="border-t border-border py-14 sm:py-20">
              <Link href={`/collections/${c.slug}`} className="group grid items-center gap-10 lg:grid-cols-12" data-cursor="Open">
                <div className={cn("lg:col-span-6", reverse && "lg:order-2 lg:col-start-7")}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-sand" data-reveal data-unveil>
                    <Image
                      src={c.cover.image}
                      alt={c.cover.alt}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      placeholder="blur"
                      className="object-cover object-[50%_30%] transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.05]"
                    />
                  </div>
                </div>
                <div className={cn("lg:col-span-5", reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")} data-reveal>
                  <p className="font-serif text-[clamp(4rem,8vw,7rem)] leading-none text-rose-deep/80 italic">{c.chapter}</p>
                  <h2 className="display mt-4 text-[clamp(2.8rem,5vw,4.6rem)]">
                    {c.title} <em className="text-rose-deep">{c.italic}</em>
                  </h2>
                  <p className="eyebrow mt-5 text-taupe">
                    {c.kicker} · {count} looks
                  </p>
                  <p className="mt-6 max-w-md leading-[1.8] text-cocoa">{c.intro}</p>
                  <span className="mt-8 inline-flex items-center gap-4 text-[0.72rem] font-semibold tracking-[0.22em] uppercase">
                    <span className="grid size-12 place-items-center rounded-full border border-espresso/25 transition-all duration-700 ease-editorial group-hover:rotate-45 group-hover:border-espresso group-hover:bg-espresso group-hover:text-ivory">
                      <ArrowUpRight aria-hidden className="size-5" />
                    </span>
                    Open the story
                  </span>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </PageTransition>
  )
}
