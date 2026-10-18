import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";

import { Eyebrow, InstagramGlyph } from "@/components/brand";
import { EnquiryForm } from "@/components/contact/enquiry-form";
import { StudioMap } from "@/components/contact/studio-map";
import { SplitHeading } from "@/components/split-heading";
import { site } from "@/config/site";
import { directionsUrl } from "@/lib/maps";

export function Contact() {
  const { email, phone, phoneHref } = site.contact;
  const { street, city, region, postalCode } = site.location;

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="pt-32 pb-24 sm:pt-40 sm:pb-32"
    >
      <div className="container-editorial grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <div className="animate-hero-rise">
            <Eyebrow>Enquiries & Bookings</Eyebrow>
          </div>
          <SplitHeading
            as="h1"
            id="contact-title"
            text={"Let’s create\n*something beautiful.*"}
            className="mt-8 text-[clamp(2.8rem,5vw,4.6rem)]"
          />
          <p className="mt-8 max-w-sm leading-[1.8] text-cocoa">
            Share a few details about your occasion and the services you’re
            interested in, and {site.owner} will be in touch to talk through the
            details.
          </p>

          <dl className="mt-12 space-y-8 border-t border-border pt-10 text-[0.95rem]">
            {site.bookingUrl && (
              <Detail term="Book online">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1.5 pb-0.5"
                >
                  Choose a time on our booking page{" "}
                  <ArrowUpRight aria-hidden className="size-4" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </Detail>
            )}
            {email && (
              <Detail term="Email">
                <a href={`mailto:${email}`} className="link-underline pb-0.5">
                  {email}
                </a>
              </Detail>
            )}
            {phone && (
              <Detail term="Phone">
                <a href={`tel:${phoneHref}`} className="link-underline pb-0.5">
                  {phone}
                </a>
              </Detail>
            )}
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
                className="link-underline mt-1.5 inline-flex items-center gap-1.5 pb-0.5 text-[0.85rem] text-taupe hover:text-espresso"
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
            <Detail term="Instagram">
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
          </dl>
        </div>

        <div
          className="lg:col-span-7 lg:col-start-6"
          data-reveal
          data-reveal-delay="150"
        >
          <div className="relative border border-border bg-ivory p-6 shadow-[0_40px_80px_-50px_rgba(43,33,28,0.35)] sm:p-10 lg:p-14">
            <p className="eyebrow mb-10 text-taupe">Enquiry form</p>
            <Suspense fallback={<FormSkeleton />}>
              <EnquiryForm />
            </Suspense>
          </div>
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
    <div className="grid gap-2 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
      <dt className="eyebrow pt-1 text-[0.62rem] text-taupe">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function FormSkeleton() {
  return (
    <div aria-hidden className="animate-pulse space-y-10">
      <div className="grid gap-10 sm:grid-cols-2">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-16 border-b border-espresso/15" />
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="h-14 border border-espresso/10" />
        ))}
      </div>
      <div className="h-32 border-b border-espresso/15" />
    </div>
  );
}
