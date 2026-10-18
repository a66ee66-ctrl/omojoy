import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Morph, PageTransition } from "@/components/experience/page-transition";
import { LookCard } from "@/components/looks/look-card";
import { buttonVariants } from "@/components/ui/button";
import {
  collectionLooks,
  collectionName,
  collections,
  getCollection,
} from "@/content/collections";
import type { Shape } from "@/content/portfolio";
import { cn } from "@/lib/utils";

// Render unknown slugs completely before responding so notFound() returns a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/collections/[slug]">): Promise<Metadata> {
  const c = getCollection((await params).slug);
  if (!c) return {};
  return {
    title: `${collectionName(c)} — Collection`,
    description: `${c.kicker}. ${c.intro}`,
    alternates: { canonical: `/collections/${c.slug}` },
    openGraph: {
      images: [
        {
          url: c.cover.image.src,
          width: c.cover.image.width,
          height: c.cover.image.height,
          alt: c.cover.alt,
        },
      ],
    },
  };
}

// A repeating magazine rhythm: [layout classes, display shape, image sizes]
const rhythm: [string, Shape, string][] = [
  ["lg:col-span-7", "portrait", "(min-width: 1024px) 58vw, 100vw"],
  [
    "lg:col-span-4 lg:col-start-9 lg:mt-48",
    "portrait",
    "(min-width: 1024px) 33vw, 100vw",
  ],
  ["lg:col-span-5 lg:col-start-2", "square", "(min-width: 1024px) 42vw, 100vw"],
  [
    "lg:col-span-5 lg:col-start-8 lg:-mt-24",
    "tall",
    "(min-width: 1024px) 42vw, 100vw",
  ],
  [
    "lg:col-span-8 lg:col-start-3",
    "landscape",
    "(min-width: 1024px) 66vw, 100vw",
  ],
];

const toneClass = {
  ivory: "bg-ivory text-espresso",
  cream: "bg-cream text-espresso",
  blush: "bg-blush/60 text-espresso",
  dark: "bg-espresso text-ivory",
};

export default async function CollectionPage({
  params,
}: PageProps<"/collections/[slug]">) {
  const c = getCollection((await params).slug);
  if (!c) notFound();

  const items = collectionLooks(c.slug);
  const nextC = collections[(collections.indexOf(c) + 1) % collections.length];
  const dark = c.tone === "dark";

  return (
    <PageTransition>
      <header
        data-tone={dark ? "dark" : undefined}
        className={cn(
          "relative overflow-hidden pt-32 pb-20 sm:pt-40",
          toneClass[c.tone],
        )}
      >
        <div className="container-editorial grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link
              href="/collections"
              transitionTypes={["nav-back"]}
              className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase opacity-70 hover:opacity-100"
            >
              <ArrowLeft aria-hidden className="size-4" /> All collections
            </Link>
            <p
              className={cn(
                "animate-hero-rise mt-12 font-serif text-[clamp(5rem,12vw,10rem)] leading-none italic",
                dark ? "text-blush/80" : "text-rose-deep/70",
              )}
            >
              {c.chapter}
            </p>
            <h1
              className="display animate-hero-rise mt-2 text-[clamp(3.4rem,8vw,7.5rem)]"
              style={{ "--delay": "120ms" } as React.CSSProperties}
            >
              {c.title}{" "}
              <em className={dark ? "text-blush" : "text-rose-deep"}>
                {c.italic}
              </em>
            </h1>
            <p
              className={cn(
                "eyebrow animate-hero-rise mt-6",
                dark ? "text-ivory/60" : "text-taupe",
              )}
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              {c.kicker} · {items.length} looks
            </p>
            <p
              className={cn(
                "animate-hero-rise mt-8 max-w-lg font-serif text-[1.6rem] leading-[1.4]",
                dark ? "text-ivory/85" : "text-cocoa",
              )}
              style={{ "--delay": "360ms" } as React.CSSProperties}
            >
              {c.intro}
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Link
              href={`/portfolio/${c.cover.slug}`}
              transitionTypes={["nav-forward"]}
              data-cursor="View"
              aria-label={`${c.cover.title} — view this look`}
              className="group block"
            >
              <Morph name={`look-${c.cover.slug}`}>
                <div
                  className="animate-hero-unveil relative aspect-[4/5] overflow-hidden bg-sand"
                  style={{ "--delay": "200ms" } as React.CSSProperties}
                >
                  <Image
                    src={c.cover.image}
                    alt={c.cover.alt}
                    fill
                    preload
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    placeholder="blur"
                    className="animate-slow-zoom object-cover"
                    style={{ "--delay": "200ms" } as React.CSSProperties}
                  />
                </div>
              </Morph>
              <span
                className={cn(
                  "mt-4 flex items-baseline justify-between gap-4",
                  dark ? "text-ivory/80" : "text-cocoa",
                )}
              >
                <span className="font-serif text-[1.35rem] italic">
                  {c.cover.title}
                </span>
                <span className="text-[0.62rem] font-semibold tracking-[0.2em] uppercase opacity-70">
                  Cover look
                </span>
              </span>
            </Link>
          </div>
        </div>
      </header>

      <section
        aria-label={`${collectionName(c)} looks`}
        className="container-editorial py-20 sm:py-32"
      >
        <ul className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-y-28">
          {items
            .filter((l) => l.slug !== c.cover.slug)
            .map((look, i) => {
              const [cls, shape, sizes] = rhythm[i % rhythm.length];
              return (
                <li
                  key={look.slug}
                  className={cn(
                    cls,
                    i % rhythm.length === 4 && "sm:col-span-2",
                  )}
                  data-reveal
                >
                  <LookCard
                    look={look}
                    shape={shape}
                    sizes={sizes}
                    caption="below"
                  />
                  <p className="mt-3 max-w-md text-[0.92rem] leading-relaxed text-cocoa">
                    {look.note}
                  </p>
                </li>
              );
            })}
        </ul>
        <div className="mt-24 flex flex-wrap justify-center gap-3">
          <Link
            href={`/contact?service=${[...new Set(items.flatMap((l) => l.categories))].join(",")}`}
            className={buttonVariants({ variant: "brand", size: "cta" })}
          >
            Enquire about a look like this <ArrowUpRight aria-hidden />
          </Link>
          <Link
            href="/portfolio"
            className={buttonVariants({
              variant: "brand-outline",
              size: "cta",
            })}
          >
            The full archive
          </Link>
        </div>
      </section>

      <Link
        href={`/collections/${nextC.slug}`}
        transitionTypes={["nav-forward"]}
        data-tone="dark"
        className="group relative block overflow-hidden bg-espresso text-ivory"
        data-cursor="Next"
      >
        <Image
          src={nextC.cover.image}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover opacity-35 transition-all duration-[1.6s] ease-editorial group-hover:scale-105 group-hover:opacity-50"
        />
        <div className="container-editorial relative py-28 text-center sm:py-40">
          <p className="eyebrow text-blush">Next story · {nextC.chapter}</p>
          <p className="display mt-6 text-[clamp(3rem,8vw,7rem)]">
            {nextC.title} <em className="text-blush">{nextC.italic}</em>
          </p>
          <p className="mt-4 text-ivory/75">{nextC.kicker}</p>
        </div>
      </Link>
    </PageTransition>
  );
}
