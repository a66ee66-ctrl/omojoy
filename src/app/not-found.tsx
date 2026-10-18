import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      <p className="eyebrow text-rose-deep">Error 404</p>
      <h1 className="display mt-6 text-[clamp(2.8rem,7vw,5.5rem)]">
        This page has <em className="text-rose-deep">moved on.</em>
      </h1>
      <p className="mt-6 max-w-md leading-[1.8] text-cocoa">
        The page you’re looking for doesn’t exist — but there’s plenty to
        discover.
      </p>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className={buttonVariants({ variant: "brand", size: "cta" })}
        >
          Return home
        </Link>
        <Link
          href="/portfolio"
          className={buttonVariants({ variant: "brand-outline", size: "cta" })}
        >
          Browse the archive
        </Link>
      </div>
    </section>
  );
}
