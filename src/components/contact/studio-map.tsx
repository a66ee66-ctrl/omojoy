import { MapPin, Star } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { directionsUrl, fullAddress, googleBusinessUrl, mapEmbedSrc } from "@/lib/maps";
import { cn } from "@/lib/utils";

/** The studio's location: an embedded Google map, plus links to the business's Google profile. */
export function StudioMap() {
  return (
    <div
      className="relative overflow-hidden border border-border bg-cream"
      data-reveal
    >
      <div className="grid lg:grid-cols-5">
        <div className="relative aspect-[4/3] bg-sand lg:col-span-3 lg:aspect-auto">
          <iframe
            src={mapEmbedSrc}
            title={`Map showing the ${site.name} studio at ${fullAddress}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0 size-full grayscale-[55%] contrast-[1.05] sepia-[8%] transition-[filter] duration-700 ease-editorial hover:grayscale-0 hover:sepia-0"
          />
        </div>

        <div className="flex flex-col justify-center p-8 lg:col-span-2 sm:p-10">
          <p className="eyebrow flex items-center gap-3 text-rose-deep">
            <MapPin aria-hidden className="size-4" />
            Find the studio
          </p>
          <address className="mt-6 font-serif text-[1.5rem] leading-snug not-italic">
            {site.location.street}
            <br />
            {site.location.city}, {site.location.region} {site.location.postalCode}
          </address>

          {site.googleMapsUrl && (
            <a
              href={googleBusinessUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 text-[0.85rem] text-taupe transition-colors hover:text-espresso"
            >
              <span className="inline-flex" aria-hidden>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-3.5 fill-rose-deep text-rose-deep" />
                ))}
              </span>
              See reviews on Google
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "brand", size: "cta-sm" }))}
            >
              Get directions
              <span className="sr-only">(opens in a new tab)</span>
            </a>
            {site.googleMapsUrl && (
              <a
                href={googleBusinessUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "brand-outline", size: "cta-sm" }))}
              >
                View on Google
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
