"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

import { cn } from "@/lib/utils";

/** Native share sheet where available, otherwise copies the link. */
export function ShareButton({ title, path, className }: { title: string; path: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = new URL(path, window.location.origin).toString();
    try {
      if (navigator.share) {
        await navigator.share({ title: `${title} — Joyful Artistry`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Share sheet dismissed or clipboard unavailable: nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className={cn(
        "inline-flex h-12 items-center gap-2.5 border border-espresso/30 px-6 text-[0.72rem] font-semibold tracking-[0.2em] uppercase transition-colors duration-500 hover:border-espresso",
        className,
      )}
    >
      {copied ? <Check aria-hidden className="size-4" /> : <Share2 aria-hidden className="size-4" />}
      <span aria-live="polite">{copied ? "Link copied" : "Share"}</span>
    </button>
  );
}
