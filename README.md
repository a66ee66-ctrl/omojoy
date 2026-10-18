# Joyful Artistry — website

Marketing website for **Joyful Artistry**: makeup artistry, hair styling and photography by Lola,
Beaverton & Portland, Oregon.

Built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4 and shadcn/ui (Base UI).

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in values (see below)
npm run dev                  # http://localhost:3000
```

| Command                | Purpose                                                         |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Development server                                              |
| `npm run build`        | Production build                                                |
| `npm run start`        | Serve the production build                                      |
| `npm run lint`         | ESLint                                                          |
| `npm run typecheck`    | TypeScript                                                      |
| `npm run images`       | Optimise photos from `assets/originals/` → `src/assets/images/` |
| `npm run brand-assets` | Regenerate favicon, Apple icon and Open Graph image             |

## Pages

| Route                     | What it is                                                                 |
| ------------------------- | -------------------------------------------------------------------------- |
| `/`                       | Cinematic home: photo-reel hero, Look of the Day, crafts, collections reel |
| `/portfolio`              | The archive: every look, filterable, with "Surprise me"                    |
| `/portfolio/[look]`       | A page per look: save, share, enquire, ← → keyboard browsing               |
| `/collections`, `/[slug]` | Seven editorial stories (Bridal, Heritage & Gele, Maternity…)              |
| `/services`, `/[slug]`    | Makeup Artistry, Hair Styling, Photography                                 |
| `/about`                  | Lola's story                                                               |
| `/contact`                | Enquiry form (pre-fills from `?service=` and `?look=` / `?looks=`)         |
| `/moodboard`              | Visitor's saved looks (stored on their device); shareable via `?looks=`    |
| `/find-your-look`         | Three-question quiz that curates looks; results are shareable URLs         |

**Reasons to return:** the Look of the Day changes at midnight (Oregon time), moodboards persist between
visits, the quiz and "Surprise me" give a different path each time, and the Instagram feed refreshes hourly
when connected.

## Where things live

| What                                     | File                                                                      |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| Business details (contact, hours, links) | `src/config/site.ts`                                                      |
| Looks: images, titles, notes, tags       | `src/content/portfolio.ts`                                                |
| Collections (stories)                    | `src/content/collections.ts`                                              |
| Services                                 | `src/content/services.ts`                                                 |
| About copy & experience figures          | `src/content/about.ts`                                                    |
| Testimonials                             | `src/content/testimonials.ts`                                             |
| Home page sections                       | `src/components/home/*`                                                   |
| Intro curtain, cursor, page transitions  | `src/components/experience/*`                                             |
| Look of the Day                          | `src/lib/look-of-the-day.ts`                                              |
| Moodboard storage                        | `src/lib/moodboard.ts`                                                    |
| Enquiry form (client) / API route        | `src/components/contact/enquiry-form.tsx`, `src/app/api/enquiry/route.ts` |
| Design tokens (colours, type, motion)    | `src/app/globals.css`                                                     |
| SEO: metadata, JSON-LD                   | `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`, per-page `metadata`      |

### Adding a look

Add the photo (see `assets/README.md`), import it in `src/content/portfolio.ts` and add an entry with a
`slug`, `title`, one-line `note`, `alt` text, `categories`, `collections`, `moods` and `occasions`. It then
appears automatically in the archive, its collections, the quiz, the sitemap and the Look of the Day rotation.

See `assets/README.md` for adding or replacing photographs.

## Environment variables

| Variable                 | Required          | Description                                      |
| ------------------------ | ----------------- | ------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`   | Yes               | Live URL, e.g. `https://thejoyfulartistry.com`   |
| `RESEND_API_KEY`         | Yes, for the form | [Resend](https://resend.com) API key             |
| `ENQUIRY_FROM_EMAIL`     | Yes, for the form | Sender on a domain verified in Resend            |
| `ENQUIRY_TO_EMAIL`       | No                | Recipient(s); defaults to the email in `site.ts` |
| `INSTAGRAM_ACCESS_TOKEN` | No                | Enables the live Instagram feed                  |

### Enquiry form

Submissions are validated on the client and on the server (shared Zod schema). They are sent by email
through Resend's HTTP API, with the client's address set as _reply-to_. Spam protection: a honeypot field, a
minimum time-to-complete, an origin check and a per-IP rate limit (5 per 10 minutes, in memory, per instance).

If the email variables are missing, the API returns `503`. The form then tells visitors that online enquiries
aren't available and shows the email address and phone number instead. It never reports a false success.

### Instagram feed

Instagram content isn't scraped or hotlinked. With `INSTAGRAM_ACCESS_TOKEN` set, the site reads the six most
recent posts through the official **Instagram API with Instagram Login**, cached for an hour. Without a token,
or if the API fails, it shows a curated gallery of Joyful Artistry's own images that links to the profile.

To get a token: convert @joyfulartistry to a Professional (Business/Creator) account, create a Meta app with
the _Instagram API with Instagram Login_ product, add the `instagram_business_basic` permission, and generate a
long-lived token. Long-lived tokens last 60 days. Refresh them with
`GET https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=…`
(for example from a scheduled job), then update the environment variable.

## Deployment

Any Next.js host works (Vercel, Netlify or a Node server running `npm run build && npm run start`). Set the
environment variables in the host's dashboard. The homepage is prerendered and revalidates hourly. Only
`/api/enquiry` runs on demand.
