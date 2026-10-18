import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"

import { Morph, PageTransition } from "@/components/experience/page-transition"
import { LookCard } from "@/components/looks/look-card"
import { LookKeys } from "@/components/looks/look-keys"
import { SaveButton } from "@/components/looks/save-button"
import { ShareButton } from "@/components/looks/share-button"
import { buttonVariants } from "@/components/ui/button"
import { collectionName, getCollection } from "@/content/collections"
import { categoryLabel, formatNo, getLook, looks, neighbours, relatedLooks } from "@/content/portfolio"

// Render unknown slugs completely before responding so notFound() returns a real 404.
export const ensureStatic = "navigation"

export function generateStaticParams() {
  return looks.map((l) => ({ slug: l.slug }))
}

export async function generateMetadata({ params }: PageProps<"/portfolio/[slug]">): Promise<Metadata> {
  const look = getLook((await params).slug)
  if (!look) return {}
  return {
    title: `${look.title} — Look No. ${formatNo(look.no)}`,
    description: look.note,
    alternates: { canonical: `/portfolio/${look.slug}` },
    openGraph: { images: [{ url: look.image.src, width: look.image.width, height: look.image.height, alt: look.alt }] },
  }
}

export default async function LookPage({ params }: PageProps<"/portfolio/[slug]">) {
  const look = getLook((await params).slug)
  if (!look) notFound()

  const { prev, next } = neighbours(look.slug)
  const related = relatedLooks(look, 4)
  const lookCollections = look.collections.map(getCollection).filter((c) => c !== undefined)
  const enquireHref = `/contact?look=${look.slug}&service=${look.categories.join(",")}`

  return (
    <PageTransition>
      <LookKeys prev={`/portfolio/${prev.slug}`} next={`/portfolio/${next.slug}`} />
      <article className="container-editorial pt-28 pb-20 sm:pt-32">
        <nav aria-label="Look navigation" className="flex items-center justify-between gap-4 pb-8 text-[0.68rem] font-semibold tracking-[0.2em] uppercase">
          <Link href="/portfolio" transitionTypes={["nav-back"]} className="group inline-flex items-center gap-2 text-taupe hover:text-espresso">
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-1" /> The Archive
          </Link>
          <p className="hidden text-taupe sm:block" aria-hidden>
            Use ← → to browse
          </p>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Morph name={`look-${look.slug}`}>
              <div
                className="relative mx-auto overflow-hidden bg-sand"
                style={{ aspectRatio: `${look.image.width} / ${look.image.height}`, maxHeight: "82svh", maxWidth: `calc(82svh * ${look.image.width / look.image.height})` }}
              >
                <Image
                  src={look.image}
                  alt={look.alt}
                  fill
                  preload
                  placeholder="blur"
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="object-cover"
                />
              </div>
            </Morph>
          </div>

          <div className="flex flex-col lg:col-span-5 lg:pt-6">
            <p className="font-serif text-[1.25rem] text-rose-deep italic">
              No. {formatNo(look.no)} <span className="text-taupe">/ {formatNo(looks.length)}</span>
            </p>
            <h1 className="display animate-hero-rise mt-3 text-[clamp(3.2rem,6.5vw,6.4rem)]">{look.title}</h1>
            <p className="animate-hero-rise mt-6 max-w-md font-serif text-[1.55rem] leading-[1.4] text-cocoa" style={{ "--delay": "150ms" } as React.CSSProperties}>
              {look.note}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 text-[0.9rem]">
              <div>
                <dt className="eyebrow text-[0.6rem] text-taupe">Craft</dt>
                <dd className="mt-2">{look.categories.map((c) => categoryLabel[c]).join(", ")}</dd>
              </div>
              <div>
                <dt className="eyebrow text-[0.6rem] text-taupe">Collection</dt>
                <dd className="mt-2 space-x-2">
                  {lookCollections.map((c, i) => (
                    <span key={c.slug}>
                      <Link href={`/collections/${c.slug}`} className="link-underline pb-0.5 hover:text-rose-deep">
                        {collectionName(c)}
                      </Link>
                      {i < lookCollections.length - 1 && ","}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <SaveButton slug={look.slug} title={look.title} variant="full" />
              <ShareButton title={look.title} path={`/portfolio/${look.slug}`} />
            </div>
            <Link href={enquireHref} className={`${buttonVariants({ variant: "brand", size: "cta" })} mt-3 w-full sm:w-auto sm:self-start`}>
              Enquire about this look <ArrowUpRight aria-hidden />
            </Link>

            <div className="mt-auto grid grid-cols-2 gap-4 pt-12">
              <Link href={`/portfolio/${prev.slug}`} transitionTypes={["nav-back"]} className="group border-t border-border pt-4">
                <span className="flex items-center gap-2 text-[0.62rem] font-semibold tracking-[0.2em] text-taupe uppercase">
                  <ArrowLeft aria-hidden className="size-3.5 transition-transform group-hover:-translate-x-1" /> Previous
                </span>
                <span className="mt-2 block font-serif text-[1.3rem] italic group-hover:text-rose-deep">{prev.title}</span>
              </Link>
              <Link href={`/portfolio/${next.slug}`} transitionTypes={["nav-forward"]} className="group border-t border-border pt-4 text-right">
                <span className="flex items-center justify-end gap-2 text-[0.62rem] font-semibold tracking-[0.2em] text-taupe uppercase">
                  Next <ArrowRight aria-hidden className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="mt-2 block font-serif text-[1.3rem] italic group-hover:text-rose-deep">{next.title}</span>
              </Link>
            </div>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-border bg-cream/50">
        <div className="container-editorial py-20 sm:py-28">
          <h2 id="related-title" className="display text-[clamp(2.2rem,4.4vw,3.8rem)]" data-reveal>
            You may also <em className="text-rose-deep">love.</em>
          </h2>
          <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {related.map((l) => (
              <li key={l.slug}>
                <LookCard look={l} shape="portrait" caption="below" sizes="(min-width: 1024px) 25vw, 50vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  )
}
