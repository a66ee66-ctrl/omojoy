import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/brand";
import { Morph } from "@/components/experience/page-transition";
import { LookImage } from "@/components/looks/look-card";
import { SaveButton } from "@/components/looks/save-button";
import { SplitHeading } from "@/components/split-heading";
import { buttonVariants } from "@/components/ui/button";
import { categoryLabel, formatNo } from "@/content/portfolio";
import { getLookOfTheDay } from "@/lib/look-of-the-day";

export async function LookOfTheDay() {
  const { look, label } = await getLookOfTheDay();

  return (
    <section id="look-of-the-day" aria-labelledby="lotd-title" className="py-24 sm:py-32 lg:py-40">
      <div className="container-editorial grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <Link
          href={`/portfolio/${look.slug}`}
          transitionTypes={["nav-forward"]}
          data-cursor="View"
          className="group relative block lg:col-span-6 lg:col-start-1"
          aria-label={`See today’s look: ${look.title}`}
        >
          <Morph name={`look-${look.slug}`}>
            <div className="relative aspect-[4/5] overflow-hidden bg-sand" data-reveal data-unveil>
              <LookImage
                look={look}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.04]"
              />
            </div>
          </Morph>
          <span
            aria-hidden
            className="absolute -top-6 right-2 grid size-24 rotate-12 place-items-center rounded-full bg-blush text-center font-serif text-[1.05rem] leading-tight text-espresso italic shadow-[0_20px_40px_-20px_rgba(43,33,28,0.4)] sm:-right-8 sm:size-32"
          >
            Today’s
            <br />
            look
          </span>
        </Link>

        <div className="lg:col-span-5 lg:col-start-8">
          <div data-reveal>
            <Eyebrow>Look of the Day</Eyebrow>
            <p className="mt-4 text-[0.82rem] text-taupe">{label}</p>
          </div>
          <p className="mt-10 font-serif text-[1.2rem] text-rose-deep italic" data-reveal>
            No. {formatNo(look.no)}
          </p>
          <SplitHeading id="lotd-title" text={look.title} className="mt-2 text-[clamp(3rem,6vw,5.6rem)]" />
          <p className="mt-6 max-w-md font-serif text-[1.5rem] leading-[1.4] text-cocoa" data-reveal>
            {look.note}
          </p>
          <p className="eyebrow mt-8 text-[0.62rem] text-taupe" data-reveal>
            {look.categories.map((c) => categoryLabel[c]).join(" · ")}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
            <Link
              href={`/portfolio/${look.slug}`}
              transitionTypes={["nav-forward"]}
              className={buttonVariants({ variant: "brand", size: "cta" })}
            >
              See the look <ArrowUpRight aria-hidden />
            </Link>
            <SaveButton slug={look.slug} title={look.title} variant="full" />
          </div>
          <p className="mt-12 border-t border-border pt-6 font-serif text-[1.2rem] text-taupe italic" data-reveal>
            A new look is chosen from the archive every day. Come back tomorrow for another.
          </p>
        </div>
      </div>
    </section>
  );
}
