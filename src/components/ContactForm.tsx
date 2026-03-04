"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { trackEvent } from "./Analytics";

type Intent = "sales" | "demo" | "security" | "general" | "login";

const INTENT_CONFIG: Record<Intent, { heading: string; description: string }> = {
  sales: {
    heading: "Talk to our team",
    description: "Tell us about your organisation and we'll connect you with the right person.",
  },
  demo: {
    heading: "Book a personalised demo",
    description: "See Stratavor in action with your use case. We'll walk you through the platform.",
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

export function ContactForm({ intent = "general" }: { intent?: string }) {
  const resolvedIntent = (Object.keys(INTENT_CONFIG).includes(intent) ? intent : "general") as Intent;
  const config = INTENT_CONFIG[resolvedIntent];

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    trackEvent("form_submit", { intent: resolvedIntent });
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
    }, 800);
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
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="text-center">
        <h1 className="text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg">
          {config.heading}
        </h1>
        <p className="mt-4 text-body-lg text-neutral-600">{config.description}</p>
      </div>

      {resolvedIntent === "login" ? (
        <div className="mt-10 rounded-2xl border border-neutral-200 bg-white p-8 text-center shadow-soft sm:p-10">
          <p className="text-neutral-700">
            The Stratavor platform is available at{" "}
            <a
              href="https://app.stratavor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-accent underline-offset-2 hover:underline"
            >
              app.stratavor.com
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
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-neutral-700">
                First name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                required
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
                required
                autoComplete="family-name"
                className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">
              Work email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
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
              required
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
              defaultValue={resolvedIntent === "demo" ? "demo" : resolvedIntent === "security" ? "security" : ""}
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20"
            >
              <option value="">Select an option</option>
              <option value="demo">Personalised demo</option>
              <option value="pricing">Pricing &amp; plans</option>
              <option value="security">Security review / compliance pack</option>
              <option value="partnership">Partnership</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-neutral-700">
              Message <span className="text-neutral-400">(optional)</span>
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
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-gunmetal px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-gunmetal-dark hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {sending ? "Sending..." : "Submit enquiry"}
          </button>

          <p className="text-center text-xs text-neutral-400">
            By submitting, you agree to our{" "}
            <Link href="/trust/policies/customer-privacy" className="underline underline-offset-2 hover:text-neutral-600">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
