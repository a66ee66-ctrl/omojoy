import { cn } from "@/lib/utils"

type Tag = "h1" | "h2" | "h3" | "p"

/**
 * Editorial heading whose words rise into view. Wrap words in *asterisks* to set
 * them in italic accent, and use `\n` for deliberate line breaks.
 */
export function SplitHeading({
  as: Tag = "h2",
  text,
  className,
  accent = "text-rose-deep",
  id,
  delay = 0,
}: {
  as?: Tag
  text: string
  className?: string
  accent?: string
  id?: string
  delay?: number
}) {
  let w = delay
  const lines = text.split("\n")
  return (
    <Tag id={id} className={cn("display", className)} data-reveal data-words aria-label={text.replace(/\*/g, "").replace(/\n/g, " ")}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(/(\*[^*]+\*)/).filter(Boolean).flatMap((segment, si) => {
            const italic = segment.startsWith("*")
            const words = segment.replace(/\*/g, "").split(" ").filter(Boolean)
            return words.map((word, wi) => (
              <span key={`${si}-${wi}`} className="word inline-block overflow-hidden pb-[0.12em] align-top">
                <span className={cn(italic && cn("italic", accent))} style={{ "--w": w++ } as React.CSSProperties}>
                  {word}
                  {"\u00a0"}
                </span>
              </span>
            ))
          })}
        </span>
      ))}
    </Tag>
  )
}
