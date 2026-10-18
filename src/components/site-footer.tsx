import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUpRight } from "lucide-react";

import { InstagramGlyph } from "@/components/brand";
import { FooterInvite } from "@/components/footer-invite";
import { SplitHeading } from "@/components/split-heading";
import { discoverNav, nav, site } from "@/config/site";
import { collections, collectionName } from "@/content/collections";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function SiteFooter() {
  const { email, phone, phoneHref } = site.contact;
  return (
    <footer
      data-tone="dark"
      className="relative overflow-hidden bg-espresso text-ivory"
    >
      <div className="container-editorial pt-16 sm:pt-20">
        <FooterInvite>
          <Link
            href="/contact"
            className="group mt-12 block border-b border-ivory/15 pb-16 sm:mt-16 sm:pb-24"
            data-cursor="Enquire"
          >
            <p className="eyebrow text-blush">Your moment is waiting</p>
            <SplitHeading
              as="p"
              text={"Let’s create\n*something beautiful.*"}
              accent="text-blush"
              className="mt-8 text-[clamp(3.2rem,9vw,9rem)] transition-colors duration-700"
            />
            <span className="mt-10 inline-flex items-center gap-4 text-[0.75rem] font-semibold tracking-[0.24em] uppercase">
              <span className="grid size-14 place-items-center rounded-full border border-ivory/30 transition-all duration-700 ease-editorial group-hover:rotate-45 group-hover:border-blush group-hover:bg-blush group-hover:text-espresso">
                <ArrowUpRight aria-hidden className="size-5" />
              </span>
              Make an enquiry
            </span>
          </Link>
        </FooterInvite>

        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="max-w-xs font-serif text-[1.45rem] leading-snug text-ivory/80 italic">
              Makeup artistry, hair styling and photography by {site.owner} —{" "}
              {site.location.area}.
            </p>
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold tracking-[0.2em] text-ivory/80 uppercase transition-colors hover:text-ivory"
            >
              <InstagramGlyph /> @{site.social.instagram.handle}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <FooterList
            title="Explore"
            items={nav}
            className="lg:col-span-2 lg:col-start-6"
          />
          <FooterList
            title="Collections"
            items={collections.map((c) => ({
              label: collectionName(c),
              href: `/collections/${c.slug}`,
            }))}
            className="lg:col-span-2"
          />
          <div className="lg:col-span-3 lg:col-start-10">
            <FooterList title="Discover" items={discoverNav} />
            <p className="eyebrow mt-10 text-[0.62rem] text-ivory/50">
              Contact
            </p>
            <ul className="mt-5 space-y-2.5 text-ivory/85">
              {email && (
                <li>
                  <a
                    href={`mailto:${email}`}
                    className="link-underline pb-0.5 hover:text-ivory"
                  >
                    {email}
                  </a>
                </li>
              )}
              {phone && (
                <li>
                  <a
                    href={`tel:${phoneHref}`}
                    className="link-underline pb-0.5 hover:text-ivory"
                  >
                    {phone}
                  </a>
                </li>
              )}
              <li className="text-ivory/60">{site.location.city}, Oregon</li>
            </ul>
          </div>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none -mb-[0.22em] text-center font-serif text-[16.5vw] leading-[0.8] tracking-[-0.04em] whitespace-nowrap text-ivory/[0.06] italic select-none"
      >
        Joyful Artistry
      </p>

      <div className="container-editorial relative flex flex-col gap-3 border-t border-ivory/10 py-8 text-[0.75rem] text-ivory/55 sm:flex-row sm:justify-between">
        <p>
          © <CopyrightYear /> {site.name}. All rights reserved.
        </p>
        <p>All photography and artistry shown is the work of {site.name}.</p>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  items,
  className,
}: {
  title: string;
  items: readonly { label: string; href: string }[];
  className?: string;
}) {
  return (
    <nav aria-label={title} className={className}>
      <p className="eyebrow text-[0.62rem] text-ivory/50">{title}</p>
      <ul className="mt-5 space-y-2.5">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="link-underline pb-0.5 text-ivory/85 hover:text-ivory"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
