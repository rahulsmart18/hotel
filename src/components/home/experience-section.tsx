"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";

const bullets = [
  "Acoustic panels hidden behind brass lattice",
  "Sommelier island for tableside storytelling",
  "Private salon for six — request at booking",
];

export function ExperienceSection() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.15"],
  });
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [1, 1] : [1.04, 1]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="experience-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-card/30 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-7">
          <motion.div
            style={{ scale }}
            className="relative aspect-[16/11] overflow-hidden rounded-2xl border border-border/50 shadow-[0_40px_90px_-40px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.05] will-change-transform lg:col-span-7"
          >
            <div className="home-grain absolute inset-0 z-10 opacity-70" aria-hidden />
            <Image
              src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=1200&q=80"
              alt="Dining room with warm ambient lighting"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 58vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
          </motion.div>

          <motion.div
            variants={staggerContainer(0.08, 0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            className="flex flex-col justify-between gap-10 rounded-2xl border border-border/50 bg-gradient-to-br from-card/50 via-card/25 to-background/80 p-8 shadow-inner ring-1 ring-white/[0.04] sm:p-11 lg:col-span-5"
          >
            <div>
              <motion.p
                variants={fadeUpItemShort}
                className="section-badge mb-1"
              >
                The room
              </motion.p>
              <motion.h2
                id="experience-heading"
                variants={fadeUpItemShort}
                className="mt-5 text-[clamp(1.65rem,3.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em]"
              >
                Light, linen, and the hush before the first course.
              </motion.h2>
              <motion.p
                variants={fadeUpItemShort}
                className="mt-6 text-sm leading-[1.75] text-muted-foreground sm:text-base"
              >
                Aurelio’s dining room is imagined as a sequence of vignettes —
                low tables, sculptural florals, and a single focal line toward the
                open kitchen. Motion design on this site mirrors that rhythm:
                nothing flashes; everything arrives.
              </motion.p>
            </div>
            <ul className="grid gap-4">
              {bullets.map((text, i) => (
                <motion.li
                  key={text}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: reduce ? 0 : 0.15 + i * 0.08,
                    duration: 0.5,
                    ease: EASE_LUXURY,
                  }}
                  className="flex items-start gap-3 text-sm text-muted-foreground"
                >
                  <span
                    className="mt-2 size-1 shrink-0 rounded-full bg-gradient-to-br from-gold to-spice shadow-[0_0_12px_color-mix(in_oklch,var(--gold)_40%,transparent)]"
                    aria-hidden
                  />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
