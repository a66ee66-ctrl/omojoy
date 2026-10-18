import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { InlineScript } from "@/components/inline-script";
import { Cursor } from "@/components/experience/cursor";
import { Intro, introScript } from "@/components/experience/intro";
import { RevealObserver } from "@/components/reveal-observer";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const title =
  "Joyful Artistry — Makeup Artist, Hairstylist & Photographer in Beaverton, Oregon";
const description =
  "Personalised makeup artistry, creative hair styling and beautiful photography by Lola of Joyful Artistry — serving Beaverton and the Portland area for weddings, celebrations, maternity and portrait sessions.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  keywords: [
    "makeup artist Beaverton",
    "Portland makeup artist",
    "bridal makeup Oregon",
    "hair stylist Beaverton",
    "portrait photographer Beaverton",
    "maternity photography Portland",
    "glam makeup and photoshoot",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: site.locale,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f8f3ec",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${site.url}/#business`,
  name: site.name,
  description,
  url: site.url,
  image: `${site.url}/opengraph-image.jpg`,
  founder: {
    "@type": "Person",
    name: site.owner,
    jobTitle: site.roles.join(", "),
  },
  telephone: site.contact.phoneHref,
  email: site.contact.email ?? undefined,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.location.street,
    addressLocality: site.location.city,
    addressRegion: site.location.region,
    postalCode: site.location.postalCode,
    addressCountry: site.location.country,
  },
  areaServed: site.location.area,
  openingHours: site.hours.map((h) => h.schema),
  hasMap: site.googleMapsUrl ?? undefined,
  sameAs: [site.social.instagram.url, site.googleMapsUrl].filter(Boolean),
  makesOffer: ["Makeup Artistry", "Hair Styling", "Photography"].map(
    (name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    }),
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${manrope.variable} h-full`}
    >
      <head>
        <InlineScript html={introScript} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only z-[100] bg-espresso px-4 py-3 text-ivory focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Intro />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Cursor />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
