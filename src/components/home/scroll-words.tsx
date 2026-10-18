"use client";

import { useCallback, useRef } from "react";

import { useScrollProgress } from "@/lib/use-scroll-progress";

/** A statement whose words light up one by one as you scroll through it. */
export function ScrollWords({ text, accent = [] }: { text: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const onProgress = useCallback((p: number) => {
    const spans = ref.current?.querySelectorAll<HTMLSpanElement>("[data-w]");
    if (!spans) return;
    // Light words between 15% and 65% of the element's journey through the viewport.
    const lit = ((p - 0.15) / 0.5) * spans.length;
    spans.forEach((s, i) => {
      s.style.opacity = String(Math.min(1, Math.max(0.16, lit - i + 1)));
    });
  }, []);
  useScrollProgress(ref, onProgress);

  return (
    <p ref={ref} className="display text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.12] tracking-[-0.01em]">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span
            key={i}
            data-w
            className={`transition-opacity duration-300 motion-reduce:opacity-100! ${accent.includes(word.replace(/[.,—]/g, "")) ? "text-rose-deep italic" : ""}`}
            style={{ opacity: 0.16 }}
          >
            {word}{" "}
          </span>
        ))}
      </span>
    </p>
  );
}
