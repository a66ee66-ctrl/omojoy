import { Suspense } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { InstagramGlyph } from "@/components/brand";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/config/site";
import { byId } from "@/content/portfolio";
import { getInstagramPosts, type InstagramPost } from "@/lib/instagram";

const { handle, url } = site.social.instagram;

// Shown when no live feed is configured or the Instagram API is unavailable.
const curated = [
  "celebration-glam",
  "maternity-butterfly",
  "braided-crown",
  "the-proposal",
  "sleek-low-bun",
  "marigold",
].map(byId);

export function Instagram() {
  return (
    <section
      aria-labelledby="instagram-title"
      className="overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="container-editorial">
        <div className="flex flex-col items-center text-center" data-reveal>
          <InstagramGlyph className="size-6 text-rose-deep" />
          <p className="eyebrow mt-6 text-taupe">Follow along on Instagram</p>
          <h2
            id="instagram-title"
            className="display mt-6 text-[clamp(2.6rem,7vw,6rem)]"
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="italic transition-colors duration-500 hover:text-rose-deep"
            >
              @{handle}
              <span className="sr-only">
                {" "}
                on Instagram (opens in a new tab)
              </span>
            </a>
          </h2>
          <p className="mt-6 max-w-xl leading-[1.8] text-cocoa">
            New looks, recent sessions and behind-the-scenes moments from the
            studio — shared first on Instagram.
          </p>
        </div>

        <Suspense fallback={<CuratedGrid />}>
          <Feed />
        </Suspense>

        <div className="mt-14 flex justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "brand", size: "cta" })}
          >
            <InstagramGlyph /> Follow @{handle} <ArrowUpRight aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}

async function Feed() {
  const posts = await getInstagramPosts(6);
  return posts.length ? <LiveGrid posts={posts} /> : <CuratedGrid />;
}

const gridClass =
  "mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6";
const tileClass = "group relative block aspect-square overflow-hidden bg-sand";
const overlay = (
  <span
    aria-hidden
    className="absolute inset-0 grid place-items-center bg-espresso/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-espresso/35 group-hover:opacity-100"
  >
    <InstagramGlyph className="size-6" />
  </span>
);

function LiveGrid({ posts }: { posts: InstagramPost[] }) {
  return (
    <ul className={gridClass}>
      {posts.map((p) => (
        <li key={p.id}>
          <a
            href={p.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className={tileClass}
          >
            <Image
              src={p.imageUrl}
              alt={p.caption || "Recent post from @joyfulartistry on Instagram"}
              fill
              unoptimized
              sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
            />
            {overlay}
            <span className="sr-only">(opens Instagram in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function CuratedGrid() {
  return (
    <ul className={gridClass}>
      {curated.map((item) => (
        <li key={item.slug}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={tileClass}
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 16vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-[1.2s] ease-editorial group-hover:scale-105"
            />
            {overlay}
            <span className="sr-only">
              See more on Instagram (opens in a new tab)
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
