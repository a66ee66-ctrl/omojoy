"use client"

import { Heart } from "lucide-react"

import { moodboard, useMoodboard } from "@/lib/moodboard"
import { cn } from "@/lib/utils"

export function SaveButton({
  slug,
  title,
  variant = "chip",
  className,
}: {
  slug: string
  title: string
  variant?: "chip" | "icon" | "full"
  className?: string
}) {
  const saved = useMoodboard().includes(slug)
  const label = saved ? `Remove “${title}” from your moodboard` : `Save “${title}” to your moodboard`

  return (
    <button
      type="button"
      aria-pressed={saved}
      aria-label={variant === "full" ? undefined : label}
      title={variant === "full" ? undefined : label}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        moodboard.toggle(slug)
      }}
      className={cn(
        "group/save inline-flex items-center justify-center gap-2.5 transition-all duration-500 ease-editorial",
        variant === "icon" &&
          "size-10 rounded-full bg-ivory/90 text-espresso shadow-[0_8px_24px_-12px_rgba(43,33,28,0.5)] backdrop-blur-sm hover:bg-ivory",
        variant === "chip" && "size-11 rounded-full border border-current/30 hover:border-current",
        variant === "full" &&
          "h-12 border px-6 text-[0.72rem] font-semibold tracking-[0.2em] uppercase " +
            (saved ? "border-rose-deep bg-rose-deep text-ivory" : "border-espresso/30 hover:border-espresso"),
        className
      )}
    >
      <Heart
        aria-hidden
        className={cn(
          "size-[1.1rem] transition-transform duration-500 ease-editorial group-active/save:scale-75",
          saved ? "scale-110 fill-current text-rose-deep" : "",
          variant === "full" && saved && "text-ivory"
        )}
      />
      {variant === "full" && (saved ? "Saved to moodboard" : "Save to moodboard")}
    </button>
  )
}
