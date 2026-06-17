"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

import { ConciergeRoot } from "@/components/food-concierge/concierge-root";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CustomCursor } from "@/components/ui/custom-cursor";

/** Full-screen colour wipe that sweeps across on every route change */
function PageWipe({ pathKey }: { pathKey: string }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`wipe-${pathKey}`}
        className="pointer-events-none fixed inset-0 z-[9990] origin-left bg-background"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        aria-hidden
      />
    </AnimatePresence>
  );
}

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  return (
    <>
      <CustomCursor />
      {!reduce && <PageWipe pathKey={pathname} />}
      <SiteHeader />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          id="main-content"
          className="flex-1"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.2, delay: 0.3, ease: "easeOut" }
          }
        >
          {children}
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
      <ConciergeRoot />
    </>
  );
}
