"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}
function fmt(d: Date) {
  const yy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}
function parseIso(s: string): Date | null {
  if (!s) return null;
  const d = new Date(s + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

interface Props {
  value: string;              // ISO yyyy-mm-dd
  onChange: (v: string) => void;
  error?: string;
  label?: string;
  id?: string;
  minDate?: Date;
}

export function AnimatedDatePicker({
  value,
  onChange,
  error,
  label = "Date",
  id: idProp,
  minDate,
}: Props) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const reduce = useReducedMotion();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const min = minDate ?? today;

  const selected = parseIso(value);
  const [open, setOpen] = useState(false);

  const initYear = selected?.getFullYear() ?? today.getFullYear();
  const initMonth = selected?.getMonth() ?? today.getMonth();
  const [viewYear, setViewYear] = useState(initYear);
  const [viewMonth, setViewMonth] = useState(initMonth);
  const [dir, setDir] = useState<1 | -1>(1);

  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  function prevMonth() {
    setDir(-1);
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    setDir(1);
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const totalDays = daysInMonth(viewYear, viewMonth);
  const firstDay = firstDayOfMonth(viewYear, viewMonth);

  const monthLabel = new Date(viewYear, viewMonth, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function selectDay(day: number) {
    const d = new Date(viewYear, viewMonth, day);
    if (d < min) return;
    onChange(fmt(d));
    setOpen(false);
  }

  function isSelected(day: number) {
    if (!selected) return false;
    return (
      selected.getFullYear() === viewYear &&
      selected.getMonth() === viewMonth &&
      selected.getDate() === day
    );
  }

  function isDisabled(day: number) {
    return new Date(viewYear, viewMonth, day) < min;
  }

  const displayValue = selected
    ? selected.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
    : "Pick a date";

  return (
    <div className="relative space-y-2" ref={panelRef}>
      {label && (
        <label
          htmlFor={id}
          className="block text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground"
        >
          {label}
        </label>
      )}

      {/* Trigger button */}
      <button
        id={id}
        type="button"
        data-cursor="hover"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="dialog"
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full items-center justify-between border bg-background px-3.5 text-left text-sm transition-colors",
          open
            ? "border-foreground/50"
            : "border-border/60 hover:border-foreground/25",
          error && "border-destructive"
        )}
      >
        <span className={cn(!selected && "text-muted-foreground")}>
          {displayValue}
        </span>
        <svg
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {error && (
        <p className="text-xs text-destructive" role="alert">{error}</p>
      )}

      {/* Calendar panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Date picker"
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 right-0 z-50 mt-1 overflow-hidden border border-border/60 bg-background shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)]"
          >
            {/* Month nav */}
            <div className="flex items-center justify-between border-b border-border/30 px-3 py-2.5">
              <button
                type="button"
                onClick={prevMonth}
                className="flex size-7 items-center justify-center border border-border/40 transition-colors hover:border-foreground/30"
                aria-label="Previous month"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={`${viewYear}-${viewMonth}`}
                  initial={reduce ? false : { opacity: 0, x: dir * 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: dir * -20 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="text-[0.7rem] uppercase tracking-[0.14em]"
                >
                  {monthLabel}
                </motion.p>
              </AnimatePresence>
              <button
                type="button"
                onClick={nextMonth}
                className="flex size-7 items-center justify-center border border-border/40 transition-colors hover:border-foreground/30"
                aria-label="Next month"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>

            {/* Day-of-week headers */}
            <div className="grid grid-cols-7 border-b border-border/20 px-2 pt-2">
              {DAYS.map((d) => (
                <span
                  key={d}
                  className="py-1 text-center text-[0.6rem] uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {d}
                </span>
              ))}
            </div>

            {/* Day grid */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${viewYear}-${viewMonth}-grid`}
                initial={reduce ? false : { opacity: 0, x: dir * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -24 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="grid grid-cols-7 gap-0.5 p-2"
              >
                {/* Empty cells before first day */}
                {Array.from({ length: firstDay }).map((_, i) => (
                  <span key={`empty-${i}`} />
                ))}

                {/* Day cells */}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const sel = isSelected(day);
                  const dis = isDisabled(day);
                  return (
                    <motion.button
                      key={day}
                      type="button"
                      disabled={dis}
                      onClick={() => selectDay(day)}
                      initial={reduce ? false : { opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.22,
                        delay: reduce ? 0 : i * 0.012,
                        ease: "easeOut",
                      }}
                      whileHover={dis ? undefined : { scale: 1.12 }}
                      whileTap={dis ? undefined : { scale: 0.92 }}
                      className={cn(
                        "relative flex aspect-square items-center justify-center text-[0.72rem] transition-colors",
                        sel
                          ? "bg-foreground text-background"
                          : dis
                          ? "cursor-not-allowed opacity-25"
                          : "hover:bg-muted"
                      )}
                    >
                      {day}
                      {/* Today dot */}
                      {new Date(viewYear, viewMonth, day).toDateString() ===
                        today.toDateString() &&
                        !sel && (
                          <span className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-[#4A70A9]" />
                        )}
                    </motion.button>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
