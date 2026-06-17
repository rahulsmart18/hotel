# Aurelio — Palette A (Neo-organic + digital)

Reference: [Eislab](https://eis-lab.de/en-us)–style **contrast chapters**, **glass**, **kinetic type**, **soft gradients** — implemented as CSS variables in `src/app/globals.css` (OKLCH for smooth interpolation).

## Core hex (design contract)

| Token | Hex | Role |
|--------|-----|------|
| Ink | `#0E0C0A` | Deep warm base |
| Surface 1 | `#161311` | Cards / chapter dish tiles |
| Surface 2 | `#1E1B17` | Elevated / muted fills |
| Cream | `#F3EDE6` | Primary text on dark |
| Taupe | `#A89F96` | Secondary text (warm, not cold gray) |
| Terracotta | `#C45C3A` | Organic accent / appetite |
| Marigold | `#E8A54B` | Primary CTA / luxury gold |
| Jade | `#2F8F7A` | Digital restraint / links |
| Sand mist | `#D8CFC4` | Hairlines on dark |
| Mint glow | `#7AE0C4` | Muted “neon” — focus, halos, ring |
| Chapter paper | `#F7F1EA` | Light editorial band |
| Chapter ink | `#1B1714` | Type on paper |

## CSS variables

- **Semantic UI:** `--background`, `--foreground`, `--primary`, `--muted-foreground`, `--border`, `--ring` (ring uses **glow** mint for digital signal).
- **Brand accents:** `--gold`, `--spice`, `--jade`, `--glow`, `--jasmine`.
- **Editorial chapter:** `--chapter-paper`, `--chapter-ink`, `--chapter-muted`, `--chapter-card`, `--chapter-border`.

## Utilities

- `surface-glass` — header-style frosted bar.
- `surface-glass-card` — pillar / deck glass on dark.

## Hero media (spectacle budget)

- **Default:** static full-bleed plate + grain + **scroll-scrub ink wash** (no extra network).
- **Optional video:** `NEXT_PUBLIC_HERO_VIDEO_URL` — muted, `loop`, `playsInline`, `preload="metadata"`. Keep files small (**~3–5 MB** short loop); heavy 4K reels will hurt LCP and CPU decode on mobile. Respects `prefers-reduced-motion` (video off; wash minimised in code).
- **Blend:** video sits under lattice/spotlight with soft-light style blending so it reads as atmosphere, not a second hero.
