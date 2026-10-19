import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

import { Eyebrow } from "@/components/brand";
import { PageTransition } from "@/components/experience/page-transition";
import { LookCard } from "@/components/looks/look-card";
import { SplitHeading } from "@/components/split-heading";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import {
  getService,
  services,
  serviceLooks,
  sessionSteps,
} from "@/content/services";
import { serviceEnquiryMailto } from "@/lib/mailto";
import { cn } from "@/lib/utils";

// Render unknown slugs completely before responding so notFound() returns a real 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/services/[slug]">): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return {};
  const name = `${s.title} ${s.italic}`.trim();
  return {
    title: `${name} in Beaverton, Oregon`,
    description: `${s.description} ${s.includes.join(", ")}.`,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      images: [
        {
          url: s.hero.image.src,
          width: s.hero.image.width,
          height: s.hero.image.height,
          alt: s.hero.alt,
        },
      ],
    },
  };
}

const heroTone = {
  blush: "bg-blush/55 text-espresso",
  cream: "bg-cream text-espresso",
  dark: "bg-espresso text-ivory",
};

export default async function ServicePage({
  params,
}: PageProps<"/services/[slug]">) {
  const s = getService((await params).slug);
  if (!s) notFound();

  const name = `${s.title} ${s.italic}`.trim();
  const dark = s.tone === "dark";
  const work = serviceLooks(s).slice(0, 8);
  const others = services.filter((o) => o.slug !== s.slug);
  const booking = site.bookingUrl
    ? { href: site.bookingUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: serviceEnquiryMailto(s.value) };

  return (
    <PageTransition>
      <header
        data-tone={dark ? "dark" : undefined}
        className={cn(
          "relative overflow-hidden pt-32 pb-24 sm:pt-40",
          heroTone[s.tone],
        )}
      >
        <div className="container-editorial grid items-end gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Link
              href="/services"
              transitionTypes={["nav-back"]}
              className="inline-flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.2em] uppercase opacity-70 hover:opacity-100"
            >
              <ArrowLeft aria-hidden className="size-4" /> All services
            </Link>
            <p
              className={cn(
                "animate-hero-rise mt-12 font-serif text-[clamp(4rem,9vw,8rem)] leading-none italic",
                dark ? "text-blush" : "text-rose-deep",
              )}
            >
              {s.no}
            </p>
            <h1
              className="display animate-hero-rise mt-2 text-[clamp(3.4rem,8vw,7.5rem)]"
              style={{ "--delay": "120ms" } as React.CSSProperties}
            >
              {s.title}{" "}
              <em className={dark ? "text-blush" : "text-rose-deep"}>
                {s.italic}
              </em>
            </h1>
            <p
              className="eyebrow animate-hero-rise mt-6 opacity-70"
              style={{ "--delay": "240ms" } as React.CSSProperties}
            >
              {s.kicker}
            </p>
            <p
              className="animate-hero-rise mt-8 max-w-lg text-[1.08rem] leading-[1.8] opacity-85"
              style={{ "--delay": "360ms" } as React.CSSProperties}
            >
              {s.description}
            </p>
            <div
              className="animate-hero-rise mt-10 flex flex-col gap-3 sm:flex-row"
              style={{ "--delay": "480ms" } as React.CSSProperties}
            >
              <a
                href={serviceEnquiryMailto(s.value)}
                className={buttonVariants({
                  variant: dark ? "brand-light" : "brand",
                  size: "cta",
                })}
              >
                Enquire <ArrowUpRight aria-hidden />
              </a>
              <a
                {...booking}
                className={buttonVariants({
                  variant: dark ? "brand-outline-light" : "brand-outline",
                  size: "cta",
                })}
              >
                Book an appointment
                {site.bookingUrl && (
                  <span className="sr-only">(opens in a new tab)</span>
                )}
              </a>
            </div>
          </div>
          <div className="relative lg:col-span-5 lg:col-start-8">
            <div
              className="animate-hero-unveil relative aspect-[4/5] overflow-hidden bg-sand"
              style={{ "--delay": "200ms" } as React.CSSProperties}
            >
              <Image
                src={s.hero.image}
                alt={s.hero.alt}
                fill
                preload
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder="blur"
                className="animate-slow-zoom object-cover object-[50%_30%]"
                style={{ "--delay": "200ms" } as React.CSSProperties}
              />
            </div>
            <div
              className="animate-hero-rise absolute -bottom-10 -left-6 hidden aspect-square w-[42%] overflow-hidden bg-sand shadow-[0_30px_60px_-30px_rgba(43,33,28,0.5)] sm:block"
              style={{ "--delay": "700ms" } as React.CSSProperties}
            >
              <Image
                src={s.detail.image}
                alt={s.detail.alt}
                fill
                sizes="18vw"
                placeholder="blur"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <section
        className="container-editorial grid gap-14 py-24 sm:py-32 lg:grid-cols-12"
        aria-labelledby="included-title"
      >
        <div className="lg:col-span-6">
          <Eyebrow>The approach</Eyebrow>
          <p
            className="mt-8 font-serif text-[clamp(1.7rem,2.8vw,2.4rem)] leading-[1.35]"
            data-reveal
          >
            {s.intro}
          </p>
        </div>
        <div className="lg:col-span-5 lg:col-start-8">
          <h2 id="included-title" className="eyebrow text-taupe" data-reveal>
            Services include
          </h2>
          <ol className="mt-6 border-t border-border">
            {s.includes.map((item, i) => (
              <li
                key={item}
                className="flex items-baseline gap-6 border-b border-border py-6"
                data-reveal
                data-reveal-delay={i * 100}
              >
                <span className="font-serif text-[1.05rem] text-rose-deep italic">
                  0{i + 1}
                </span>
                <span className="font-serif text-[1.9rem] leading-tight">
                  {item}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="bg-cream py-24 sm:py-32"
        aria-labelledby="steps-title"
      >
        <div className="container-editorial">
          <SplitHeading
            id="steps-title"
            text={"How a session *flows.*"}
            className="text-[clamp(2.4rem,5vw,4.4rem)]"
          />
          <ol className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {sessionSteps(s).map((step, i) => (
              <li
                key={step.title}
                className="bg-cream p-8 sm:p-10"
                data-reveal
                data-reveal-delay={i * 120}
              >
                <span className="font-serif text-[3.2rem] leading-none text-rose-deep/70 italic">
                  {i + 1}
                </span>
                <h3 className="mt-8 font-serif text-[1.8rem] leading-tight">
                  {step.title}
                </h3>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-cocoa">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="container-editorial py-24 sm:py-32"
        aria-labelledby="work-title"
      >
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <SplitHeading
            id="work-title"
            text={"Selected *work.*"}
            className="text-[clamp(2.4rem,5vw,4.4rem)]"
          />
          <Link
            href="/portfolio"
            className="link-underline pb-1 text-[0.72rem] font-semibold tracking-[0.2em] uppercase"
          >
            The full archive
          </Link>
        </div>
        <ul className="columns-2 gap-4 sm:gap-6 lg:columns-4">
          {work.map((look) => (
            <li key={look.slug} className="mb-4 break-inside-avoid sm:mb-6">
              <LookCard look={look} />
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-border" aria-labelledby="pair-title">
        <div className="container-editorial grid gap-10 py-20 sm:py-24 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-taupe">Better together</p>
            <h2
              id="pair-title"
              className="mt-4 font-serif text-[2.2rem] leading-tight"
            >
              Pair {name.toLowerCase()} with…
            </h2>
          </div>
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group flex items-center gap-5"
                  data-cursor="Discover"
                >
                  <span className="relative block aspect-square w-24 shrink-0 overflow-hidden bg-sand">
                    <Image
                      src={o.hero.image}
                      alt=""
                      fill
                      sizes="96px"
                      placeholder="blur"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </span>
                  <span>
                    <span className="block font-serif text-[1.8rem] leading-tight group-hover:text-rose-deep">
                      {o.title} <em>{o.italic}</em>
                    </span>
                    <span className="text-[0.85rem] text-taupe">
                      {o.kicker}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
