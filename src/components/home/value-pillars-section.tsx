"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";

const PILLARS = [
  {
    title: "Ingredients with a story",
    body:
      "We talk about Tamil Nadu soil and Chennai craft the way we would across the table — never as a generic tasting script.",
  },
  {
    title: "Evenings that breathe",
    body:
      "Space between courses, filter coffee cadence, room for conversation — the same unhurried rhythm you would expect in a good home.",
  },
  {
    title: "Theatre you can lean into",
    body:
      "Light, motion, and type carry emotion without shouting — a host’s attention to detail, translated for the screen.",
  },
] as const;

export function ValuePillarsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative border-b border-border/50 py-20 sm:py-28"
      aria-labelledby="pillars-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_0%,color-mix(in_oklch,var(--gold)_10%,transparent),transparent_58%),radial-gradient(ellipse_60%_40%_at_100%_100%,color-mix(in_oklch,var(--glow)_6%,transparent),transparent_50%)]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-14%" }}
          className="max-w-3xl"
        >
          <motion.p
            variants={fadeUpItemShort}
            className="section-badge mb-1"
          >
            How we welcome you
          </motion.p>
          <motion.h2
            id="pillars-heading"
            variants={fadeUpItemShort}
            className="mt-5 text-[clamp(2.25rem,6.5vw,4.5rem)] leading-[1.02] tracking-[-0.035em]"
          >
            How we host you — even here, in pixels.
          </motion.h2>
        </motion.div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3 sm:gap-8">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.65,
                delay: reduce ? 0 : i * 0.12,
                ease: EASE_LUXURY,
              }}
              className="surface-glass-card relative p-6 sm:p-8"
            >
              <span
                className="text-5xl tabular-nums leading-none text-gold/30 sm:text-6xl"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl tracking-tight text-foreground sm:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                {pillar.body}
              </p>
              <div
                className="pointer-events-none absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-glow/35 to-transparent opacity-70"
                aria-hidden
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
