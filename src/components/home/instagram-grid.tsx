"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { SITE } from "@/lib/site";

const shots = [
  {
    src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=600&q=80",
    alt: "Plating detail",
  },
  {
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80",
    alt: "Dessert course",
  },
  {
    src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    alt: "Grill station",
  },
  {
    src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&q=80",
    alt: "Seafood course",
  },
  {
    src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80",
    alt: "Interior vignette",
  },
  {
    src: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&q=80",
    alt: "Lobster bisque",
  },
];

export function InstagramGrid() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28"
      aria-labelledby="instagram-heading"
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"
        >
          <div>
            <motion.p
              variants={fadeUpItemShort}
              className="text-[0.65rem] font-medium uppercase tracking-[0.45em] text-gold"
            >
              @aurelio.studio
            </motion.p>
            <motion.h2
              id="instagram-heading"
              variants={fadeUpItemShort}
              className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] tracking-[-0.02em]"
            >
              Moments from the pass
            </motion.h2>
            <motion.p
              variants={fadeUpItemShort}
              className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              Follow along for seasonal menus, wine nights, and behind-the-scenes
              craft — placeholder grid for portfolio presentation.
            </motion.p>
          </div>
          <motion.a
            variants={fadeUpItemShort}
            href={SITE.social.instagram}
            className="group relative self-start text-sm font-medium text-gold sm:self-auto"
            rel="noreferrer"
            target="_blank"
          >
            <span className="relative z-10">View on Instagram</span>
            <span
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
              aria-hidden
            />
          </motion.a>
        </motion.div>

        <div className="mt-14 grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:gap-3.5">
          {shots.map((s, i) => (
            <motion.div
              key={s.src}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{
                duration: 0.55,
                delay: reduce ? 0 : i * 0.06,
                ease: EASE_LUXURY,
              }}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              className="group relative aspect-square overflow-hidden rounded-xl border border-border/50 ring-1 ring-border/30 dark:ring-white/[0.04]"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-110"
                sizes="(max-width:640px) 50vw, 33vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-background/0 transition-colors duration-500 group-hover:bg-background/35" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="flex size-11 items-center justify-center rounded-full border border-border/50 bg-card/60 text-lg text-primary backdrop-blur-sm dark:border-white/25 dark:bg-background/40 dark:text-gold">
                  +
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
