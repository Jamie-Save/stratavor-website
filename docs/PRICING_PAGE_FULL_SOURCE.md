# Stratavor pricing page — full source bundle

This file bundles **everything needed to recreate the /pricing experience** in a Next.js App Router project (same stack: Next 15, React 19, Tailwind 3, `next/image`).

## How to use

1. Copy files below into the same paths (or adjust `@/` imports to your alias).
2. Ensure `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }` (or equivalent).
3. Add a route: `src/app/pricing/page.tsx` is included.
4. **Layout**: the live site wraps pages in a root layout (header/footer). This bundle is the pricing **page body** only.
5. **Public assets**: `ConnectorsSection` uses `integrationLogos` under `public/images/logos/integrations/` (see `marquee.ts`).
6. Regenerate this file after pricing changes: `node scripts/build-pricing-page-bundle.mjs`

---

## Excerpt: `PricingFaqJsonLd` (from StructuredData.tsx)

```tsx
// Excerpt from src/components/StructuredData.tsx — PricingFaqJsonLd only

import { PRICING_FAQ } from "@/data/pricing-faq";

export function PricingFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

```

---

## `src/app/pricing/page.tsx`

```tsx
import { PricingPageClient } from "@/components/pricing/PricingPageClient";
import { PricingFaqJsonLd } from "@/components/StructuredData";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { initialCurrencyFromGeoHeaders } from "@/lib/currency";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Pricing | Stratavor",
  description:
    "Essentials, Growth, and Enterprise plans: every module and full AI at every tier. Compare capacity and start a 7-day free pilot with Growth access.",
  alternates: {
    canonical: absoluteUrl("/pricing"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/pricing"),
    title: "Pricing | Stratavor",
    description:
      "Essentials, Growth, and Enterprise plans with full AI at every tier. Start a 7-day free pilot.",
  },
};

export default async function PricingPage() {
  const h = await headers();
  const currency = initialCurrencyFromGeoHeaders((name) => h.get(name));

  return (
    <>
      <PricingFaqJsonLd />
      <PricingPageClient initialCurrency={currency} />
    </>
  );
}

```

## `src/components/pricing/PricingPageClient.tsx`

```tsx
"use client";

import { useState } from "react";
import type { BillingPeriod, SupportedCurrency } from "@/data/pricing-plans";
import { PRICING_PLANS } from "@/data/pricing-plans";
import { coerceSupportedCurrency } from "@/lib/currency";
import { PricingHero } from "./PricingHero";
import { PricingToggle } from "./PricingToggle";
import { PricingGrid } from "./PricingGrid";
import { PilotSection } from "./PilotSection";
import { ConnectorsSection } from "./ConnectorsSection";
import { AddOnsSection } from "./AddOnsSection";
import { FeatureComparison } from "./FeatureComparison";
import { FAQSection } from "./FAQSection";

export function PricingPageClient({ initialCurrency }: { initialCurrency: SupportedCurrency }) {
  const [billing, setBilling] = useState<BillingPeriod>("monthly");
  const currency = coerceSupportedCurrency(initialCurrency);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PricingHero />

      {/* Plans: continuous with hero (white surface, soft top fade) */}
      <section
        className="relative border-b border-neutral-200/60 bg-gradient-to-b from-white via-white to-neutral-50/30 pb-16 pt-4 sm:pb-20 sm:pt-6"
        aria-labelledby="plans-heading"
      >
        <div className="pricing-inner">
          <h2 id="plans-heading" className="sr-only">
            Pricing plans
          </h2>
          <div className="overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-soft ring-1 ring-black/[0.03]">
            <div className="border-b border-neutral-200/80 bg-gradient-to-b from-neutral-50/80 to-white px-4 py-5 sm:px-6">
              <PricingToggle billing={billing} onBillingChange={setBilling} />
            </div>
            <div className="px-4 pb-10 pt-8 sm:px-6 sm:pb-12 sm:pt-10">
              <PricingGrid plans={PRICING_PLANS} billing={billing} currency={currency} />
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons + connectors: alternating tone for flow */}
      <div className="pricing-band-divider bg-neutral-50">
        <AddOnsSection currency={currency} />
      </div>

      <div className="bg-white">
        <ConnectorsSection />
      </div>

      {/* Compare + FAQ: neutral band then clean close */}
      <div className="pricing-band-divider bg-gradient-to-b from-neutral-50 to-neutral-50/80">
        <FeatureComparison />
      </div>

      <div className="border-t border-neutral-200/50 bg-white">
        <FAQSection />
      </div>

      <div className="border-t border-neutral-200/60 bg-gradient-to-b from-neutral-50 to-white pb-4">
        <PilotSection />
      </div>
    </div>
  );
}

```

## `src/components/pricing/PricingHero.tsx`

```tsx
import Link from "next/link";

export function PricingHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-neutral-200/80 bg-gradient-to-b from-brand-mist-light/50 via-white to-white pb-12 pt-section sm:pb-16"
      aria-labelledby="pricing-hero-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[min(420px,55vh)] w-[min(520px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-mist-light/25 blur-3xl lg:block"
        aria-hidden
      />
      <div className="pricing-inner relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="pricing-hero-heading"
            className="text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg 2xl:text-display-xl"
          >
            Everything you need.{" "}
            <span className="font-medium italic text-brand-gunmetal/85">Nothing hidden.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-neutral-600">
            Choose the tier that fits your business today, then scale as you grow. Capabilities, capacity, and support
            expand with each plan.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="#compare-heading"
              className="btn-outline inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-semibold"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/pricing/PricingToggle.tsx`

```tsx
"use client";

import type { BillingPeriod } from "@/data/pricing-plans";

interface PricingToggleProps {
  billing: BillingPeriod;
  onBillingChange: (billing: BillingPeriod) => void;
  className?: string;
}

export function PricingToggle({ billing, onBillingChange, className = "" }: PricingToggleProps) {
  const isAnnual = billing === "annual";
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 gap-y-2 ${className}`.trim()}
      role="group"
      aria-label="Billing period"
    >
      <span
        className={
          billing === "monthly" ? "text-sm font-medium text-brand-gunmetal" : "text-sm font-medium text-neutral-500"
        }
      >
        Monthly
      </span>
      {/* iOS-style switch track: no gunmetal/white hover inversion (thumb stays white); subtle opacity on gunmetal only. */}
      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        onClick={() => onBillingChange(isAnnual ? "monthly" : "annual")}
        className={
          "relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 " +
          (isAnnual ? "bg-brand-gunmetal hover:opacity-95" : "bg-neutral-200")
        }
      >
        <span
          className={
            "absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-soft transition-transform " +
            (isAnnual ? "translate-x-6" : "translate-x-0")
          }
        />
      </button>
      <span
        className={
          billing === "annual" ? "text-sm font-medium text-brand-gunmetal" : "text-sm font-medium text-neutral-500"
        }
      >
        Annual <span className="text-brand-gunmetal">Save 15%</span>
      </span>
    </div>
  );
}

```

## `src/components/pricing/PricingGrid.tsx`

```tsx
import type { BillingPeriod, PricingPlan, SupportedCurrency } from "@/data/pricing-plans";
import { PricingCard } from "./PricingCard";

interface PricingGridProps {
  plans: PricingPlan[];
  billing: BillingPeriod;
  currency: SupportedCurrency;
}

export function PricingGrid({ plans, billing, currency }: PricingGridProps) {
  return (
    <div className="grid items-stretch gap-8 md:grid-cols-3">
      {plans.map((plan) => (
        <PricingCard key={plan.id} plan={plan} billing={billing} currency={currency} />
      ))}
    </div>
  );
}

```

## `src/components/pricing/PricingCard.tsx`

```tsx
import Link from "next/link";
import type { BillingPeriod, PricingPlan, SupportedCurrency } from "@/data/pricing-plans";
import { formatPlanPrice } from "@/lib/currency";

interface PricingCardProps {
  plan: PricingPlan;
  billing: BillingPeriod;
  currency: SupportedCurrency;
}

export function PricingCard({ plan, billing, currency }: PricingCardProps) {
  /** Growth is the featured column: dark gunmetal surface + light text. Essentials & Enterprise are light cards. */
  const isDarkCard = plan.id === "growth";

  const price = plan.prices
    ? billing === "annual"
      ? plan.prices[currency].annual
      : plan.prices[currency].monthly
    : plan.priceMonthly !== null && plan.priceAnnual !== null
      ? billing === "annual"
        ? plan.priceAnnual
        : plan.priceMonthly
      : null;

  const ctaHref = plan.checkoutUrls ? plan.checkoutUrls[currency][billing] : plan.ctaHref;
  const ctaExternal = plan.checkoutUrls ? true : Boolean(plan.ctaExternal);

  const ctaClasses = (() => {
    if (isDarkCard && plan.ctaStyle === "accent") {
      // Same hover inversion as light-card outline CTAs (Essentials / Enterprise).
      return "border-2 border-white bg-white text-brand-gunmetal hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:ring-brand-gunmetal";
    }
    if (isDarkCard && plan.ctaStyle !== "accent") {
      return "border-2 border-white/30 bg-white text-brand-gunmetal hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal";
    }
    if (!isDarkCard && plan.ctaStyle === "inverse-outline") {
      return "border-2 border-neutral-200 bg-white text-brand-gunmetal hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:ring-brand-gunmetal";
    }
    if (plan.ctaStyle === "accent") {
      return "bg-brand-accent text-white hover:bg-brand-accent-hover hover:shadow-medium focus-visible:ring-brand-accent";
    }
    return "border-2 border-neutral-200 bg-white text-brand-gunmetal hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:ring-brand-gunmetal";
  })();

  return (
    <article
      className={`relative flex h-full min-h-0 flex-col rounded-2xl border-2 p-8 shadow-soft transition-all duration-200 hover:shadow-medium ${
        isDarkCard
          ? "border-brand-gunmetal-dark bg-brand-gunmetal text-neutral-100 shadow-medium"
          : "border-neutral-200 bg-white hover:border-neutral-300"
      }`}
    >
      {plan.mostPopular && plan.ribbonLabel && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
            isDarkCard ? "bg-white text-brand-gunmetal shadow-soft" : "bg-brand-gunmetal text-white"
          }`}
        >
          {plan.ribbonLabel}
        </span>
      )}
      <h3
        className={`text-xl font-semibold ${plan.mostPopular ? "mt-2" : ""} ${isDarkCard ? "text-white" : "text-brand-gunmetal"}`}
      >
        {plan.name}
      </h3>
      <p
        className={`mt-2 min-h-[3rem] text-sm leading-snug sm:min-h-[2.75rem] ${
          isDarkCard ? "text-neutral-300" : "text-neutral-600"
        }`}
      >
        {plan.description}
      </p>
      {/* Two-row price block: aligned across paid vs Enterprise (secondary line = annual or custom subtext). */}
      <div className="mt-6 min-h-[5.25rem]">
        <div className="flex min-h-[2.75rem] items-end">
          {price !== null ? (
            <div className="flex items-baseline gap-1">
              <span
                className={`text-3xl font-bold tracking-tight ${isDarkCard ? "text-white" : "text-brand-gunmetal"}`}
              >
                {formatPlanPrice(price, currency)}
              </span>
              <span className={isDarkCard ? "text-neutral-400" : "text-neutral-600"}>/mo</span>
            </div>
          ) : (
            <span
              className={`font-heading text-2xl font-normal tracking-tight ${
                isDarkCard ? "text-white" : "text-brand-gunmetal"
              }`}
            >
              {plan.customPriceLabel ?? "Custom"}
            </span>
          )}
        </div>
        <div className="mt-1 min-h-[2.5rem]">
          {price !== null ? (
            <p className={`text-xs leading-snug ${isDarkCard ? "text-neutral-400" : "text-neutral-500"}`}>
              {billing === "annual" ? "Billed annually" : "Billed monthly"}
            </p>
          ) : plan.customPriceSubtext ? (
            <p className={`text-xs leading-snug ${isDarkCard ? "text-neutral-400" : "text-neutral-500"}`}>
              {plan.customPriceSubtext}
            </p>
          ) : (
            <p className="text-xs opacity-0" aria-hidden>
              &nbsp;
            </p>
          )}
        </div>
      </div>
      <Link
        href={ctaHref}
        {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-6 py-3.5 text-[15px] font-semibold shadow-soft transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${isDarkCard ? "focus-visible:ring-offset-brand-gunmetal" : "focus-visible:ring-offset-white"} ${ctaClasses}`}
      >
        {plan.cta}
      </Link>
      <hr className={`my-6 border-t ${isDarkCard ? "border-white/10" : "border-neutral-200"}`} />
      <div className="flex flex-1 flex-col">
        <ul className="space-y-0">
          {plan.capacityRows.map((row, i) => (
            <li
              key={i}
              className={`flex justify-between gap-4 border-b py-2 text-sm last:border-b-0 ${
                isDarkCard ? "border-white/[0.08]" : "border-neutral-100"
              }`}
            >
              <span className={isDarkCard ? "text-neutral-400" : "text-neutral-500"}>{row.label}</span>
              <span className={`font-semibold ${isDarkCard ? "text-neutral-100" : "text-neutral-800"}`}>
                {row.value}
              </span>
            </li>
          ))}
        </ul>
        <p
          className={`mb-3 mt-6 text-[0.65rem] font-bold uppercase tracking-wider ${
            isDarkCard ? "text-neutral-500" : "text-neutral-400"
          }`}
        >
          {plan.includedHeading}
        </p>
        <ul className="flex-1 space-y-2">
          {plan.includedBullets.map((text, i) => (
            <li key={i} className={`flex gap-2 text-sm ${isDarkCard ? "text-neutral-300" : "text-neutral-700"}`}>
              <span
                className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${
                  isDarkCard ? "bg-white/15 text-white" : "bg-brand-mist text-brand-gunmetal"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

```

## `src/components/pricing/PilotSection.tsx`

```tsx
import Link from "next/link";
import { CONTACT_PILOT_URL } from "@/data/contact-links";

export function PilotSection() {
  return (
    <section className="py-section sm:pb-20 sm:pt-16" aria-labelledby="pilot-heading">
      <div className="pricing-inner">
        <div className="flex flex-col items-stretch gap-10 overflow-hidden rounded-2xl border border-brand-gunmetal/10 bg-gradient-to-br from-brand-gunmetal via-brand-gunmetal to-brand-gunmetal-dark px-8 py-12 text-white shadow-medium md:flex-row md:items-center md:gap-12 md:px-12 md:py-14 lg:px-14">
          <div className="flex-1 text-center md:text-left">
            <h2 id="pilot-heading" className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              7-day free pilot: full Growth access
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body text-neutral-300 md:mx-0">
              Connect your Xero or QuickBooks. See your real data in the portal. Every module, every report, full AI. No
              credit card required. After 7 days, pick a tier or walk away.
            </p>
          </div>
          <div className="flex shrink-0 justify-center md:justify-end">
            <Link
              href={CONTACT_PILOT_URL}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-gunmetal shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
            >
              Start your pilot
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/pricing/ConnectorsSection.tsx`

```tsx
import Marquee from "@/components/Marquee";
import { integrationLogos } from "@/data/marquee";

export function ConnectorsSection() {
  return (
    <section className="py-section sm:py-20" aria-label="Connectors">
      <div className="pricing-inner">
        <div className="text-center">
          <p className="section-subheading-flow mx-auto mt-3 text-center">
            Built and maintained by Stratavor. Available on all tiers.
          </p>
        </div>
      </div>
      <div className="mt-10 overflow-x-hidden sm:mt-12">
        <Marquee items={integrationLogos} variant="integrations" />
      </div>
    </section>
  );
}

```

## `src/components/pricing/AddOnsSection.tsx`

```tsx
import { PRICING_ADDONS } from "@/data/pricing-plans";
import { AddOnCard } from "./AddOnCard";
import type { SupportedCurrency } from "@/data/pricing-plans";

export function AddOnsSection({ currency }: { currency: SupportedCurrency }) {
  return (
    <section className="py-section sm:py-20" aria-labelledby="addons-heading">
      <div className="pricing-inner">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start lg:gap-12 xl:gap-16">
          <header className="text-center lg:sticky lg:top-28 lg:text-left">
            <p className="section-label lg:text-left">Add-on</p>
            <h2 id="addons-heading" className="section-heading-flow mx-auto mt-2 lg:mx-0">
              Extend your portal into your existing BI stack
            </h2>
            <p className="section-subheading-flow mx-auto mt-4 text-center lg:mx-0 lg:text-left">
              Optional add-on available on any tier.
            </p>
          </header>
          <div className="mt-10 space-y-6 lg:mt-0 lg:space-y-5">
            {PRICING_ADDONS.map((addon) => (
              <AddOnCard key={addon.id} addon={addon} currency={currency} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/pricing/AddOnCard.tsx`

```tsx
import type { AddOn, SupportedCurrency } from "@/data/pricing-plans";
import { coerceSupportedCurrency } from "@/lib/currency";

interface AddOnCardProps {
  addon: AddOn;
  currency: SupportedCurrency;
}

export function AddOnCard({ addon, currency }: AddOnCardProps) {
  const code = coerceSupportedCurrency(currency);
  const pricePlaceholder =
    typeof addon.pricePlaceholder === "string"
      ? addon.pricePlaceholder
      : (addon.pricePlaceholder[code] ?? addon.pricePlaceholder.EUR);

  const isPowerBi = addon.id === "powerbi";

  return (
    <article
      className={
        "flex flex-col gap-6 rounded-2xl border border-neutral-200 bg-white p-8 shadow-soft transition-all sm:flex-row sm:items-center sm:gap-8 md:p-10 " +
        (isPowerBi
          ? "group cursor-default hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:shadow-medium"
          : "")
      }
    >
      <div
        className={
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl transition-colors " +
          (isPowerBi
            ? "bg-brand-mist-light text-brand-gunmetal group-hover:bg-white/15 group-hover:text-white"
            : "bg-brand-mist-light text-brand-gunmetal")
        }
        aria-hidden
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-7 w-7">
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M3 9h18M9 3v18" />
        </svg>
      </div>
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <h3
          className={
            "text-lg font-semibold text-brand-gunmetal transition-colors " +
            (isPowerBi ? "group-hover:text-white" : "")
          }
        >
          {addon.name}
        </h3>
        <p
          className={
            "mt-2 text-sm text-neutral-600 transition-colors " +
            (isPowerBi ? "group-hover:text-neutral-200" : "")
          }
        >
          {addon.description}
        </p>
        <p
          className={
            "mt-4 font-heading text-xl font-medium text-brand-gunmetal transition-colors " +
            (isPowerBi ? "group-hover:text-white" : "")
          }
        >
          {pricePlaceholder}
        </p>
      </div>
    </article>
  );
}

```

## `src/components/pricing/FeatureComparison.tsx`

```tsx
import { PRICING_COMPARISON } from "@/data/pricing-comparison";

/** Base cell styles; row uses `group` + `hover:bg-brand-gunmetal` for group-hover text on gunmetal. */
function cellClass(value: string): string {
  if (value === "✓") return "text-brand-gunmetal font-semibold group-hover:text-white";
  if (value === "-") return "text-neutral-300 group-hover:text-neutral-400";
  return "text-neutral-600 group-hover:text-white";
}

export function FeatureComparison() {
  return (
    <section className="scroll-mt-24 py-section sm:py-20" aria-labelledby="compare-heading">
      <div className="pricing-inner">
        <header className="text-center md:text-left">
          <h2 id="compare-heading" className="section-heading-flow mx-auto md:mx-0">
            Compare plans
          </h2>
          <p className="section-subheading-flow mx-auto mt-3 text-center md:mx-0 md:text-left">
            Same product. Different capacity.
          </p>
        </header>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-neutral-200/90 bg-white shadow-soft ring-1 ring-black/[0.03] sm:mt-12">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/90">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Feature
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Essentials
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Growth
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON.map((entry, i) =>
                entry.kind === "section" ? (
                  <tr
                    key={`s-${i}`}
                    className="group border-b border-brand-mist/80 bg-brand-mist-light/35 transition-colors hover:border-brand-mist/80 hover:bg-brand-gunmetal"
                  >
                    <td
                      colSpan={4}
                      className="px-5 pb-2 pt-5 text-xs font-bold uppercase tracking-wider text-brand-gunmetal transition-colors group-hover:text-white sm:px-6 sm:pt-6"
                    >
                      {entry.title}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={`r-${i}`}
                    className="group border-b border-neutral-100 transition-colors last:border-b-0 hover:bg-brand-gunmetal"
                  >
                    <td className="px-5 py-3.5 font-medium text-neutral-800 transition-colors group-hover:text-white sm:px-6 sm:py-4">
                      {entry.feature}
                    </td>
                    <td className={`px-5 py-3.5 text-center transition-colors sm:px-6 sm:py-4 ${cellClass(entry.essentials)}`}>
                      {entry.essentials}
                    </td>
                    <td className={`px-5 py-3.5 text-center transition-colors sm:px-6 sm:py-4 ${cellClass(entry.growth)}`}>
                      {entry.growth}
                    </td>
                    <td className={`px-5 py-3.5 text-center transition-colors sm:px-6 sm:py-4 ${cellClass(entry.enterprise)}`}>
                      {entry.enterprise}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/pricing/FAQSection.tsx`

```tsx
"use client";

import { useState } from "react";
import { PRICING_FAQ } from "@/data/pricing-faq";
import { FAQItem } from "./FAQItem";

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-section sm:py-20" aria-labelledby="faq-heading">
      <div className="pricing-inner">
        <div className="lg:grid lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)] lg:items-start lg:gap-14 xl:gap-20">
          <header className="text-center lg:sticky lg:top-28 lg:text-left">
            <h2 id="faq-heading" className="section-heading-flow mx-auto lg:mx-0">
              Common questions
            </h2>
            <p className="section-subheading-flow mx-auto mt-3 text-center lg:mx-0 lg:text-left">
              Plans, pilots, and your data.
            </p>
          </header>
          <div className="mt-10 divide-y divide-neutral-200 border-y border-neutral-200/90 bg-transparent px-4 sm:px-5 lg:mt-0 lg:border lg:border-neutral-200/90 lg:bg-white/60 lg:px-6 lg:shadow-soft lg:ring-1 lg:ring-black/[0.03] lg:backdrop-blur-sm">
            {PRICING_FAQ.map((item) => (
              <FAQItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => setOpenId(openId === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

```

## `src/components/pricing/FAQItem.tsx`

```tsx
"use client";

import type { PricingFAQItem } from "@/data/pricing-faq";

interface FAQItemProps {
  item: PricingFAQItem;
  isOpen: boolean;
  onToggle: () => void;
}

export function FAQItem({ item, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="border-b border-neutral-200 last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="font-semibold text-brand-gunmetal">{item.question}</span>
        <span
          className={`shrink-0 text-neutral-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
          aria-hidden
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        id={`faq-answer-${item.id}`}
        role="region"
        aria-labelledby={`faq-question-${item.id}`}
        className={`overflow-hidden transition-all duration-200 ease-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-5 pr-8 text-neutral-600">{item.answer}</p>
      </div>
    </div>
  );
}

```

## `src/data/pricing-plans.ts`

```typescript
import { formatPlanPrice } from "@/lib/currency";
import type { SupportedCurrency } from "@/types/supported-currency";
import { BOOK_DEMO_CALENDAR_URL, CONTACT_PILOT_URL } from "./contact-links";

export type { SupportedCurrency };
export type BillingPeriod = "monthly" | "annual";

export type MoneyByCurrency = Record<
  SupportedCurrency,
  {
    /** Full monthly price when billed monthly. */
    monthly: number;
    /** Equivalent per month when billed annually (15% off monthly). */
    annual: number;
  }
>;

/** HubSpot payment links per currency and billing period (Essentials / Growth). */
export type CheckoutUrlsByCurrency = Record<
  SupportedCurrency,
  {
    monthly: string;
    annual: string;
  }
>;

/** Annual billing: 15% off, still expressed as per-month figure on the card. */
function pricesFromMonthly(monthlyByCurrency: Record<SupportedCurrency, number>): MoneyByCurrency {
  const keys: SupportedCurrency[] = ["EUR", "USD", "GBP"];
  return Object.fromEntries(
    keys.map((code) => {
      const monthly = monthlyByCurrency[code];
      return [code, { monthly, annual: Math.round(monthly * (1 - 0.15)) }];
    }),
  ) as MoneyByCurrency;
}

export type PlanCtaStyle = "accent" | "outline" | "inverse-outline";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
  /** Legacy single-currency fallback when `prices` is absent (e.g. Enterprise). */
  priceMonthly: number | null;
  priceAnnual: number | null;
  prices?: MoneyByCurrency;
  capacityRows: { label: string; value: string }[];
  includedHeading: string;
  includedBullets: string[];
  cta: string;
  ctaHref: string;
  ctaExternal?: boolean;
  ctaStyle: PlanCtaStyle;
  mostPopular?: boolean;
  /** Ribbon on featured card (e.g. Recommended). */
  ribbonLabel?: string;
  customPriceLabel?: string;
  customPriceSubtext?: string;
  /** When set, CTA opens HubSpot checkout for the selected currency and billing period. */
  checkoutUrls?: CheckoutUrlsByCurrency;
}

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "essentials",
    name: "Essentials",
    description: "For founders and lean finance teams",
    priceMonthly: null,
    priceAnnual: null,
    prices: pricesFromMonthly({ EUR: 199, USD: 230, GBP: 175 }),
    capacityRows: [
      { label: "Core connectors", value: "1" },
      { label: "Custom integrations", value: "-" },
      { label: "Portal users", value: "3" },
      { label: "AI queries / month", value: "100" },
      { label: "Data history", value: "12 months" },
      { label: "Branded exports", value: "Your logo" },
      { label: "Support", value: "Email (48h)" },
    ],
    includedHeading: "Full platform, no feature gates",
    includedBullets: [
      "Intelligence Hub dashboard",
      "Financial Snapshot + PDF export",
      "Management Snapshot",
      "Risk Intelligence + heatmaps",
      "Strategy Delivery",
      "Ask Stratavor (AI chatbot)",
      "Signals inbox + alerts",
    ],
    cta: "Subscribe",
    ctaHref: CONTACT_PILOT_URL,
    ctaStyle: "outline",
    checkoutUrls: {
      EUR: {
        monthly: "https://payments-eu1.hubspot.com/payments/9GyqXQ6m?referrer=PAYMENT_LINK",
        annual: "https://payments-eu1.hubspot.com/payments/C9XpKcTZVGNQQFp?referrer=PAYMENT_LINK",
      },
      GBP: {
        monthly: "https://payments-eu1.hubspot.com/payments/6mfq4ZTYdhfDwJ?referrer=PAYMENT_LINK",
        annual: "https://payments-eu1.hubspot.com/payments/6jHqgmrKf?referrer=PAYMENT_LINK",
      },
      USD: {
        monthly: "https://payments-eu1.hubspot.com/payments/wFh9yZHKWHcqRVtM?referrer=PAYMENT_LINK",
        annual: "https://payments-eu1.hubspot.com/payments/6VXJ2GHTVwtc?referrer=PAYMENT_LINK",
      },
    },
  },
  {
    id: "growth",
    name: "Growth",
    description: "For mid-market finance teams and boards",
    priceMonthly: null,
    priceAnnual: null,
    prices: pricesFromMonthly({ EUR: 499, USD: 575, GBP: 435 }),
    capacityRows: [
      { label: "Core connectors", value: "All available" },
      { label: "Custom integrations", value: "1 included" },
      { label: "Portal users", value: "10" },
      { label: "AI queries / month", value: "500" },
      { label: "Data history", value: "36 months" },
      { label: "Branded exports", value: "Full white-label" },
      { label: "Support", value: "Priority (24h)" },
    ],
    includedHeading: "Everything in Essentials, plus",
    includedBullets: [
      "Cost Saving Intelligence Hub",
      "Benchmarking engine",
      "Multi-user collaboration",
      "Snapshot scheduling",
      "Quarterly review prep",
      "Report layout customisation",
    ],
    cta: "Subscribe",
    ctaHref: CONTACT_PILOT_URL,
    ctaStyle: "accent",
    mostPopular: true,
    ribbonLabel: "Recommended",
    checkoutUrls: {
      EUR: {
        monthly: "https://payments-eu1.hubspot.com/payments/7cRX9RDXxfWwyJw?referrer=PAYMENT_LINK",
        annual: "https://payments-eu1.hubspot.com/payments/VF7JmSFM9?referrer=PAYMENT_LINK",
      },
      GBP: {
        monthly: "https://payments-eu1.hubspot.com/payments/mbbjfR7KmMG2r?referrer=PAYMENT_LINK",
        annual: "https://payments-eu1.hubspot.com/payments/zDnQysSfztjmjJ?referrer=PAYMENT_LINK",
      },
      USD: {
        monthly: "https://payments-eu1.hubspot.com/payments/RHhvRs4NbJxRYwz7?referrer=PAYMENT_LINK",
        annual: "https://payments-eu1.hubspot.com/payments/dkstnGRPGT?referrer=PAYMENT_LINK",
      },
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For CFOs running complex, multi-system operations",
    priceMonthly: null,
    priceAnnual: null,
    customPriceLabel: "Let's talk",
    customPriceSubtext: "Scoped to your organisation",
    capacityRows: [
      { label: "Core connectors", value: "All available" },
      { label: "Custom integrations", value: "Scoped" },
      { label: "Portal users", value: "Unlimited" },
      { label: "AI queries / month", value: "Unlimited" },
      { label: "Data history", value: "Full history" },
      { label: "Branded exports", value: "Full white-label" },
      { label: "Support", value: "Dedicated + onboarding" },
    ],
    includedHeading: "Everything in Growth, plus",
    includedBullets: [
      "Multi-entity consolidation",
      "Custom report templates",
      "Custom integration engineering",
      "SSO + advanced security",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Talk to us",
    ctaHref: BOOK_DEMO_CALENDAR_URL,
    ctaExternal: true,
    ctaStyle: "inverse-outline",
  },
];

const powerBiMonthlyByCurrency: Record<SupportedCurrency, number> = {
  EUR: 149,
  USD: 172,
  GBP: 131,
};

const powerBiPriceByCurrency: Record<SupportedCurrency, string> = {
  EUR: `+${formatPlanPrice(powerBiMonthlyByCurrency.EUR, "EUR")}/mo · any tier`,
  USD: `+${formatPlanPrice(powerBiMonthlyByCurrency.USD, "USD")}/mo · any tier`,
  GBP: `+${formatPlanPrice(powerBiMonthlyByCurrency.GBP, "GBP")}/mo · any tier`,
};

export interface AddOn {
  id: string;
  name: string;
  description: string;
  pricePlaceholder: string | Record<SupportedCurrency, string>;
}

export const PRICING_ADDONS: AddOn[] = [
  {
    id: "powerbi",
    name: "Power BI connector",
    description:
      "Pipe Stratavor-processed data into your Power BI workspace. Pre-built semantic model, Xero/QBO/HubSpot datasets, scheduled refresh. Available on any tier.",
    pricePlaceholder: powerBiPriceByCurrency,
  },
];

```

## `src/data/pricing-comparison.ts`

```typescript
export type ComparisonEntry =
  | { kind: "section"; title: string }
  | {
      kind: "row";
      feature: string;
      essentials: string;
      growth: string;
      enterprise: string;
    };

export const PRICING_COMPARISON: ComparisonEntry[] = [
  { kind: "section", title: "Portal modules" },
  { kind: "row", feature: "Intelligence Hub", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Financial Snapshot + PDF", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Management Snapshot", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Risk Intelligence", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Strategy Delivery", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Ask Stratavor (AI chatbot)", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Signals inbox", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Cost Saving Intelligence Hub", essentials: "-", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Benchmarking engine", essentials: "-", growth: "✓", enterprise: "✓" },
  { kind: "section", title: "Capacity" },
  { kind: "row", feature: "Core connectors", essentials: "1", growth: "All available", enterprise: "All available" },
  { kind: "row", feature: "Custom integrations", essentials: "-", growth: "1 included", enterprise: "Scoped" },
  { kind: "row", feature: "Portal users", essentials: "3", growth: "10", enterprise: "Unlimited" },
  { kind: "row", feature: "AI queries / month", essentials: "100", growth: "500", enterprise: "Unlimited" },
  { kind: "row", feature: "Data history", essentials: "12 months", growth: "36 months", enterprise: "Full history" },
  { kind: "section", title: "Reporting & customisation" },
  {
    kind: "row",
    feature: "Branded PDF exports",
    essentials: "Your logo + Stratavor footer",
    growth: "Full white-label",
    enterprise: "Full white-label",
  },
  { kind: "row", feature: "Report layout customisation", essentials: "-", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Custom report templates", essentials: "-", growth: "-", enterprise: "✓" },
  { kind: "row", feature: "Snapshot scheduling", essentials: "-", growth: "✓", enterprise: "✓" },
  { kind: "section", title: "Enterprise" },
  { kind: "row", feature: "Multi-entity consolidation", essentials: "-", growth: "-", enterprise: "✓" },
  { kind: "row", feature: "SSO + advanced security", essentials: "-", growth: "-", enterprise: "✓" },
  { kind: "row", feature: "API access", essentials: "-", growth: "-", enterprise: "✓" },
  { kind: "row", feature: "Dedicated account manager", essentials: "-", growth: "-", enterprise: "✓" },
  { kind: "section", title: "Support" },
  { kind: "row", feature: "Email support", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Priority support (24h SLA)", essentials: "-", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Dedicated onboarding", essentials: "-", growth: "-", enterprise: "✓" },
];

```

## `src/data/pricing-faq.ts`

```typescript
export interface PricingFAQItem {
  id: string;
  question: string;
  answer: string;
}

export const PRICING_FAQ: PricingFAQItem[] = [
  {
    id: "pilot",
    question: "What's included in the free pilot?",
    answer:
      "Full Growth tier access for 7 days. Connect your Xero or QuickBooks, and see your real data across every module: Intelligence Hub, Financial Snapshot, Risk Intelligence, Cost Saving Hub, AI chatbot, and more. No credit card required. After 7 days, choose a plan or walk away. Your data is deleted automatically.",
  },
  {
    id: "connectors-vs-custom",
    question: "What are core connectors vs custom integrations?",
    answer:
      "Core connectors are integrations built and maintained by Stratavor, currently Xero, QuickBooks Online, and HubSpot, with Deltek Vantagepoint, NetSuite, and Sage on the roadmap. Custom integrations are bespoke connections to systems we don't yet support, scoped and built specifically for your organisation.",
  },
  {
    id: "upgrade",
    question: "Can I upgrade or downgrade at any time?",
    answer:
      "Yes. Move between Essentials and Growth at any time. Upgrades are immediate; downgrades take effect at the end of your billing cycle. Enterprise is scoped individually, so changes go through your account manager.",
  },
  {
    id: "cancel-data",
    question: "What happens to my data if I cancel?",
    answer:
      "You can export all reports and snapshots as PDFs before cancelling. After cancellation, your data is retained for 30 days in case you change your mind, then permanently deleted in line with our GDPR-compliant data handling policy.",
  },
  {
    id: "launch-pricing",
    question: 'What does "Launch pricing" mean?',
    answer:
      "These prices are available to early adopters during our launch period. Clients who sign up at launch pricing keep their rate for as long as their subscription remains active, even if we raise prices for new customers later.",
  },
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "Yes. Stratavor uses read-only OAuth connections (we never store your credentials), encryption in transit and at rest, role-based access controls, and full audit logging. We're SOC 2 readiness-aligned with ISO 27001 and GDPR-compliant data handling. Every insight can be traced back to its source data.",
  },
];

```

## `src/lib/currency.ts`

```typescript
import type { SupportedCurrency } from "@/types/supported-currency";

/** Avoid Intl.RangeError / TypeError when RSC props or data are unexpectedly missing at runtime. */
export function coerceSupportedCurrency(value: unknown): SupportedCurrency {
  if (value === "EUR" || value === "USD" || value === "GBP") return value;
  return "EUR";
}

/** Geo headers from Vercel / Cloudflare; default EUR (IE + rest). */
export function initialCurrencyFromGeoHeaders(
  getHeader: (name: string) => string | null | undefined,
): SupportedCurrency {
  const country =
    getHeader("x-vercel-ip-country")?.toUpperCase() ??
    getHeader("cf-ipcountry")?.toUpperCase() ??
    null;
  return country === "US" ? "USD" : country === "GB" ? "GBP" : "EUR";
}

export function formatPlanPrice(amount: number, currency: SupportedCurrency): string {
  const code = coerceSupportedCurrency(currency);
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return "-";
  }
  // Intentionally no cents for plan pricing.
  // Using en-US for consistent separators while keeping correct currency symbol.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(amount);
}


```

## `src/data/contact-links.ts`

```typescript
const DEFAULT_BOOK_DEMO_CALENDAR =
  "https://meetings-eu1.hubspot.com/jamie-saveall/group-schedule";

/** HubSpot group schedule — used for "Book a demo" CTAs site-wide. Override via NEXT_PUBLIC_BOOK_DEMO_CALENDAR_URL. */
export const BOOK_DEMO_CALENDAR_URL =
  (typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_BOOK_DEMO_CALENDAR_URL?.trim()) ||
  DEFAULT_BOOK_DEMO_CALENDAR;

/** Contact form deep links (must stay in sync with contact page handling). */
export const CONTACT_LOGIN_URL = "https://app.stratavor.com/login";
/** Same as BOOK_DEMO_CALENDAR_URL — demo bookings use HubSpot; /contact?intent=demo redirects there. */
export const CONTACT_DEMO_URL = BOOK_DEMO_CALENDAR_URL;
export const CONTACT_PILOT_URL = "/contact?intent=pilot";
export const CONTACT_SECURITY_URL = "/contact?intent=security";
export const CONTACT_GENERAL_URL = "/contact?intent=general";

```

## `src/lib/site-url.ts`

```typescript
const DEFAULT_SITE_ORIGIN = "https://stratavor.com";

/**
 * Canonical site origin for metadata, sitemaps, and JSON-LD.
 * Set NEXT_PUBLIC_SITE_URL on preview/staging (e.g. https://project.vercel.app) so OG/canonicals match the host.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_ORIGIN;
  try {
    const u = new URL(raw);
    return u.origin;
  } catch {
    return DEFAULT_SITE_ORIGIN;
  }
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

```

## `src/types/supported-currency.ts`

```typescript
export type SupportedCurrency = "EUR" | "USD" | "GBP";

```

## `src/components/Marquee.tsx`

```tsx
"use client";

import Image from "next/image";
import { Fragment, useState, useEffect, useRef } from "react";
import type { LogoItem } from "@/data/marquee";

export type { LogoItem as MarqueeItemLogo } from "@/data/marquee";

type MarqueeProps = {
  items: LogoItem[];
  variant?: "trusted" | "integrations";
  /** Dark gunmetal band (trusted row on home). */
  surface?: "light" | "dark";
};

function LogoSlot({
  item,
  variant,
  grayscale,
  surface,
}: {
  item: LogoItem;
  variant: "trusted" | "integrations";
  grayscale?: boolean;
  surface?: "light" | "dark";
}) {
  const isTrustedDark = variant === "trusted" && surface === "dark";

  if (isTrustedDark) {
    if (item.src) {
      return (
        <div className="flex min-h-12 shrink-0 items-center justify-center px-4">
          <Image
            src={item.src}
            alt={item.alt}
            width={120}
            height={40}
            className="h-9 max-h-10 w-auto object-contain opacity-85 transition-opacity duration-300 hover:opacity-100"
          />
        </div>
      );
    }
    return (
      <div
        className="flex min-h-12 min-w-[5.5rem] shrink-0 items-center justify-center px-5 font-heading text-lg font-medium tracking-wide text-white/75 transition-colors duration-300 hover:text-white sm:text-xl"
        aria-hidden
      >
        {item.name}
      </div>
    );
  }

  const base =
    surface === "dark" && variant === "trusted"
      ? "flex shrink-0 items-center justify-center text-sm font-medium text-white/85"
      : "flex shrink-0 items-center justify-center text-sm font-medium text-neutral-500";
  const trusted =
    surface === "dark"
      ? "h-12 w-32 rounded-lg border border-white/15 bg-white/10 px-6"
      : "h-12 w-32 rounded-lg bg-neutral-100 px-6";
  const integrations =
    "min-w-[5.5rem] shrink-0 items-center justify-center px-5 py-2 text-neutral-600";

  const imgH = variant === "integrations" ? "h-9" : "h-8";
  const imgFilter =
    grayscale === undefined
      ? "grayscale transition-all duration-300"
      : grayscale
        ? "grayscale transition-all duration-300"
        : "grayscale-0 transition-all duration-300";

  if (item.src) {
    const integrationsScale =
      variant === "integrations" ? (item.logoScale ?? 1) : 1;
    /** Home + pricing integrations marquee: logos 1.5× previous 2.25rem base. */
    const integrationsSizeMul = variant === "integrations" ? 1.5 : 1;
    const integrationsHeightRem = 2.25 * integrationsScale * integrationsSizeMul;
    const integrationsSlotMinRem =
      variant === "integrations"
        ? Math.max(
            4.75 * integrationsSizeMul,
            integrationsHeightRem + 0.4 * integrationsSizeMul,
          )
        : undefined;

    return (
      <div
        className={`${base} ${variant === "trusted" ? trusted : integrations}`}
        style={
          integrationsSlotMinRem != null
            ? { minHeight: `${integrationsSlotMinRem}rem` }
            : undefined
        }
      >
        <Image
          src={item.src}
          alt={item.alt}
          width={120}
          height={40}
          className={
            variant === "integrations"
              ? `w-auto object-contain ${imgFilter}`
              : `${imgH} w-auto object-contain ${imgFilter}`
          }
          style={
            variant === "integrations"
              ? { height: `${integrationsHeightRem}rem`, width: "auto" }
              : undefined
          }
        />
      </div>
    );
  }
  return (
    <div
      className={`${base} ${variant === "trusted" ? trusted : integrations}`}
      aria-hidden
    >
      {item.name}
    </div>
  );
}

function MarqueeSeparator() {
  return (
    <span
      className="inline-flex shrink-0 select-none items-center self-center px-1 font-heading text-2xl leading-none text-white/25 sm:text-[1.75rem]"
      aria-hidden
    >
      ·
    </span>
  );
}

export default function Marquee({
  items,
  variant = "trusted",
  surface = "light",
}: MarqueeProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isTrustedDark = variant === "trusted" && surface === "dark";
  const marqueeDurationSec = isTrustedDark ? 42 : 30;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = () => setPrefersReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isIntegrations = variant === "integrations";

  /** One loop of content; duplicated as two siblings so translateX(-50%) is pixel-seamless. */
  function MarqueeSegment({
    copyId,
    ariaHidden,
  }: {
    copyId: string;
    ariaHidden?: boolean;
  }) {
    if (isTrustedDark) {
      return (
        <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
          {items.map((item, i) => (
            <Fragment key={`${copyId}-${item.name}-${i}`}>
              {i > 0 ? <MarqueeSeparator /> : null}
              <LogoSlot
                item={item}
                variant={variant}
                surface={surface}
                grayscale={isIntegrations ? false : true}
              />
            </Fragment>
          ))}
        </div>
      );
    }
    const gapClass = variant === "integrations" ? "gap-8" : "gap-4";
    return (
      <div
        className={`flex shrink-0 items-center ${gapClass}`}
        aria-hidden={ariaHidden || undefined}
      >
        {items.map((item, i) => (
          <LogoSlot
            key={`${copyId}-${item.name}-${i}`}
            item={item}
            variant={variant}
            surface={surface}
            grayscale={isIntegrations ? false : true}
          />
        ))}
      </div>
    );
  }

  if (prefersReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`flex flex-wrap items-center justify-center gap-1 sm:gap-0 ${isTrustedDark ? "gap-x-0 gap-y-2" : "gap-4"}`}
      >
        {items.map((item, i) => (
          <Fragment key={`${item.name}-${i}`}>
            {isTrustedDark && i > 0 ? <MarqueeSeparator /> : null}
            <LogoSlot
              item={item}
              variant={variant}
              surface={surface}
              grayscale={isIntegrations ? false : true}
            />
          </Fragment>
        ))}
      </div>
    );
  }

  const scrollStyle = {
    animation: `marquee-h ${marqueeDurationSec}s linear infinite`,
  };

  return (
    <div ref={containerRef} className="relative flex items-center gap-3">
      <div className="marquee-mask min-w-0 flex-1 overflow-hidden">
        <div
          className="flex w-max whitespace-nowrap will-change-transform"
          style={scrollStyle}
        >
          <MarqueeSegment copyId="a" />
          <MarqueeSegment copyId="b" ariaHidden />
        </div>
      </div>
    </div>
  );
}

```

## `src/data/marquee.ts`

```typescript
/**
 * TODO: Replace with real assets and data.
 * - trustedByLogos: Add logo files to public/images/logos/trusted/
 * - integrationLogos: Add logo files to public/images/logos/integrations/
 * - whatWeDoImages: Product screenshots in public/hero/ (same set as the home hero carousel)
 */

export type LogoItem = {
  src?: string;
  alt: string;
  name: string;
  /** Integrations marquee only: multiplier on default logo height (1 = baseline) for visual balance. */
  logoScale?: number;
};

export type ImageItem = {
  src: string;
  alt: string;
  /** Short label for UI and chat context */
  title: string;
  /** On-page caption: what the screenshot shows and why it matters */
  description: string;
  bullet?: string;
};

// TODO: Add real logo files to public/images/logos/trusted/ and set src
export const trustedByLogos: LogoItem[] = [
  { alt: "Finance teams", name: "Finance" },
  { alt: "Strategy leaders", name: "Strategy" },
  { alt: "Board members", name: "Board" },
  { alt: "FP&A teams", name: "FP&A" },
  { alt: "Executive teams", name: "Executive" },
  { alt: "CFOs", name: "CFO" },
];

export const integrationLogos: LogoItem[] = [
  { src: "/images/logos/integrations/microsoft.png", alt: "Microsoft", name: "Microsoft" },
  { src: "/images/logos/integrations/stripe.png", alt: "Stripe", name: "Stripe" },
  {
    src: "/images/logos/integrations/oracle-netsuite.png",
    alt: "Oracle NetSuite",
    name: "Oracle NetSuite",
    logoScale: 1.2,
  },
  { src: "/images/logos/integrations/hubspot.png", alt: "HubSpot", name: "HubSpot" },
  { src: "/images/logos/integrations/google.png", alt: "Google", name: "Google" },
  { src: "/images/logos/integrations/xero.png", alt: "Xero", name: "Xero", logoScale: 1.2 },
  {
    src: "/images/logos/integrations/quickbooks.png",
    alt: "QuickBooks",
    name: "QuickBooks",
    logoScale: 3.5,
  },
];

/** Hero platform animation: `maxHeightPx` caps rendered logo size in the diagram (PNG or SVG). */
export type HeroIntegrationLogo = {
  src: string;
  alt: string;
  maxHeightPx: number;
};

/** Xero + QuickBooks in the hero diagram only (SVG; same box size). Rest of site uses integration logos. */
export const HERO_ACCOUNTING_LOGOS: readonly HeroIntegrationLogo[] = [
  { src: "/images/hero/accounting-xero.svg", alt: "Xero", maxHeightPx: 48 },
  { src: "/images/hero/accounting-quickbooks.svg", alt: "QuickBooks", maxHeightPx: 48 },
];

/** Google + Windows in the hero diagram only (SVG; same box size). Rest of site uses integration logos. */
export const HERO_WORKSPACE_LOGOS: readonly HeroIntegrationLogo[] = [
  { src: "/images/hero/workspace-google.svg", alt: "Google", maxHeightPx: 34 },
  { src: "/images/hero/workspace-windows.svg", alt: "Microsoft Windows", maxHeightPx: 34 },
];

export const HERO_ERP_LOGO: HeroIntegrationLogo = {
  src: "/images/logos/integrations/oracle-netsuite.png",
  alt: "Oracle NetSuite",
  maxHeightPx: 74,
};

export const HERO_CRM_LOGO: HeroIntegrationLogo = {
  src: "/images/logos/integrations/hubspot.png",
  alt: "HubSpot",
  maxHeightPx: 68,
};

export const whatWeDoImages: ImageItem[] = [
  {
    src: "/hero/intelligence-hub.png",
    alt: "Stratavor Intelligence Hub dashboard with executive summary and KPI cards",
    title: "Intelligence Hub",
    description:
      "Your executive cockpit: KPI cards, summaries, and health signals in one place so leadership scans performance without opening five tools.",
  },
  {
    src: "/hero/reporting-snapshots.png",
    alt: "Stratavor Reporting Snapshots library with report types and ready-to-view reports",
    title: "Reporting snapshots",
    description:
      "A library of ready-to-view report types—pick a snapshot, drill in, and share consistent narratives instead of rebuilding decks from scratch.",
  },
  {
    src: "/hero/risk-intelligence.png",
    alt: "Stratavor Risk Intelligence risk register with scores and AI-suggested mitigations",
    title: "Risk intelligence",
    description:
      "A live risk register with scores and AI-suggested mitigations, so concentrations and threshold breaches surface before they hit the board deck.",
  },
  {
    src: "/hero/dashboard-with-chat.png",
    alt: "Stratavor dashboard with Ask Stratavor AI assistant panel open alongside reporting",
    title: "Insights beside your data",
    description:
      "Keep reporting on screen while Ask Stratavor answers follow-ups in plain language—explore variances without losing your place in the numbers.",
  },
  {
    src: "/hero/ask-stratavor.png",
    alt: "Ask Stratavor AI chat with suggested questions and input field",
    title: "Ask Stratavor",
    description:
      "Suggested questions and a natural-language input so anyone can probe drivers, periods, and talking points without writing SQL or pivot tables.",
  },
];

```

## `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gunmetal: "var(--gunmetal)",
          "gunmetal-dark": "var(--gunmetal-dark)",
          ash: "var(--ash)",
          mist: "var(--mist)",
          "mist-light": "var(--mist-light)",
          accent: "var(--accent)",
          "accent-hover": "var(--accent-hover)",
          "accent-light": "var(--accent-light)",
          "label-red": "var(--label-red)",
        },
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
        surface: {
          primary: "var(--surface-primary)",
          secondary: "var(--surface-secondary)",
          tertiary: "var(--surface-tertiary)",
          inverse: "var(--surface-inverse)",
          accent: "var(--surface-accent)",
        },
        semantic: {
          success: "var(--success)",
          "success-light": "var(--success-light)",
          info: "var(--info)",
          "info-light": "var(--info-light)",
          warning: "var(--warning)",
          "warning-light": "var(--warning-light)",
        },
      },
      maxWidth: {
        content: "var(--max-content)",
      },
      padding: {
        content: "var(--content-padding)",
        section: "var(--section-y)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        glow: "var(--shadow-glow)",
        header: "var(--shadow-header)",
        "header-scrolled": "var(--shadow-header-scrolled)",
      },
      fontFamily: {
        heading: ["var(--font-heading)"],
        body: ["var(--font-body)"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.875rem", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
        display: ["2.75rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        "heading-lg": ["2rem", { lineHeight: "1.2", letterSpacing: "-0.015em", fontWeight: "600" }],
        heading: ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em", fontWeight: "600" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
      },
      transitionTimingFunction: {
        "out-expo": "var(--ease-out-expo)",
        "out-quart": "var(--ease-out-quart)",
      },
      transitionDuration: {
        instant: "var(--duration-instant)",
        fast: "var(--duration-fast)",
        normal: "var(--duration-normal)",
        slow: "var(--duration-slow)",
        emphasis: "var(--duration-emphasis)",
      },
    },
  },
  plugins: [],
};

export default config;

```

## `src/app/globals.css`

```css
@import "../styles/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    @apply bg-neutral-50 font-body text-neutral-700 antialiased;
  }

  h1, h2, h3, h4 {
    @apply font-heading text-neutral-900;
    letter-spacing: -0.02em;
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-brand-gunmetal;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
}

@layer components {
  /* ── Edge fade mask for marquees ── */
  .marquee-mask {
    mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
  }

  /* ── Section label ── */
  .section-label {
    @apply text-caption font-semibold uppercase tracking-widest text-brand-gunmetal;
  }

  /* ── Button primitives ── */
  .btn {
    @apply inline-flex items-center justify-center font-semibold transition-all;
    @apply rounded-xl text-[15px] px-7 py-3.5;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2;
  }

  .btn-primary {
    @apply btn border-2 border-brand-gunmetal bg-brand-gunmetal text-white shadow-soft;
    @apply hover:bg-white hover:text-brand-gunmetal hover:shadow-medium;
    @apply focus-visible:ring-brand-gunmetal focus-visible:ring-offset-white;
  }

  /** Same flip as btn-primary, compact for header / toolbars */
  .btn-primary-sm {
    @apply inline-flex shrink-0 items-center justify-center rounded-xl border-2 border-brand-gunmetal bg-brand-gunmetal px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all;
    @apply hover:bg-white hover:text-brand-gunmetal hover:shadow-medium;
    @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 focus-visible:ring-offset-white;
  }

  .btn-outline {
    @apply btn border border-neutral-200 bg-white text-brand-gunmetal;
    @apply hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white;
    @apply focus-visible:ring-brand-gunmetal focus-visible:ring-offset-white;
  }

  /* ── Card primitive ── */
  .card {
    @apply rounded-xl border border-neutral-200 bg-white shadow-soft transition-all;
  }

  .card-lift {
    @apply card;
    @apply duration-300 hover:-translate-y-1 hover:shadow-medium;
  }

  /* ── Section header ── */
  .section-heading {
    @apply mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl 2xl:text-5xl;
  }

  .section-subheading {
    @apply mx-auto mt-6 max-w-xl text-center text-body-lg text-neutral-600 2xl:max-w-2xl 2xl:text-xl;
  }

  /* ── Pricing page: rhythm + width (less “stacked centered blocks”) ── */
  .pricing-inner {
    @apply mx-auto w-full max-w-content px-content lg:px-8;
  }

  .section-heading-flow {
    @apply max-w-3xl text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl 2xl:text-5xl;
  }

  .section-subheading-flow {
    @apply mt-4 max-w-2xl text-body-lg text-neutral-600 2xl:max-w-3xl 2xl:text-xl;
  }

  .pricing-band-divider {
    border-top: 1px solid color-mix(in srgb, var(--neutral-200) 72%, transparent);
  }

  /* ── Chat assistant (floating widget) ── */
  .chat-panel-animate-in {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }

  .chat-launcher-ring {
    position: absolute;
    inset: -4px;
    border-radius: 9999px;
    border: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
    pointer-events: none;
    opacity: 0.45;
  }

  .chat-typing-dot {
    width: 6px;
    height: 6px;
    border-radius: 9999px;
    background: var(--neutral-400);
    animation: chat-typing-bounce 1.05s ease-in-out infinite;
  }

  .chat-typing-dot:nth-child(2) {
    animation-delay: 0.15s;
  }

  .chat-typing-dot:nth-child(3) {
    animation-delay: 0.3s;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .chat-panel-animate-in {
    animation: chat-panel-in 0.24s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  .chat-launcher-ring {
    animation: chat-launcher-pulse 2.75s ease-in-out infinite;
  }
}

@keyframes chat-panel-in {
  from {
    opacity: 0;
    transform: translate3d(0, 10px, 0) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes chat-launcher-pulse {
  0%,
  100% {
    opacity: 0.28;
    transform: scale(1);
  }
  50% {
    opacity: 0.55;
    transform: scale(1.06);
  }
}

@keyframes chat-typing-bounce {
  0%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
    opacity: 0.45;
  }
  40% {
    transform: translate3d(0, -5px, 0);
    opacity: 1;
  }
}

/* Marquee animations (transform only, GPU-composited) */
@keyframes marquee-h {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(-50%, 0, 0); }
}

```

## `src/styles/tokens.css`

```css
/**
 * Stratavor design tokens: enterprise brand system
 * Tier 1: Primitive values (colors, spacing, type)
 * Tier 2: Semantic aliases (surfaces, text, interactive)
 * Dark-mode ready: swap semantic vars under [data-theme="dark"]
 */

:root {
  /* ── Typography ── */
  --font-heading: var(--font-plex-serif), "IBM Plex Serif", Georgia, "Times New Roman", serif;
  --font-body: var(--font-plex-sans), "IBM Plex Sans", system-ui, sans-serif;

  /* ── Brand core (primitives) ── */
  --gunmetal: #395460;
  --gunmetal-dark: #2a3f4a;
  --ash: #979A9C;
  --mist: #D1D7DA;
  --mist-light: #E8ECEE;

  /* Accent – warm coral-orange */
  --accent: #E8683A;
  --accent-hover: #D45A2E;
  --accent-light: #FEF3EE;
  --accent-glow: rgba(232, 104, 58, 0.15);

  /* Section labels */
  --label-red: #E53935;

  /* Success / Info / Warning */
  --success: #22C55E;
  --success-light: #F0FDF4;
  --info: #3B82F6;
  --info-light: #EFF6FF;
  --warning: #F59E0B;
  --warning-light: #FFFBEB;

  /* ── Neutrals (primitives) ── */
  --neutral-50: #F8F9FA;
  --neutral-100: #F1F3F5;
  --neutral-200: #E2E6E9;
  --neutral-300: #CED4DA;
  --neutral-400: #ADB5BD;
  --neutral-500: #868E96;
  --neutral-600: #596068;
  --neutral-700: #3D4550;
  --neutral-800: #2A3038;
  --neutral-900: #1A1F25;

  /* ── Semantic surfaces ── */
  --surface-primary: #FFFFFF;
  --surface-secondary: var(--neutral-50);
  --surface-tertiary: var(--neutral-100);
  --surface-inverse: var(--gunmetal);
  --surface-accent: var(--accent-light);

  /* ── Semantic text ── */
  --text-primary: var(--neutral-900);
  --text-secondary: var(--neutral-600);
  --text-tertiary: var(--neutral-500);
  --text-inverse: #FFFFFF;
  --text-brand: var(--gunmetal);
  --text-accent: var(--accent);

  /* ── Semantic borders ── */
  --border-default: var(--neutral-200);
  --border-strong: var(--neutral-300);
  --border-focus: var(--gunmetal);

  /* ── Layout ── */
  --max-content: 1500px;
  --content-padding: clamp(1.25rem, 5vw, 2.5rem);

  /* ── Spacing scale (4px base) ── */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  /* Section spacing */
  --section-y: clamp(4rem, 8vw, 7rem);

  /* ── Radii ── */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-2xl: 1.25rem;
  --radius-full: 9999px;

  /* ── Shadows – layered for depth ── */
  --shadow-xs: 0 1px 2px 0 rgb(0 0 0 / 0.04);
  --shadow-soft: 0 2px 8px -2px rgb(0 0 0 / 0.06), 0 1px 3px -1px rgb(0 0 0 / 0.04);
  --shadow-medium: 0 8px 24px -4px rgb(0 0 0 / 0.08), 0 4px 8px -2px rgb(0 0 0 / 0.04);
  --shadow-large: 0 20px 60px -12px rgb(0 0 0 / 0.12), 0 8px 16px -4px rgb(0 0 0 / 0.06);
  --shadow-glow: 0 0 48px -12px var(--accent-glow);
  --shadow-header: 0 1px 0 rgb(0 0 0 / 0.04);
  --shadow-header-scrolled: 0 4px 20px -4px rgb(0 0 0 / 0.08), 0 1px 3px -1px rgb(0 0 0 / 0.04);

  /* ── Motion tiers ── */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
  --duration-instant: 100ms;
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
  --duration-emphasis: 600ms;
}

```

