"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { DoodlePin, DoodleClock, DoodlePlate } from "@/components/brand/doodle-icons";
import { HighlightArrow } from "@/components/brand/highlights-svg";
import { Doodle4 } from "@/components/brand/highlights-assets";
import { buttonVariants } from "@/components/ui/button";
import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { BRANCH, VENUE_SIGNALS } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LocationCta() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-t border-border/50 bg-gradient-to-b from-card/30 to-background py-24 sm:py-28"
      aria-labelledby="location-heading"
    >
      {/* Dot pattern background accent */}
      <div className="bg-dot-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--spice)_10%,transparent),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:grid-cols-2 sm:gap-14 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.div variants={fadeUpItemShort} className="flex items-center gap-3">
            <DoodlePin className="size-5 text-[#0a0a0a]" />
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.45em] text-[#0a0a0a]">
              Find us
            </p>
          </motion.div>
          <motion.h2
            id="location-heading"
            variants={fadeUpItemShort}
            className="mt-4 flex items-start gap-3 text-[clamp(2rem,4vw,3.25rem)] leading-[1.08] tracking-[-0.02em]"
          >
            <span>Iyyappanthangal, Chennai</span>
            {/* Doodle 4 — three-stroke mark beside heading */}
            <Doodle4 className="mt-1 h-10 w-auto shrink-0 text-[#4A70A9] opacity-60" />
          </motion.h2>
          <motion.div variants={fadeUpItemShort}>
            <p className="mt-6 rounded-2xl border border-[#bbd5da]/25 bg-background/40 px-4 py-3 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <span className="flex items-center gap-2 font-semibold uppercase tracking-[0.2em] text-[#0a0a0a]">
                <DoodleClock className="size-4" color="#0a0a0a" />
                {VENUE_SIGNALS.statusLabel}
              </span>
              <span className="mt-2 block text-muted-foreground">
                {VENUE_SIGNALS.statusDetail}
              </span>
              <span className="mt-2 block border-t border-border/40 pt-2 text-muted-foreground/95">
                {VENUE_SIGNALS.walkInNote}
              </span>
            </p>
          </motion.div>
          <motion.div variants={fadeUpItemShort}>
            <address className="mt-8 not-italic text-sm leading-[1.8] text-muted-foreground sm:text-base">
              {BRANCH.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </motion.div>
          <motion.div
            variants={fadeUpItemShort}
            className="mt-10 flex flex-wrap items-end gap-3"
          >
            {/* highlights.design arrow pointing to the CTA */}
            <div className="relative">
              <div className="absolute -top-10 left-2 hidden sm:block">
                <HighlightArrow dir="down" width={44} color="#4A70A9" delay={0.4} />
              </div>
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.02 }}
                whileTap={reduce ? undefined : { scale: 0.98 }}
              >
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-11 px-8 shadow-[0_16px_40px_-20px_rgba(73,0,32,0.45)]"
                  )}
                >
                  Directions & hours
                </Link>
              </motion.div>
            </div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <a
                href="https://maps.google.com/?q=Iyyappanthangal+Chennai+Tamil+Nadu"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-[#bbd5da]/40 px-8 hover:border-[#0a0a0a]/65"
                )}
                rel="noreferrer"
                target="_blank"
              >
                Open in Maps
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE_LUXURY }}
          className="group relative min-h-[240px] overflow-hidden rounded-2xl border border-dashed border-gold/20 bg-muted/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:min-h-0"
          role="img"
          aria-label="Map placeholder — integrate Google Maps embed in production"
        >
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-40"
            animate={
              reduce
                ? undefined
                : {
                    background: [
                      "radial-gradient(circle at 20% 30%, color-mix(in oklch, var(--gold), transparent 88%), transparent 50%)",
                      "radial-gradient(circle at 80% 60%, color-mix(in oklch, var(--jade), transparent 90%), transparent 50%)",
                      "radial-gradient(circle at 20% 30%, color-mix(in oklch, var(--gold), transparent 88%), transparent 50%)",
                    ],
                  }
            }
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
          <div className="bg-mesh-pattern absolute inset-0 opacity-40" aria-hidden />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <DoodlePlate className="size-12 text-[#0a0a0a] opacity-60" />
            <span className="text-[0.6rem] uppercase tracking-[0.4em] text-[#0a0a0a]/80">
              Map slot
            </span>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              Google Maps embed placeholder — swap with your production API key and
              static or interactive map.
            </p>
          </div>
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/[0.06] transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
