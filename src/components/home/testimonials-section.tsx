"use client";

import { motion, useReducedMotion } from "framer-motion";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { TESTIMONIALS } from "@/lib/testimonials-data";

export function TestimonialsSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-border/50 bg-gradient-to-b from-background via-card/15 to-background py-24 sm:py-32"
      aria-labelledby="testimonials-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-[min(90%,48rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/25 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0, 0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
        >
          <motion.p
            variants={fadeUpItemShort}
            className="section-badge mb-1"
          >
            Voices
          </motion.p>
          <motion.h2
            id="testimonials-heading"
            variants={fadeUpItemShort}
            className="mt-4 max-w-3xl text-[clamp(1.85rem,4.5vw,3.25rem)] leading-[1.12] tracking-[-0.02em]"
          >
            What guests remember is not noise — it is care.
          </motion.h2>
        </motion.div>

        <div className="relative mt-16 px-11 sm:px-12">
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
            aria-label="Guest testimonials"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem
                  key={t.id}
                  className="pl-2 md:basis-1/2 md:pl-4 lg:basis-1/2"
                >
                  <motion.figure
                    initial={reduce ? false : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.55, ease: EASE_LUXURY }}
                    whileHover={
                      reduce
                        ? undefined
                        : {
                            y: -4,
                            transition: { duration: 0.35, ease: EASE_LUXURY },
                          }
                    }
                    className="flex h-full flex-col justify-between rounded-2xl border border-border/50 bg-gradient-to-br from-card/60 to-card/25 p-8 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.04] sm:p-10"
                  >
                    <blockquote className="relative text-xl leading-snug tracking-tight text-foreground sm:text-2xl">
                      <span
                        className="absolute -left-1 -top-2 font-serif text-5xl leading-none text-gold/25"
                        aria-hidden
                      >
                        “
                      </span>
                      <span className="relative">{t.quote}</span>
                    </blockquote>
                    <figcaption className="mt-10 border-t border-border/40 pt-6 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{t.author}</span>
                      <span className="mt-1 block text-[0.65rem] uppercase tracking-[0.28em] text-gold/90">
                        {t.role}
                      </span>
                    </figcaption>
                  </motion.figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="outline"
              className="left-0 top-1/2 z-10 size-10 -translate-y-1/2 border-border/70 sm:left-1"
            />
            <CarouselNext
              variant="outline"
              className="right-0 top-1/2 z-10 size-10 -translate-y-1/2 border-border/70 sm:right-1"
            />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
