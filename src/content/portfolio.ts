import type { StaticImageData } from "next/image"

import goldenGlam from "@/assets/images/portfolio/golden-glam.jpg"
import maternityStudioHat from "@/assets/images/portfolio/maternity-studio-hat.jpg"
import maternityMonochrome from "@/assets/images/portfolio/maternity-monochrome.jpg"
import maternityButterfly from "@/assets/images/portfolio/maternity-butterfly.jpg"
import studioPortraitBlackDress from "@/assets/images/portfolio/studio-portrait-black-dress.jpg"
import bridalUpdoPearls from "@/assets/images/portfolio/bridal-updo-pearls.jpg"
import sleekBridalBun from "@/assets/images/portfolio/sleek-bridal-bun.jpg"
import bridalRobeUpdo from "@/assets/images/portfolio/bridal-robe-updo.jpg"
import bridalGlamHairpiece from "@/assets/images/portfolio/bridal-glam-hairpiece.jpg"
import brideRuffledGown from "@/assets/images/portfolio/bride-ruffled-gown.jpg"
import turquoiseGele from "@/assets/images/portfolio/turquoise-gele.jpg"
import goldGeleCoral from "@/assets/images/portfolio/gold-gele-coral.jpg"
import coralBeadsGele from "@/assets/images/portfolio/coral-beads-gele.jpg"
import plumGlamFan from "@/assets/images/portfolio/plum-glam-fan.jpg"
import roseEyeLook from "@/assets/images/portfolio/rose-eye-look.jpg"
import braidedGlam from "@/assets/images/portfolio/braided-glam.jpg"
import redBlazerGlam from "@/assets/images/portfolio/red-blazer-glam.jpg"
import copperWaves from "@/assets/images/portfolio/copper-waves.jpg"
import softGlamHighlights from "@/assets/images/portfolio/soft-glam-highlights.jpg"
import bronzeEyes from "@/assets/images/portfolio/bronze-eyes.jpg"
import redLipNaturalHair from "@/assets/images/portfolio/red-lip-natural-hair.jpg"
import looseCurls from "@/assets/images/portfolio/loose-curls.jpg"
import curlsDetail from "@/assets/images/portfolio/curls-detail.jpg"
import copperCurlsStudio from "@/assets/images/portfolio/copper-curls-studio.jpg"
import bridalCurls from "@/assets/images/portfolio/bridal-curls.jpg"
import yellowSuitPortrait from "@/assets/images/portfolio/yellow-suit-portrait.jpg"
import emeraldGownPortrait from "@/assets/images/portfolio/emerald-gown-portrait.jpg"
import redBackdropPortrait from "@/assets/images/portfolio/red-backdrop-portrait.jpg"
import purpleGelePortrait from "@/assets/images/portfolio/purple-gele-portrait.jpg"
import maternityCouple from "@/assets/images/portfolio/maternity-couple.jpg"
import monochromePortrait from "@/assets/images/portfolio/monochrome-portrait.jpg"
import familyPortrait from "@/assets/images/portfolio/family-portrait.jpg"
import proposal from "@/assets/images/portfolio/proposal.jpg"
import fortiethCelebration from "@/assets/images/portfolio/fortieth-celebration.jpg"
import weddingStaircase from "@/assets/images/portfolio/wedding-staircase.jpg"
import halfBirthday from "@/assets/images/portfolio/half-birthday.jpg"
import maternityRedTulle from "@/assets/images/portfolio/maternity-red-tulle.jpg"
import blushDressPortrait from "@/assets/images/portfolio/blush-dress-portrait.jpg"
import maternityRosePetals from "@/assets/images/portfolio/maternity-rose-petals.jpg"
import rattanChairPortrait from "@/assets/images/portfolio/rattan-chair-portrait.jpg"
import couplePortrait from "@/assets/images/portfolio/couple-portrait.jpg"
import naturalCurlsGlam from "@/assets/images/portfolio/natural-curls-glam.jpg"
import studioCurls from "@/assets/images/portfolio/studio-curls.jpg"

export type PortfolioCategory = "makeup" | "hair" | "photography"
export type CollectionSlug = "bridal" | "heritage" | "maternity" | "milestones" | "glam" | "studio" | "crowned"
export type Mood = "soft" | "glam" | "bold" | "heritage" | "timeless"
export type Occasion = "wedding" | "celebration" | "maternity" | "portrait"

/** Display shape in grids. Chosen per image to create editorial rhythm. */
export type Shape = "portrait" | "tall" | "square" | "landscape"

export type Look = {
  slug: string
  /** Catalogue number, derived from position in the archive. */
  no: number
  image: StaticImageData
  title: string
  /** One-line description of what the image shows. */
  note: string
  alt: string
  categories: PortfolioCategory[]
  collections: CollectionSlug[]
  moods: Mood[]
  occasions: Occasion[]
  shape: Shape
  focus?: string
}

export const portfolioFilters = [
  { value: "all", label: "All Work" },
  { value: "makeup", label: "Makeup" },
  { value: "hair", label: "Hair Styling" },
  { value: "photography", label: "Photography" },
] as const

export type PortfolioFilter = (typeof portfolioFilters)[number]["value"]

export const categoryLabel: Record<PortfolioCategory, string> = {
  makeup: "Makeup",
  hair: "Hair Styling",
  photography: "Photography",
}

type Entry = Omit<Look, "no">

/**
 * The archive. All images are Joyful Artistry's own work, as published on its
 * website and Instagram (@joyfulartistry). Order here sets the catalogue number.
 */
const entries: Entry[] = [
  { slug: "gold-gele-coral", image: goldGeleCoral, title: "Gold & Coral", shape: "portrait", categories: ["makeup"], collections: ["heritage", "bridal"], moods: ["heritage", "glam"], occasions: ["wedding", "celebration"], note: "A sculpted metallic gele, layered coral beads and a soft, luminous glow — heritage glamour at its most radiant.", alt: "Traditional bridal look with a metallic gold gele, coral bead jewellery and glowing makeup" },
  { slug: "wedding-staircase", image: weddingStaircase, title: "The Staircase", shape: "tall", categories: ["photography"], collections: ["bridal", "milestones"], moods: ["timeless"], occasions: ["wedding"], note: "A quiet embrace on a spiral staircase — the kind of wedding-day frame you return to for years.", alt: "Bride and groom embracing on a spiral staircase on their wedding day" },
  { slug: "maternity-butterfly", image: maternityButterfly, title: "Butterfly", shape: "portrait", categories: ["photography"], collections: ["maternity"], moods: ["bold"], occasions: ["maternity"], note: "Flowing white fabric lifted by a single blue butterfly — a dreamlike maternity concept.", alt: "Creative maternity concept image with flowing white fabric and a blue butterfly" },
  { slug: "braided-crown", image: braidedGlam, title: "Braided Crown", shape: "square", categories: ["makeup", "hair"], collections: ["glam", "crowned"], moods: ["glam"], occasions: ["celebration", "portrait"], note: "Intricate braids framing a lit-from-within highlight and soft rose glam.", alt: "Braided crown hairstyle with luminous highlight and soft pink glam makeup" },
  { slug: "marigold", image: yellowSuitPortrait, title: "Marigold", shape: "portrait", categories: ["photography"], collections: ["studio", "milestones"], moods: ["bold"], occasions: ["portrait", "celebration"], note: "Pure joy in marigold against a dusky rose backdrop.", alt: "Joyful studio portrait of a woman in a marigold yellow suit against a dusky rose backdrop" },
  { slug: "copper-curls", image: copperCurlsStudio, title: "Copper Curls", shape: "portrait", categories: ["hair", "photography"], collections: ["studio", "crowned"], moods: ["glam", "bold"], occasions: ["portrait"], note: "Long, glossy copper curls with movement, warmth and plenty of volume.", alt: "Long copper-toned curls styled for a studio portrait against a terracotta backdrop" },
  { slug: "the-proposal", image: proposal, title: "The Proposal", shape: "square", categories: ["photography"], collections: ["milestones"], moods: ["timeless"], occasions: ["celebration"], note: "A heart of red roses, a bended knee and a yes — captured as it happened.", alt: "Proposal moment in front of a heart-shaped arch of red roses beside a pool" },
  { slug: "plum-and-lace", image: plumGlamFan, title: "Plum & Lace", shape: "portrait", categories: ["makeup"], collections: ["glam"], moods: ["bold", "glam"], occasions: ["celebration"], note: "Evening glamour in plum lace, finished with a feathered fan.", alt: "Evening glam makeup with a plum lace outfit and a feathered fan" },
  { slug: "expecting", image: maternityCouple, title: "Expecting", shape: "portrait", categories: ["photography"], collections: ["maternity"], moods: ["timeless"], occasions: ["maternity"], note: "Two people, one heartbeat on the way — an intimate maternity portrait in low light.", alt: "Intimate maternity portrait of a couple embracing against a dark backdrop" },
  { slug: "classic-red", image: redLipNaturalHair, title: "Classic Red", shape: "tall", categories: ["makeup"], collections: ["glam"], moods: ["bold", "timeless"], occasions: ["celebration", "portrait"], note: "Defined natural hair, warm gold lids and a confident red lip.", alt: "Defined natural hair with a classic red lip and warm gold eye makeup" },
  { slug: "emerald", image: emeraldGownPortrait, title: "Emerald", shape: "square", categories: ["photography"], collections: ["studio"], moods: ["glam", "timeless"], occasions: ["portrait", "celebration"], note: "Sequinned emerald, poised and luminous.", alt: "Elegant portrait of a woman in an emerald sequinned gown seated on a studio bench" },
  { slug: "soft-waves", image: looseCurls, title: "Soft Waves", shape: "square", categories: ["hair"], collections: ["crowned"], moods: ["soft"], occasions: ["wedding", "celebration"], note: "Honey-toned waves with effortless volume and movement.", alt: "Soft honey-toned waves styled with volume and movement" },
  { slug: "turquoise-gele", image: turquoiseGele, title: "Turquoise Gele", shape: "square", categories: ["makeup"], collections: ["heritage"], moods: ["heritage", "glam"], occasions: ["celebration"], note: "A sculpted turquoise gele with a radiant, celebration-ready finish.", alt: "Radiant celebration makeup paired with a sculpted turquoise gele head wrap" },
  { slug: "family-portrait", image: familyPortrait, title: "Family", shape: "landscape", categories: ["photography"], collections: ["maternity", "milestones"], moods: ["timeless", "soft"], occasions: ["portrait"], note: "Five faces, coordinated in navy and blue — a family portrait to frame.", alt: "Warm family portrait of parents and three children dressed in navy and blue" },
  { slug: "bronze-definition", image: bronzeEyes, title: "Bronze Definition", shape: "tall", categories: ["makeup"], collections: ["glam"], moods: ["glam", "bold"], occasions: ["celebration"], note: "A smouldering bronze eye, sculpted brows and a soft nude lip.", alt: "Close-up of a bronze smoky eye with defined brows and a nude lip" },
  { slug: "monochrome-maternity", image: maternityMonochrome, title: "In Monochrome", shape: "portrait", categories: ["photography"], collections: ["maternity"], moods: ["timeless"], occasions: ["maternity"], note: "Black and white, a wide-brimmed hat and dramatic light.", alt: "Black and white maternity portrait with a wide-brimmed hat and dramatic studio light" },
  { slug: "sleek-low-bun", image: sleekBridalBun, title: "Sleek Low Bun", shape: "square", categories: ["hair"], collections: ["bridal", "crowned"], moods: ["timeless", "soft"], occasions: ["wedding"], note: "A polished low bun finished with crystal and pearl.", alt: "Profile view of a sleek low bun with a crystal hair accessory and pearl earrings" },
  { slug: "golden-glam", image: goldenGlam, title: "Golden Glam", shape: "tall", categories: ["makeup", "hair"], collections: ["glam", "heritage"], moods: ["glam", "heritage"], occasions: ["wedding", "celebration"], note: "Sculpted bronze eyes, golden waves, henna and gold — glamour with heritage at its heart.", alt: "Glamorous makeup with sculpted bronze eyes and voluminous golden waves, finished with gold jewellery and henna" },
  { slug: "rose-shimmer", image: roseEyeLook, title: "Rose Shimmer", shape: "portrait", categories: ["makeup"], collections: ["glam"], moods: ["soft", "glam"], occasions: ["celebration"], note: "Rose-pink shimmer that catches the light with every blink.", alt: "Eyes-closed close-up of rose-pink shimmer eyeshadow and a sleek bob" },
  { slug: "glass-block", image: studioPortraitBlackDress, title: "Glass Block", shape: "square", categories: ["photography", "makeup"], collections: ["studio"], moods: ["timeless", "glam"], occasions: ["portrait"], note: "Off-shoulder black, a glass block and a gaze straight down the lens.", alt: "Studio portrait of a woman in an off-shoulder black dress seated on a glass block" },
  { slug: "celebration-glam", image: coralBeadsGele, title: "Celebration Glam", shape: "square", categories: ["makeup"], collections: ["heritage"], moods: ["heritage", "bold"], occasions: ["celebration"], note: "Magenta gele, coral beads and a feathered fan — dressed for the party.", alt: "Celebration makeup with a magenta gele, coral beads and a feathered hand fan" },
  { slug: "maternity-in-studio", image: maternityStudioHat, title: "Awaiting", shape: "portrait", categories: ["photography"], collections: ["maternity", "studio"], moods: ["timeless"], occasions: ["maternity"], note: "Black silhouette, wide-brimmed hat and a painterly backdrop.", alt: "Studio maternity portrait of an expectant mother in a black dress and wide-brimmed hat against a soft, painterly backdrop" },
  { slug: "getting-ready", image: bridalRobeUpdo, title: "Getting Ready", shape: "portrait", categories: ["hair", "makeup"], collections: ["bridal"], moods: ["soft", "timeless"], occasions: ["wedding"], note: "The calm before the ceremony — polished updo, crystal hairpiece, flawless skin.", alt: "Bride in a white robe with a polished updo, crystal hairpiece and flawless makeup" },
  { slug: "pearl-updo", image: bridalUpdoPearls, title: "Pearl Updo", shape: "portrait", categories: ["hair", "makeup"], collections: ["bridal", "crowned"], moods: ["soft", "timeless"], occasions: ["wedding"], note: "A sleek bridal updo crowned with pearls and blossoms.", alt: "Sleek bridal updo adorned with a pearl and floral hairpiece, with soft glam bridal makeup" },
  { slug: "petals", image: maternityRosePetals, title: "Petals", shape: "landscape", categories: ["photography"], collections: ["maternity"], moods: ["soft"], occasions: ["maternity"], note: "A mother-to-be resting among scattered rose petals.", alt: "Maternity portrait of a mother-to-be lying among scattered red rose petals" },
  { slug: "bridal-glam", image: bridalGlamHairpiece, title: "Bridal Glam", shape: "square", categories: ["makeup", "hair"], collections: ["bridal"], moods: ["glam"], occasions: ["wedding"], note: "Fluttering lashes, an embellished hairpiece and a bridal glow.", alt: "Bridal makeup with fluttery lashes and an embellished hairpiece" },
  { slug: "forty", image: fortiethCelebration, title: "Forty", shape: "portrait", categories: ["photography"], collections: ["milestones"], moods: ["bold"], occasions: ["celebration"], note: "Gold balloons, a red car and forty years worth celebrating.", alt: "Birthday celebration portrait with gold forty balloons and a red car" },
  { slug: "copper-glow", image: copperWaves, title: "Copper Glow", shape: "square", categories: ["makeup", "hair"], collections: ["glam", "crowned"], moods: ["glam", "soft"], occasions: ["celebration", "portrait"], note: "Warm, glowing skin and long copper-honey waves.", alt: "Warm glowing makeup with long copper and honey waves" },
  { slug: "marble", image: monochromePortrait, title: "Marble", shape: "portrait", categories: ["photography"], collections: ["studio"], moods: ["timeless"], occasions: ["portrait"], note: "A smile, a marble plinth and the timelessness of black and white.", alt: "Black and white portrait of a smiling woman leaning on a marble plinth" },
  { slug: "curl-definition", image: curlsDetail, title: "Curl Definition", shape: "square", categories: ["hair"], collections: ["crowned"], moods: ["soft"], occasions: ["celebration"], note: "Glossy, defined curls — texture celebrated.", alt: "Detail of glossy, defined dark curls" },
  { slug: "half-birthday", image: halfBirthday, title: "Half Birthday", shape: "square", categories: ["photography"], collections: ["milestones", "maternity"], moods: ["timeless", "soft"], occasions: ["celebration"], note: "Six months, one crown and a very serious cake inspection.", alt: "Black and white half-birthday portrait of a baby with a crown and celebration cake" },
  { slug: "soft-glam", image: softGlamHighlights, title: "Soft Glam", shape: "portrait", categories: ["makeup"], collections: ["glam"], moods: ["soft"], occasions: ["celebration", "portrait"], note: "Radiant skin, soft definition and caramel highlights.", alt: "Soft glam makeup with a radiant complexion and caramel highlighted hair" },
  { slug: "blush", image: blushDressPortrait, title: "Blush", shape: "tall", categories: ["photography"], collections: ["studio"], moods: ["soft", "timeless"], occasions: ["portrait"], note: "Blush satin against warm ochre — full length and full of grace.", alt: "Full-length studio portrait in a blush satin dress against a warm ochre backdrop" },
  { slug: "power-red", image: redBlazerGlam, title: "Power Red", shape: "square", categories: ["makeup"], collections: ["glam"], moods: ["bold"], occasions: ["portrait"], note: "A sleek bob, a red blazer and polished, camera-ready skin.", alt: "Polished makeup with a sleek straight bob and a red blazer" },
  { slug: "heritage", image: purpleGelePortrait, title: "Heritage", shape: "landscape", categories: ["photography"], collections: ["heritage", "studio"], moods: ["heritage"], occasions: ["celebration", "portrait"], note: "Purple lace and gele before a painted floral backdrop.", alt: "Portrait of a woman in purple lace and gele seated before a painted floral backdrop" },
  { slug: "bridal-curls", image: bridalCurls, title: "Bridal Curls", shape: "portrait", categories: ["hair", "makeup"], collections: ["bridal", "crowned"], moods: ["soft", "glam"], occasions: ["wedding"], note: "Cascading curls and a glowing, romantic bridal finish.", alt: "Bride with cascading curls and a soft, glowing bridal makeup look" },
  { slug: "red-tulle", image: maternityRedTulle, title: "Red Tulle", shape: "square", categories: ["photography", "makeup"], collections: ["maternity"], moods: ["bold"], occasions: ["maternity"], note: "A cloud of red tulle and a radiant mother-to-be.", alt: "Maternity portrait in a voluminous red tulle gown" },
  { slug: "string-lights", image: rattanChairPortrait, title: "String Lights", shape: "portrait", categories: ["photography"], collections: ["studio"], moods: ["soft"], occasions: ["portrait"], note: "A rattan chair and the warm glow of string lights.", alt: "Seated portrait in a rattan chair with warm string lights behind" },
  { slug: "natural-curls", image: naturalCurlsGlam, title: "Natural Curls", shape: "square", categories: ["makeup"], collections: ["glam"], moods: ["glam", "soft"], occasions: ["portrait"], note: "Luminous makeup that lets long natural curls take centre stage.", alt: "Luminous makeup with long natural curls against a white backdrop" },
  { slug: "the-bride", image: brideRuffledGown, title: "The Bride", shape: "landscape", categories: ["makeup", "hair"], collections: ["bridal"], moods: ["soft", "timeless"], occasions: ["wedding"], note: "Ruffles, crystal and a smile that says everything.", alt: "Smiling bride in a ruffled gown with a sleek updo and crystal necklace" },
  { slug: "scarlet", image: redBackdropPortrait, title: "Scarlet", shape: "portrait", categories: ["photography"], collections: ["studio"], moods: ["bold"], occasions: ["portrait"], note: "Playful poise against a bold scarlet backdrop.", alt: "Playful studio portrait on a stool against a bold red backdrop" },
  { slug: "studio-curls", image: studioCurls, title: "Studio Curls", shape: "square", categories: ["makeup", "hair"], collections: ["glam", "studio"], moods: ["glam"], occasions: ["portrait"], note: "Voluminous curls and polished glam, made for the camera.", alt: "Studio beauty portrait with voluminous curls and polished glam makeup" },
  { slug: "together", image: couplePortrait, title: "Together", shape: "square", categories: ["photography"], collections: ["milestones"], moods: ["bold"], occasions: ["celebration", "portrait"], note: "Two people, one bright turquoise backdrop and a lot of laughter.", alt: "Joyful couple portrait against a bright turquoise backdrop" },
]

export const looks: Look[] = entries.map((e, i) => ({ ...e, no: i + 1 }))

const bySlug = new Map(looks.map((l) => [l.slug, l]))

export function getLook(slug: string) {
  return bySlug.get(slug)
}

export function byId(slug: string): Look {
  const look = bySlug.get(slug)
  if (!look) throw new Error(`Unknown look: ${slug}`)
  return look
}

export const isLookSlug = (slug: string) => bySlug.has(slug)

export function neighbours(slug: string) {
  const i = looks.findIndex((l) => l.slug === slug)
  return {
    prev: looks[(i - 1 + looks.length) % looks.length],
    next: looks[(i + 1) % looks.length],
  }
}

/** Looks that share the most collections, moods and categories with the given look. */
export function relatedLooks(look: Look, count = 4) {
  const score = (other: Look) =>
    other.collections.filter((c) => look.collections.includes(c)).length * 3 +
    other.moods.filter((m) => look.moods.includes(m)).length +
    other.categories.filter((c) => look.categories.includes(c)).length
  return looks
    .filter((l) => l.slug !== look.slug)
    .map((l) => ({ l, s: score(l) }))
    .sort((a, b) => b.s - a.s || a.l.no - b.l.no)
    .slice(0, count)
    .map(({ l }) => l)
}

export const formatNo = (no: number) => String(no).padStart(2, "0")
