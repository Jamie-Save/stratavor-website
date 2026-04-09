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

const SUGGESTED_PROMPTS: { label: string; text: string }[] = [
  { label: "Pricing & plans", text: "What are your pricing options and tiers?" },
  { label: "Security & trust", text: "How do you handle security and compliance?" },
  { label: "Integrations", text: "Which accounting and CRM connectors do you support?" },
  { label: "Book a demo", text: "I'd like to book a demo with your team." },
];

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

function IconExternalLink({ className }: { className?: string }) {
  return (
    <svg className={className} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M4.5 1.5H2a1 1 0 0 0-1 1V10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V8M10 1.5H6m4 0v4m0-4L5.5 6.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconChatSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
      <path
        d="M13 4c.35 1.2.8 1.65 2 2-1.2.35-1.65.8-2 2-.35-1.2-.8-1.65-2-2 .35-1.2.8-1.65 2-2Z"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M6 11c2.2.65 3.35 1.8 4 4 .65-2.2 1.8-3.35 4-4-2.2-.65-3.35-1.8-4-4-.65 2.2-1.8 3.35-4 4Z"
        stroke="currentColor"
        strokeWidth="1.35"
        strokeLinejoin="round"
      />
      <path
        d="M17 15h3M18.5 13.5v3M20 19c.5 1.1 1.15 1.4 2.25 1.75-1.1.35-1.75.65-2.25 1.75-.5-1.1-1.15-1.4-2.25-1.75 1.1-.35 1.75-.65 2.25-1.75Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconClose({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
      <path
        d="m6 6 10 10M16 6 6 16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CtaChip({ cta }: { cta: ChatCta }) {
  const className =
    "inline-flex items-center gap-1 rounded-full border border-neutral-200/95 bg-white px-3 py-1.5 text-xs font-semibold text-brand-gunmetal shadow-sm transition hover:border-brand-accent hover:bg-brand-accent-light/60 hover:text-brand-gunmetal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/40 focus-visible:ring-offset-1";
  if (cta.external) {
    return (
      <a href={cta.href} target="_blank" rel="noopener noreferrer" className={className}>
        {cta.label}
        <IconExternalLink className="shrink-0 text-neutral-500 opacity-80" />
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

  const showTyping =
    busy &&
    (!latestMessage ||
      latestMessage.role === "user" ||
      (latestMessage.role === "assistant" && !latestText.trim()));

  useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, busy, showTyping]);

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

  const sendSuggested = useCallback(
    async (text: string) => {
      if (busy) return;
      clearError();
      await sendMessage({ text });
    },
    [busy, clearError, sendMessage],
  );

  return (
    <div className="pointer-events-none fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-4 print:hidden sm:bottom-6 sm:right-6">
      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-label="Stratavor assistant"
          aria-modal="false"
          className="chat-panel-animate-in pointer-events-auto flex max-h-[min(38rem,calc(100vh-5rem))] w-[min(100vw-2rem,26rem)] flex-col overflow-hidden rounded-3xl border border-neutral-200/80 bg-white shadow-large ring-1 ring-black/[0.04] sm:w-[min(100vw-2rem,28rem)]"
        >
          <header className="relative border-b border-white/10 bg-gradient-to-br from-brand-gunmetal via-brand-gunmetal to-brand-gunmetal-dark px-4 pb-4 pt-4 text-white ring-1 ring-inset ring-white/15">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="font-heading text-lg font-semibold tracking-tight text-white">Ask Stratavor</h2>
                <p className="mt-0.5 text-xs font-medium leading-snug text-white/75">
                  Answers about Stratavor, pricing, connectors, and security.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="shrink-0 rounded-xl p-2 text-white/85 transition hover:bg-white/12 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/55"
                aria-label="Close assistant"
              >
                <IconClose className="h-5 w-5" />
              </button>
            </div>
          </header>
          <p className="border-b border-neutral-100/90 bg-neutral-50/95 px-4 py-2.5 text-[11px] font-medium leading-relaxed text-neutral-600">
            AI-generated; may be inaccurate. For definitive terms, see our site pages or{" "}
            <a href="/contact" className="text-brand-gunmetal underline decoration-brand-gunmetal/30 underline-offset-2 hover:decoration-brand-gunmetal">
              contact us
            </a>
            .
          </p>
          <div
            ref={scrollRef}
            className="min-h-[13rem] flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-neutral-50/80 px-4 py-4 text-sm"
          >
            {messages.length === 0 ? (
              <div className="space-y-4">
                <p className="text-[13px] leading-relaxed text-neutral-600">
                  Hi — ask anything about pilots, pricing, connectors, or where to read more on the site. Or tap a
                  starter below.
                </p>
                <div className="flex flex-wrap gap-2" aria-label="Suggested questions">
                  {SUGGESTED_PROMPTS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      disabled={busy}
                      onClick={() => void sendSuggested(s.text)}
                      className="rounded-full border border-brand-gunmetal/20 bg-white px-3 py-2 text-left text-xs font-semibold text-brand-gunmetal shadow-sm transition hover:border-brand-accent hover:bg-brand-accent-light/50 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent/35"
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              const body = messageText(m);
              if (m.role === "assistant" && !body.trim() && busy && isLast) {
                return null;
              }
              return (
              <div
                key={m.id}
                className={m.role === "user" ? "flex flex-col items-end gap-1" : "flex flex-col items-start gap-1"}
              >
                <span
                  className={
                    m.role === "user"
                      ? "text-[10px] font-bold uppercase tracking-wider text-neutral-400"
                      : "text-[10px] font-bold uppercase tracking-wider text-brand-accent"
                  }
                >
                  {m.role === "user" ? "You" : "Stratavor"}
                </span>
                <div
                  className={
                    m.role === "user"
                      ? "max-w-[92%] rounded-2xl rounded-br-md border border-brand-gunmetal/15 bg-brand-gunmetal/[0.09] px-3.5 py-2.5 text-neutral-800 shadow-sm"
                      : "max-w-[92%] rounded-2xl rounded-bl-md border-l-[3px] border-brand-accent bg-white px-3.5 py-2.5 text-neutral-700 shadow-sm ring-1 ring-neutral-200/60"
                  }
                >
                  <p className="whitespace-pre-wrap break-words text-[13px] leading-relaxed">
                    {m.role === "user" ? (
                      body
                    ) : (
                      <AssistantMessageBody text={body} />
                    )}
                  </p>
                </div>
              </div>
              );
            })}
            {showTyping ? (
              <div className="flex flex-col items-start gap-1" aria-live="polite" aria-label="Assistant is typing">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-accent">Stratavor</span>
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-neutral-200/80 bg-white px-4 py-3 shadow-sm ring-1 ring-neutral-200/50">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            ) : null}
            {intentCtas.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1" aria-label="Suggested actions">
                {intentCtas.map((cta) => (
                  <CtaChip key={`intent-${cta.label}`} cta={cta} />
                ))}
              </div>
            ) : null}
            {error ? (
              <p className="rounded-xl border border-red-100 bg-red-50/95 px-3 py-2.5 text-xs font-medium text-red-800" role="alert">
                {error.message || "Something went wrong. Try again in a moment."}
              </p>
            ) : null}
          </div>
          <form
            onSubmit={onSubmit}
            className="border-t border-neutral-200/90 bg-white/95 p-4 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.08)] backdrop-blur-sm"
          >
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
                placeholder="Ask about pricing, security, integrations…"
                disabled={busy}
                className="min-w-0 flex-1 rounded-2xl border border-neutral-200/95 bg-neutral-50/80 px-3.5 py-2.5 text-sm text-neutral-800 shadow-inner placeholder:text-neutral-400 focus:border-brand-gunmetal focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-accent/25 disabled:opacity-60"
              />
              {busy ? (
                <button
                  type="button"
                  onClick={() => void stop()}
                  className="shrink-0 rounded-2xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-bold text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal/30"
                >
                  Stop
                </button>
              ) : (
                <button
                  type="submit"
                  className="shrink-0 rounded-2xl bg-brand-accent px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-brand-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                >
                  Send
                </button>
              )}
            </div>
          </form>
        </div>
      ) : null}

      <div className="pointer-events-auto relative">
        {!open ? <span className="chat-launcher-ring" aria-hidden /> : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={open ? panelId : undefined}
          className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full bg-gradient-to-br from-brand-gunmetal to-brand-gunmetal-dark text-white shadow-lg transition duration-200 hover:scale-105 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          aria-label={open ? "Close Stratavor assistant" : "Open Stratavor assistant"}
        >
          {open ? (
            <IconClose className="h-7 w-7" />
          ) : (
            <IconChatSparkle className="h-[1.65rem] w-[1.65rem]" />
          )}
        </button>
      </div>
    </div>
  );
}
