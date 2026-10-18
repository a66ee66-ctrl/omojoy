<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project notes (Joyful Artistry website)

- Stack: Next.js 16 App Router with `cacheComponents` + `partialPrefetching`, Tailwind 4, shadcn/ui (`base-nova` style, Base UI primitives — use `render`/`nativeButton` props, not Radix `asChild`).
- Verify with: `npm run lint && npm run typecheck && npm run build`.
- Under Cache Components, never call `new Date()`/`Math.random()` in render without `"use cache"`; never throw from a `"use cache"` function (it fails prerendering) — return a fallback and call `cacheLife("minutes")`.
- `next/image`: use `preload` (not `priority`); allowed `quality` values are set in `next.config.ts` (`[75, 85]`).
- All business facts live in `src/config/site.ts` and `src/content/*` — they come from thejoyfulartistry.com / @joyfulartistry. Don't invent new facts (prices, awards, locations, testimonials).
- Images: originals in `assets/originals/`, run `npm run images` to optimise into `src/assets/images/`; import statically for automatic blur placeholders.
- Scroll reveals: add `data-reveal` (optional `data-reveal-delay`) to any element; one shared `RevealObserver` handles it.
- The editor auto-formats files on save (Prettier-style), so re-read a file before making further edits.
- Multi-page site: header/footer/intro/cursor live in `src/app/layout.tsx`; wrap each page's content in `<PageTransition>`.
- Shared-element morphs use `<Morph name={`look-${slug}`}>` — a name must appear at most once per page (don't morph the same look twice on one page).
- Header tone: mark dark full-bleed sections with `data-tone="dark"` so the fixed header switches to light text over them.
- Dynamic routes (`/portfolio/[slug]`, `/collections/[slug]`, `/services/[slug]`) use `generateStaticParams` + `export const ensureStatic = "navigation"` so unknown slugs return a real 404 (`dynamicParams` is unavailable with Cache Components).
- Next 16 keeps previous pages mounted but hidden (React Activity) — in browser tests use `:visible` selectors.
- Client components reading `useSearchParams` (contact form, moodboard, quiz) must sit inside `<Suspense>`.
