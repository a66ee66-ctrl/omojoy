# Image assets

`originals/` holds the source photographs. They are optimised into `src/assets/images/`,
which is what the site imports.

All current images are Joyful Artistry's own work, taken from the business's existing
website (thejoyfulartistry.com) and matching its Instagram (@joyfulartistry). Many are
Instagram-sized (1000–1440px). Higher-resolution originals will look sharper on large screens.

## Replacing or adding images

1. Put the photo in `originals/portfolio/` (or `originals/about/`) using a short kebab-case
   name, e.g. `bridal-glam-2026.jpg`. To upgrade an existing image, keep the same filename.
2. Run `npm run images`. This resizes the photo (max 2000px), strips metadata and writes it
   to `src/assets/images/…`.
3. For a new portfolio piece, import it in `src/content/portfolio.ts` and add an entry with
   a title, categories (`makeup`, `hair`, `photography`), a display shape and descriptive alt text.

`legacy-logo.png` is the logo from the previous website, kept for reference. The new site uses
a typographic wordmark (`src/components/brand.tsx`). After changing photos used in the share
image, run `npm run brand-assets` to regenerate the favicon, Apple icon and Open Graph image.
