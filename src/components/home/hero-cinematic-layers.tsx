"use client";

import {
  motion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useState } from "react";

import { cn } from "@/lib/utils";

const HERO_POSTER =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80";

/**
 * Optional muted loop video + scroll-scrub ink wash over the static hero plate.
 * Set `NEXT_PUBLIC_HERO_VIDEO_URL` (e.g. `/hero-loop.mp4` in `public/` or a CDN URL).
 * Budget and behaviour are documented in README.md and DESIGN_PALETTE.md.
 */
export function HeroCinematicLayers({
  scrollYProgress,
  reduceMotion,
  bgY,
  imageScale,
}: {
  scrollYProgress: MotionValue<number>;
  reduceMotion: boolean | null;
  bgY: MotionValue<number>;
  imageScale: MotionValue<number>;
}) {
  const videoUrl = process.env.NEXT_PUBLIC_HERO_VIDEO_URL?.trim() ?? "";
  const [videoFailed, setVideoFailed] = useState(false);
  const disableMotion = reduceMotion === true;
  const useVideo =
    Boolean(videoUrl) && !disableMotion && !videoFailed;

  const scrollScrubWash = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    disableMotion ? [0, 0, 0] : [0, 0.14, 0.4]
  );

  return (
    <>
      <motion.div
        style={{ y: bgY, scale: imageScale }}
        className="absolute inset-0 z-0 will-change-transform"
        aria-hidden
      >
        {useVideo ? (
          <video
            className="absolute inset-0 h-full w-full object-cover opacity-[0.38] mix-blend-soft-light"
            src={videoUrl}
            poster={HERO_POSTER}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
        ) : null}
        <div
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
            useVideo ? "opacity-[0.18]" : "opacity-[0.26]"
          )}
          style={{ backgroundImage: `url('${HERO_POSTER}')` }}
        />
      </motion.div>

      {/* Scroll-scrubbed “curtain” — spectacle without extra assets */}
      <motion.div
        style={{ opacity: scrollScrubWash }}
        className="pointer-events-none absolute inset-0 z-[1] bg-background"
        aria-hidden
      />
    </>
  );
}
