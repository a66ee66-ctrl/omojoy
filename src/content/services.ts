import type { ServiceValue } from "@/config/site";
import { byId, looks, type Look } from "@/content/portfolio";

export type Service = {
  slug: string;
  value: ServiceValue;
  no: string;
  title: string;
  italic: string;
  kicker: string;
  /** Service description supplied by the business. */
  description: string;
  intro: string;
  /** Only services published on the business's existing website. */
  includes: string[];
  hero: Look;
  detail: Look;
  tone: "blush" | "cream" | "dark";
  finalStep: { title: string; body: string };
};

export const services: Service[] = [
  {
    slug: "makeup-artistry",
    value: "makeup",
    no: "01",
    title: "Makeup",
    italic: "Artistry",
    kicker: "Flawless, polished, personal",
    description:
      "Professional, personalised makeup designed to enhance each client's features and create a beautiful, confidence-inspiring finish.",
    intro:
      "Every face is different, so no two looks are the same. Whether you love soft, natural radiance or full evening glamour, your makeup is designed around your features, your skin and the occasion — and finished to look beautiful in person and on camera.",
    includes: [
      "Bridal makeup",
      "Party & celebration makeup",
      "Studio makeup for photoshoots",
    ],
    hero: byId("glass-block"),
    detail: byId("rose-shimmer"),
    tone: "blush",
    finalStep: {
      title: "Leave glowing",
      body: "Step out polished, confident and ready to be celebrated.",
    },
  },
  {
    slug: "hair-styling",
    value: "hair",
    no: "02",
    title: "Hair",
    italic: "Styling",
    kicker: "Shaped for the occasion",
    description:
      "Personalised hairstyling, thoughtfully created to complement each client's look, personality and occasion.",
    intro:
      "From sleek bridal buns to soft waves and defined curls, hair is styled to complement your look, your outfit and your personality — so everything feels considered, from your crown to the final photograph.",
    includes: [
      "Bridal hair",
      "Styling for events & occasions",
      "Hair for photoshoots",
    ],
    hero: byId("bridal-curls"),
    detail: byId("sleek-low-bun"),
    tone: "cream",
    finalStep: {
      title: "Final touches",
      body: "Accessories placed, every strand in its place — ready for your moment.",
    },
  },
  {
    slug: "photography",
    value: "photography",
    no: "03",
    title: "",
    italic: "Photography",
    kicker: "Moments, beautifully kept",
    description:
      "Creative photography that captures meaningful moments, genuine emotions and beautiful details.",
    intro:
      "Maternity and family, proposals and birthdays, weddings and studio portraits. Sessions are relaxed and guided, so you can simply be yourself — and leave with images that feel like you, at your most beautiful.",
    includes: [
      "Studio photo sessions",
      "Event photography",
      "Maternity, family & milestone portraits",
    ],
    hero: byId("monochrome-maternity"),
    detail: byId("family-portrait"),
    tone: "dark",
    finalStep: {
      title: "Your images",
      body: "A gallery of moments to keep, share and return to for years.",
    },
  },
];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);
export const serviceLooks = (s: Service) =>
  looks.filter((l) => l.categories.includes(s.value));

/** A generic outline of how a session flows; it makes no claims about timing or pricing. */
export const sessionSteps = (s: Service) => [
  {
    title: "Share your vision",
    body: "Tell us about your occasion, your style and the looks you love — a moodboard from this site is the perfect place to start.",
  },
  {
    title: "Plan the details",
    body: "Talk through timing, looks and anything you'd like to know before the day.",
  },
  {
    title: "Your session",
    body: "Relax in a calm, welcoming studio while every detail is considered.",
  },
  s.finalStep,
];
