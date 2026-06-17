"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotateCcwIcon } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EASE_LUXURY } from "@/lib/motion";
import type { ChatMessage } from "@/types";
import { GoldLineMark } from "@/components/brand/gold-line-mark";
import { BRAND_RITUAL } from "@/lib/brand-ritual";
import { cn } from "@/lib/utils";

const SUGGESTED = [
  "I want a vegetarian meal under ₹500.",
  "Recommend dishes for a romantic dinner.",
  "What should a family of four order?",
  "Suggest desserts for kids.",
  "₹500-க்குள் சைவ உணவு வேண்டும்.",
  "குடும்பத்திற்கு என்ன ஆர்டர் பண்ணலாம்?",
];

const CHAT_INPUT_ID = "food-concierge-input";

/** Safe inline **bold** for streamed assistant copy — avoids broken block highlights. */
function AssistantMessageBody({ text }: { text: string }) {
  if (!text) return null;
  if (!text.includes("**")) {
    return (
      <p className="whitespace-pre-wrap break-words leading-relaxed [word-break:break-word]">
        {text}
      </p>
    );
  }

  const segments = text.split(/\*\*/);
  const closed = segments.length % 2 === 1;
  const limit = closed ? segments.length : segments.length - 1;
  const nodes: React.ReactNode[] = [];

  for (let i = 0; i < limit; i++) {
    if (i % 2 === 0) {
      nodes.push(
        <span key={i} className="whitespace-pre-wrap [word-break:break-word]">
          {segments[i]}
        </span>
      );
    } else {
      nodes.push(
        <strong
          key={i}
          className="font-semibold text-foreground underline decoration-gold/50 decoration-2 underline-offset-2 [box-decoration-break:clone]"
        >
          {segments[i]}
        </strong>
      );
    }
  }

  if (!closed && segments.length > 0) {
    nodes.push(
      <span key="open-markdown" className="whitespace-pre-wrap">
        **{segments[segments.length - 1]}
      </span>
    );
  }

  return (
    <p className="whitespace-pre-wrap break-words leading-relaxed [overflow-wrap:anywhere]">
      {nodes}
    </p>
  );
}

function focusChatInput() {
  requestAnimationFrame(() => {
    document.getElementById(CHAT_INPUT_ID)?.focus();
  });
}

function uid() {
  return crypto.randomUUID();
}

export function FoodConciergePanel({ onClose }: { onClose: () => void }) {
  const titleId = useId();
  const liveId = useId();
  const abortRef = useRef<AbortController | null>(null);
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uid(),
      role: "assistant",
      content:
        "Vanakkam — I am your menu host tonight. Ask in English or Tamil for pairings, gentle dietary paths, or a full evening arc. I only suggest plates we actually list (INR).",
    },
  ]);
  const [input, setInput] = useState("");
  const [awaiting, setAwaiting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scrollToEnd = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  useEffect(() => {
    scrollToEnd();
  }, [messages, awaiting, scrollToEnd]);

  useEffect(() => {
    focusChatInput();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || awaiting) return;

    abortRef.current?.abort();
    abortRef.current = new AbortController();
    const signal = abortRef.current.signal;

    const userMsg: ChatMessage = { id: uid(), role: "user", content: trimmed };
    const thread = [...messages, userMsg];
    setMessages(thread);
    setInput("");
    setError(null);
    setAwaiting(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: thread.map(({ role, content }) => ({ role, content })),
        }),
        signal,
      });

      if (!res.ok) {
        const data: unknown = await res.json().catch(() => ({}));
        const raw =
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof (data as { error: unknown }).error === "string"
            ? (data as { error: string }).error
            : "";
        // Surface friendly copy for common failure modes
        let msg = raw || "Something went wrong. Please try again.";
        if (res.status === 503 || raw.toLowerCase().includes("openrouter_api_key")) {
          msg =
            "The concierge is resting right now \u2014 the kitchen is quiet. Try again later or call us directly on " +
            "+91 (44) 5550-2140.";
        } else if (res.status === 429) {
          msg =
            "We\u2019re busy right now \u2014 too many requests. Give it a moment and try again.";
        } else if (res.status === 401) {
          msg =
            "The concierge is temporarily offline. You\u2019re welcome to reach us by phone or WhatsApp.";
        }
        setError(msg);
        return;
      }

      const ct = res.headers.get("content-type") ?? "";
      if (!res.body || !ct.includes("text/plain")) {
        setError("Unexpected response from concierge.");
        return;
      }

      const assistantId = uid();
      setMessages((prev) => [
        ...prev,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let first = true;
      let sawBytes = false;

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        if (!chunk) continue;
        sawBytes = true;
        if (first) {
          first = false;
          setAwaiting(false);
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + chunk } : m
          )
        );
      }

      const tail = decoder.decode();
      if (tail) {
        sawBytes = true;
        if (first) {
          first = false;
          setAwaiting(false);
        }
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: m.content + tail } : m
          )
        );
      }

      if (!sawBytes) {
        setMessages((prev) => prev.filter((m) => m.id !== assistantId));
        setError("No reply received. Try again.");
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      setError(
        "Couldn\u2019t reach the concierge \u2014 check your connection and try again, or call us on +91\u00a0(44)\u00a05550-2140."
      );
    } finally {
      setAwaiting(false);
    }
  }

  function clearChat() {
    abortRef.current?.abort();
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content:
          "Fresh start. What shall we explore on tonight's menu? English or Tamil — both feel at home here.",
      },
    ]);
    setError(null);
    setInput("");
    focusChatInput();
  }

  return (
    <motion.aside
      id="food-concierge-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.94, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={reduce ? undefined : { opacity: 0, y: 20, scale: 0.96, filter: "blur(6px)" }}
      transition={
        reduce
          ? { duration: 0.2 }
          : { type: "spring", stiffness: 380, damping: 28, mass: 0.65 }
      }
      className={cn(
        "relative z-[94] flex w-[min(100vw-2rem,26rem)] flex-col overflow-hidden rounded-2xl border border-border/70",
        "bg-popover/95 text-popover-foreground shadow-[0_28px_90px_-24px_rgba(0,0,0,0.55),0_0_56px_-20px_color-mix(in_oklch,var(--jade)_12%,transparent)]",
        "ring-1 ring-gold/25 backdrop-blur-xl",
        "h-[min(85vh,40rem)] max-h-[min(92dvh,40rem)]"
      )}
    >
      <header className="shrink-0 border-b border-border/50 bg-gradient-to-r from-primary/[0.07] via-card/35 to-transparent px-4 py-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p id={titleId} className="truncate text-lg tracking-tight">
              Food Concierge
            </p>
            <p className="mt-1 flex items-center gap-2 text-[0.65rem] leading-snug text-muted-foreground">
              <GoldLineMark className="h-2.5 w-11 shrink-0 text-gold/85" />
              <span className="min-w-0">
                <span className="font-medium text-foreground/85">
                  {BRAND_RITUAL.shortLabel}
                </span>
                <span aria-hidden> — </span>
                {BRAND_RITUAL.hook}
              </span>
            </p>
            <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.18em] text-muted-foreground/75">
              Streaming · Menu-aware
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              onClick={clearChat}
              aria-label="Clear conversation"
            >
              <RotateCcwIcon className="size-4" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onClose}
              aria-label="Close concierge"
            >
              <span aria-hidden className="text-lg leading-none">
                ×
              </span>
            </Button>
          </div>
        </div>
      </header>

      <div
        ref={scrollRef}
        id={liveId}
        role="log"
        aria-relevant="additions text"
        aria-live="polite"
        className={cn(
          "min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain",
          "px-3 py-3 [scrollbar-gutter:stable]"
        )}
      >
        <div className="flex flex-col gap-3 pr-1">
          <AnimatePresence initial={false}>
            {messages.map((m) => (
              <motion.div
                key={m.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: EASE_LUXURY }}
                className={cn(
                  "max-w-[min(92%,20rem)] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm",
                  m.role === "user"
                    ? "ml-auto border border-gold/25 bg-gradient-to-br from-primary to-primary/92 text-primary-foreground"
                    : "mr-auto min-w-0 border border-border/60 bg-muted/85 text-foreground backdrop-blur-sm"
                )}
              >
                {m.content ? (
                  m.role === "assistant" ? (
                    <AssistantMessageBody text={m.content} />
                  ) : (
                    <p className="whitespace-pre-wrap break-words leading-relaxed [word-break:break-word]">
                      {m.content}
                    </p>
                  )
                ) : m.role === "assistant" && awaiting ? (
                  <TypingDots />
                ) : null}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {error ? (
        <div
          className="shrink-0 border-t border-border/50 bg-destructive/10 px-4 py-3 text-xs leading-relaxed text-destructive"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className="shrink-0 border-t border-border/50 bg-card/40 px-3 py-2 backdrop-blur-md">
        <p className="mb-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Suggested
        </p>
        <div className="flex max-h-[5.5rem] flex-wrap gap-1.5 overflow-y-auto overscroll-y-contain">
          {SUGGESTED.map((s) => (
            <button
              key={s}
              type="button"
              disabled={awaiting}
              onClick={() => void send(s)}
              className="max-w-full rounded-full border border-border/60 bg-background/80 px-2.5 py-1 text-left text-[0.68rem] leading-snug text-muted-foreground transition-colors hover:border-primary/35 hover:text-foreground disabled:opacity-45"
            >
              <span className="line-clamp-2">{s}</span>
            </button>
          ))}
        </div>
      </div>

      <form
        className="shrink-0 border-t border-border/60 bg-background/85 p-3 backdrop-blur-md"
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
      >
        <div className="flex gap-2">
          <Input
            id={CHAT_INPUT_ID}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the menu…"
            aria-label="Message to concierge"
            disabled={awaiting}
            className="h-11 min-w-0 flex-1 border-border/60 bg-card/50 focus-visible:ring-gold/30"
            autoComplete="off"
          />
          <Button
            type="submit"
            disabled={awaiting || !input.trim()}
            className="h-11 shrink-0 px-5"
          >
            Send
          </Button>
        </div>
      </form>
    </motion.aside>
  );
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 py-0.5" aria-hidden>
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.15s]" />
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-gold [animation-delay:-0.05s]" />
      <span className="inline-block size-1.5 animate-bounce rounded-full bg-gold" />
    </span>
  );
}
