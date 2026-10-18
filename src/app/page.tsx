import { Eyebrow } from "@/components/brand";
import { PageTransition } from "@/components/experience/page-transition";
import { CollectionsRail } from "@/components/home/collections-rail";
import { CraftsList } from "@/components/home/crafts-list";
import { HeroReel } from "@/components/home/hero-reel";
import { LookOfTheDay } from "@/components/home/look-of-the-day";
import { QuizTeaser } from "@/components/home/quiz-teaser";
import { ScrollWords } from "@/components/home/scroll-words";
import { Voices } from "@/components/home/voices";
import { Instagram } from "@/components/sections/instagram";
import { site } from "@/config/site";
import { collectionLooks, collections } from "@/content/collections";
import { services } from "@/content/services";

export default function HomePage() {
  const railItems = collections.map((c) => ({
    slug: c.slug,
    chapter: c.chapter,
    title: c.title,
    italic: c.italic,
    kicker: c.kicker,
    cover: { image: c.cover.image, alt: c.cover.alt },
    count: collectionLooks(c.slug).length,
  }));

  return (
    <PageTransition>
      <HeroReel />

      <section
        aria-label="About the studio"
        className="container-editorial py-28 sm:py-40"
      >
        <div className="mx-auto max-w-5xl">
          <Eyebrow className="mb-10">The Studio</Eyebrow>
          <ScrollWords
            text={`Joyful Artistry is the creative studio of ${site.owner} — makeup artist, hairstylist and photographer. One artist, one vision: from the first brushstroke to the final frame, every detail is made for you.`}
            accent={["one", "vision:", "you"]}
          />
        </div>
      </section>

      <LookOfTheDay />

      <section
        aria-labelledby="crafts-title"
        className="container-editorial pb-28 sm:pb-40"
      >
        <div
          className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end"
          data-reveal
        >
          <div>
            <Eyebrow>Services</Eyebrow>
            <h2
              id="crafts-title"
              className="display mt-6 text-[clamp(2.6rem,5.4vw,5rem)]"
            >
              Three crafts, <em className="text-rose-deep">one artist.</em>
            </h2>
          </div>
          <p className="max-w-sm leading-[1.8] text-cocoa">
            Book one, or bring them together — hair and makeup, then your
            portraits — in a single session.
          </p>
        </div>
        <CraftsList services={services} />
      </section>

      <CollectionsRail items={railItems} />
      <QuizTeaser />
      <Voices />
      <Instagram />
    </PageTransition>
  );
}
