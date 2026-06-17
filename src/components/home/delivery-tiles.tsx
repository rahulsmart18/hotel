"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { HighlightUnderline } from "@/components/brand/highlights-svg";
import { cn } from "@/lib/utils";

const PLATFORMS = [
  {
    id: "swiggy",
    name: "Swiggy",
    tagline: "30–45 min door delivery",
    note: "Live tracking",
    href: "https://www.swiggy.com/",
    accent: "#FC8019",
    number: "01",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="20" r="18" fill="#FC8019" opacity="0.12" />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#FC8019">🛵</text>
      </svg>
    ),
  },
  {
    id: "zomato",
    name: "Zomato",
    tagline: "Order from anywhere, anytime",
    note: "Curated picks",
    href: "https://www.zomato.com/",
    accent: "#E23744",
    number: "02",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="20" r="18" fill="#E23744" opacity="0.12" />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#E23744">🍽️</text>
      </svg>
    ),
  },
  {
    id: "ondc",
    name: "ONDC",
    tagline: "India's open commerce network",
    note: "No middleman",
    href: "https://ondc.org/",
    accent: "#4F46E5",
    number: "03",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="size-8">
        <circle cx="20" cy="20" r="18" fill="#4F46E5" opacity="0.12" />
        <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontSize="18" fill="#4F46E5">🇮🇳</text>
      </svg>
    ),
  },
] as const;

export function DeliveryTiles() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-b border-border/30 py-20 sm:py-28"
      aria-labelledby="delivery-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        {/* ── Top row: label + heading ───────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground"
            >
              Also available on
            </motion.p>

            <motion.h2
              id="delivery-heading"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-3 inline-block font-heading text-[clamp(1.8rem,4.5vw,3.5rem)] leading-[1.05] tracking-[-0.02em]"
            >
              Order from your
              <br />
              <span className="relative">
                favourite delivery app
                {!reduce && (
                  <span className="absolute -bottom-2 left-0">
                    <HighlightUnderline width={380} color="#4A70A9" delay={0.7} />
                  </span>
                )}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-xs text-muted-foreground lg:text-right"
          >
            Same kitchen, your sofa. All platforms carry our full menu — no
            compromise on quality or portion.
          </motion.p>
        </div>

        {/* ── Platform rows ──────────────────────────────────────────── */}
        <div className="mt-14 divide-y divide-border/30 border-y border-border/30">
          {PLATFORMS.map((p, i) => (
            <motion.a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group relative flex items-center justify-between gap-6 py-6 sm:py-8"
            >
              {/* Hover fill bar */}
              <motion.span
                className="pointer-events-none absolute inset-0 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ background: `${p.accent}08` }}
                aria-hidden
              />

              {/* Left: number + name */}
              <div className="relative z-10 flex items-center gap-6 sm:gap-10">
                <span className="hidden w-10 shrink-0 font-heading text-[0.7rem] tracking-[0.2em] text-muted-foreground/40 sm:block">
                  {p.number}
                </span>

                {/* Large platform name */}
                <span
                  className={cn(
                    "font-heading text-[clamp(1.6rem,4vw,3rem)] leading-none tracking-[-0.02em] transition-colors duration-300",
                    "text-foreground group-hover:text-[var(--accent)]"
                  )}
                  style={{ "--accent": p.accent } as React.CSSProperties}
                >
                  {p.name}
                </span>

                {/* Tagline — appears on hover */}
                <span className="hidden text-sm text-muted-foreground transition-opacity duration-300 group-hover:opacity-100 sm:block sm:opacity-0">
                  {p.tagline}
                </span>
              </div>

              {/* Right: note + arrow */}
              <div className="relative z-10 flex shrink-0 items-center gap-4">
                <span
                  className="hidden rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.14em] transition-colors duration-300 sm:block"
                  style={{ borderColor: `${p.accent}40`, color: p.accent }}
                >
                  {p.note}
                </span>

                {/* Arrow that slides in on hover */}
                <motion.span
                  className="flex size-9 items-center justify-center border border-border/40 transition-colors duration-300 group-hover:border-foreground/30"
                  whileHover={{ rotate: -45 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  >
                    <path d="M3 13 L13 3 M13 3 H7 M13 3 V9" />
                  </svg>
                </motion.span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* ── Footer note ────────────────────────────────────────────── */}
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-6 text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/50"
        >
          Demo links — connect your real merchant accounts for production.
        </motion.p>

      </div>
    </section>
  );
}
