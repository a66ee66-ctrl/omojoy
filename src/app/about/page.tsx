import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import lolaPortrait from "@/assets/images/about/lola-portrait.jpg";
import lolaStudio from "@/assets/images/about/lola-studio.jpg";
import lolaWithCamera from "@/assets/images/about/lola-with-camera.jpg";
import behindTheScenes from "@/assets/images/about/behind-the-scenes.jpg";
import { Eyebrow, InstagramGlyph } from "@/components/brand";
import { PageTransition } from "@/components/experience/page-transition";
import { Voices } from "@/components/home/voices";
import { SplitHeading } from "@/components/split-heading";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { about } from "@/content/about";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Lola",
  description:
    "Meet Lola — makeup artist, hairstylist and photographer behind Joyful Artistry, with roots in Lagos and Abuja and a studio in Beaverton, Oregon.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <PageTransition>
      <header className="container-editorial grid items-end gap-12 pt-32 pb-20 sm:pt-40 lg:grid-cols-12">
        <div className="lg:col-span-6 lg:pb-10">
          <div className="animate-hero-rise">
            <Eyebrow>Meet the artist</Eyebrow>
          </div>
          <SplitHeading
            as="h1"
            text={`Hi, I’m\n*${site.owner}.*`}
            className="mt-8 text-[clamp(4rem,11vw,10rem)] leading-[0.85]"
          />
          <p
            className="eyebrow animate-hero-rise mt-8 text-taupe"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          >
            {site.roles.join(" · ")}
          </p>
          <p
            className="animate-hero-rise mt-8 max-w-lg font-serif text-[1.6rem] leading-[1.4] text-cocoa"
            style={{ "--delay": "550ms" } as React.CSSProperties}
          >
            {about.intro}
          </p>
        </div>
        <div className="relative lg:col-span-5 lg:col-start-8">
          <div
            className="animate-hero-unveil relative aspect-[4/5] overflow-hidden bg-sand"
            style={{ "--delay": "200ms" } as React.CSSProperties}
          >
            <Image
              src={lolaWithCamera}
              alt={`${site.owner}, founder of Joyful Artistry, seated with her camera in the studio`}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="animate-slow-zoom object-cover object-[45%_40%]"
              style={{ "--delay": "200ms" } as React.CSSProperties}
            />
          </div>
        </div>
      </header>

      <section
        aria-labelledby="story-title"
        className="bg-cream py-24 sm:py-32"
      >
        <div className="container-editorial">
          <h2 id="story-title" className="eyebrow text-taupe" data-reveal>
            The story, in three chapters
          </h2>
          <ol className="mt-14 grid gap-14 lg:grid-cols-3 lg:gap-10">
            {about.chapters.map((c, i) => (
              <li
                key={c.no}
                className="border-t border-espresso/20 pt-8"
                data-reveal
                data-reveal-delay={i * 150}
              >
                <p className="font-serif text-[4.5rem] leading-none text-rose-deep/70 italic">
                  {c.no}
                </p>
                <p className="eyebrow mt-6 text-taupe">{c.place}</p>
                <h3 className="mt-3 font-serif text-[2.2rem] leading-tight">
                  {c.title}
                </h3>
                <p className="mt-4 leading-[1.8] text-cocoa">{c.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-label="Lola’s philosophy"
        className="container-editorial grid items-center gap-16 py-24 sm:py-36 lg:grid-cols-12"
      >
        <figure className="relative lg:col-span-5" data-reveal data-unveil>
          <div className="relative aspect-[4/5] overflow-hidden bg-sand">
            <Image
              src={lolaPortrait}
              alt={`Portrait of ${site.owner}`}
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder="blur"
              className="object-cover object-[50%_30%]"
            />
          </div>
        </figure>
        <div className="lg:col-span-6 lg:col-start-7">
          <blockquote>
            <SplitHeading
              as="p"
              text={`“${about.quote}”`}
              className="text-[clamp(2.2rem,4.4vw,4rem)] leading-[1.1] italic"
            />
          </blockquote>
          {about.paragraphs.map((p) => (
            <p
              key={p.slice(0, 20)}
              className="mt-10 max-w-lg leading-[1.85] text-cocoa"
              data-reveal
            >
              {p}
            </p>
          ))}
          {about.stats.length > 0 && (
            <dl
              className="mt-12 grid grid-cols-3 border-y border-border"
              data-reveal
            >
              {about.stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex flex-col py-6",
                    i > 0 && "border-l border-border pl-4 sm:pl-6",
                  )}
                >
                  <dt className="order-2 mt-2 text-[0.72rem] leading-snug text-taupe">
                    {s.label}
                  </dt>
                  <dd className="order-1 font-serif text-[2.6rem] leading-none sm:text-[3.2rem]">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      <section
        aria-labelledby="values-title"
        data-tone="dark"
        className="bg-espresso py-24 text-ivory sm:py-32"
      >
        <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
            <p className="eyebrow text-blush">What you can expect</p>
            <SplitHeading
              id="values-title"
              text={"Care you can see,\n*and feel.*"}
              accent="text-blush"
              className="mt-6 text-[clamp(2.4rem,4.6vw,4rem)]"
            />
          </div>
          <ol className="lg:col-span-7 lg:col-start-6">
            {about.values.map((v, i) => (
              <li
                key={v.title}
                data-reveal
                data-reveal-delay={i * 80}
                className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-ivory/15 py-9 last:border-b sm:grid-cols-[5rem_1fr_1.3fr] sm:gap-x-8"
              >
                <span className="font-serif text-[1.1rem] text-blush italic">
                  0{i + 1}
                </span>
                <h3 className="font-serif text-[1.75rem] leading-tight sm:text-[2rem]">
                  {v.title}
                </h3>
                <p className="col-start-2 mt-3 leading-[1.8] text-ivory/75 sm:col-start-3 sm:mt-0">
                  {v.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        aria-labelledby="studio-title"
        className="container-editorial py-24 sm:py-32"
      >
        <div className="grid gap-6 sm:grid-cols-12">
          <figure className="sm:col-span-7" data-reveal data-unveil>
            <div className="relative aspect-[3/2] overflow-hidden bg-sand">
              <Image
                src={behindTheScenes}
                alt="A bridal hairpiece being placed on a client during a Joyful Artistry session"
                fill
                sizes="(min-width: 640px) 58vw, 100vw"
                placeholder="blur"
                className="object-cover object-[50%_35%]"
              />
            </div>
            <figcaption className="mt-3 text-[0.8rem] text-taupe">
              Final touches, before the camera.
            </figcaption>
          </figure>
          <figure className="sm:col-span-5 sm:mt-32" data-reveal data-unveil>
            <div className="relative aspect-[16/11] overflow-hidden bg-sand">
              <Image
                src={lolaStudio}
                alt={`${site.owner} in the studio beside her makeup kit and lighting`}
                fill
                sizes="(min-width: 640px) 42vw, 100vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 text-[0.8rem] text-taupe">
              In the studio.
            </figcaption>
          </figure>
        </div>
        <div className="mx-auto mt-24 max-w-3xl text-center">
          <h2 id="studio-title" className="eyebrow text-taupe" data-reveal>
            Beyond the studio
          </h2>
          <p
            className="mt-6 font-serif text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.4]"
            data-reveal
          >
            {about.beyond}
          </p>
          <div
            className="mt-12 flex flex-col justify-center gap-3 sm:flex-row"
            data-reveal
          >
            <Link
              href="/contact"
              className={buttonVariants({ variant: "brand", size: "cta" })}
            >
              Make an enquiry <ArrowUpRight aria-hidden />
            </Link>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({
                variant: "brand-outline",
                size: "cta",
              })}
            >
              <InstagramGlyph /> Follow my work
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </section>

      <Voices />
    </PageTransition>
  );
}
