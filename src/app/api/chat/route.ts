import OpenAI, { APIError } from "openai";
import { z } from "zod";

import {
  DIETARY_LABELS,
  MENU_CATEGORY_LABELS,
  MENU_ITEMS,
} from "@/lib/menu-data";

export const maxDuration = 60;

const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";

const requestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      })
    )
    .min(1)
    .max(24),
});

function buildMenuContext(): string {
  const lines = MENU_ITEMS.map((item) => {
    const diet = item.dietary.map((d) => DIETARY_LABELS[d]).join(", ");
    const cat = MENU_CATEGORY_LABELS[item.category];
    return `- ${item.name} (${cat}) — ₹${item.priceInr}. ${diet ? `Labels: ${diet}. ` : ""}${item.description}`;
  });
  return lines.join("\n");
}

function jsonError(message: string, status: number) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const parsed = requestSchema.safeParse(json);
  if (!parsed.success) {
    return jsonError("Invalid request body", 400);
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return jsonError(
      "Missing OPENROUTER_API_KEY. Add it to `.env.local` (see .env.example).",
      503
    );
  }

  const menuContext = buildMenuContext();

  const system = `You are the AI Food Concierge for "Aurelio", a fictional luxury restaurant in Iyyappanthangal, Chennai, Tamil Nadu, India (portfolio website — not a real venue). Speak as a warm Tamil Nadu–aware host: generous, precise, never cold or academic.

Audience: Guests familiar with Tamil Nadu and South India — including Chennai, Coimbatore, Madurai, and Bengaluru. Use natural Indian English when the user writes in English. If the user writes in Tamil (தமிழ்), reply in Tamil while keeping dish names as listed on the menu (English is fine for dish titles). Mirror any other language the user uses.

Rules:
- Only recommend dishes from the MENU below. Give approximate totals in INR when comparing combinations.
- Honour dietary labels on dishes (vegetarian, vegan, gluten-free, nuts, spicy). If someone asks for "no onion garlic" or Jain-style and the menu does not label it, say you can only confirm what labels show and suggest the closest safe options.
- Be concise; use short paragraphs or bullets for multiple dishes.
- If asked whether you are "real", one brief line may say this is a demo concierge for a portfolio site.

MENU (INR):
${menuContext}`;

  const openai = new OpenAI({
    apiKey,
    baseURL: OPENROUTER_BASE_URL,
    defaultHeaders: {
      "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERER ?? siteUrl,
      "X-Title": process.env.OPENROUTER_APP_TITLE ?? "Aurelio",
    },
  });

  const model =
    process.env.OPENROUTER_MODEL ?? "openai/gpt-4o-mini";

  try {
    const stream = await openai.chat.completions.create({
      model,
      temperature: 0.65,
      stream: true,
      messages: [
        { role: "system", content: system },
        ...parsed.data.messages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
    });

    const encoder = new TextEncoder();

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content ?? "";
            if (content) controller.enqueue(encoder.encode(content));
          }
        } catch {
          controller.enqueue(
            encoder.encode("\n\n— The reply was interrupted. Please try again.")
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e) {
    if (e instanceof APIError) {
      if (e.status === 429) {
        return jsonError(
          "OpenRouter or upstream model rate limit / quota exceeded. Check your OpenRouter dashboard or try another model.",
          429
        );
      }
      if (e.status === 401) {
        return jsonError("Invalid OpenRouter API key.", 401);
      }
    }

    if (process.env.NODE_ENV === "development") {
      console.error(e);
    }
    return jsonError(
      "The concierge is temporarily unavailable. Try again shortly.",
      502
    );
  }
}
