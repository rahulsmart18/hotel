"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import {
  HighlightArrow,
  HighlightUnderline,
  HighlightZigzag,
} from "@/components/brand/highlights-svg";
import { Blob11 } from "@/components/brand/highlights-assets";
import { HeroCinematicLayers } from "@/components/home/hero-cinematic-layers";
import { BRAND_RITUAL } from "@/lib/brand-ritual";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function fadeProps(delay: number, reduce: boolean | null) {
  return {
    initial: reduce ? false as const : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  };
}

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgParallax = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, 90]
  );
  const bgY = useSpring(bgParallax, { stiffness: 80, damping: 25, mass: 0.4 });
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.8],
    reduceMotion ? [1, 1] : [1, 1.07]
  );
  const contentFade = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Progressive blur: 0 → 12px as user scrolls past the hero
  const blurPx = useTransform(scrollYProgress, [0, 0.6], [0, 14]);
  const blurFilter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <section
      ref={sectionRef}
      id="main-content"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      {/* ── Blob 11 — organic background accent (bottom-right) ───────── */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 z-[1] w-[min(640px,90vw)] opacity-[0.04] sm:opacity-[0.06]"
        aria-hidden
      >
        <Blob11 className="h-auto w-full text-foreground" />
      </div>

      {/* ── Background image + parallax + progressive blur ───────────── */}
      <motion.div
        className="absolute inset-0 z-[1]"
        style={reduceMotion ? undefined : { filter: blurFilter }}
        aria-hidden
      >
        <HeroCinematicLayers
          scrollYProgress={scrollYProgress}
          reduceMotion={reduceMotion}
          bgY={bgY}
          imageScale={imageScale}
        />
      </motion.div>

      {/* Gradient vignette — bottom-up, light palette */}
      <motion.div
        style={{ opacity: useTransform(scrollYProgress, [0, 0.6], [1, 0.5]) }}
        className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-background via-background/80 to-background/[0.06]"
        aria-hidden
      />

      {/* ── Text content ─────────────────────────────────────────────── */}
      <motion.div
        style={{ opacity: contentFade }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 pb-24 sm:px-8 sm:pb-32 lg:px-12"
      >
        {/* Overline chip */}
        <motion.p
          {...fadeProps(0, reduceMotion)}
          className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground"
        >
          {BRAND_RITUAL.shortLabel}
          <span className="mx-2 opacity-40">—</span>
          {BRAND_RITUAL.hook}
        </motion.p>

        {/* ── Main headline ────────────────────────────────────── */}
        <div>
          <motion.h1
            id="hero-heading"
            {...fadeProps(0.1, reduceMotion)}
            className="font-heading leading-[0.93] tracking-[-0.03em] text-foreground"
          >
            <span className="block">Where silence</span>

            {/* "tastes like gold" — highlighted word */}
            <span className="relative mt-1 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-foreground via-foreground/90 to-[#8fabd4] bg-clip-text text-transparent">
                tastes like gold.
              </span>

              {/* Wavy highlights.design underline */}
              {!reduceMotion && (
                <span className="absolute -bottom-3 left-0 block">
                  <HighlightUnderline
                    width={480}
                    color="#4A70A9"
                    delay={1.1}
                  />
                </span>
              )}
            </span>
          </motion.h1>
        </div>

        {/* Tagline */}
        <motion.p
          {...fadeProps(0.2, reduceMotion)}
          className="max-w-xl text-muted-foreground"
        >
          {SITE.tagline}{" "}
          <span className="text-foreground/80">{SITE.regionStory}</span>
        </motion.p>

        {/* Tamil tagline */}
        <motion.p
          {...fadeProps(0.3, reduceMotion)}
          lang="ta"
          className="font-tamil max-w-lg text-[1.05rem] leading-relaxed text-muted-foreground sm:text-xl"
        >
          {SITE.taglineTamil}
        </motion.p>

        {/* ── CTAs ─────────────────────────────────────────────── */}
        <motion.div
          {...fadeProps(0.4, reduceMotion)}
          className="flex flex-wrap items-center gap-5"
        >
          {/* Reserve button + scribble arrow */}
          <div className="relative">
            {!reduceMotion && (
              <span className="absolute -right-10 -top-10 hidden sm:block">
                <HighlightArrow
                  dir="down"
                  width={44}
                  color="#4A70A9"
                  delay={1.5}
                />
              </span>
            )}
            <Link
              href="/reservations"
              className="inline-flex items-center gap-2 border border-foreground/30 bg-foreground px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-background transition-all duration-200 hover:bg-foreground/90"
            >
              Reserve a table
            </Link>
          </div>

          {/* View menu — outline */}
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 border border-foreground/20 px-8 py-3.5 text-[0.72rem] uppercase tracking-[0.16em] text-foreground transition-all duration-200 hover:border-foreground/50"
          >
            View the menu
          </Link>
        </motion.div>

        {/* Zigzag highlights.design section divider */}
        {!reduceMotion && (
          <div className="mt-2 opacity-30">
            <HighlightZigzag width={320} color="#8fabd4" />
          </div>
        )}
      </motion.div>

      {/* Scroll hint */}
      {!reduceMotion && (
        <div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
          aria-hidden
        >
          <span className="text-[0.58rem] uppercase tracking-[0.45em] text-muted-foreground/60">
            Scroll
          </span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-8 w-[18px] items-start justify-center rounded-full border border-border/50 pt-1.5"
          >
            <span className="size-1 rounded-full bg-foreground/40" />
          </motion.span>
        </div>
      )}
    </section>
  );
}
