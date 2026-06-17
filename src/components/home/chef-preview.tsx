"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

import { buttonVariants } from "@/components/ui/button";
import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function ChefPreview() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });
  const imgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -36]
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-24 sm:py-32"
      aria-labelledby="chef-preview-heading"
    >
      <div
        className="pointer-events-none absolute right-0 top-0 h-[min(100vw,36rem)] w-[min(100vw,36rem)] translate-x-1/3 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--gold)_9%,transparent),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          style={{ y: imgY }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/50 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.05] will-change-transform"
        >
          <div className="home-grain absolute inset-0 z-10 mix-blend-overlay" aria-hidden />
          <Image
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80"
            alt="Chef in a professional kitchen"
            fill
            className="object-cover"
            sizes="(max-width:1024px) 100vw, 50vw"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-background/50 via-transparent to-gold/[0.03]" />
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_LUXURY }}
            className="absolute bottom-6 left-6 right-6 z-20 border border-white/10 bg-background/55 px-5 py-4 text-sm leading-snug text-foreground/95 backdrop-blur-md"
          >
            <p className="text-[0.6rem] uppercase tracking-[0.35em] text-gold">
              Since 2024
            </p>
            <p className="mt-1 text-lg tracking-tight">
              One narrative per service.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p
            variants={fadeUpItemShort}
            className="section-badge mb-1"
          >
            Meet the chef
          </motion.p>
          <motion.h2
            id="chef-preview-heading"
            variants={fadeUpItemShort}
            className="mt-5 text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.1] tracking-[-0.02em]"
          >
            A kitchen tuned like an orchestra.
          </motion.h2>
          <motion.p
            variants={fadeUpItemShort}
            className="mt-7 text-base leading-[1.75] text-muted-foreground sm:text-lg"
          >
            Executive Chef Elena Maris believes luxury is restraint — fewer
            elements, deeper technique, and service that anticipates before you
            speak. Her menus trace a single narrative from tide to table, rooted
            in South Indian produce with European discipline.
          </motion.p>
          <motion.p
            variants={fadeUpItemShort}
            className="mt-5 text-base leading-[1.75] text-muted-foreground sm:text-lg"
          >
            This is a fictional profile for a portfolio build; the craft is real
            in the code, typography, and motion that surround it.
          </motion.p>
          <motion.div variants={fadeUpItemShort} className="mt-10">
            <motion.div
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/about"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "border-gold/40 bg-transparent px-8 text-foreground transition-colors hover:border-gold/70 hover:bg-muted/20"
                )}
              >
                Read our story
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
