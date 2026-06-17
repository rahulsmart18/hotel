"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { ABOUT_AWARDS, ABOUT_TIMELINE } from "@/lib/about-data";
import { EASE_LUXURY, fadeUpItem, fadeUpItemShort, staggerContainer } from "@/lib/motion";

const BELIEFS = [
  {
    id: "silence",
    icon: "✦",
    title: "Stillness is an ingredient",
    body: "We calibrate the room's tempo — pacing, light, pause between courses — so food is never rushed past you.",
  },
  {
    id: "soil",
    icon: "◈",
    title: "The soil speaks first",
    body: "Relationships with growers come before any dish. Provenance you can taste, traced to farm and season.",
  },
  {
    id: "honesty",
    icon: "◇",
    title: "Honest luxury",
    body: "No performance. Luxury here is the absence of friction — the right detail, at the right moment, for you.",
  },
];

function ChefSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const reduce = useReducedMotion();

  return (
    <section ref={ref} className="mt-24 grid gap-12 lg:grid-cols-2 lg:items-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70 bg-muted/20">
        <motion.div
          className="absolute inset-[-8%] size-[116%]"
          style={reduce ? undefined : { y: imageY }}
        >
          <Image
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80"
            alt="Chef Elena Maris at the pass"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </motion.div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute bottom-5 left-5">
          <span className="rounded-full bg-gold/90 px-3 py-1 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-black">
            Executive Chef
          </span>
        </div>
      </div>
      <motion.div
        variants={staggerContainer(0, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.p variants={fadeUpItemShort} className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-gold">
          Behind the pass
        </motion.p>
        <motion.h2 variants={fadeUpItem} className="mt-3 text-3xl tracking-tight sm:text-4xl">
          Elena Maris
        </motion.h2>
        <motion.p variants={fadeUpItemShort} className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          Fifteen years between Lyon and Chennai. Elena&apos;s tasting arcs balance acid, smoke, and sweetness — never more than three focal flavors on a plate.
        </motion.p>
        <motion.p variants={fadeUpItemShort} className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
          She trained under Michelin-starred kitchens in Europe before returning to Tamil Nadu to build a cuisine rooted in Chettinad markets and coastline produce. This bio is illustrative for the portfolio; the layout is production-grade.
        </motion.p>
        <motion.div variants={fadeUpItemShort} className="mt-8">
          <Link
            href="/reservations"
            className="inline-block rounded-full border border-border/70 bg-card/60 px-5 py-2.5 text-sm font-medium transition-colors hover:border-gold/50 hover:text-gold"
          >
            Reserve at the chef&apos;s counter &rarr;
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

export function AboutContent() {
  const reduce = useReducedMotion();

  return (
    <article className="mx-auto max-w-6xl px-4 pb-24 pt-12 sm:px-6 lg:px-8">

      {/* Header */}
      <motion.header
        className="max-w-3xl"
        variants={staggerContainer(0.1, 0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUpItemShort} className="text-xs font-medium uppercase tracking-[0.35em] text-gold">
          Our story
        </motion.p>
        <motion.h1 variants={fadeUpItem} className="mt-3 font-heading text-4xl tracking-tight sm:text-6xl md:text-7xl">
          Stillness is our first ingredient.
        </motion.h1>
        <motion.p variants={fadeUpItemShort} className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
          Aurelio began as a question: what if a restaurant website felt as considered as the room itself? This page is narrative fiction paired with real engineering — typography, motion, accessibility, and performance tuned for discerning guests.
        </motion.p>
      </motion.header>

      {/* Philosophy + image */}
      <motion.section
        className="mt-20 grid gap-12 lg:grid-cols-2 lg:items-center"
        variants={staggerContainer(0, 0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.div variants={fadeUpItemShort} className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/70">
          <Image
            src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1000&q=80"
            alt="Dining room with sculptural lighting"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
          />
        </motion.div>
        <div>
          <motion.h2 variants={fadeUpItem} className="text-3xl tracking-tight sm:text-4xl">
            Philosophy
          </motion.h2>
          <motion.p variants={fadeUpItemShort} className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            We believe luxury is the absence of friction — not excess gold, but the right amount of light, the right pause before the amuse-bouche, the right sentence on a page. Menus change with monsoon and harvest; the website moves with the same quiet confidence.
          </motion.p>
          <motion.p variants={fadeUpItemShort} className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Sustainability here means ethical storytelling too: transparently fictional brand, real attention to code quality, SEO, and inclusive design patterns.
          </motion.p>
        </div>
      </motion.section>

      {/* What the kitchen believes in */}
      <section className="mt-24">
        <motion.div
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p variants={fadeUpItemShort} className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-gold">
            Core beliefs
          </motion.p>
          <motion.h2 variants={fadeUpItem} className="mt-3 text-3xl tracking-tight sm:text-4xl">
            What the kitchen believes in
          </motion.h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {BELIEFS.map((b, i) => (
              <motion.div
                key={b.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_LUXURY }}
                className="rounded-2xl border border-border/60 bg-card/50 p-6"
              >
                <span className="text-2xl text-gold" aria-hidden>{b.icon}</span>
                <h3 className="mt-4 text-lg tracking-tight">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Chef section with parallax */}
      <ChefSection />

      {/* Culinary process timeline */}
      <section className="mt-24">
        <motion.div
          variants={staggerContainer(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p variants={fadeUpItemShort} className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-gold">
            Our process
          </motion.p>
          <motion.h2 variants={fadeUpItem} className="mt-3 text-3xl tracking-tight sm:text-4xl">
            Culinary process
          </motion.h2>
          <ol className="mt-12 space-y-0">
            {ABOUT_TIMELINE.map((step, i) => (
              <motion.li
                key={step.id}
                initial={reduce ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.09, ease: EASE_LUXURY }}
                className="relative grid grid-cols-[3rem_1fr] gap-x-6 pb-10 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <span className="flex size-9 items-center justify-center rounded-full border-2 border-gold/50 bg-background text-sm font-bold text-gold shrink-0">
                    {i + 1}
                  </span>
                  {i < ABOUT_TIMELINE.length - 1 && (
                    <div className="mt-2 w-px flex-1 bg-gradient-to-b from-gold/30 to-transparent" />
                  )}
                </div>
                <div className="pt-1.5">
                  <h3 className="text-xl tracking-tight">{step.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* Awards — styled badges */}
      <section className="mt-24">
        <motion.div
          variants={staggerContainer(0, 0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p variants={fadeUpItemShort} className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-gold">
            Recognition
          </motion.p>
          <motion.h2 variants={fadeUpItem} className="mt-3 text-3xl tracking-tight sm:text-4xl">
            Awards &amp; recognition
          </motion.h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ABOUT_AWARDS.map((a, i) => (
              <motion.div
                key={a.id}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_LUXURY }}
                className="relative overflow-hidden rounded-2xl border border-gold/25 bg-gradient-to-br from-gold/[0.06] to-card/60 p-6 shadow-sm"
              >
                <div className="pointer-events-none absolute -right-4 -top-4 size-24 rounded-full bg-gold/10 blur-2xl" aria-hidden />
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold">
                  {a.year}
                </p>
                <h3 className="mt-3 text-lg tracking-tight">{a.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Sustainability */}
      <motion.section
        className="mt-24 rounded-2xl border border-border/70 bg-gradient-to-br from-card/60 to-background p-8 sm:p-12"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE_LUXURY }}
      >
        <h2 className="text-3xl tracking-tight sm:text-4xl">
          Sustainability
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          In the fiction of Aurelio, we partner with regenerative farms, trace seafood to vessel and season, and run a closed-loop prep kitchen with compost and oil recycling. On the web, we ship lighter bundles, prefer server components, and lazy-load immersive sections so the experience stays fast on real devices and networks.
        </p>
      </motion.section>
    </article>
  );
}
