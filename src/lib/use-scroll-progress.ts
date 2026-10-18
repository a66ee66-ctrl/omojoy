"use client";

import { useEffect, type RefObject } from "react";

/**
 * Calls `onProgress` with 0→1 as the element scrolls through the viewport
 * (0 when its top reaches the bottom of the screen, 1 when its bottom reaches the top).
 * Pass `mode: "pinned"` for sticky sections: 0 at top-of-section, 1 when its end reaches the viewport bottom.
 * Runs on animation frames only while the element is near the viewport.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
  mode: "through" | "pinned" = "through",
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = false;
    let last = -1;

    const measure = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "pinned"
          ? -r.top / Math.max(1, r.height - vh)
          : (vh - r.top) / (vh + r.height);
      const clamped = Math.min(1, Math.max(0, p));
      if (Math.abs(clamped - last) > 0.0005) {
        last = clamped;
        onProgress(clamped);
      }
      if (visible) raf = requestAnimationFrame(measure);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(measure);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    measure();
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [ref, onProgress, mode]);
}
