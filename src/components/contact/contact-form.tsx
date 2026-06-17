"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type ContactInput, contactSchema } from "@/lib/schemas";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values: ContactInput) {
    void values;
    setSent(true);
  }

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-gold/30 bg-card/60 p-8"
        role="status"
      >
        <p className="text-2xl tracking-tight">Message received</p>
        <p className="mt-3 text-sm text-muted-foreground">
          Demo mode — nothing was delivered. Wire this form to your API route or
          CRM when you ship for real.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => {
            setSent(false);
            form.reset();
          }}
        >
          Send another
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-5 rounded-2xl border border-border/70 bg-card/40 p-6 sm:p-8"
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="c-name">Name</Label>
          <Input id="c-name" {...form.register("name")} autoComplete="name" />
          {form.formState.errors.name ? (
            <p className="text-xs text-destructive" role="alert">
              {form.formState.errors.name.message}
            </p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="c-email">Email</Label>
          <Input
            id="c-email"
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
        <Label htmlFor="c-subject">Subject</Label>
        <Input id="c-subject" {...form.register("subject")} />
        {form.formState.errors.subject ? (
          <p className="text-xs text-destructive" role="alert">
            {form.formState.errors.subject.message}
          </p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="c-message">Message</Label>
        <Textarea id="c-message" rows={5} {...form.register("message")} />
        {form.formState.errors.message ? (
          <p className="text-xs text-destructive" role="alert">
            {form.formState.errors.message.message}
          </p>
        ) : null}
      </div>
      <Button type="submit">Send message</Button>
    </form>
  );
}
