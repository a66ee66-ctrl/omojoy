"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowUpRight, Check, Heart, Link2, Trash2 } from "lucide-react";

import { LookCard } from "@/components/looks/look-card";
import { buttonVariants } from "@/components/ui/button";
import { byId, getLook, isLookSlug } from "@/content/portfolio";
import { moodboard, useMoodboard } from "@/lib/moodboard";
import { cn } from "@/lib/utils";

const suggestions = ["golden-glam", "pearl-updo", "maternity-butterfly", "heritage"].map(byId);

export function MoodboardView() {
  const params = useSearchParams();
  const saved = useMoodboard();
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);

  const shared = (params.get("looks") ?? "").split(",").filter(isLookSlug);
  const viewingShared = shared.length > 0;
  const slugs = viewingShared ? shared : saved;
  const looks = slugs.map((s) => getLook(s)).filter((l) => l !== undefined);

  async function copyLink() {
    const url = new URL(`/moodboard?looks=${saved.join(",")}`, window.location.origin).toString();
    try {
      if (navigator.share) await navigator.share({ title: "My Joyful Artistry moodboard", url });
      else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      }
    } catch {
      // Dismissed or unavailable.
    }
  }

  if (looks.length === 0) {
    return (
      <div className="border-t border-border pt-16 text-center">
        <Heart aria-hidden className="mx-auto size-10 text-rose-deep" strokeWidth={1.2} />
        <h2 className="display mt-8 text-[clamp(2.4rem,5vw,4rem)]">
          Your moodboard is <em className="text-rose-deep">waiting.</em>
        </h2>
        <p className="mx-auto mt-6 max-w-md leading-[1.8] text-cocoa">
          Tap the heart on any look to save it here. Your board stays on this device, ready whenever you come back.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/portfolio" className={buttonVariants({ variant: "brand", size: "cta" })}>
            Browse the archive
          </Link>
          <Link href="/find-your-look" className={buttonVariants({ variant: "brand-outline", size: "cta" })}>
            Find your look
          </Link>
        </div>
        <p className="eyebrow mt-20 text-taupe">A few to start with</p>
        <ul className="mt-8 grid grid-cols-2 gap-4 text-left sm:gap-6 lg:grid-cols-4">
          {suggestions.map((l) => (
            <li key={l.slug}>
              <LookCard look={l} shape="portrait" caption="below" sizes="(min-width: 1024px) 25vw, 50vw" />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 border-y border-border py-5 lg:flex-row lg:items-center lg:justify-between">
        <p className="font-serif text-[1.4rem] italic">
          {viewingShared ? `A moodboard shared with you — ${looks.length} looks` : `${looks.length} saved ${looks.length === 1 ? "look" : "looks"}`}
        </p>
        <div className="flex flex-wrap gap-3">
          {viewingShared ? (
            <>
              <button
                type="button"
                onClick={() => moodboard.add(shared)}
                className={buttonVariants({ variant: "brand", size: "cta-sm" })}
              >
                <Heart aria-hidden /> Save all to my moodboard
              </button>
              <Link href="/moodboard" className={buttonVariants({ variant: "brand-outline", size: "cta-sm" })}>
                View my own board
              </Link>
            </>
          ) : (
            <>
              <Link
                href={`/contact?looks=${saved.join(",")}`}
                className={buttonVariants({ variant: "brand", size: "cta-sm" })}
              >
                Send with an enquiry <ArrowUpRight aria-hidden />
              </Link>
              <button type="button" onClick={copyLink} className={buttonVariants({ variant: "brand-outline", size: "cta-sm" })}>
                {copied ? <Check aria-hidden /> : <Link2 aria-hidden />}
                <span aria-live="polite">{copied ? "Link copied" : "Share board"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  if (confirmClear) {
                    moodboard.clear();
                    setConfirmClear(false);
                  } else setConfirmClear(true);
                }}
                onBlur={() => setConfirmClear(false)}
                className={cn(
                  "inline-flex h-10 items-center gap-2 px-3 text-[0.68rem] font-semibold tracking-[0.18em] uppercase transition-colors",
                  confirmClear ? "text-destructive" : "text-taupe hover:text-espresso",
                )}
              >
                <Trash2 aria-hidden className="size-4" />
                {confirmClear ? "Tap again to clear" : "Clear"}
              </button>
            </>
          )}
        </div>
      </div>

      <ul className="mt-12 columns-2 gap-3 sm:gap-5 md:columns-3 xl:columns-4">
        {looks.map((look) => (
          <li key={look.slug} className="mb-3 break-inside-avoid animate-in duration-700 fade-in-0 sm:mb-5">
            <LookCard look={look} />
          </li>
        ))}
      </ul>
    </div>
  );
}
