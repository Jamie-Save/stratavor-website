"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { HUBSPOT_INTEREST_OPTIONS } from "@/data/contact-interest-options";
import { trackEvent } from "./Analytics";

type Intent = "sales" | "security" | "general" | "login";

const INTENT_CONFIG: Record<Intent, { heading: string; description: string }> = {
  sales: {
    heading: "Talk to our team",
    description: "Tell us about your organisation and we'll connect you with the right person.",
  },
  security: {
    heading: "Request a security review",
    description: "Need our SOC 2 report, DPA, or architecture docs? Let us know what you need.",
  },
  login: {
    heading: "Customer login",
    description: "Existing customers can access the platform directly. Need help with your account?",
  },
  general: {
    heading: "Get in touch",
    description: "Questions about Stratavor? We'd love to hear from you.",
  },
};

const THANK_YOU_NEXT_LINKS = [
  { href: "/", label: "Return home" },
  { href: "/pricing", label: "View pricing" },
  { href: "/demo", label: "Explore the demo" },
  { href: "/blog", label: "Read the blog" },
  { href: "/trust", label: "Trust Centre" },
] as const;

export function ContactForm({
  intent = "general",
  source,
  tool,
}: {
  intent?: string;
  source?: string;
  tool?: string;
}) {
  const resolvedIntent = (Object.keys(INTENT_CONFIG).includes(intent) ? intent : "general") as Intent;
  const config = INTENT_CONFIG[resolvedIntent];

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honeypot = String(fd.get("website") ?? "").trim();
    if (honeypot) return;

    setError(null);
    setSending(true);
    trackEvent("form_submit", { intent: resolvedIntent });

    const payload = {
      firstName: String(fd.get("firstName") ?? "").trim(),
      lastName: String(fd.get("lastName") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      company: String(fd.get("company") ?? "").trim(),
      interest: String(fd.get("interest") ?? "").trim(),
      message: String(fd.get("message") ?? "").trim(),
      intent: resolvedIntent,
      ...(source?.trim() ? { source: source.trim() } : {}),
      ...(tool?.trim() ? { tool: tool.trim() } : {}),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSending(false);
        return;
      }

      form.reset();
      setSubmitted(true);
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-10 text-center shadow-medium">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-accent/10">
          <svg className="h-7 w-7 text-brand-accent" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="mt-6 text-xl font-semibold text-brand-gunmetal">Thank you</h3>
        <p className="mt-3 text-neutral-600">
          We&apos;ve received your enquiry and will be in touch within one business day.
        </p>
        <p className="mt-8 text-sm font-medium text-brand-gunmetal">Where to next?</p>
        <ul className="mt-3 space-y-2 text-left">
          {THANK_YOU_NEXT_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className="block rounded-xl border border-neutral-200 bg-neutral-50/80 px-4 py-3 text-sm font-medium text-brand-gunmetal transition-colors hover:border-brand-gunmetal/25 hover:bg-white"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <h1 className="text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg 2xl:text-display-xl">
          {config.heading}
        </h1>
        <p className="mt-4 text-body-lg text-neutral-600">{config.description}</p>
      </div>

      {resolvedIntent === "login" ? (
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-soft sm:p-10">
          <p className="text-neutral-700">
            The Stratavor platform is available at{" "}
            <a
              href="https://app.stratavor.com/login"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-accent underline-offset-2 hover:underline"
            >
              app.stratavor.com/login
            </a>
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Need help with your account? Contact{" "}
            <a href="mailto:support@stratavor.com" className="text-brand-gunmetal underline-offset-2 hover:underline">
              support@stratavor.com
            </a>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-10 space-y-6 rounded-2xl border border-neutral-200 bg-white p-8 shadow-soft sm:p-10">
          {error ? (
            <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              {error}
            </p>
          ) : null}

          <input name="website" type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-neutral-700">
                First name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                autoComplete="given-name"
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-neutral-700">
                Last name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                autoComplete="family-name"
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Work email <span className="text-brand-accent">*</span>
              <span className="sr-only"> (required)</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-required="true"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-neutral-700">
              Company
            </label>
            <input
              id="company"
              name="company"
              type="text"
              autoComplete="organization"
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
            />
          </div>

          <div>
            <label htmlFor="interest" className="block text-sm font-medium text-neutral-700">
              I&apos;m interested in
            </label>
            <select
              id="interest"
              name="interest"
              defaultValue={resolvedIntent === "security" ? "Security Review" : ""}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
            >
              <option value="">Prefer not to say</option>
              {HUBSPOT_INTEREST_OPTIONS.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="btn-primary w-full disabled:opacity-60"
          >
            {sending ? "Sending..." : "Submit enquiry"}
          </button>

          <p className="text-left text-sm leading-relaxed text-neutral-600">
            Stratavor needs the contact information you provide to us to contact you about our products and
            services. You may unsubscribe from these communications at any time. For information on how to
            unsubscribe, as well as our privacy practices and commitment to protecting your privacy, please review
            our{" "}
            <Link
              href="/trust/policies/customer-privacy"
              className="font-medium text-brand-gunmetal underline underline-offset-2 hover:text-brand-accent"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
