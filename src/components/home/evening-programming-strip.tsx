"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { EVENING_PROGRAMMING } from "@/lib/site";

export function EveningProgrammingStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative border-b border-border/45 bg-gradient-to-b from-background via-card/[0.04] to-background py-14 sm:py-20"
      aria-labelledby="evening-programming-heading"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0, 0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
        >
          <motion.p
            variants={fadeUpItemShort}
            className="section-badge mb-1"
          >
            In the room this week
          </motion.p>
          <motion.h2
            id="evening-programming-heading"
            variants={fadeUpItemShort}
            className="mt-4 text-[clamp(1.75rem,4.2vw,2.75rem)] leading-[1.05] tracking-[-0.03em]"
          >
            A few reasons the room feels alive.
          </motion.h2>
          <motion.p
            variants={fadeUpItemShort}
            className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]"
          >
            Little invitations — the kind of reasons people pick a night, not
            only a reservation.
          </motion.p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {EVENING_PROGRAMMING.map((item, i) => (
              <motion.article
                key={item.id}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-6%" }}
                transition={{
                  duration: 0.55,
                  delay: reduce ? 0 : i * 0.07,
                  ease: EASE_LUXURY,
                }}
                whileHover={reduce ? undefined : { y: -4 }}
                className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 20vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute left-3 top-3 flex items-center gap-1.5">
                    <span className="rounded-full bg-gold/90 px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-[0.28em] text-black">
                      {item.strand}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-sm font-semibold leading-tight text-white drop-shadow">
                      {item.label}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-foreground">
                      {item.day}
                    </p>
                    <p className="text-[0.68rem] text-muted-foreground">
                      {item.time}
                    </p>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {item.blurb}
                  </p>
                  <Link
                    href="/reservations"
                    className="mt-3 inline-block text-[0.68rem] font-semibold text-gold underline-offset-4 hover:underline"
                  >
                    Book this night &rarr;
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
