"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SvgProps {
  className?: string;
  color?: string;
  delay?: number;
  width?: number;
}

/** Wavy underline — highlights.design "Underlines" category */
export function HighlightUnderline({
  className,
  color = "#ff0000",
  delay = 0.3,
  width = 200,
}: SvgProps) {
  const reduce = useReducedMotion();
  const h = Math.round(width * 0.12);
  return (
    <svg
      viewBox={`0 0 ${width} ${h}`}
      width={width}
      height={h}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <motion.path
        d={`M 4 ${h * 0.55} C ${width * 0.08} ${h * 0.2}, ${width * 0.18} ${h * 0.9}, ${width * 0.28} ${h * 0.45} C ${width * 0.38} ${h * 0.1}, ${width * 0.48} ${h * 0.85}, ${width * 0.58} ${h * 0.4} C ${width * 0.68} ${h * 0.1}, ${width * 0.78} ${h * 0.88}, ${width * 0.88} ${h * 0.45} C ${width * 0.93} ${h * 0.22}, ${width * 0.97} ${h * 0.6}, ${width - 4} ${h * 0.5}`}
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Circle/loop highlight — wraps around a word */
export function HighlightCircle({
  className,
  color = "#ff0000",
  delay = 0.5,
  width = 140,
}: SvgProps) {
  const reduce = useReducedMotion();
  const h = Math.round(width * 0.5);
  return (
    <svg
      viewBox={`0 0 ${width} ${h}`}
      width={width}
      height={h}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    >
      <motion.path
        d={`M ${width * 0.5} ${h * 0.1} C ${width * 0.75} ${h * 0.06}, ${width * 0.98} ${h * 0.22}, ${width * 0.96} ${h * 0.52} C ${width * 0.94} ${h * 0.82}, ${width * 0.74} ${h * 0.96}, ${width * 0.5} ${h * 0.94} C ${width * 0.26} ${h * 0.92}, ${width * 0.04} ${h * 0.78}, ${width * 0.04} ${h * 0.5} C ${width * 0.04} ${h * 0.24}, ${width * 0.22} ${h * 0.08}, ${width * 0.44} ${h * 0.08} C ${width * 0.5} ${h * 0.07}, ${width * 0.56} ${h * 0.07}, ${width * 0.5} ${h * 0.1} Z`}
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.85 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Scribble underline — rougher, more hand-drawn look */
export function HighlightScribble({
  className,
  color = "#bbd5da",
  delay = 0.2,
  width = 180,
}: SvgProps) {
  const reduce = useReducedMotion();
  const h = 16;
  return (
    <svg
      viewBox={`0 0 ${width} ${h}`}
      width={width}
      height={h}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <motion.path
        d={`M 3 11 C 15 5, 30 14, 45 8 C 60 3, 75 13, 90 7 C 105 2, 120 12, 135 6 C 150 1, 165 11, ${width - 3} 8`}
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.75 }}
        transition={{ duration: 1.0, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={`M 3 14 C 18 10, 35 15, 50 11 C 65 7, 80 14, 95 10 C 110 6, 125 14, 140 10 C 155 6, 168 13, ${width - 3} 11`}
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.35 }}
        transition={{ duration: 1.0, delay: delay + 0.05, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Curved arrow — highlights.design "Arrows" category */
export function HighlightArrow({
  className,
  color = "#ff0000",
  delay = 0.8,
  width = 80,
  dir = "down-right",
}: SvgProps & { dir?: "down-right" | "down" | "right" | "left" | "up-right" }) {
  const reduce = useReducedMotion();

  const paths: Record<string, { body: string; head: string; vb: string }> = {
    "down-right": {
      body: "M 8 10 C 14 8, 40 5, 54 18 C 66 30, 72 46, 74 62",
      head: "M 64 57 L 74 62 L 78 52",
      vb: "0 0 88 76",
    },
    down: {
      body: "M 22 6 C 20 18, 18 36, 22 54 C 23 64, 24 72, 26 80",
      head: "M 17 73 L 26 80 L 35 73",
      vb: "0 0 48 90",
    },
    right: {
      body: "M 6 20 C 20 18, 44 14, 60 18 C 74 22, 82 24, 90 26",
      head: "M 82 18 L 90 26 L 82 34",
      vb: "0 0 100 46",
    },
    left: {
      body: "M 90 20 C 74 18, 50 14, 34 18 C 20 22, 12 24, 6 26",
      head: "M 14 18 L 6 26 L 14 34",
      vb: "0 0 100 46",
    },
    "up-right": {
      body: "M 8 68 C 16 56, 36 34, 52 22 C 62 14, 72 8, 80 6",
      head: "M 70 4 L 80 6 L 78 16",
      vb: "0 0 90 80",
    },
  };

  const { body, head, vb } = paths[dir] ?? paths["down-right"];

  return (
    <svg
      viewBox={vb}
      width={width}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none select-none", className)}
    >
      <motion.path
        d={body}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={head}
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 0.75, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Blob accent — organic background shape */
export function HighlightBlob({
  className,
  color = "#dff1f1",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 180"
      fill={color}
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <path d="M 100 10 C 140 8, 185 28, 188 70 C 192 112, 162 158, 120 168 C 78 178, 28 158, 14 118 C 0 78, 18 28, 56 14 C 68 10, 84 10, 100 10 Z" />
    </svg>
  );
}

/** Zigzag / wavy line divider — section separator */
export function HighlightZigzag({
  className,
  color = "#bbd5da",
  width = 400,
}: {
  className?: string;
  color?: string;
  width?: number;
}) {
  const reduce = useReducedMotion();
  const seg = width / 12;
  let d = `M 0 12`;
  for (let i = 0; i < 12; i++) {
    const x = (i + 1) * seg;
    const y = i % 2 === 0 ? 4 : 20;
    d += ` L ${x} ${y}`;
  }
  return (
    <svg
      viewBox={`0 0 ${width} 24`}
      width={width}
      height={24}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <motion.path
        d={d}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

/** Highlight marker — yellow/colored brush stroke behind text */
export function HighlightMarker({
  children,
  color = "rgba(255,0,0,0.12)",
  className,
}: {
  children: React.ReactNode;
  color?: string;
  className?: string;
}) {
  return (
    <span
      className={cn("relative inline-block", className)}
      style={{
        background: `linear-gradient(transparent 55%, ${color} 55%)`,
      }}
    >
      {children}
    </span>
  );
}

/** Spiral / whirl — highlights.design "Spirals" */
export function HighlightSpiral({
  className,
  color = "#bbd5da",
  size = 60,
}: {
  className?: string;
  color?: string;
  size?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      fill="none"
      aria-hidden
      className={cn("pointer-events-none", className)}
    >
      <motion.path
        d="M 30 30 C 30 22, 36 18, 40 22 C 44 26, 42 36, 36 40 C 30 44, 22 42, 18 36 C 14 30, 16 20, 22 16 C 28 12, 38 14, 44 20 C 50 26, 50 38, 44 44 C 38 50, 28 52, 20 48 C 12 44, 8 34, 10 24 C 12 14, 20 8, 30 6"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.8 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}
