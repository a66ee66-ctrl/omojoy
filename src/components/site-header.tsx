"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Heart } from "lucide-react";

import { InstagramGlyph, Wordmark } from "@/components/brand";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { discoverNav, nav, site } from "@/config/site";
import { useMoodboard } from "@/lib/moodboard";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const saved = useMoodboard().length;

  const [overDark, setOverDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;
    // Flip to light text whenever a section marked data-tone="dark" sits beneath the header.
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 40);
      const under = document
        .elementsFromPoint(window.innerWidth / 2, 36)
        .find((el) => !headerRef.current?.contains(el));
      setOverDark(!!under?.closest('[data-tone="dark"]'));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // Re-check after route changes once the new page has painted.
    const t = setTimeout(update, 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  const light = overDark && !open;
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const booking = site.bookingUrl
    ? { href: site.bookingUrl, target: "_blank", rel: "noopener noreferrer" }
    : { href: "/contact" };

  return (
    <header
      ref={headerRef}
      style={{ viewTransitionName: "site-header" }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,color] duration-700",
        scrolled
          ? light
            ? "bg-espresso/80 shadow-[0_1px_0_rgba(248,243,236,0.1)] backdrop-blur-md"
            : "bg-ivory/85 shadow-[0_1px_0_var(--border)] backdrop-blur-md"
          : "bg-transparent",
        light ? "text-ivory" : "text-espresso",
      )}
    >
      <div
        className={cn(
          "container-editorial flex items-center justify-between transition-[height] duration-500",
          scrolled ? "h-16" : "h-20",
        )}
      >
        <Wordmark tone={light ? "light" : "dark"} />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="link-underline pb-1 text-[0.7rem] font-medium tracking-[0.2em] uppercase opacity-80 transition-opacity hover:opacity-100 aria-[current=page]:bg-[length:100%_1px] aria-[current=page]:opacity-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/moodboard"
            aria-label={`Your moodboard${saved ? ` (${saved} saved)` : ""}`}
            className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-current/10"
          >
            <Heart
              aria-hidden
              className={cn("size-[1.15rem]", saved && "fill-current")}
            />
            {saved > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid min-w-5 place-items-center rounded-full bg-rose-deep px-1 text-[0.6rem] font-semibold text-ivory tabular-nums">
                {saved}
              </span>
            )}
          </Link>

          <a
            {...booking}
            className={cn(
              buttonVariants({
                variant: light ? "brand-light" : "brand",
                size: "cta-sm",
              }),
              "hidden sm:inline-flex",
            )}
          >
            Book an Appointment
            {site.bookingUrl && (
              <span className="sr-only">(opens in a new tab)</span>
            )}
          </a>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="group inline-flex h-10 items-center gap-3 pl-2 text-[0.7rem] font-semibold tracking-[0.22em] uppercase lg:hidden"
              aria-label="Open menu"
            >
              Menu
              <span aria-hidden className="flex w-6 flex-col gap-[5px]">
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 self-end bg-current transition-all duration-500 group-hover:w-full" />
              </span>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full gap-0 border-none bg-espresso p-0 text-ivory data-[side=right]:w-full data-[side=right]:sm:max-w-lg"
            >
              <div className="flex h-20 items-center justify-between px-6">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation
                </SheetDescription>
                <Wordmark tone="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-[0.7rem] font-semibold tracking-[0.22em] text-ivory/80 uppercase hover:text-ivory"
                >
                  Close
                </button>
              </div>
              <nav
                aria-label="Mobile"
                className="flex-1 overflow-y-auto px-6 pt-4"
              >
                <ol>
                  {nav.map((item, i) => (
                    <li
                      key={item.href}
                      className="animate-in fill-mode-both border-b border-ivory/10 duration-700 fade-in-0 slide-in-from-right-8"
                      style={{ animationDelay: `${80 + i * 60}ms` }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={isActive(item.href) ? "page" : undefined}
                        className="group flex items-baseline gap-5 py-4"
                      >
                        <span className="font-sans text-[0.62rem] tracking-[0.2em] text-ivory/50">
                          0{i + 1}
                        </span>
                        <span className="display text-[2.5rem] transition-colors duration-500 group-hover:text-blush group-aria-[current=page]:text-blush group-aria-[current=page]:italic">
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
                <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                  {discoverNav.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="link-underline pb-0.5 font-serif text-[1.3rem] text-ivory/80 italic hover:text-ivory"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-5 px-6 pt-8 pb-10">
                <a
                  {...booking}
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants({ variant: "brand-light", size: "cta" }),
                    "w-full",
                  )}
                >
                  Book an Appointment
                  <ArrowUpRight aria-hidden />
                </a>
                <a
                  href={site.social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 text-sm text-ivory/70 hover:text-ivory"
                >
                  <InstagramGlyph /> @{site.social.instagram.handle}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
