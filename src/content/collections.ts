import {
  byId,
  looks,
  type CollectionSlug,
  type Look,
} from "@/content/portfolio";

export type Collection = {
  slug: CollectionSlug;
  /** Roman numeral shown as a chapter marker. */
  chapter: string;
  title: string;
  italic: string;
  kicker: string;
  intro: string;
  cover: Look;
  tone: "ivory" | "blush" | "cream" | "dark";
};

// Editorial copy describes the imagery; it makes no claims about the business.
const defs: (Omit<Collection, "cover"> & { coverSlug: string })[] = [
  {
    slug: "bridal",
    chapter: "I",
    title: "The",
    italic: "Bride",
    kicker: "Bridal makeup, hair & wedding days",
    intro:
      "Soft, luminous and entirely you. Bridal looks designed to feel like the best version of yourself — from the first glance in the mirror to the final dance.",
    coverSlug: "pearl-updo",
    tone: "ivory",
  },
  {
    slug: "heritage",
    chapter: "II",
    title: "Heritage &",
    italic: "Gele",
    kicker: "Culture, colour & celebration",
    intro:
      "Sculpted gele, coral beads, henna and gold. Looks that honour tradition and wear culture with pride — rich, radiant and made to be seen.",
    coverSlug: "gold-gele-coral",
    tone: "dark",
  },
  {
    slug: "maternity",
    chapter: "III",
    title: "",
    italic: "Awaiting",
    kicker: "Maternity & family portraits",
    intro:
      "The weeks before everything changes, held still. Maternity and family portraits with tenderness, drama and a little magic.",
    coverSlug: "maternity-in-studio",
    tone: "blush",
  },
  {
    slug: "milestones",
    chapter: "IV",
    title: "",
    italic: "Milestones",
    kicker: "Proposals, birthdays & big days",
    intro:
      "The yes, the candles, the first half-year. The days you'll retell for the rest of your life — captured as they happened.",
    coverSlug: "the-proposal",
    tone: "cream",
  },
  {
    slug: "glam",
    chapter: "V",
    title: "",
    italic: "Glam",
    kicker: "Beauty, up close",
    intro:
      "Bronze and rose, shimmer and red. Close-ups that celebrate skin, shape and colour — from soft radiance to full evening drama.",
    coverSlug: "golden-glam",
    tone: "dark",
  },
  {
    slug: "studio",
    chapter: "VI",
    title: "In the",
    italic: "Studio",
    kicker: "Portraits with presence",
    intro:
      "A backdrop, the right light and someone ready to be seen. Studio portraits that feel like magazine covers — and still look like you.",
    coverSlug: "blush",
    tone: "ivory",
  },
  {
    slug: "crowned",
    chapter: "VII",
    title: "",
    italic: "Crowned",
    kicker: "Hair styling",
    intro:
      "Braids, curls, waves and sleek bridal buns. Hair shaped for the occasion, the outfit and the person wearing it.",
    coverSlug: "copper-curls",
    tone: "blush",
  },
];

export const collections: Collection[] = defs.map(({ coverSlug, ...c }) => ({
  ...c,
  cover: byId(coverSlug),
}));

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);

export const collectionLooks = (slug: CollectionSlug) =>
  looks.filter((l) => l.collections.includes(slug));

export const collectionName = (c: Collection) =>
  [c.title, c.italic].filter(Boolean).join(" ");
