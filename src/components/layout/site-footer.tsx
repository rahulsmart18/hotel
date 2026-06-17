"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { HighlightScribble, HighlightZigzag } from "@/components/brand/highlights-svg";
import { Doodle5, Sprinkle1 } from "@/components/brand/highlights-assets";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";
import { BRANCH, NAV_LINKS, SITE } from "@/lib/site";

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 20 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    viewport: { once: true } as const,
    transition: { duration: 0.6, delay, ease: "easeOut" as const },
  };
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border/30 bg-background text-foreground">

      {/* ── Tamil aphorism band ───────────────────────────────────────── */}
      <div className="relative border-b border-border/20 py-12 text-center">
        {/* Doodle 5 — brushstroke mark left of aphorism */}
        <Doodle5 className="absolute left-8 top-1/2 hidden h-14 w-auto -translate-y-1/2 text-[#4A70A9] opacity-25 lg:block" />
        <motion.p
          {...fadeUp(0)}
          lang="ta"
          className="mx-auto max-w-3xl font-heading text-[clamp(1.2rem,3.5vw,2.2rem)] leading-snug tracking-tight text-foreground/80"
        >
          &#34;உண்டி கொடுத்தோர் உயிர் கொடுத்தோரே&#34;
        </motion.p>
        <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
          Those who give food, give life. — Tamil proverb
        </p>
        <div className="mt-5 flex justify-center opacity-40">
          <HighlightZigzag width={280} color="#8fabd4" />
        </div>
      </div>

      {/* ── Membership strip ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-border/20 px-5 py-10 sm:px-8 lg:px-12">
        {/* Sprinkle 1 — scattered boxes background texture */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.035]" aria-hidden>
          <Sprinkle1 className="h-full w-full text-foreground" />
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-[0.6rem] uppercase tracking-[0.22em] text-muted-foreground">
              Membership
            </span>
            <div className="relative mt-2 inline-block">
              <p className="text-xl tracking-tight text-foreground sm:text-2xl">
                Join the Turmeric Club
              </p>
              <span className="absolute -bottom-1 left-0 block">
                <HighlightScribble width={220} color="#4A70A9" delay={0.3} />
              </span>
            </div>
            <p className="mt-3 max-w-sm text-muted-foreground">
              Earn points, unlock early tables, and get a birthday amuse on us.
            </p>
          </div>
          <Link
            href="/reservations"
            className="shrink-0 border border-foreground/25 bg-foreground px-7 py-3 text-[0.7rem] uppercase tracking-[0.16em] text-background transition-all hover:bg-foreground/90"
          >
            Join free
          </Link>
        </div>
      </div>

      {/* ── Main footer grid ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">

          {/* Brand column */}
          <motion.div
            {...fadeUp(0)}
            className="lg:col-span-4"
          >
            <p className="font-heading text-2xl tracking-[0.2em] text-foreground">
              {SITE.name}
            </p>
            <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">
              {SITE.description}
            </p>
            <p
              lang="ta"
              className="font-tamil mt-4 max-w-sm leading-relaxed text-muted-foreground/70"
            >
              {SITE.taglineTamil}
            </p>
            <p className="mt-6 text-[0.62rem] uppercase tracking-[0.3em] text-muted-foreground">
              Portfolio case study
            </p>
            <a
              href={SITE.whatsappBookingUrl}
              className="mt-3 inline-block text-foreground/70 underline underline-offset-4 decoration-border/50 transition-colors hover:text-foreground"
              rel="noreferrer"
              target="_blank"
            >
              Message on WhatsApp (demo)
            </a>
          </motion.div>

          {/* Links + address */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
            <motion.div
              {...fadeUp(0.08)}
            >
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground">
                Quick links
              </p>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp(0.16)}
            >
              <p className="text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground">
                Visit
              </p>
              <address className="mt-4 not-italic leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">{BRANCH.name}</span>
                <br />
                {BRANCH.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <a
                  className="mt-3 inline-block text-foreground/70 transition-colors hover:text-foreground"
                  href={`tel:${BRANCH.phoneTel}`}
                >
                  {BRANCH.phoneDisplay}
                </a>
                <br />
                <a
                  className="inline-block text-foreground/70 transition-colors hover:text-foreground"
                  href={`mailto:${BRANCH.email}`}
                >
                  {BRANCH.email}
                </a>
              </address>
            </motion.div>
          </div>

          {/* Newsletter */}
          <motion.div
            {...fadeUp(0.24)}
            className="lg:col-span-3"
          >
            <p className="text-[0.62rem] uppercase tracking-[0.26em] text-muted-foreground">
              Stay close
            </p>
            <p className="mt-3 text-muted-foreground">
              Pop-ups, chef&apos;s tables, and app-only drops.
            </p>
            <div className="mt-5">
              <FooterNewsletter />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Big watermark brand name ─────────────────────────────────── */}
      <div
        className="pointer-events-none select-none overflow-hidden border-t border-border/20 py-6"
        aria-hidden
      >
        <p className="font-heading text-center text-[clamp(3.5rem,16vw,14rem)] leading-none tracking-[0.1em] text-foreground/[0.04]">
          {SITE.name}
        </p>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div className="border-t border-border/20 px-5 py-6 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.65rem] text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. Crafted for demonstration.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-[0.65rem] uppercase tracking-[0.16em] text-muted-foreground">
              {SITE.socialHandle}
            </p>
            <div className="flex gap-5">
              {[
                { label: "Instagram", href: SITE.social.instagram },
                { label: "Facebook", href: SITE.social.facebook },
                { label: "X", href: SITE.social.x },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                  rel="noreferrer"
                  target="_blank"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
