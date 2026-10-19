import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PageIntro } from "@/components/brand";
import { PageTransition } from "@/components/experience/page-transition";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/content/services";
import { serviceEnquiryMailto } from "@/lib/mailto";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Makeup artistry, hair styling and photography in Beaverton, Oregon — bridal, party and studio makeup, bridal and event hair, studio sessions, event, maternity and family photography.",
  alternates: { canonical: "/services" },
};

const tone = {
  blush: "bg-blush/55 text-espresso",
  cream: "bg-cream text-espresso",
  dark: "bg-espresso text-ivory",
};

export default function ServicesPage() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow="Services"
        title={"Three crafts,\n*one artist.*"}
        intro="Book one service, or bring them together for the complete experience — hair and makeup, then your portraits, guided by the same artist from start to finish."
      />

      {services.map((s, i) => (
        <Link
          key={s.slug}
          href={`/services/${s.slug}`}
          transitionTypes={["nav-forward"]}
          data-tone={s.tone === "dark" ? "dark" : undefined}
          data-cursor="Discover"
          className={cn("group block py-20 sm:py-28", tone[s.tone])}
        >
          <div className="container-editorial grid items-center gap-12 lg:grid-cols-12">
            <div
              className={cn(
                "relative lg:col-span-6",
                i % 2 === 1 && "lg:order-2 lg:col-start-7",
              )}
            >
              <div
                className="relative aspect-[4/5] overflow-hidden bg-sand sm:mr-[18%]"
                data-reveal
                data-unveil
              >
                <Image
                  src={s.hero.image}
                  alt={s.hero.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  placeholder="blur"
                  className="object-cover object-[50%_30%] transition-transform duration-[1.6s] ease-editorial group-hover:scale-[1.04]"
                />
              </div>
              <div className="absolute right-0 -bottom-8 hidden aspect-square w-[36%] overflow-hidden bg-sand shadow-[0_30px_60px_-30px_rgba(43,33,28,0.45)] sm:block">
                <Image
                  src={s.detail.image}
                  alt={s.detail.alt}
                  fill
                  sizes="16vw"
                  placeholder="blur"
                  className="object-cover"
                />
              </div>
            </div>
            <div
              className={cn(
                "lg:col-span-5",
                i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8",
              )}
              data-reveal
            >
              <p
                className={cn(
                  "font-serif text-[6rem] leading-none italic sm:text-[8rem]",
                  s.tone === "dark" ? "text-blush" : "text-rose-deep",
                )}
                aria-hidden
              >
                {s.no}
              </p>
              <p className="eyebrow mt-6 opacity-70">{s.kicker}</p>
              <h2 className="display mt-4 text-[clamp(2.6rem,5vw,4.4rem)]">
                {s.title} <em>{s.italic}</em>
              </h2>
              <p className="mt-6 max-w-md text-[1.02rem] leading-[1.8] opacity-80">
                {s.description}
              </p>
              <ul
                className={cn(
                  "mt-8 max-w-md border-t",
                  s.tone === "dark" ? "border-ivory/20" : "border-espresso/15",
                )}
              >
                {s.includes.map((item) => (
                  <li
                    key={item}
                    className={cn(
                      "border-b py-3.5",
                      s.tone === "dark"
                        ? "border-ivory/20"
                        : "border-espresso/15",
                    )}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <span
                className={cn(
                  buttonVariants({
                    variant: s.tone === "dark" ? "brand-light" : "brand",
                    size: "cta",
                  }),
                  "mt-10",
                )}
              >
                Discover {(s.title + " " + s.italic).trim().toLowerCase()}{" "}
                <ArrowUpRight aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      ))}

      <section
        className="container-editorial py-24 sm:py-32"
        aria-labelledby="together-title"
      >
        <div
          className="flex flex-col items-start justify-between gap-8 border-y border-border py-12 md:flex-row md:items-center"
          data-reveal
        >
          <div>
            <p className="eyebrow text-taupe">The complete experience</p>
            <h2
              id="together-title"
              className="mt-3 max-w-2xl font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-snug"
            >
              Beauty &amp; photography in a single session — your hair and
              makeup, then your portraits.
            </h2>
          </div>
          <a
            href={serviceEnquiryMailto(["makeup", "hair", "photography"])}
            className={cn(
              buttonVariants({ variant: "brand", size: "cta" }),
              "shrink-0",
            )}
          >
            Enquire about a session <ArrowUpRight aria-hidden />
          </a>
        </div>
      </section>
    </PageTransition>
  );
}
