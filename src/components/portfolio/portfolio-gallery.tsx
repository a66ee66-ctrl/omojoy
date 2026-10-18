"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Shuffle } from "lucide-react";

import { LookCard } from "@/components/looks/look-card";
import { buttonVariants } from "@/components/ui/button";
import {
  categoryLabel,
  looks,
  portfolioFilters,
  type PortfolioFilter,
} from "@/content/portfolio";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 16;

export function PortfolioGallery() {
  const router = useRouter();
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const items = useMemo(
    () =>
      filter === "all"
        ? looks
        : looks.filter((p) => p.categories.includes(filter)),
    [filter],
  );
  const shown = items.slice(0, visible);

  const surprise = () => {
    const pick = items[Math.floor(Math.random() * items.length)];
    router.push(`/portfolio/${pick.slug}`, {
      transitionTypes: ["nav-forward"],
    });
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4 border-y border-border py-5">
        <div
          role="group"
          aria-label="Filter looks"
          className="flex flex-wrap gap-2"
        >
          {portfolioFilters.map((f) => {
            const count =
              f.value === "all"
                ? looks.length
                : looks.filter((p) => p.categories.includes(f.value)).length;
            const selected = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setFilter(f.value);
                  setVisible(PAGE_SIZE);
                }}
                className={cn(
                  "inline-flex h-11 items-center gap-2 rounded-full border px-4 text-[0.66rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 sm:px-5 sm:text-[0.7rem]",
                  selected
                    ? "border-espresso bg-espresso text-ivory"
                    : "border-espresso/20 text-espresso/80 hover:border-espresso hover:text-espresso",
                )}
              >
                {f.label}
                <sup
                  className={cn(
                    "text-[0.6rem] tracking-normal",
                    selected ? "text-ivory/60" : "text-taupe",
                  )}
                >
                  {count}
                </sup>
              </button>
            );
          })}
        </div>
        <button
          type="button"
          onClick={surprise}
          className="group inline-flex h-11 items-center gap-2.5 text-[0.7rem] font-semibold tracking-[0.2em] uppercase"
        >
          <Shuffle
            aria-hidden
            className="size-4 transition-transform duration-700 ease-editorial group-hover:rotate-180"
          />
          <span className="link-underline pb-0.5">Surprise me</span>
        </button>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {shown.length} of {items.length}{" "}
        {filter === "all" ? "looks" : `${categoryLabel[filter]} looks`}
      </p>

      <ul
        key={filter}
        className="mt-12 columns-2 gap-3 sm:gap-5 md:columns-3 xl:columns-4"
      >
        {shown.map((look, i) => (
          <li
            key={look.slug}
            className="mb-3 break-inside-avoid animate-in fill-mode-both duration-700 fade-in-0 slide-in-from-bottom-4 sm:mb-5"
            style={{ animationDelay: `${Math.min(i % PAGE_SIZE, 8) * 60}ms` }}
          >
            <LookCard look={look} />
          </li>
        ))}
      </ul>

      {visible < items.length && (
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-[0.8rem] text-taupe">
            Showing {shown.length} of {items.length}
          </p>
          <button
            type="button"
            onClick={() => setVisible((v) => v + PAGE_SIZE)}
            className={buttonVariants({
              variant: "brand-outline",
              size: "cta",
            })}
          >
            View more looks <Plus aria-hidden />
          </button>
        </div>
      )}
    </>
  );
}
