import Image from "next/image";
import Link from "next/link";

import logoDark from "@/assets/logo/logo-dark.png";
import logoLight from "@/assets/logo/logo-light.png";
import { SplitHeading } from "@/components/split-heading";
import { cn } from "@/lib/utils";

/** The business's own logo (from thejoyfulartistry.com), recoloured for light and dark backgrounds. */
export function Wordmark({
  className,
  tone = "dark",
  preload = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  preload?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="Joyful Artistry — home"
      className="group inline-flex items-center transition-opacity duration-500 hover:opacity-80"
    >
      <Image
        src={tone === "dark" ? logoDark : logoLight}
        alt="Joyful Artistry"
        preload={preload}
        className={cn("h-10 w-auto object-contain sm:h-11", className)}
      />
    </Link>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-4 text-rose-deep",
        className,
      )}
    >
      <span aria-hidden className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}

/** Standard page opening: eyebrow, split headline and an optional standfirst. */
export function PageIntro({
  eyebrow,
  title,
  intro,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        "container-editorial pt-36 pb-16 sm:pt-44 sm:pb-20",
        className,
      )}
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <div
            className="animate-hero-rise"
            style={{ "--delay": "50ms" } as React.CSSProperties}
          >
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <SplitHeading
            as="h1"
            text={title}
            className="mt-8 text-[clamp(3.2rem,8.5vw,8rem)]"
          />
        </div>
        {(intro || children) && (
          <div
            className="animate-hero-rise lg:col-span-4 lg:pb-3"
            style={{ "--delay": "400ms" } as React.CSSProperties}
          >
            {intro && (
              <p className="max-w-md text-[1.02rem] leading-[1.8] text-cocoa">
                {intro}
              </p>
            )}
            {children}
          </div>
        )}
      </div>
    </header>
  );
}

export function InstagramGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={cn("size-4", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}
