import { cn } from "@/lib/utils";

interface IconProps {
  className?: string;
  strokeWidth?: number;
  color?: string;
}

/** Fork & knife — restaurant symbol */
export function DoodleFork({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 8 4 L 8 20 M 8 20 C 8 26, 14 26, 14 20 L 14 4" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 11 20 L 11 44" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 28 4 L 28 44" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 28 4 C 34 4, 36 10, 34 16 C 32 22, 28 22, 28 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Location pin */
export function DoodlePin({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 36 48" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 18 4 C 9 4, 4 11, 4 18 C 4 28, 14 36, 18 44 C 22 36, 32 28, 32 18 C 32 11, 27 4, 18 4 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="18" r="5" stroke={color} strokeWidth={strokeWidth} />
    </svg>
  );
}

/** Clock */
export function DoodleClock({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <circle cx="22" cy="22" r="18" stroke={color} strokeWidth={strokeWidth} />
      <path d="M 22 10 L 22 22 L 30 28" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="22" r="2" fill={color} />
    </svg>
  );
}

/** Star / award */
export function DoodleStar({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 22 4 L 26 16 L 40 16 L 28 24 L 32 36 L 22 28 L 12 36 L 16 24 L 4 16 L 18 16 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Leaf */
export function DoodleLeaf({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 40 48" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 20 44 C 20 28, 8 18, 8 10 C 8 6, 14 4, 20 4 C 26 4, 32 6, 32 10 C 32 18, 20 28, 20 44 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 20 44 C 20 28, 20 18, 20 4" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" strokeDasharray="2 3" />
    </svg>
  );
}

/** Plate / dish */
export function DoodlePlate({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 52 32" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 4 20 C 4 12, 14 6, 26 6 C 38 6, 48 12, 48 20" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 2 22 L 50 22" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 8 26 L 44 26" stroke={color} strokeWidth={strokeWidth * 0.7} strokeLinecap="round" />
    </svg>
  );
}

/** Flame / spice heat */
export function DoodleFlame({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 32 48" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 16 44 C 6 44, 4 36, 6 28 C 8 20, 14 18, 12 10 C 18 18, 22 14, 20 6 C 28 16, 28 28, 28 32 C 28 38, 24 44, 16 44 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 44 C 10 38, 10 32, 14 28 C 14 34, 18 36, 18 32 C 20 36, 20 40, 16 44 Z" stroke={color} strokeWidth={strokeWidth * 0.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Chat bubble / reservation */
export function DoodleChat({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 48 44" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 6 6 C 6 4, 8 4, 10 4 L 38 4 C 40 4, 42 4, 42 6 L 42 28 C 42 30, 40 30, 38 30 L 20 30 L 10 40 L 12 30 L 10 30 C 8 30, 6 30, 6 28 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="17" r="2" fill={color} />
      <circle cx="24" cy="17" r="2" fill={color} />
      <circle cx="31" cy="17" r="2" fill={color} />
    </svg>
  );
}

/** Tray / serve */
export function DoodleTray({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 56 36" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 6 28 C 6 28, 18 16, 28 16 C 38 16, 50 28, 50 28" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 2 30 L 54 30" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 28 16 L 28 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 22 8 C 24 4, 32 4, 34 8" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

/** Wine glass */
export function DoodleGlass({ className, strokeWidth = 2.2, color = "currentColor" }: IconProps) {
  return (
    <svg viewBox="0 0 32 56" fill="none" aria-hidden className={cn("shrink-0", className)}>
      <path d="M 8 4 L 24 4 L 22 20 C 22 26, 18 28, 16 28 C 14 28, 10 26, 10 20 Z" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 16 28 L 16 46" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
      <path d="M 8 46 L 24 46" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}
