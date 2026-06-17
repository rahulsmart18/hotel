"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

import { HighlightZigzag } from "@/components/brand/highlights-svg";

const STATS = [
  { value: 12,  suffix: "+", label: "Years of craft",      prefix: "" },
  { value: 340, suffix: "",  label: "Dishes in the atlas", prefix: "" },
  { value: 8,   suffix: "",  label: "Tables nightly",      prefix: "" },
  { value: 100, suffix: "%", label: "Locally sourced",     prefix: "" },
] as const;

function AnimatedNumber({
  target,
  prefix,
  suffix,
  inView,
}: {
  target: number;
  prefix: string;
  suffix: string;
  inView: boolean;
}) {
  const reduce = useReducedMotion();
  const spring = useSpring(0, { stiffness: 55, damping: 22, mass: 1 });
  const display = useTransform(spring, (v) => Math.round(v).toString());

  useEffect(() => {
    if (inView && !reduce) spring.set(target);
    else if (!inView) spring.set(0);
  }, [inView, target, spring, reduce]);

  if (reduce) {
    return (
      <span>
        {prefix}{target}{suffix}
      </span>
    );
  }

  return (
    <span>
      {prefix}<motion.span>{display}</motion.span>{suffix}
    </span>
  );
}

export function StatsStrip() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-y border-border/30 py-16 sm:py-20"
      aria-label="At a glance"
    >
      {/* Background accent */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,color-mix(in_oklch,var(--color-gold,#bbd5da)_8%,transparent),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section label */}
        <p className="mb-10 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
          By the numbers
        </p>

        <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-4 sm:gap-y-0">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-3"
            >
              {/* Large number */}
              <p className="font-heading text-[clamp(3rem,7vw,5.5rem)] leading-none tracking-[-0.04em] text-foreground">
                <AnimatedNumber
                  target={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  inView={inView}
                />
              </p>

              {/* Zigzag divider */}
              <div className="opacity-40">
                <HighlightZigzag
                  width={60}
                  color="#4A70A9"
                />
              </div>

              {/* Label */}
              <p className="text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
