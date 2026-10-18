"use client";

import { useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import type { Collection } from "@/content/collections";
import { useScrollProgress } from "@/lib/use-scroll-progress";

type Item = Pick<Collection, "slug" | "chapter" | "title" | "italic" | "kicker"> & {
  cover: { image: Collection["cover"]["image"]; alt: string };
  count: number;
};

/**
 * Collections as a horizontal reel. On large screens the section pins and
 * vertical scrolling drives the reel sideways; on smaller screens it swipes.
 */
export function CollectionsRail({ items }: { items: Item[] }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  const onProgress = useCallback((p: number) => {
    const el = track.current;
    if (!el) return;
    if (!matchMedia("(min-width: 1024px)").matches) {
      el.style.transform = "";
      return;
    }
    const distance = el.scrollWidth - el.clientWidth;
    el.style.transform = `translate3d(${-distance * p}px, 0, 0)`;
    if (bar.current) bar.current.style.transform = `scaleX(${p})`;
  }, []);
  useScrollProgress(section, onProgress, "pinned");

  return (
    <section ref={section} data-tone="dark" aria-labelledby="collections-title" className="relative bg-espresso text-ivory lg:h-[320vh]">
      <div className="flex flex-col justify-center py-24 lg:sticky lg:top-0 lg:h-svh lg:overflow-hidden lg:py-0">
        <div className="container-editorial flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow flex items-center gap-4 text-blush">
              <span aria-hidden className="h-px w-8 bg-current" />
              The Collections
            </p>
            <h2 id="collections-title" className="display mt-6 text-[clamp(2.6rem,5.4vw,5rem)]">
              Seven stories, <em className="text-blush">told in looks.</em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="link-underline inline-flex items-center gap-2 self-start pb-1 text-[0.72rem] font-semibold tracking-[0.2em] uppercase sm:self-auto"
          >
            All collections <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>

        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 will-change-transform [scrollbar-width:none] sm:px-8 lg:mt-14 lg:gap-8 lg:overflow-visible lg:px-12 [&::-webkit-scrollbar]:hidden"
        >
          {items.map((c) => (
            <Link
              key={c.slug}
              href={`/collections/${c.slug}`}
              data-cursor="Open"
              className="group w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-cocoa">
                <Image
                  src={c.cover.image}
                  alt={c.cover.alt}
                  fill
                  sizes="(min-width: 1280px) 26vw, (min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw"
                  placeholder="blur"
                  className="object-cover transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.06]"
                />
                <span className="absolute top-4 left-4 font-serif text-[1.1rem] text-ivory/90 italic">{c.chapter}</span>
                <span className="absolute right-4 bottom-4 rounded-full bg-ivory/90 px-3 py-1 text-[0.6rem] font-semibold tracking-[0.2em] text-espresso uppercase">
                  {c.count} looks
                </span>
              </div>
              <p className="mt-5 font-serif text-[2rem] leading-none">
                {c.title} <em className="text-blush">{c.italic}</em>
              </p>
              <p className="mt-2 text-[0.85rem] text-ivory/65">{c.kicker}</p>
            </Link>
          ))}
        </div>

        <div className="container-editorial mt-10 hidden lg:block" aria-hidden>
          <div className="h-px w-full bg-ivory/15">
            <span ref={bar} className="block h-px origin-left scale-x-0 bg-blush" />
          </div>
        </div>
      </div>
    </section>
  );
}
