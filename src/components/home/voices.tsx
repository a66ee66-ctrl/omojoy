import { testimonials } from "@/content/testimonials";

/** Client words drifting past in a slow marquee. */
export function Voices() {
  const row = (hidden?: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-stretch gap-6 pr-6">
      {testimonials.map((t) => (
        <li key={t.name} className="w-[min(82vw,34rem)] shrink-0">
          <figure className="flex h-full flex-col justify-between border border-border bg-ivory p-8 sm:p-10">
            <blockquote className="font-serif text-[1.55rem] leading-[1.4] text-espresso italic sm:text-[1.75rem]">
              “{t.quote}”
            </blockquote>
            <figcaption className="eyebrow mt-8 text-[0.62rem] text-taupe">— {t.name}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );

  return (
    <section aria-labelledby="voices-title" className="overflow-hidden bg-cream py-24 sm:py-32">
      <div className="container-editorial mb-14 flex items-end justify-between gap-6" data-reveal>
        <h2 id="voices-title" className="display text-[clamp(2.6rem,5.4vw,5rem)]">
          Kind <em className="text-rose-deep">words.</em>
        </h2>
        <p className="hidden max-w-xs text-right text-[0.85rem] leading-relaxed text-taupe sm:block">
          From clients, in their own words.
        </p>
      </div>
      <div className="group flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-full motion-reduce:overflow-x-auto">
        {row()}
        {row(true)}
      </div>
    </section>
  );
}
