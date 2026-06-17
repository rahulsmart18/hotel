"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SparklesIcon, XIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { EASE_LUXURY } from "@/lib/motion";

import { FoodConciergePanel } from "./food-concierge-panel";

export function FoodConciergeLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.button
            key="concierge-backdrop"
            type="button"
            aria-label="Close concierge overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_LUXURY }}
            className="fixed inset-0 z-[88] cursor-default bg-black/55 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />
        ) : null}
      </AnimatePresence>

      <div className="pointer-events-none fixed bottom-5 right-5 z-[95] flex w-[min(100vw-1.25rem,26.5rem)] max-w-[calc(100vw-1.25rem)] flex-col items-stretch gap-3 sm:bottom-8 sm:right-8">
        <div className="pointer-events-auto flex min-h-0 justify-end">
          <AnimatePresence mode="wait">
            {open ? (
              <FoodConciergePanel key="concierge-panel" onClose={() => setOpen(false)} />
            ) : null}
          </AnimatePresence>
        </div>
        <div className="pointer-events-auto flex justify-end">
          <Button
            type="button"
            size="icon-lg"
            className="relative size-14 overflow-hidden rounded-full border border-gold/45 bg-primary text-primary-foreground shadow-[0_12px_40px_-8px_rgba(0,0,0,0.45)] ring-2 ring-background/80 transition-shadow before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/0 before:via-white/25 before:to-white/0 before:opacity-0 before:transition-opacity hover:bg-primary/92 hover:before:opacity-100 hover:shadow-[0_16px_48px_-10px_color-mix(in_oklch,var(--gold)_35%,transparent)] active:scale-[0.96]"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="food-concierge-panel"
            aria-label={open ? "Close AI Food Concierge" : "Open AI Food Concierge"}
          >
            {open ? (
              <XIcon className="size-6" aria-hidden />
            ) : (
              <SparklesIcon className="size-6" aria-hidden />
            )}
          </Button>
        </div>
      </div>
    </>
  );
}
