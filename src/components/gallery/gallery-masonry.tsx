"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react";

import { HighlightUnderline } from "@/components/brand/highlights-svg";
import { Button } from "@/components/ui/button";
import {
  GALLERY_CATEGORIES,
  GALLERY_IMAGES,
  type GalleryCategory,
} from "@/lib/gallery-data";
import { EASE_LUXURY } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GalleryItem = (typeof GALLERY_IMAGES)[number];

const heightClass: Record<GalleryItem["heightClass"], string> = {
  short: "aspect-[4/3]",
  medium: "aspect-[3/4]",
  tall: "aspect-[3/5]",
};

export function GalleryMasonry() {
  const reduce = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [open, setOpen] = useState<GalleryItem | null>(null);
  const [filterCompact, setFilterCompact] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: GALLERY_IMAGES.length };
    for (const img of GALLERY_IMAGES) {
      counts[img.category] = (counts[img.category] ?? 0) + 1;
    }
    return counts;
  }, []);

  const openIndex = open ? filtered.findIndex((img) => img.id === open.id) : -1;
  const featured = GALLERY_IMAGES[0];

  const goNext = useCallback(() => {
    if (openIndex < 0) return;
    setOpen(filtered[(openIndex + 1) % filtered.length]);
  }, [openIndex, filtered]);

  const goPrev = useCallback(() => {
    if (openIndex < 0) return;
    setOpen(filtered[(openIndex - 1 + filtered.length) % filtered.length]);
  }, [openIndex, filtered]);

  useEffect(() => {
    const onScroll = () => {
      if (!filterRef.current) return;
      const top = filterRef.current.getBoundingClientRect().top;
      const headerH = parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue("--site-header-height") || "64"
      );
      setFilterCompact(top <= headerH + 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, goNext, goPrev]);

  return (
    <div className="relative min-h-screen">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_80%_55%_at_50%_-15%,rgba(74,112,169,0.12),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-10 sm:px-8 lg:px-12">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_LUXURY }}
          >
            <p className="text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              Gallery
            </p>
            <h1 className="relative mt-3 inline-block font-heading text-[clamp(2rem,5.5vw,4rem)] leading-[1.02] tracking-[-0.02em]">
              Light, plate,
              <br />
              shadow
              {!reduce && (
                <span className="absolute -bottom-1 left-0">
                  <HighlightUnderline width={220} color="#4A70A9" delay={0.4} />
                </span>
              )}
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
              A look inside the room, the kitchen, and the events that make it
              alive — {GALLERY_IMAGES.length} moments curated.
            </p>
            <div className="mt-6 flex flex-wrap gap-6 border-t border-border/30 pt-5">
              {GALLERY_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                <div key={cat.id}>
                  <p className="text-[clamp(1.4rem,3vw,2rem)] tabular-nums leading-none text-foreground">
                    {categoryCounts[cat.id] ?? 0}
                  </p>
                  <p className="mt-1 text-[0.6rem] uppercase tracking-[0.16em] text-muted-foreground">
                    {cat.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Featured spotlight */}
          <motion.button
            type="button"
            data-cursor="hover"
            initial={reduce ? false : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE_LUXURY }}
            onClick={() => setOpen(featured)}
            className="group relative aspect-[16/10] w-full overflow-hidden border border-border/40 text-left"
            aria-label={`Open featured image: ${featured.alt}`}
          >
            <Image
              src={featured.src}
              alt={featured.alt}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
              <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#8fabd4]">
                Featured · {featured.category}
              </p>
              <p className="mt-1 text-sm font-medium text-white sm:text-base">
                {featured.caption}
              </p>
            </div>
            <div className="absolute right-4 top-4 flex size-8 items-center justify-center border border-white/20 bg-black/30 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <path d="M3 13 L13 3 M13 3 H7 M13 3 V9" />
              </svg>
            </div>
          </motion.button>
        </header>

        {/* ── Sticky category filter ───────────────────────────────── */}
        <div
          ref={filterRef}
          className={cn(
            "sticky z-20 -mx-5 mt-12 border-y border-border/40 bg-background/95 backdrop-blur-xl transition-shadow duration-300 sm:-mx-8 lg:-mx-12",
            filterCompact ? "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]" : ""
          )}
          style={{ top: "var(--site-header-height)" }}
        >
          <div className="relative overflow-hidden px-5 py-3 sm:px-8 lg:px-12">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-background to-transparent" />
            <div
              className="flex gap-1.5 overflow-x-auto scrollbar-hide"
              role="group"
              aria-label="Filter gallery by category"
            >
              {GALLERY_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "relative shrink-0 border px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.12em] transition-all duration-200",
                    activeCategory === cat.id
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                  aria-pressed={activeCategory === cat.id}
                >
                  {cat.label}
                  <span className={cn("ml-1.5 tabular-nums opacity-50", activeCategory === cat.id && "text-background/70")}>
                    {categoryCounts[cat.id] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Masonry grid ─────────────────────────────────────────── */}
        <motion.div
          layout
          className="mt-8 columns-1 gap-3 sm:columns-2 sm:gap-4 lg:columns-3"
          role="list"
          aria-label="Gallery images"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((img, idx) => (
              <motion.div
                layout
                key={img.id}
                role="listitem"
                className="mb-3 break-inside-avoid sm:mb-4"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, delay: reduce ? 0 : (idx % 6) * 0.04, ease: EASE_LUXURY }}
              >
                <button
                  type="button"
                  data-cursor="hover"
                  aria-label={`Open image: ${img.alt}`}
                  onClick={() => setOpen(img)}
                  className={cn(
                    "group relative w-full overflow-hidden border border-border/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A70A9]",
                    heightClass[img.heightClass]
                  )}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                    className="object-cover transition-all duration-[850ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06] group-hover:brightness-[1.05]"
                  />

                  {/* Index number */}
                  <span className="absolute left-3 top-3 text-[0.58rem] tabular-nums tracking-[0.1em] text-white/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Vignette layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100" />

                  {/* Caption slide-up */}
                  <div className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 pt-12 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#8fabd4]">
                      {img.category}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-white">
                      {img.caption}
                    </p>
                  </div>

                  {/* Corner arrow */}
                  <div className="absolute right-3 top-3 flex size-7 items-center justify-center rounded-full border border-white/15 bg-black/25 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
                    <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                      <path d="M3 13 L13 3 M13 3 H7 M13 3 V9" />
                    </svg>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Lightbox ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={() => setOpen(null)}
          >
            <motion.div
              layout
              className="relative w-full max-w-5xl overflow-hidden border border-border/30 bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={open.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3, ease: EASE_LUXURY }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={open.src}
                      alt={open.alt}
                      fill
                      className="object-contain"
                      sizes="100vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between gap-4 border-t border-border/40 px-5 py-4">
                <div className="min-w-0">
                  <p className="text-[0.58rem] uppercase tracking-[0.2em] text-gold">
                    {open.category}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{open.caption}</p>
                </div>
                <p className="shrink-0 text-[0.65rem] tabular-nums text-muted-foreground/60">
                  {openIndex + 1} / {filtered.length}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center border border-border/40 bg-background/80 text-foreground transition hover:bg-background"
              >
                <ChevronLeftIcon className="size-5" />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                aria-label="Next image"
                className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center border border-border/40 bg-background/80 text-foreground transition hover:bg-background"
              >
                <ChevronRightIcon className="size-5" />
              </button>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-3 top-3 border border-border/40 bg-background/80 hover:bg-background"
                onClick={() => setOpen(null)}
                aria-label="Close lightbox"
              >
                <XIcon className="size-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
