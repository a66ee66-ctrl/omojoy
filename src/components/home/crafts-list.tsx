"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Service } from "@/content/services";
import { cn } from "@/lib/utils";

/**
 * The three crafts as oversized type. Hovering a row reveals its photograph
 * beside the list (desktop); on touch screens each row shows its own image.
 */
export function CraftsList({ services }: { services: Service[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="relative grid gap-10 lg:grid-cols-12">
      <ul className="lg:col-span-7">
        {services.map((s, i) => (
          <li key={s.slug} className="border-t border-border last:border-b">
            <Link
              href={`/services/${s.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              data-cursor="Discover"
              className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 py-8 sm:gap-8 sm:py-10"
            >
              <span className="font-serif text-[1.1rem] text-rose-deep italic">{s.no}</span>
              <span>
                <span
                  className={cn(
                    "display block text-[clamp(2.6rem,6.6vw,6.2rem)] transition-all duration-700 ease-editorial",
                    active === i ? "lg:translate-x-4 lg:text-espresso" : "lg:text-espresso/35"
                  )}
                >
                  {s.title} <em className="text-rose-deep">{s.italic}</em>
                </span>
                <span className="mt-3 block max-w-md text-[0.95rem] leading-relaxed text-cocoa">{s.kicker}</span>
              </span>
              <span className="grid size-12 place-items-center rounded-full border border-espresso/20 transition-all duration-700 ease-editorial group-hover:rotate-45 group-hover:border-espresso group-hover:bg-espresso group-hover:text-ivory sm:size-14">
                <ArrowUpRight aria-hidden className="size-5" />
              </span>
            </Link>
            <div className="relative mb-8 aspect-[4/3] overflow-hidden bg-sand lg:hidden">
              <Image src={s.hero.image} alt={s.hero.alt} fill sizes="100vw" placeholder="blur" className="object-cover" />
            </div>
          </li>
        ))}
      </ul>

      <div aria-hidden className="relative hidden lg:col-span-4 lg:col-start-9 lg:block">
        <div className="sticky top-28 aspect-[3/4] overflow-hidden bg-sand">
          {services.map((s, i) => (
            <Image
              key={s.slug}
              src={s.hero.image}
              alt=""
              fill
              sizes="33vw"
              placeholder="blur"
              className={cn(
                "object-cover transition-[opacity,scale,clip-path] duration-1000 ease-editorial",
                active === i ? "scale-100 opacity-100 [clip-path:inset(0)]" : "scale-110 opacity-0 [clip-path:inset(10%)]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
