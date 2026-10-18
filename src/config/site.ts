/**
 * Central business information for Joyful Artistry.
 *
 * Every value here was taken from the business's existing website
 * (thejoyfulartistry.com) or its public Instagram profile (@joyfulartistry).
 * Review and update before launch — anything set to `null` is hidden on the site.
 */
export const site = {
  name: "Joyful Artistry",
  owner: "Lola",
  roles: ["Makeup Artist", "Hairstylist", "Photographer"],
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thejoyfulartistry.com",
  locale: "en_US",

  location: {
    area: "Beaverton & Portland, Oregon",
    city: "Beaverton",
    region: "OR",
    postalCode: "97007",
    country: "US",
    street: "9090 SW 157th Ave",
  },

  contact: {
    email: "info@thejoyfulartistry.com" as string | null,
    phone: "+1 (313) 939-0587" as string | null,
    phoneHref: "+13139390587",
  },

  /** Existing online booking system used by the business. */
  bookingUrl: "https://joyful-artistry.square.site" as string | null,

  social: {
    instagram: {
      handle: "joyfulartistry",
      url: "https://www.instagram.com/joyfulartistry/",
    },
  },

  /** The business's Google Business Profile — for reviews, directions and hours. */
  googleMapsUrl: "https://share.google/oAg99qNLcMwFgsnZ5" as string | null,

  hours: [
    {
      days: "Monday – Friday",
      time: "9:00 am – 7:00 pm",
      schema: "Mo-Fr 09:00-19:00",
    },
    { days: "Saturday", time: "10:00 am – 7:00 pm", schema: "Sa 10:00-19:00" },
    { days: "Sunday", time: "2:00 pm – 7:00 pm", schema: "Su 14:00-19:00" },
  ],
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Collections", href: "/collections" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

export const discoverNav = [
  { label: "Find Your Look", href: "/find-your-look" },
  { label: "Your Moodboard", href: "/moodboard" },
] as const;

export const serviceOptions = [
  { value: "makeup", label: "Makeup Artistry" },
  { value: "hair", label: "Hair Styling" },
  { value: "photography", label: "Photography" },
] as const;

export type ServiceValue = (typeof serviceOptions)[number]["value"];
