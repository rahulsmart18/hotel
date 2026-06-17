/** Premium easing — slow out, confident settle */
export const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

export const transitionLuxury = (duration = 0.75, delay = 0) => ({
  duration,
  delay,
  ease: EASE_LUXURY,
});

export const staggerContainer = (delayChildren = 0.12, stagger = 0.1) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren, staggerChildren: stagger },
  },
});

export const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_LUXURY },
  },
};

export const fadeUpItemShort = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_LUXURY },
  },
};
