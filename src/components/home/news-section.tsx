"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { NEWS_ITEMS } from "@/lib/site";

export function NewsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative border-b border-border/45 py-16 sm:py-20"
      aria-labelledby="news-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0, 0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <div className="flex items-end justify-between gap-4">
            <div>
              <motion.p
                variants={fadeUpItemShort}
                className="section-badge mb-1"
              >
                From the kitchen
              </motion.p>
              <motion.h2
                id="news-heading"
                variants={fadeUpItemShort}
                className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)] tracking-tight"
              >
                Latest news
              </motion.h2>
            </div>
            <motion.div variants={fadeUpItemShort} className="shrink-0">
              <Link
                href="#"
                className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
              >
                All updates &rarr;
              </Link>
            </motion.div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {NEWS_ITEMS.map((item, i) => (
              <motion.article
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{
                  duration: 0.52,
                  delay: reduce ? 0 : i * 0.08,
                  ease: EASE_LUXURY,
                }}
                className="group flex flex-col gap-3 border-t border-border/60 pt-5"
              >
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  {item.date}
                </p>
                <h3 className="text-lg leading-snug tracking-tight transition-colors group-hover:text-gold">
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.excerpt}
                </p>
                <Link
                  href={item.href}
                  className="mt-1 self-start text-xs font-semibold text-gold underline-offset-4 hover:underline"
                  aria-label={`Read more: ${item.title}`}
                >
                  Read more &rarr;
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
