"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Grid2X2Icon,
  ListIcon,
  SlidersHorizontal,
  Sparkles,
  XIcon,
} from "lucide-react";

import { HighlightUnderline } from "@/components/brand/highlights-svg";
import { GoldLineMark } from "@/components/brand/gold-line-mark";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BRAND_RITUAL } from "@/lib/brand-ritual";
import {
  DIETARY_LABELS,
  MENU_CATEGORY_LABELS,
  MENU_ITEMS,
} from "@/lib/menu-data";
import {
  filterMenuItems,
  getCategoryCounts,
  MENU_SORT_LABELS,
  type MenuCategoryFilter,
  type MenuSortId,
  sortMenuItems,
} from "@/lib/menu-queries";
import { EASE_LUXURY } from "@/lib/motion";
import type { DietaryTag, MenuCategoryId, MenuItem } from "@/types";
import { cn } from "@/lib/utils";

const ALL: MenuCategoryFilter = "all";

const CATEGORY_ORDER: MenuCategoryFilter[] = [
  ALL,
  "starters",
  "main-course",
  "seafood",
  "desserts",
  "beverages",
];

const QUICK_DIETARY: DietaryTag[] = [
  "vegetarian",
  "vegan",
  "gluten-free",
  "chef-special",
];

type ViewMode = "grid" | "list";

export function MenuBrowser() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<MenuCategoryFilter>(ALL);
  const [query, setQuery] = useState("");
  const [dietary, setDietary] = useState<DietaryTag[]>([]);
  const [sort, setSort] = useState<MenuSortId>("menu-order");
  const [active, setActive] = useState<MenuItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [filterCompact, setFilterCompact] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const [revealItem, setRevealItem] = useState<MenuItem | null>(null);
  const [revealVisible, setRevealVisible] = useState(false);
  const revealX = useMotionValue(0);
  const revealY = useMotionValue(0);
  const revealXSpring = useSpring(revealX, { stiffness: 280, damping: 28 });
  const revealYSpring = useSpring(revealY, { stiffness: 280, damping: 28 });
  const filterRef = useRef<HTMLDivElement>(null);

  const counts = useMemo(() => getCategoryCounts(), []);

  const filtered = useMemo(() => {
    const base = filterMenuItems(MENU_ITEMS, {
      category,
      query,
      dietaryRequired: dietary,
    });
    return sortMenuItems(base, sort);
  }, [category, query, dietary, sort]);

  const hasActiveFilters =
    category !== ALL ||
    query.trim() !== "" ||
    dietary.length > 0 ||
    sort !== "menu-order";

  useEffect(() => {
    const onScroll = () => {
      if (!filterRef.current) return;
      const top = filterRef.current.getBoundingClientRect().top;
      setFilterCompact(top <= parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--site-header-height") || "64") + 2);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toggleDietary(tag: DietaryTag) {
    setDietary((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  function resetFilters() {
    setCategory(ALL);
    setQuery("");
    setDietary([]);
    setSort("menu-order");
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    revealX.set(e.clientX);
    revealY.set(e.clientY);
  };

  return (
    <div
      className="section-gradient-menu relative min-h-[70vh]"
      onMouseMove={handleMouseMove}
    >
      {/* Cursor-following image preview (list view) */}
      {!reduce && viewMode === "list" && (
        <motion.div
          className="pointer-events-none fixed z-40 hidden overflow-hidden rounded-xl border border-border/40 shadow-2xl lg:block"
          style={{
            x: revealXSpring,
            y: revealYSpring,
            translateX: "-50%",
            translateY: "-115%",
            width: 240,
            height: 170,
          }}
          animate={{
            opacity: revealVisible && revealItem ? 1 : 0,
            scale: revealVisible && revealItem ? 1 : 0.9,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {revealItem && (
            <Image
              src={revealItem.imageSrc}
              alt={revealItem.imageAlt}
              fill
              sizes="240px"
              className="object-cover"
            />
          )}
        </motion.div>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(74,112,169,0.14),transparent_65%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-28 pt-10 sm:px-8 lg:px-12">
        {/* ── Hero ─────────────────────────────────────────────────── */}
        <header className="max-w-3xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE_LUXURY }}
          >
            <p className="flex items-center gap-2 text-[0.62rem] uppercase tracking-[0.28em] text-muted-foreground">
              <Sparkles className="size-3 text-gold/80" aria-hidden />
              Aurelio menu
            </p>
            <h1 className="relative mt-4 inline-block font-heading text-[clamp(2rem,5.5vw,4.2rem)] leading-[1.02] tracking-[-0.02em]">
              A tasting atlas
              {!reduce && (
                <span className="absolute -bottom-1 left-0">
                  <HighlightUnderline width={280} color="#4A70A9" delay={0.4} />
                </span>
              )}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Move through the menu the way we would on the floor — by course,
              by diet, by mood. Open any plate for the full story.
            </p>
            <p className="mt-4 flex max-w-xl items-center gap-3 text-[0.68rem] text-muted-foreground">
              <GoldLineMark className="h-3 w-10 text-gold/80" />
              <span>
                <span className="text-foreground/90">{BRAND_RITUAL.shortLabel}</span>
                <span aria-hidden> — </span>
                {BRAND_RITUAL.hook}
              </span>
            </p>
          </motion.div>
        </header>

        {/* ── Sticky filter deck ───────────────────────────────────── */}
        <div
          ref={filterRef}
          className={cn(
            "sticky z-20 -mx-5 mt-10 border-y border-border/40 bg-background/95 backdrop-blur-xl transition-all duration-300 sm:-mx-8 lg:-mx-12",
            filterCompact ? "shadow-[0_12px_40px_-16px_rgba(0,0,0,0.5)]" : ""
          )}
          style={{ top: "var(--site-header-height)" }}
        >
          <div className="px-5 py-3 sm:px-8 lg:px-12">
            {/* Top row: categories + view toggle */}
            <div className="flex items-center justify-between gap-4">
              <div className="relative min-w-0 flex-1 overflow-hidden">
                <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-5 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-5 bg-gradient-to-l from-background to-transparent" />
                <div
                  className="flex gap-1.5 overflow-x-auto scrollbar-hide"
                  role="tablist"
                  aria-label="Menu categories"
                >
                  {CATEGORY_ORDER.map((cat) => {
                    const label =
                      cat === ALL ? "All" : MENU_CATEGORY_LABELS[cat as MenuCategoryId];
                    const count = counts[cat];
                    const selected = category === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        role="tab"
                        aria-selected={selected}
                        onClick={() => setCategory(cat)}
                        className={cn(
                          "relative shrink-0 border px-3.5 py-1.5 text-[0.65rem] uppercase tracking-[0.1em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                        )}
                      >
                        {label}
                        <span className={cn("ml-1.5 tabular-nums opacity-50", selected && "text-background/70")}>
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setFiltersOpen((v) => !v)}
                  className={cn(
                    "flex items-center gap-1.5 border px-2.5 py-1.5 text-[0.62rem] uppercase tracking-[0.1em] transition-colors lg:hidden",
                    filtersOpen || hasActiveFilters
                      ? "border-foreground/40 text-foreground"
                      : "border-border/50 text-muted-foreground"
                  )}
                  aria-expanded={filtersOpen}
                >
                  <SlidersHorizontal className="size-3" />
                  Filters
                </button>
                <div className="hidden items-center border border-border/40 sm:flex">
                  <button
                    type="button"
                    onClick={() => setViewMode("list")}
                    aria-pressed={viewMode === "list"}
                    className={cn(
                      "px-2.5 py-1.5 transition-colors",
                      viewMode === "list" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="List view"
                  >
                    <ListIcon className="size-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode("grid")}
                    aria-pressed={viewMode === "grid"}
                    className={cn(
                      "px-2.5 py-1.5 transition-colors",
                      viewMode === "grid" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid2X2Icon className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable filters */}
            <AnimatePresence initial={false}>
              {(filtersOpen || !filterCompact) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className={cn("grid gap-5 pt-4 lg:grid-cols-[1fr_auto] lg:items-end", filterCompact ? "hidden lg:grid" : "")}>
                    <div className="space-y-3">
                      <p className="text-[0.62rem] uppercase tracking-[0.2em] text-muted-foreground">
                        Dietary (match all)
                      </p>
                      <div className="flex flex-wrap gap-1.5" role="group" aria-label="Dietary filters">
                        {QUICK_DIETARY.map((tag) => {
                          const on = dietary.includes(tag);
                          return (
                            <button
                              key={tag}
                              type="button"
                              aria-pressed={on}
                              onClick={() => toggleDietary(tag)}
                              className={cn(
                                "border px-3 py-1 text-[0.62rem] uppercase tracking-[0.1em] transition-colors duration-200",
                                on
                                  ? "border-gold/50 bg-gold/10 text-gold"
                                  : "border-border/50 text-muted-foreground hover:border-gold/30 hover:text-foreground"
                              )}
                            >
                              {DIETARY_LABELS[tag]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:gap-3 xl:flex-row">
                      <div className="relative min-w-[180px] flex-1">
                        <Input
                          id="menu-search"
                          type="search"
                          placeholder="Search dishes…"
                          value={query}
                          onChange={(e) => setQuery(e.target.value)}
                          className="h-9 border-border/50 bg-card/30 pr-8 text-sm"
                          autoComplete="off"
                        />
                        {query && (
                          <button
                            type="button"
                            aria-label="Clear search"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            onClick={() => setQuery("")}
                          >
                            <XIcon className="size-3.5" />
                          </button>
                        )}
                      </div>
                      <Select value={sort} onValueChange={(v) => setSort(v as MenuSortId)}>
                        <SelectTrigger className="h-9 w-full min-w-[140px] border-border/50 bg-card/30 sm:w-44">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {(Object.keys(MENU_SORT_LABELS) as MenuSortId[]).map((id) => (
                            <SelectItem key={id} value={id}>
                              {MENU_SORT_LABELS[id]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {hasActiveFilters && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="h-9 shrink-0 text-muted-foreground"
                          onClick={resetFilters}
                        >
                          Reset
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-2 text-[0.65rem] text-muted-foreground" aria-live="polite">
              <span className="tabular-nums text-foreground">{filtered.length}</span>{" "}
              {filtered.length === 1 ? "plate" : "plates"}
            </p>
          </div>
        </div>

        {/* ── Results ──────────────────────────────────────────────── */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-16 border border-dashed border-border/50 px-8 py-20 text-center"
            >
              <p className="text-2xl tracking-tight">Nothing matches yet</p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                Loosen dietary filters, try another course, or clear search.
              </p>
              <Button type="button" variant="outline" className="mt-6" onClick={resetFilters}>
                Reset filters
              </Button>
            </motion.div>
          ) : viewMode === "list" ? (
            <motion.ul
              key="list"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 divide-y divide-border/30 border-y border-border/30"
            >
              {filtered.map((item, index) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: reduce ? 0 : Math.min(index * 0.03, 0.18), ease: EASE_LUXURY }}
                  className="list-none"
                >
                  <button
                    type="button"
                    data-cursor="hover"
                    aria-label={`${item.name}, ${MENU_CATEGORY_LABELS[item.category]}, ₹${item.priceInr}`}
                    onClick={() => setActive(item)}
                    onMouseEnter={() => { setRevealItem(item); setRevealVisible(true); }}
                    onMouseLeave={() => setRevealVisible(false)}
                    className="group relative flex w-full items-center justify-between gap-6 py-5 text-left transition-colors duration-200 hover:bg-foreground/[0.03] sm:gap-10 sm:py-6"
                  >
                    <span
                      className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-gold/[0.04] transition-transform duration-400 group-hover:scale-x-100"
                      aria-hidden
                    />
                    <div className="relative z-10 flex min-w-0 flex-1 items-baseline gap-4 sm:gap-8">
                      <span className="hidden w-8 shrink-0 text-[0.62rem] tabular-nums tracking-[0.1em] text-muted-foreground/40 sm:block">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold/80">
                          {MENU_CATEGORY_LABELS[item.category]}
                        </p>
                        <span className="mt-0.5 block text-[clamp(1.1rem,2.5vw,1.6rem)] leading-tight tracking-[-0.01em] transition-colors duration-200 group-hover:text-gold">
                          {item.name}
                        </span>
                        <p className="mt-1 hidden line-clamp-1 text-sm text-muted-foreground sm:block">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 flex shrink-0 items-center gap-4">
                      <div className="hidden flex-wrap justify-end gap-1 sm:flex">
                        {item.dietary.slice(0, 2).map((d) => (
                          <span key={d} className="text-[0.55rem] uppercase tracking-[0.1em] text-muted-foreground/70">
                            {DIETARY_LABELS[d]}
                          </span>
                        ))}
                      </div>
                      <span className="tabular-nums text-sm text-foreground sm:text-base">
                        ₹{item.priceInr.toLocaleString("en-IN")}
                      </span>
                      <span className="flex size-7 items-center justify-center border border-border/40 opacity-0 transition-all duration-200 group-hover:opacity-100">
                        <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <path d="M3 13 L13 3 M13 3 H7 M13 3 V9" />
                        </svg>
                      </span>
                    </div>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          ) : (
            <motion.ul
              key="grid"
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {filtered.map((item, index) => (
                <motion.li
                  key={item.id}
                  layout
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: reduce ? 0 : Math.min(index * 0.04, 0.2), ease: EASE_LUXURY }}
                  className="list-none"
                >
                  <button
                    type="button"
                    data-cursor="hover"
                    aria-label={`${item.name}, ${MENU_CATEGORY_LABELS[item.category]}, ₹${item.priceInr}`}
                    onClick={() => setActive(item)}
                    className="group flex w-full flex-col overflow-hidden border border-border/40 bg-card/20 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-[0_20px_50px_-20px_rgba(74,112,169,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <div className="relative aspect-[5/4] overflow-hidden">
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 33vw"
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1">
                        {item.dietary.map((d) => (
                          <Badge key={d} variant="secondary" className="bg-background/70 text-[0.55rem] uppercase tracking-[0.1em] backdrop-blur-sm">
                            {DIETARY_LABELS[d]}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-1.5 p-5">
                      <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold/80">
                        {MENU_CATEGORY_LABELS[item.category]}
                      </p>
                      <span className="text-lg tracking-tight group-hover:text-gold">{item.name}</span>
                      <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>
                      <p className="mt-auto pt-2 tabular-nums text-foreground">
                        ₹{item.priceInr.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* ── Detail dialog ──────────────────────────────────────────── */}
      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-lg gap-0 overflow-hidden border-border/50 bg-popover p-0 sm:max-w-lg">
          {active && (
            <>
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={active.imageSrc}
                  alt={active.imageAlt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width:640px) 100vw, 32rem"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-popover via-transparent to-transparent" />
              </div>
              <div className="space-y-4 p-6">
                <DialogHeader className="space-y-2 text-left">
                  <p className="text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                    {MENU_CATEGORY_LABELS[active.category]}
                  </p>
                  <DialogTitle className="text-2xl leading-tight">{active.name}</DialogTitle>
                  <DialogDescription className="text-sm leading-relaxed">
                    {active.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-wrap gap-1.5">
                  {active.dietary.map((d) => (
                    <Badge key={d} variant="outline" className="border-gold/25 text-[0.62rem] uppercase tracking-[0.1em]">
                      {DIETARY_LABELS[d]}
                    </Badge>
                  ))}
                </div>
                <p className="border-t border-border/40 pt-4 text-xl tabular-nums text-gold">
                  ₹{active.priceInr.toLocaleString("en-IN")}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
