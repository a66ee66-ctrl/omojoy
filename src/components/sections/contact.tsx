import { ArrowUpRight, Calendar, Mail, Phone } from "lucide-react";

import { Eyebrow, InstagramGlyph } from "@/components/brand";
import { StudioMap } from "@/components/contact/studio-map";
import { SplitHeading } from "@/components/split-heading";
import { site } from "@/config/site";
import { directionsUrl } from "@/lib/maps";
import { mailto } from "@/lib/mailto";

type ContactMethod = {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
  external?: boolean;
};

export function Contact() {
  const { email, phone, phoneHref } = site.contact;
  const { street, city, region, postalCode } = site.location;

  const methods: ContactMethod[] = [
    email && {
      icon: Mail,
      label: "Email",
      value: email,
      href: mailto({ subject: "Enquiry" }),
    },
    phone && {
      icon: Phone,
      label: "Call or text",
      value: phone,
      href: `tel:${phoneHref}`,
    },
    site.bookingUrl && {
      icon: Calendar,
      label: "Book online",
      value: "Choose a time that suits you",
      href: site.bookingUrl,
      external: true,
    },
  ].filter((m): m is ContactMethod => Boolean(m));

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div className="container-editorial">
        <div className="animate-hero-rise">
          <Eyebrow>Enquiries & Bookings</Eyebrow>
        </div>
        <SplitHeading
          as="h1"
          id="contact-title"
          text={"Let’s create\n*something beautiful.*"}
          className="mt-8 max-w-3xl text-[clamp(2.8rem,6vw,5.4rem)]"
        />
        <p className="mt-8 max-w-lg text-[1.02rem] leading-[1.8] text-cocoa">
          Reach out by email or phone, or book directly online — {site.owner}{" "}
          will get back to you to talk through the details.
        </p>

        <ul className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-3">
          {methods.map((m) => (
            <li key={m.label} className="bg-ivory">
              <a
                href={m.href}
                {...(m.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="group flex h-full flex-col justify-between gap-8 p-8 transition-colors duration-500 hover:bg-cream sm:p-10"
              >
                <span className="flex items-center justify-between">
                  <m.icon
                    aria-hidden
                    className="size-6 text-rose-deep"
                    strokeWidth={1.4}
                  />
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 text-taupe transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-espresso"
                  />
                </span>
                <span>
                  <span className="eyebrow block text-[0.62rem] text-taupe">
                    {m.label}
                  </span>
                  <span className="mt-2 block font-serif text-[1.4rem] leading-snug">
                    {m.value}
                    {m.external && (
                      <span className="sr-only"> (opens in a new tab)</span>
                    )}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-12 border-t border-border pt-16 sm:grid-cols-2 lg:grid-cols-3">
          <Detail term="Studio">
            <address className="not-italic">
              {street}
              <br />
              {city}, {region} {postalCode}
            </address>
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-2 inline-flex items-center gap-1.5 pb-0.5 text-[0.85rem] text-taupe hover:text-espresso"
            >
              Get directions
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Detail>
          <Detail term="Hours">
            <ul className="space-y-1">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-6">
                  <span>{h.days}</span>
                  <span className="text-taupe">{h.time}</span>
                </li>
              ))}
            </ul>
          </Detail>
          <Detail term="Follow along">
            <a
              href={site.social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-2 pb-0.5"
            >
              <InstagramGlyph /> @{site.social.instagram.handle}
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Detail>
        </div>
      </div>

      <div
        className="container-editorial mt-20 sm:mt-28"
        data-reveal
        data-reveal-delay="100"
      >
        <StudioMap />
      </div>
    </section>
  );
}

function Detail({
  term,
  children,
}: {
  term: string;
  children: React.ReactNode;
}) {
  return (
    <div className="text-[0.95rem]">
      <p className="eyebrow text-[0.62rem] text-taupe">{term}</p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
