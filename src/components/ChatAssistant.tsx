"use client";

import Link from "next/link";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AssistantMessageBody } from "@/components/ChatAssistantMessageBody";
import { BOOK_DEMO_CALENDAR_URL } from "@/data/contact-links";

const MAX_USER_MESSAGE_CHARS = 2000;
const APP_SIGNIN_URL = process.env.NEXT_PUBLIC_APP_SIGNIN_URL?.trim() ?? "";

type ChatCta = {
  label: string;
  href: string;
  external?: boolean;
};

const ALWAYS_ON_CTAS: ChatCta[] = [
  { label: "View Pricing", href: "/pricing" },
  { label: "Book a Demo", href: BOOK_DEMO_CALENDAR_URL, external: true },
  { label: "Trust & Security", href: "/trust" },
  { label: "Contact Sales", href: "/contact" },
];

const INTENT_CTA_MAP: Record<string, ChatCta[]> = {
  pricing: [
    { label: "View Pricing", href: "/pricing" },
    { label: "Book a Demo", href: BOOK_DEMO_CALENDAR_URL, external: true },
  ],
  security: [
    { label: "Trust & Security", href: "/trust" },
    { label: "Sub-processor Register", href: "/trust/sub-processor-register" },
  ],
  integrations: [
    { label: "See Connectors", href: "/pricing#compare-heading" },
    { label: "Book a Demo", href: BOOK_DEMO_CALENDAR_URL, external: true },
  ],
  signin: [{ label: "Sign in", href: APP_SIGNIN_URL, external: true }],
};

function normalizeForIntent(text: string): string {
  return text.toLowerCase();
}

function inferIntent(text: string): keyof typeof INTENT_CTA_MAP | null {
  const t = normalizeForIntent(text);
  if (
    /(pricing|price|plan|plans|tier|tiers|cost|quote|billing)/.test(t)
  ) {
    return "pricing";
  }
  if (
    /(security|trust|compliance|privacy|gdpr|soc ?2|iso|sub-processor)/.test(t)
  ) {
    return "security";
  }
  if (
    /(integration|integrations|connector|connectors|xero|quickbooks|hubspot|netsuite|sage)/.test(t)
  ) {
    return "integrations";
  }
  if (/(sign in|signin|log in|login|account access|access account)/.test(t)) {
    return "signin";
  }
  return null;
}

function CtaChip({ cta }: { cta: ChatCta }) {
  const className =
    "inline-flex items-center rounded-full border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-brand-gunmetal transition hover:border-brand-gunmetal/40 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal/30";
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={className}>
      {cta.label}
    </Link>
  );
}

function messageText(message: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!message.parts?.length) return "";
  return message.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text" && typeof p.text === "string")
    .map((p) => p.text)
    .join("");
}

export default function ChatAssistant() {
  const panelId = useId();
  const inputId = useId();
  const [open, setOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" })).current;

  const { messages, sendMessage, status, stop, error, clearError } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";
  const latestMessage = messages[messages.length - 1];
  const latestText = latestMessage ? messageText(latestMessage) : "";
  const intent = inferIntent(latestText);
  const intentCtas = intent ? INTENT_CTA_MAP[intent].filter((cta) => cta.href) : [];
  const alwaysOnCtas = APP_SIGNIN_URL
    ? [...ALWAYS_ON_CTAS, { label: "Sign in", href: APP_SIGNIN_URL, external: true }]
    : ALWAYS_ON_CTAS;

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, busy]);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const fd = new FormData(form);
      const text = String(fd.get("message") ?? "").trim();
      if (!text || busy) return;
      form.reset();
      clearError();
      await sendMessage({ text });
    },
    [busy, clearError, sendMessage],
  );

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3 print:hidden">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Stratavor assistant"
          aria-modal="false"
          className="pointer-events-auto flex max-h-[min(32rem,calc(100vh-6rem))] w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-xl"
        >
          <div className="flex items-center justify-between border-b border-neutral-200/80 bg-brand-gunmetal px-4 py-3 text-white">
            <span className="text-sm font-semibold">Ask Stratavor</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-xs font-medium text-white/80 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            >
              Close
            </button>
          </div>
          <p className="border-b border-neutral-100 bg-neutral-50 px-3 py-2 text-[11px] leading-snug text-neutral-600">
            AI-generated; may be inaccurate. For definitive terms, see our site pages or{" "}
            <a href="/contact" className="font-medium text-brand-gunmetal underline-offset-2 hover:underline">
              contact us
            </a>
            .
          </p>
          <div
            ref={scrollRef}
            className="min-h-[12rem] flex-1 space-y-3 overflow-y-auto px-3 py-3 text-sm"
          >
            {messages.length === 0 ? (
              <p className="text-neutral-600">
                Ask about pilots, pricing, connectors, security, or where to learn more on the site.
              </p>
            ) : null}
            {messages.map((m) => (
              <div
                key={m.id}
                className={
                  m.role === "user"
                    ? "ml-6 rounded-xl bg-brand-gunmetal/10 px-3 py-2 text-neutral-800"
                    : "mr-4 rounded-xl bg-neutral-100 px-3 py-2 text-neutral-700"
                }
              >
                <p className="whitespace-pre-wrap break-words">
                  {m.role === "user" ? (
                    messageText(m)
                  ) : (
                    <AssistantMessageBody text={messageText(m)} />
                  )}
                </p>
              </div>
            ))}
            {intentCtas.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1" aria-label="Suggested actions">
                {intentCtas.map((cta) => (
                  <CtaChip key={`intent-${cta.label}`} cta={cta} />
                ))}
              </div>
            ) : null}
            {error ? (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-800" role="alert">
                {error.message || "Something went wrong. Try again in a moment."}
              </p>
            ) : null}
          </div>
          <form onSubmit={onSubmit} className="border-t border-neutral-200/80 p-3">
            <div className="mb-3 flex flex-wrap gap-2" aria-label="Quick links">
              {alwaysOnCtas.map((cta) => (
                <CtaChip key={`always-${cta.label}`} cta={cta} />
              ))}
            </div>
            <label htmlFor={inputId} className="sr-only">
              Message
            </label>
            <div className="flex gap-2">
              <input
                id={inputId}
                name="message"
                type="text"
                autoComplete="off"
                maxLength={MAX_USER_MESSAGE_CHARS}
                placeholder="Type a question…"
                disabled={busy}
                className="min-w-0 flex-1 rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20 disabled:opacity-60"
              />
              {busy ? (
                <button
                  type="button"
                  onClick={() => void stop()}
                  className="shrink-0 rounded-xl border border-neutral-300 px-3 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal/30"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  className="shrink-0 rounded-xl bg-brand-gunmetal px-3 py-2 text-xs font-semibold text-white hover:bg-brand-gunmetal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal/40"
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        className="pointer-events-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-gunmetal text-white shadow-lg transition hover:bg-brand-gunmetal/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal/40 focus-visible:ring-offset-2"
        aria-label={open ? "Close Stratavor assistant" : "Open Stratavor assistant"}
      >
        {open ? (
          <span className="text-xl leading-none" aria-hidden>
            ×
          </span>
        ) : (
          <span className="text-lg font-semibold leading-none" aria-hidden>
            ?
          </span>
        )}
      </button>
    </div>
  );
}
