"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";

export function NewsletterSection() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <section
      className="relative overflow-hidden border-t border-border/50 py-24 sm:py-28"
      aria-labelledby="newsletter-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,color-mix(in_oklch,var(--gold)_10%,transparent),transparent_55%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-card/25 via-transparent to-background" />

      <div className="relative mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.08, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
        >
          <motion.p
            variants={fadeUpItemShort}
            className="text-[0.65rem] font-medium uppercase tracking-[0.45em] text-gold"
          >
            Private list
          </motion.p>
          <motion.h2
            id="newsletter-heading"
            variants={fadeUpItemShort}
            className="mt-5 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
          >
            Invitations, never noise.
          </motion.h2>
          <motion.p
            variants={fadeUpItemShort}
            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            Demo capture only — no data is stored. Shows form UX and success state
            for portfolio review.
          </motion.p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE_LUXURY }}
            className="relative mt-12 overflow-hidden rounded-2xl border border-gold/30 bg-card/50 px-8 py-10 shadow-[0_24px_60px_-30px_color-mix(in_oklch,var(--spice)_18%,transparent)]"
            role="status"
          >
            <div className="home-grain absolute inset-0 opacity-50" aria-hidden />
            <p className="relative text-sm leading-relaxed text-foreground">
              Thank you. If this were production, you would receive a confirmation
              at <span className="font-medium text-gold">{email}</span>.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_LUXURY }}
            onSubmit={onSubmit}
            className="relative mx-auto mt-12 flex max-w-md flex-col gap-5 overflow-hidden rounded-2xl border border-border/60 bg-card/30 p-6 text-left shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.05] sm:flex-row sm:items-end sm:p-7"
            noValidate
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                background:
                  "linear-gradient(120deg, transparent 30%, color-mix(in oklch, var(--gold), transparent 92%) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: reduce ? "none" : "home-shimmer 5s ease-in-out infinite",
              }}
              aria-hidden
            />
            <div className="relative flex-1 space-y-2">
              <Label htmlFor="newsletter-email">Email</Label>
              <Input
                id="newsletter-email"
                type="email"
                autoComplete="email"
                placeholder="you@studio.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11 border-border/60 bg-background/60 transition-shadow focus-visible:ring-gold/30"
              />
            </div>
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="relative sm:pb-0.5"
            >
              <Button type="submit" className="h-11 min-w-[5.5rem] px-6">
                Join
              </Button>
            </motion.div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
