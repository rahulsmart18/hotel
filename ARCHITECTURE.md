# Aurelio — architecture & implementation notes

Portfolio case study: a fictional Michelin-inspired restaurant site demonstrating **Next.js App Router**, **TypeScript**, **Tailwind CSS v4**, **Shadcn UI (Base UI)**, **Framer Motion**, **React Hook Form + Zod**, and **OpenRouter** (Food Concierge via OpenAI-compatible API).

> **Note:** `create-next-app` installed **Next.js 16** (current stable). Behavior matches the App Router model described for Next 15; upgrade/downgrade pin can be adjusted in `package.json` if a client requires an exact major.

---

## 1. Folder structure

```text
src/
  app/
    layout.tsx              # Root layout: fonts, metadata, header/footer, JSON-LD, concierge
    page.tsx                # Home (composed sections; lazy testimonials)
    globals.css             # Tailwind v4 + Palette A (neo-organic + digital, OKLCH)
    opengraph-image.tsx     # Dynamic OG image (edge)
    robots.ts               # robots.txt
    sitemap.ts              # sitemap.xml
    api/chat/route.ts       # OpenRouter Food Concierge API
    menu/page.tsx
    about/page.tsx
    gallery/page.tsx        # dynamic() → masonry + lightbox (client)
    reservations/page.tsx
    contact/page.tsx
  components/
    layout/                 # SiteHeader (client), SiteFooter (server)
    home/                   # Home sections (mix of server + client)
    menu/                   # MenuBrowser: categories, dietary AND-filters, sort, sticky deck, modal
    gallery/                # GalleryMasonry (client)
    reservations/           # ReservationForm (client)
    contact/                # ContactForm (client)
    food-concierge/         # ConciergeRoot (dynamic), launcher, streaming panel
    seo/                    # JsonLd (Restaurant schema)
    ui/                     # Shadcn primitives
  lib/
    site.ts                 # SITE, BRANCH, NAV_LINKS
    seo.ts                  # createMetadata helper
    menu-queries.ts         # Pure filter/sort + category counts for menu UI & consistency
    menu-data.ts            # Menu + label maps (shared with AI system prompt)
    gallery-data.ts
    testimonials-data.ts
    about-data.ts
    schemas.ts              # Zod schemas (reservations, contact)
  types/
    index.ts                # Shared interfaces
```

---

## 2. Architecture decisions

| Decision | Rationale |
|----------|-----------|
| **Server Components by default** | Pages like Home, About, Contact shell are RSCs; heavy interactivity isolated to `use client` islands (menu, gallery, forms, concierge, header mobile nav). |
| **AI streaming** | `/api/chat` streams `text/plain` for token-by-token UX; errors stay JSON. Concierge UI loads via `ConciergeRoot` (`dynamic` + `ssr: false`) to protect LCP. |
| **Centralized content** | Menu, gallery, and testimonials live in `lib/*-data.ts` so the UI and AI system prompt stay aligned. |
| **Theme in CSS variables** | Black / warm white / gold mapped into Shadcn tokens (`primary` = gold) for consistent Radix/Base UI components. |
| **Typography** | **Cormorant Garamond** (display) + **DM Sans** (UI) via `next/font` — editorial luxury without generic “AI slop” pairing. |
| **Dynamic OG** | `opengraph-image.tsx` ships a branded card without maintaining static PNGs. |
| **SEO primitives** | `metadataBase`, per-page `metadata`, `sitemap.ts`, `robots.ts`, JSON-LD `Restaurant`. |
| **Demo forms** | Reservations / contact / newsletter show validation and success UX **without** a database. |

---

## 3. Reusable building blocks

- **Layout:** `SiteHeader`, `SiteFooter` — navigation, skip link, branch block.
- **UI:** Shadcn `Button`, `Input`, `Dialog`, `Select`, `Carousel`, `Badge`, `ScrollArea`, etc.
- **Utilities:** `cn()` from `lib/utils.ts`.
- **SEO:** `createMetadata()`, `JsonLd`.
- **Types:** `MenuItem`, `GalleryImage`, `ChatMessage`, … in `src/types/index.ts`.

---

## 4. TypeScript interfaces (summary)

Defined in `src/types/index.ts`:

- `MenuItem`, `MenuCategoryId`, `DietaryTag`
- `Testimonial`, `GalleryImage`, `TimelineStep`, `Award`
- `BranchInfo` (optional extension; branch data currently in `BRANCH` const)
- `ChatMessage`, `ChatRole`

Zod-inferred types in `src/lib/schemas.ts`:

- `ReservationInput`, `ContactInput`

---

## 5. Implementation phases (completed in this pass)

1. **Scaffold** — Next.js + TS + Tailwind + ESLint; Shadcn init; dependencies (motion, RHF, Zod, `openai` SDK for OpenRouter, carousel).
2. **Design system** — Palette A tokens in `globals.css` (+ `DESIGN_PALETTE.md` hex map), `--glow` mint accent, editorial `--chapter-*` vars, glass utilities (`surface-glass`, `surface-glass-card`), fonts, selection.
3. **Shell** — Header/footer, skip link, global metadata, JSON-LD, OG image, sitemap/robots.
4. **Home** — Hero (large display type), kinetic marquee, value pillars, featured signatures (light band + dark cards), stats strip, chef preview, testimonials (dynamic import), experience, location CTA, Instagram grid, newsletter.
5. **Menu** — Category chips with counts, dietary match-all chips, sort, sticky control deck, dish dialog, skeleton `loading.tsx`.
6. **About / Gallery / Reservations / Contact** — Storytelling page, masonry + lightbox, validated forms, hours & map placeholders.
7. **AI concierge** — `/api/chat` (OpenRouter, OpenAI-compatible) + floating UI, suggested prompts, typing state, graceful 503 when `OPENROUTER_API_KEY` is missing.

---

## 6. Vercel / production

- Set `NEXT_PUBLIC_SITE_URL` to the deployed origin (no trailing slash).
- Set `OPENROUTER_API_KEY` in Vercel project settings.
- Optional: `OPENROUTER_MODEL`, `OPENROUTER_HTTP_REFERER`, `OPENROUTER_APP_TITLE` (see `.env.example`).
- Replace map placeholders on Home `LocationCta` and `Contact` with Google Maps Embed or static map image.

---

## 7. Commands

```bash
npm run dev      # local dev
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier
```
