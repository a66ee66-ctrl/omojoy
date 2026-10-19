import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { byId } from "@/content/portfolio";
import { cn } from "@/lib/utils";

// Four columns of real work drifting in opposite directions.
const columns = [
  {
    speed: "70s",
    dir: "up",
    slugs: [
      "golden-glam",
      "marigold",
      "pearl-updo",
      "the-proposal",
      "monochrome-maternity",
    ],
  },
  {
    speed: "85s",
    dir: "down",
    slugs: [
      "maternity-in-studio",
      "braided-crown",
      "glass-block",
      "rose-shimmer",
      "emerald",
    ],
  },
  {
    speed: "75s",
    dir: "up",
    slugs: [
      "gold-gele-coral",
      "copper-curls",
      "expecting",
      "classic-red",
      "sleek-low-bun",
    ],
  },
  {
    speed: "90s",
    dir: "down",
    slugs: [
      "maternity-butterfly",
      "plum-and-lace",
      "blush",
      "getting-ready",
      "together",
    ],
  },
] as const;

export function HeroReel() {
  const bookingProps = site.bookingUrl
    ? { href: site.bookingUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: "/contact" };

  return (
    <section
      data-tone="dark"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh items-center overflow-hidden bg-espresso text-ivory"
    >
      <div
        aria-hidden
        className="reel absolute inset-0 -z-10 grid grid-cols-2 gap-3 px-3 opacity-[0.62] sm:grid-cols-3 lg:grid-cols-4 lg:gap-4 lg:px-4"
      >
        {columns.map((col, ci) => (
          <div
            key={ci}
            className={cn(
              "relative overflow-hidden",
              ci === 3 && "hidden lg:block",
              ci === 2 && "hidden sm:block",
            )}
          >
            <div
              className={cn(
                "flex flex-col gap-3 lg:gap-4",
                col.dir === "up" ? "reel-up" : "reel-down",
              )}
              style={{ "--speed": col.speed } as React.CSSProperties}
            >
              {[...col.slugs, ...col.slugs].map((slug, i) => {
                const look = byId(slug);
                return (
                  <div
                    key={i}
                    className={cn(
                      "relative w-full overflow-hidden bg-cocoa",
                      i % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/5]",
                    )}
                  >
                    <Image
                      src={look.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      placeholder="blur"
                      loading={i < 2 ? "eager" : "lazy"}
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(43,33,28,0.55)_0%,rgba(43,33,28,0.8)_55%,rgba(43,33,28,0.95)_100%)]"
      />

      <div className="container-editorial relative py-32 text-center">
        <p
          className="animate-hero-rise eyebrow text-blush"
          style={{ "--delay": "100ms" } as React.CSSProperties}
        >
          Makeup · Hair · Photography <br /> {site.location.city}, Oregon
        </p>
        <h1
          id="hero-title"
          className="display mx-auto mt-8 text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.9]"
        >
          {["Your Beauty.", "Your Moments."].map((line, i) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span
                className="animate-hero-rise block"
                style={
                  { "--delay": `${200 + i * 140}ms` } as React.CSSProperties
                }
              >
                {line}
              </span>
            </span>
          ))}
          <span className="block overflow-hidden pb-[0.1em]">
            <span
              className="animate-hero-rise block"
              style={{ "--delay": "480ms" } as React.CSSProperties}
            >
              Your <em className="text-blush">Artistry.</em>
            </span>
          </span>
        </h1>
        <p
          className="animate-hero-rise mx-auto mt-8 max-w-xl text-[1.05rem] leading-[1.75] text-ivory/80"
          style={{ "--delay": "700ms" } as React.CSSProperties}
        >
          Personalised makeup, creative hairstyling and beautiful photography,
          thoughtfully crafted to celebrate your individuality and capture
          moments that last.
        </p>
        <div
          className="animate-hero-rise mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          style={{ "--delay": "850ms" } as React.CSSProperties}
        >
          <Link
            href="/portfolio"
            className={buttonVariants({ variant: "brand-light", size: "cta" })}
          >
            Explore Our Work
            <ArrowUpRight
              aria-hidden
              className="transition-transform duration-500 group-hover/button:rotate-45"
            />
          </Link>
          <a
            {...bookingProps}
            className={buttonVariants({
              variant: "brand-outline-light",
              size: "cta",
            })}
          >
            Book an Appointment
            {site.bookingUrl && (
              <span className="sr-only">(opens in a new tab)</span>
            )}
          </a>
        </div>
      </div>

      <a
        href="#look-of-the-day"
        className="animate-hero-rise absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-[0.62rem] font-semibold tracking-[0.3em] text-ivory/70 uppercase transition-colors hover:text-ivory"
        style={{ "--delay": "1200ms" } as React.CSSProperties}
      >
        Today’s look
        <ArrowDown aria-hidden className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
