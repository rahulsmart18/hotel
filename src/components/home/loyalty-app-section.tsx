"use client";

import { motion, useReducedMotion } from "framer-motion";
import { GiftIcon, QrCodeIcon, SparklesIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { EASE_LUXURY, fadeUpItemShort, staggerContainer } from "@/lib/motion";
import { LOYALTY_APP } from "@/lib/site";
import { cn } from "@/lib/utils";

const rewardIcons = [SparklesIcon, StarIcon, GiftIcon] as const;

function qrCodeSrc() {
  const data = encodeURIComponent(LOYALTY_APP.qrTargetUrl);
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=8&bgcolor=faf7f2&color=2d2d2d&data=${data}`;
}

/**
 * Loyalty / app download band — glass cards, QR (next/image), rewards grid.
 */
export function LoyaltyAppSection() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden border-y border-border/60 bg-gradient-to-b from-muted/40 via-background to-muted/30 py-20 sm:py-28"
      aria-labelledby="loyalty-heading"
    >
      <div
        className="section-gradient-promo pointer-events-none absolute inset-0 z-0 mix-blend-multiply dark:mix-blend-soft-light"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_60%_at_100%_0%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent_55%),radial-gradient(ellipse_70%_50%_at_0%_100%,color-mix(in_oklch,var(--jade)_10%,transparent),transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.06, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-12%" }}
          className="grid gap-12 lg:grid-cols-[1.1fr_minmax(0,0.9fr)] lg:items-center"
        >
          <div className="space-y-6">
            <motion.p
              variants={fadeUpItemShort}
              className="text-xs font-bold uppercase tracking-[0.35em] text-primary"
            >
              Aurelio app
            </motion.p>
            <motion.h2
              id="loyalty-heading"
              variants={fadeUpItemShort}
              className="font-sans text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.05] tracking-tight text-foreground"
            >
              {LOYALTY_APP.headline}
            </motion.h2>
            <motion.p
              variants={fadeUpItemShort}
              className="max-w-lg text-base leading-relaxed text-muted-foreground"
            >
              {LOYALTY_APP.subtitle}
            </motion.p>
            <motion.div
              variants={fadeUpItemShort}
              className="flex flex-wrap gap-3"
            >
              <Link
                href={LOYALTY_APP.storeIosUrl}
                className={cn(
                  buttonVariants({ variant: "gradient", size: "lg" }),
                  "h-11 px-6 font-semibold"
                )}
              >
                App Store
              </Link>
              <Link
                href={LOYALTY_APP.storeAndroidUrl}
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 border-primary/25 px-6 font-semibold hover:border-primary/45"
                )}
              >
                Google Play
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.65, ease: EASE_LUXURY }}
            className="surface-glass-card flex flex-col items-center gap-5 rounded-3xl border border-border/70 bg-card/50 p-8 text-center shadow-[0_28px_80px_-40px_color-mix(in_oklch,var(--foreground),transparent_88%)] backdrop-blur-xl dark:shadow-[0_28px_80px_-40px_rgba(0,0,0,0.5)] sm:flex-row sm:text-left"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-background p-2 shadow-inner">
              <Image
                src={qrCodeSrc()}
                alt="QR code to download the Aurelio loyalty app (demo link)"
                width={200}
                height={200}
                className="rounded-lg"
                sizes="200px"
                loading="lazy"
                unoptimized
              />
              <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-primary/10" aria-hidden />
            </div>
            <div className="space-y-2">
              <p className="flex items-center justify-center gap-2 font-sans text-sm font-bold uppercase tracking-[0.2em] text-foreground sm:justify-start">
                <QrCodeIcon className="size-4 text-primary" aria-hidden />
                Scan to download
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Opens the demo app landing URL. Replace with your real store links
                and dynamic QR in production.
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-8%" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: reduce ? 0 : 0.08 },
            },
          }}
          className="mt-16 grid gap-5 sm:grid-cols-3"
        >
          {LOYALTY_APP.rewards.map((reward, i) => {
            const Icon = rewardIcons[i % rewardIcons.length];
            return (
              <motion.li
                key={reward.id}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: EASE_LUXURY },
                  },
                }}
                className="group surface-glass-card rounded-2xl border border-border/60 bg-card/35 p-6 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 hover:border-primary/25"
              >
                <div className="flex size-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-gold/20 text-primary">
                  <Icon className="size-5" aria-hidden />
                </div>
                <h3 className="mt-4 font-sans text-lg font-bold tracking-tight text-foreground">
                  {reward.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reward.description}
                </p>
              </motion.li>
            );
          })}
        </motion.ul>

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Member count is illustrative for portfolio — connect analytics when live.
        </p>
      </div>
    </section>
  );
}
