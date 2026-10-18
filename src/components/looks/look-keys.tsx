"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** ← / → move between looks, Esc returns to the archive. */
export function LookKeys({ prev, next }: { prev: string; next: string }) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(prev);
    router.prefetch(next);
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.metaKey || e.ctrlKey || e.altKey || t.closest("input, textarea, select, [contenteditable], [role=dialog]")) return;
      if (e.key === "ArrowRight") router.push(next, { transitionTypes: ["nav-forward"], scroll: false });
      else if (e.key === "ArrowLeft") router.push(prev, { transitionTypes: ["nav-back"], scroll: false });
      else if (e.key === "Escape") router.push("/portfolio", { transitionTypes: ["nav-back"] });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, prev, next]);

  return null;
}
