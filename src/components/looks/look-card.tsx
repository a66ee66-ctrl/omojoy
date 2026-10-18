import Image from "next/image"
import Link from "next/link"

import { Morph } from "@/components/experience/page-transition"
import { SaveButton } from "@/components/looks/save-button"
import { categoryLabel, formatNo, type Look, type Shape } from "@/content/portfolio"
import { cn } from "@/lib/utils"

export const shapeClass: Record<Shape, string> = {
  portrait: "aspect-[4/5]",
  tall: "aspect-[2/3]",
  square: "aspect-square",
  landscape: "aspect-[4/3]",
}

export function LookImage({
  look,
  sizes,
  className,
  preload,
}: {
  look: Look
  sizes: string
  className?: string
  preload?: boolean
}) {
  return (
    <Image
      src={look.image}
      alt={look.alt}
      fill
      sizes={sizes}
      preload={preload}
      placeholder="blur"
      className={cn("object-cover", look.focus, className)}
    />
  )
}

/**
 * A look in a grid: links to its own page, morphs into the hero there,
 * and can be saved to the visitor's moodboard.
 */
export function LookCard({
  look,
  sizes = "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw",
  shape,
  morph = true,
  className,
  caption = "overlay",
}: {
  look: Look
  sizes?: string
  shape?: Shape
  morph?: boolean
  className?: string
  caption?: "overlay" | "below"
}) {
  const frame = (
    <div className={cn("relative w-full overflow-hidden bg-sand", shapeClass[shape ?? look.shape])}>
      <LookImage
        look={look}
        sizes={sizes}
        className="transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.05]"
      />
    </div>
  )

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/portfolio/${look.slug}`}
        transitionTypes={["nav-forward"]}
        data-cursor="View"
        className="block"
        aria-label={`${look.title} — look no. ${formatNo(look.no)}`}
      >
        {morph ? <Morph name={`look-${look.slug}`}>{frame}</Morph> : frame}
        {caption === "overlay" ? (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/75 via-espresso/0 to-transparent p-4 opacity-0 transition-opacity duration-700 group-hover:opacity-100 sm:p-5 [@media(hover:none)]:opacity-100 [@media(hover:none)]:from-espresso/50"
          >
            <span className="font-sans text-[0.58rem] font-semibold tracking-[0.24em] text-ivory/70 uppercase">
              No. {formatNo(look.no)}
            </span>
            <span className="mt-1 translate-y-2 font-serif text-[1.35rem] leading-tight text-ivory italic transition-transform duration-700 group-hover:translate-y-0">
              {look.title}
            </span>
          </span>
        ) : (
          <span className="mt-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <span className="font-serif text-[1.35rem] leading-tight italic">{look.title}</span>
            <span className="text-[0.6rem] font-semibold tracking-[0.18em] text-taupe uppercase sm:shrink-0">
              {look.categories.map((c) => categoryLabel[c]).join(" · ")}
            </span>
          </span>
        )}
      </Link>
      <SaveButton
        slug={look.slug}
        title={look.title}
        variant="icon"
        className="absolute top-3 right-3 opacity-0 group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100 aria-pressed:opacity-100"
      />
    </article>
  )
}
