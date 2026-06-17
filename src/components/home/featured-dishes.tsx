"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { MENU_ITEMS } from "@/lib/menu-data";
import {
  EASE_LUXURY,
  fadeUpItemShort,
  staggerContainer,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const featured = MENU_ITEMS.filter((i) => i.dietary.includes("chef-special")).slice(
  0,
  3
);

/**
 * Light editorial “chapter” (paper + ink) + dark signature cards —
 * Palette A neo-organic contrast strip.
 */
export function FeaturedDishes() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-[color:var(--chapter-border)] bg-[color:var(--chapter-paper)] py-24 text-[color:var(--chapter-ink)] sm:py-32"
      aria-labelledby="featured-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -60deg,
            color-mix(in oklch, var(--spice), transparent 96%) 0 1px,
            transparent 1px 22px
          )`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-1/4 top-1/2 h-[min(80vw,28rem)] w-[min(80vw,28rem)] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--gold)_18%,transparent),transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-1/4 top-1/3 h-[min(55vw,22rem)] w-[min(55vw,22rem)] rounded-full bg-[radial-gradient(circle,color-mix(in_oklch,var(--glow)_12%,transparent),transparent_72%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <motion.p
              variants={fadeUpItemShort}
              className="text-[0.65rem] font-medium uppercase tracking-[0.45em] text-spice"
            >
              Featured
            </motion.p>
            <motion.h2
              id="featured-heading"
              variants={fadeUpItemShort}
              className="mt-4 max-w-[18ch] text-[clamp(2.75rem,8vw,5.25rem)] leading-[0.98] tracking-[-0.04em]"
            >
              Signatures
              <span className="mt-1 block text-[color:var(--chapter-muted)]">
                in season
              </span>
            </motion.h2>
          </div>
          <motion.div variants={fadeUpItemShort}>
            <Link
              href="/menu"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "group relative h-11 text-spice hover:bg-transparent hover:text-[color:var(--chapter-ink)]"
              )}
            >
              <span className="relative text-sm font-medium uppercase tracking-[0.2em]">
                Full menu
                <span className="ml-1 inline-block text-jade transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
              <span
                className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-spice via-jade to-glow transition-all duration-500 ease-out group-hover:w-full"
                aria-hidden
              />
            </Link>
          </motion.div>
        </motion.div>

        <div className="mt-16 grid gap-7 md:grid-cols-3 md:gap-8">
          {featured.map((dish, index) => (
            <motion.article
              key={dish.id}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8%" }}
              transition={{
                duration: 0.65,
                delay: reduce ? 0 : index * 0.1,
                ease: EASE_LUXURY,
              }}
              whileHover={
                reduce
                  ? undefined
                  : { y: -10, transition: { duration: 0.45, ease: EASE_LUXURY } }
              }
              className="group relative overflow-hidden rounded-2xl border border-white/12 bg-[color:var(--chapter-card)] text-[color:color-mix(in_srgb,var(--jasmine),transparent_8%)] shadow-[0_32px_80px_-40px_rgba(0,0,0,0.5)] ring-1 ring-glow/15 transition-[box-shadow,border-color] duration-500 hover:border-glow/35 hover:shadow-[0_44px_100px_-36px_color-mix(in_oklch,var(--glow),transparent_42%)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={dish.imageSrc}
                  alt={dish.imageAlt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-[transform,filter] duration-[900ms] ease-out group-hover:scale-[1.06] group-hover:brightness-[1.05]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-95 transition-opacity duration-500 group-hover:opacity-80" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center bg-gradient-to-t from-black to-transparent py-8 opacity-0 transition-[transform,opacity] duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-glow">
                    View on menu
                  </span>
                </div>
              </div>
              <div className="relative space-y-2 px-6 pb-8 pt-5">
                <div
                  className="absolute left-6 top-0 h-px w-8 -translate-y-1/2 bg-gradient-to-r from-gold via-glow to-transparent opacity-90"
                  aria-hidden
                />
                <h3 className="text-2xl tracking-tight transition-colors duration-300 group-hover:text-gold">
                  {dish.name}
                </h3>
                {dish.story ? (
                  <p className="text-sm italic leading-relaxed text-[color:color-mix(in_srgb,var(--spice),#000_25%)]">
                    {dish.story}
                  </p>
                ) : null}
                <p className="text-sm leading-relaxed text-[color:color-mix(in_srgb,var(--jasmine),#000_38%)]">
                  {dish.description}
                </p>
                <p className="pt-1 font-medium tabular-nums text-gold">
                  ₹{dish.priceInr.toLocaleString("en-IN")}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
