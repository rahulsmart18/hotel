# Home UX: reference lane + section map

## North star (1–2 lanes)

**Primary: Amici** — hospitality warmth, “reasons to pick a night” as labeled programming, honest venue framing, reservation as a small narrative arc.

**Secondary: BAVET** — kinetic type, repeatable “surprise mechanic” explained clearly, voice that feels like friends at the pass (without meme-level chaos).

We intentionally **do not** pursue Grog-style noise or Vicio-style horizontal chapter pages in this pass; those would fight the current luxury palette unless rebuilt as a second brand mode.

## Section map (`src/app/page.tsx`)

| Order | Component | Amici alignment | BAVET alignment | Gap (before this work) |
|------:|-----------|-----------------|-----------------|-------------------------|
| 1 | `HeroSection` | Tagline + host voice | — | Strong headline; less “night-out programming” upfront |
| 2 | `MarqueeStrip` | — | Marquee rhythm | Phrases skewed generic portfolio |
| 3 | `EveningProgrammingStrip` | Experience taxonomy | — | Chips lacked venue “strand” / mode label |
| 4 | `ValuePillarsSection` | Promise framing | — | (Unchanged) already pillar-like |
| 5 | `FeaturedDishes` | Editorial dish story | — | Ingredients-only blurbs |
| 6 | `StatsStrip` | — | — | (Unchanged) |
| 7 | **`TableGoldSurprise`** (new) | — | Gamified ritual hook | Missing “lucky plate” analogue |
| 8 | `ChefPreview` | Host face | — | (Unchanged) |
| 9 | `TestimonialsSection` | Social proof | — | (Unchanged) |
| 10 | `ExperienceSection` | — | — | (Unchanged) |
| 11 | `LocationCta` | Operational honesty | — | No tonight / service window signal |
| 12 | `InstagramGrid` | — | — | (Unchanged) |
| 13 | `NewsletterSection` | — | “Club” energy light | (Unchanged) |

## Reservations (`src/app/reservations/page.tsx`)

- **Amici**: add hospitality spine + numbered micro-steps that mirror the form’s intent (party → occasion → notes), without changing validation logic.

## Follow-ups (not in this pass)

- Vicio-style horizontal scroll chapter.
- EISLAB-style franchise / expansion CTA (only if business model fits).
- Real CMS wiring for `EVENING_PROGRAMMING` dates.
