"use client"

import { useEffect, useRef, useState } from "react"

/**
 * A soft label that follows the pointer over elements marked `data-cursor="Label"`.
 * Desktop (fine pointer) only; the native cursor is never hidden.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0
    const tick = () => {
      cx += (x - cx) * 0.18
      cy += (y - cy) * 0.18
      if (ref.current) ref.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]")
      setLabel(target?.dataset.cursor ?? null)
    }
    const onLeave = () => setLabel(null)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [])

  return (
    <div ref={ref} aria-hidden className="pointer-events-none fixed top-0 left-0 z-[80] hidden [@media(pointer:fine)]:block">
      <div
        className={`-translate-x-1/2 -translate-y-1/2 grid size-24 place-items-center rounded-full bg-ivory/90 text-[0.62rem] font-semibold tracking-[0.22em] text-espresso uppercase shadow-[0_20px_40px_-20px_rgba(43,33,28,0.5)] backdrop-blur-sm transition-[opacity,scale] duration-500 ease-editorial ${label ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
      >
        {label}
      </div>
    </div>
  )
}
