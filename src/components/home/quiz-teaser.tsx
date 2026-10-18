import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SplitHeading } from "@/components/split-heading";
import { buttonVariants } from "@/components/ui/button";
import { byId } from "@/content/portfolio";

const tiles = ["rose-shimmer", "heritage", "soft-waves"].map(byId);

export function QuizTeaser() {
  return (
    <section aria-labelledby="quiz-title" className="overflow-hidden bg-blush/60 py-24 sm:py-32">
      <div className="container-editorial grid items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-rose-deep" data-reveal>Find your look</p>
          <SplitHeading id="quiz-title" text={"Not sure where\nto *begin?*"} className="mt-6 text-[clamp(2.6rem,5.4vw,5rem)]" />
          <p className="mt-6 max-w-md leading-[1.8] text-cocoa" data-reveal>
            Answer three quick questions about your occasion and your style, and we’ll curate looks from the archive to
            inspire you — ready to save to your moodboard.
          </p>
          <Link href="/find-your-look" className={`${buttonVariants({ variant: "brand", size: "cta" })} mt-10`} data-reveal>
            Take the quiz <ArrowRight aria-hidden className="transition-transform duration-500 group-hover/button:translate-x-1" />
          </Link>
        </div>
        <div aria-hidden className="relative h-[26rem] sm:h-[32rem] lg:col-span-6 lg:col-start-7">
          {tiles.map((t, i) => (
            <div
              key={t.slug}
              data-reveal
              data-reveal-delay={i * 150}
              className={[
                "absolute overflow-hidden bg-sand shadow-[0_40px_80px_-40px_rgba(43,33,28,0.5)]",
                i === 0 && "top-0 left-[4%] aspect-[3/4] w-[44%] -rotate-6",
                i === 1 && "top-[12%] left-[32%] z-10 aspect-[3/4] w-[40%] rotate-2",
                i === 2 && "top-[4%] right-[2%] aspect-[3/4] w-[38%] rotate-[8deg]",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image src={t.image} alt="" fill sizes="(min-width: 1024px) 20vw, 40vw" placeholder="blur" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
