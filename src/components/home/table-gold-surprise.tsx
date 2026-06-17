"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * BAVET-inspired “surprise mechanic” — explained like a mini campaign, tuned for Aurelio’s gold ritual voice.
 */
export function TableGoldSurprise() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-gold/20 bg-gradient-to-b from-card/40 via-background to-card/25 py-20 sm:py-28"
      aria-labelledby="gold-surprise-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            color-mix(in oklch, var(--gold), transparent 94%) 0 1px,
            transparent 1px 48px
          )`,
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--gold)_22%,transparent),transparent_68%)] blur-2xl" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:items-center">
          <motion.div
            variants={staggerContainer(0.06, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-12%" }}
            className="space-y-6"
          >
            <motion.p
              variants={fadeUpItemShort}
              className="text-[0.65rem] font-medium uppercase tracking-[0.42em] text-gold"
            >
              House game · demo ritual
            </motion.p>
            <motion.h2
              id="gold-surprise-heading"
              variants={fadeUpItemShort}
              className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.03em]"
            >
              Gold-rim bread plate?
              <span className="mt-2 block bg-gradient-to-r from-gold via-jasmine to-jade bg-clip-text text-transparent">
                The kitchen sends a second amuse.
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUpItemShort}
              className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              A tiny lottery for people who love a wink: some tables find a
              gold-rimmed bread plate under the cloche. If yours arrives that way,
              the pass adds an extra bite — on the house — because nights should
              have a little mischief. (Portfolio fiction; swap odds and rules for
              production.)
            </motion.p>
            <motion.div variants={fadeUpItemShort}>
              <Link
                href="/reservations"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "border-gold/45 bg-background/50 px-8 hover:border-gold/75"
                )}
              >
                Ask for a table in the game
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.75, ease: EASE_LUXURY }}
            className="relative overflow-hidden rounded-3xl border border-gold/25 bg-card/50 p-8 shadow-[0_40px_120px_-50px_rgba(0,0,0,0.55)]"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,color-mix(in_oklch,var(--gold)_18%,transparent),transparent_55%)]" aria-hidden />
            <div className="relative space-y-5">
              <p className="text-[0.6rem] font-semibold uppercase tracking-[0.38em] text-muted-foreground">
                How it lands
              </p>
              <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
                <li className="flex gap-3">
                  <span className="mt-0.5 text-gold">01</span>
                  <span>
                    <span className="font-medium text-foreground">Random-ish, never rude.</span>{" "}
                    A few covers per service — enough to spark gossip, not enough
                    to feel gimmicky.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-gold">02</span>
                  <span>
                    <span className="font-medium text-foreground">Allergies still rule.</span>{" "}
                    The bonus bite follows the same dietary guardrails you already
                    shared at booking.
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5 text-gold">03</span>
                  <span>
                    <span className="font-medium text-foreground">No quiz, no QR.</span>{" "}
                    If you know, you know — the plate does the talking.
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
