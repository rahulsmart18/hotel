"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EASE_LUXURY } from "@/lib/motion";

export function FooterNewsletter() {
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <motion.p
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: EASE_LUXURY }}
        className="text-sm leading-relaxed text-muted-foreground"
        role="status"
      >
        Thanks — demo only; nothing was stored. We would send perks to{" "}
        <span className="font-medium text-foreground">{email}</span>.
      </motion.p>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="surface-glass-card flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/40 p-4 shadow-sm backdrop-blur-md sm:flex-row sm:items-end"
      noValidate
    >
      <div className="min-w-0 flex-1 space-y-2">
        <Label htmlFor="footer-newsletter-email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Newsletter
        </Label>
        <Input
          id="footer-newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="h-10 border-border/70 bg-background/70"
        />
      </div>
      <Button type="submit" variant="gradient" size="lg" className="h-10 shrink-0 px-5">
        Subscribe
      </Button>
    </form>
  );
}
