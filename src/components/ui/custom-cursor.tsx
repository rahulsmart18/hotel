"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import { useEffect, useState } from "react";

type CursorState = "default" | "hover" | "text" | "drag";

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [state, setState] = useState<CursorState>("default");
  const [visible, setVisible] = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const x = useSpring(mx, { stiffness: 500, damping: 38, mass: 0.4 });
  const y = useSpring(my, { stiffness: 500, damping: 38, mass: 0.4 });

  // Dot trails slightly behind for depth
  const dx = useSpring(mx, { stiffness: 200, damping: 28, mass: 0.6 });
  const dy = useSpring(my, { stiffness: 200, damping: 28, mass: 0.6 });

  useEffect(() => {
    if (reduce) return;

    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const closest = el.closest("[data-cursor]");
      if (closest) {
        setState(closest.getAttribute("data-cursor") as CursorState ?? "hover");
      } else if (
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.closest("a, button")
      ) {
        setState("hover");
      } else if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
        setState("text");
      } else {
        setState("default");
      }
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
    };
  }, [mx, my, visible, reduce]);

  if (reduce) return null;

  const isHover = state === "hover";
  const isText = state === "text";
  const isDrag = state === "drag";

  return (
    <>
      {/* Hide system cursor site-wide */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Main ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999]"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isHover ? (
            /* Morph to open circle */
            <motion.span
              key="circle"
              className="block rounded-full border border-foreground/60"
              initial={{ width: 10, height: 10, opacity: 0 }}
              animate={{ width: 36, height: 36, opacity: 1 }}
              exit={{ width: 10, height: 10, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          ) : isDrag ? (
            <motion.span
              key="drag"
              className="block rounded-full bg-foreground/20 border border-foreground/40"
              initial={{ width: 10, height: 10, opacity: 0 }}
              animate={{ width: 48, height: 48, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            />
          ) : (
            /* Default: fork SVG */
            <motion.span
              key="fork"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: visible ? 1 : 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="block"
            >
              <svg
                width="18"
                height="22"
                viewBox="0 0 28 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Fork tines */}
                <path
                  d="M 6 3 L 6 15 M 6 15 C 6 19, 10 19, 10 15 L 10 3"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-foreground"
                />
                <path
                  d="M 8 15 L 8 33"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="text-foreground"
                />
                {/* Knife */}
                <path
                  d="M 20 3 L 20 33"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  className="text-[#4A70A9]"
                />
                <path
                  d="M 20 3 C 25 3, 27 8, 25 13 C 23 17, 20 17, 20 17"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#4A70A9]"
                />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998]"
        style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.span
          className="block size-1.5 rounded-full bg-[#4A70A9]"
          animate={{ opacity: visible ? (isHover ? 0 : 0.7) : 0 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}
