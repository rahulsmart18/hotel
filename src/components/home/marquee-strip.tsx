"use client";

import { useReducedMotion } from "framer-motion";

import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const PHRASES = [
  SITE.name,
  "Friends at the pass",
  "Fine dining · Chennai",
  "The room decides the night",
  "Portfolio case study",
  "Open kitchen energy",
  "தமிழ் · English",
  "Slow evenings · sharp detail",
  "Chef’s table",
  "INR · tasting menus",
  "Warm hospitality",
  "Gold-rim surprise · ask inside",
] as const;

/** Decorative dot separator between phrases */
function MarqueeDot({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      className="mx-4 shrink-0 size-2 self-center rounded-full"
      style={{ background: color, opacity: 0.6 }}
    />
  );
}

const DOT_COLORS = ["#4A70A9", "#8fabd4", "#000000", "#bbd5da", "#4A70A9", "#8fabd4"] as const;

function MarqueeContent({ id }: { id: string }) {
  return (
    <>
      {PHRASES.map((text, i) => (
        <>
          <span
            key={`${id}-${i}-${text}`}
            className={cn(
              "shrink-0 text-[clamp(1.1rem,2.8vw,2.4rem)] tracking-[-0.03em]",
              i % 4 === 0
                ? "text-foreground"
                : i % 4 === 2
                ? "text-[#4A70A9]"
                : "text-foreground/55"
            )}
          >
            {text}
          </span>
          <MarqueeDot key={`dot-${id}-${i}`} color={DOT_COLORS[i % DOT_COLORS.length]} />
        </>
      ))}
    </>
  );
}

/**
 * Kinetic full-bleed type rail — duplicated track; reduced motion → wrap.
 */
export function MarqueeStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="surface-glass relative z-20 border-y border-white/[0.06] py-4 sm:py-5"
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#4A70A9]/[0.04] via-transparent to-[#8fabd4]/[0.08]" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />
      <div className="overflow-hidden">
        <div className="home-marquee-track relative z-[1] items-center px-4">
          <MarqueeContent id="a" />
          {!reduceMotion ? <MarqueeContent id="b" /> : null}
        </div>
      </div>
    </div>
  );
}
