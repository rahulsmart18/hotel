"use client";

import { AnimatePresence, motion } from "framer-motion";
import { MenuIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { HighlightUnderline } from "@/components/brand/highlights-svg";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";
  const isInnerPage = !isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const showSolidBar = scrolled || isInnerPage;

  return (
    <header
      className={cn(
        "sticky top-0 z-[60] transition-all duration-300",
        showSolidBar
          ? "border-b border-border/50 bg-background shadow-[0_8px_32px_-12px_rgba(0,0,0,0.55)]"
          : "border-b border-transparent bg-transparent"
      )}
      style={{ height: "var(--site-header-height)" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[70] focus:rounded focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to main content
      </a>

      {/* Grid layout prevents nav overlap with brand / CTA */}
      <div className="mx-auto grid h-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 sm:px-8 lg:px-12">

        {/* Brand */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="font-heading text-base tracking-[0.18em] text-foreground sm:text-lg"
          aria-label={`${SITE.name} home`}
        >
          {SITE.name}
        </Link>

        {/* Desktop nav — centred column, never overlaps siblings */}
        <nav
          className="hidden items-center gap-0.5 lg:flex"
          aria-label="Primary navigation"
        >
          {NAV_LINKS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative whitespace-nowrap px-2.5 py-2 text-[0.68rem] uppercase tracking-[0.12em] transition-colors duration-200 xl:px-3.5 xl:text-[0.72rem] xl:tracking-[0.14em]",
                  active
                    ? "text-foreground"
                    : "text-foreground/45 hover:text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-2 right-2 block xl:left-3 xl:right-3"
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                  >
                    <HighlightUnderline
                      width={item.label.length * 7}
                      color="#8fabd4"
                      delay={0}
                    />
                  </motion.span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: Reserve + hamburger */}
        <div className="flex items-center justify-end gap-3">
          <Link
            href="/reservations"
            className="hidden items-center border border-foreground/25 px-3.5 py-1.5 text-[0.68rem] uppercase tracking-[0.12em] text-foreground transition-all duration-200 hover:bg-foreground hover:text-background sm:inline-flex"
          >
            Reserve
          </Link>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-none border border-foreground/20 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <XIcon aria-hidden className="size-3.5" />
            ) : (
              <MenuIcon aria-hidden className="size-3.5" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-[var(--site-header-height)] overflow-hidden border-b border-border/40 bg-background shadow-lg lg:hidden"
          >
            <nav
              className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-8"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map((item) => {
                const active =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "border-b border-border/20 py-3.5 text-sm uppercase tracking-[0.14em] transition-colors",
                      active ? "text-foreground" : "text-foreground/50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href="/reservations"
                onClick={() => setMobileOpen(false)}
                className="mt-4 block border border-foreground/25 py-3 text-center text-xs uppercase tracking-[0.14em]"
              >
                Reserve a table
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
