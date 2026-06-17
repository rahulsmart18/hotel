"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { AnimatedDatePicker } from "@/components/reservations/animated-date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { type ReservationInput, reservationSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const TIMES = [
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const OCCASIONS = [
  { value: "celebration", label: "Celebration" },
  { value: "business", label: "Business" },
  { value: "anniversary", label: "Anniversary" },
  { value: "family", label: "Family" },
  { value: "tasting", label: "Chef’s tasting" },
  { value: "other", label: "Other" },
];

export function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      guests: 2,
      occasion: "",
      notes: "",
    },
  });

  const timeValue = useWatch({
    control: form.control,
    name: "time",
    defaultValue: "",
  });
  const occasionValue = useWatch({
    control: form.control,
    name: "occasion",
    defaultValue: "",
  });

  function onSubmit(values: ReservationInput) {
    void values;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/30 bg-card/60 p-10 text-center"
        role="status"
      >
        <p className="text-3xl tracking-tight">You are on the list</p>
        <p className="mt-4 text-sm text-muted-foreground">
          This is a demo — no reservation was transmitted. In production, this
          step would confirm by email and sync to your reservations system.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-8"
          onClick={() => {
            setSubmitted(false);
            form.reset();
          }}
        >
          Submit another
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-6 rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="res-name">Full name</Label>
          <Input id="res-name" autoComplete="name" {...form.register("name")} />
          {form.formState.errors.name ? (
            <p className="text-xs text-destructive" role="alert">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-email">Email</Label>
          <Input
            id="res-email"
            type="email"
            autoComplete="email"
            {...form.register("email")}
          />
          {form.formState.errors.email ? (
            <p className="text-xs text-destructive" role="alert">
              {form.formState.errors.email.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="res-phone">Phone</Label>
        <Input
          id="res-phone"
          type="tel"
          autoComplete="tel"
          {...form.register("phone")}
        />
        {form.formState.errors.phone ? (
          <p className="text-xs text-destructive" role="alert">
            {form.formState.errors.phone.message}
          </p>
        ) : null}
      </div>
      <div className="grid gap-6 sm:grid-cols-3" style={{ alignItems: "start" }}>
        {/* Animated date picker */}
        <div className="sm:col-span-1">
          <AnimatedDatePicker
            id="res-date"
            label="Date"
            value={form.watch("date") ?? ""}
            onChange={(v) => form.setValue("date", v, { shouldValidate: true })}
            error={form.formState.errors.date?.message}
          />
        </div>

        {/* Animated time-slot buttons */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="res-time">
            Time
          </Label>
          <motion.div
            className="flex flex-wrap gap-1.5"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.035 } },
              hidden: {},
            }}
            id="res-time"
            role="group"
            aria-label="Select reservation time"
          >
            {TIMES.map((t) => {
              const active = timeValue === t;
              return (
                <motion.button
                  key={t}
                  type="button"
                  data-cursor="hover"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
                  }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => form.setValue("time", active ? "" : t, { shouldValidate: true })}
                  aria-pressed={active}
                  className={cn(
                    "border px-3 py-1.5 text-[0.68rem] uppercase tracking-[0.1em] transition-colors",
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
                  )}
                >
                  {t}
                </motion.button>
              );
            })}
          </motion.div>
          {form.formState.errors.time ? (
            <p className="text-xs text-destructive" role="alert">
              {form.formState.errors.time.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="res-guests">Guests</Label>
          <Input
            id="res-guests"
            type="number"
            min={1}
            max={12}
            {...form.register("guests", { valueAsNumber: true })}
          />
          {form.formState.errors.guests ? (
            <p className="text-xs text-destructive" role="alert">
              {form.formState.errors.guests.message}
            </p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="res-occasion">Occasion</Label>
        <Select
          value={occasionValue}
          onValueChange={(v) => {
            if (v != null && v !== "") {
              form.setValue("occasion", v, { shouldValidate: true });
            }
          }}
        >
          <SelectTrigger id="res-occasion" aria-label="Occasion" className="w-full min-w-0">
            <SelectValue placeholder="Select occasion" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="" disabled className="text-muted-foreground">
              Select occasion
            </SelectItem>
            {OCCASIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.occasion ? (
          <p className="text-xs text-destructive" role="alert">
            {form.formState.errors.occasion.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="res-notes">Notes (optional)</Label>
        <Textarea id="res-notes" rows={4} {...form.register("notes")} />
      </div>
      <Button type="submit" disabled={form.formState.isSubmitting}>
        Request reservation
      </Button>
    </form>
  );
}
