"use client"

import { useEffect } from "react"

/**
 * Reveals any element marked with `data-reveal` as it scrolls into view.
 * One shared observer keeps every section a Server Component.
 * Optional `data-reveal-delay` (ms) staggers siblings.
 */
export function RevealObserver() {
  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-visible", "true")
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          io.unobserve(entry.target)
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    )

    const observe = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])").forEach((el) => {
        const delay = el.dataset.revealDelay
        if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`)
        io.observe(el)
      })

    observe(document)
    // Pick up elements added later (e.g. "show more" in the portfolio).
    const mo = new MutationObserver(() => observe(document))
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return null
}
