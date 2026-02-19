"use client";

import { useState } from "react";
import Link from "next/link";

type Billing = "monthly" | "yearly";

const YEARLY_DISCOUNT = 0.75; // 25% off

const tiers = [
  {
    id: "financials" as const,
    name: "Financials",
    tagline: "Correctness and visibility. The foundation of the strategy stack.",
    monthly: 129,
    yearlyPerMonth: 97,
    addon: { label: "Advanced Financials", monthly: 249 },
    features: [
      { text: "P&L, Balance Sheet, Cash Flow", included: true },
      { text: "Automated Sync", included: true },
      { text: "Capital health & liquidity depth", included: false },
      { text: "Margin & efficiency analysis", included: false },
    ],
    cta: "Select Financials",
  },
  {
    id: "management" as const,
    name: "Management",
    recommended: true,
    tagline: "Decision intelligence for leadership teams and boards.",
    monthly: 399,
    yearlyPerMonth: 299,
    addon: { label: "Advanced Management", monthly: 349 },
    features: [
      { text: "Everything in Core Financials", included: true },
      { text: "Interpretive AI Narratives", included: true },
      { text: "Churn & retention analysis", included: false },
      { text: "Risk & resilience tracking", included: false },
    ],
    cta: "Select Management",
  },
  {
    id: "strategy" as const,
    name: "Strategy",
    tagline: "Unified intelligence across every strategic dimension.",
    monthly: 999,
    yearlyPerMonth: 749,
    allIncluded: true,
    features: [
      { text: "Full Financial & Mgmt Suite", included: true },
      { text: "Strategic Initiatives & OKRs", included: true },
      { text: "Macro Trends & Context", included: true },
      { text: "Dedicated Account Manager", included: true },
    ],
    cta: "Select Strategy",
  },
];

const compareRows: { capability: string; financials: string; management: string; strategy: string }[] = [
  { capability: "Core Financial Statements", financials: "Real-time P&L, Balance Sheet, and Cash Flow with drill-down.", management: "", strategy: "" },
  { capability: "Integrations", financials: "Direct sync with Xero, QuickBooks, and Sage.", management: "", strategy: "" },
  { capability: "Capital Health & Liquidity", financials: "Advanced Add-on", management: "Advanced Add-on", strategy: "" },
  { capability: "Revenue & Margin Drivers", financials: "Advanced Add-on", management: "Advanced Add-on", strategy: "Advanced Add-on" },
  { capability: "Interpretive AI Narratives", financials: "", management: "Automated strategic commentary on monthly performance.", strategy: "" },
  { capability: "Board Pack Automation", financials: "", management: "✓", strategy: "" },
  { capability: "Churn & Retention Analysis", financials: "", management: "Advanced Add-on", strategy: "" },
  { capability: "Risk & Resilience Tracking", financials: "", management: "Advanced Add-on", strategy: "" },
  { capability: "Strategic Initiatives & OKRs", financials: "", management: "", strategy: "✓" },
  { capability: "Macro Trends & External Context", financials: "", management: "", strategy: "✓" },
  { capability: "Multi-Entity Support", financials: "", management: "", strategy: "✓" },
  { capability: "Account Management", financials: "Shared", management: "Shared", strategy: "Dedicated" },
];

type AddonTierId = "financials" | "management";

export function PricingContent() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [addonChecked, setAddonChecked] = useState<Record<AddonTierId, boolean>>({
    financials: false,
    management: false,
  });

  function getDisplayPrice(tier: (typeof tiers)[0]): number {
    if (tier.allIncluded) {
      return billing === "monthly" ? tier.monthly : tier.yearlyPerMonth;
    }
    const base = billing === "monthly" ? tier.monthly : tier.yearlyPerMonth;
    const addon = tier.addon;
    if (!addon) return base;
    const checked = addonChecked[tier.id as AddonTierId];
    if (!checked) return base;
    const addonPerMonth = billing === "monthly" ? addon.monthly : Math.round(addon.monthly * YEARLY_DISCOUNT);
    return base + addonPerMonth;
  }

  function getAddonPerMonth(tier: (typeof tiers)[0]): number {
    if (!tier.addon) return 0;
    return billing === "monthly" ? tier.addon.monthly : Math.round(tier.addon.monthly * YEARLY_DISCOUNT);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-white py-section" aria-labelledby="pricing-heading">
        <div className="mx-auto max-w-content px-content text-center lg:px-8">
          <h1
            id="pricing-heading"
            className="text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg"
          >
            Start with truth.<br />Add judgement.
          </h1>
          <p className="mt-6 text-lg text-neutral-600 sm:text-xl">
            An intelligence architecture designed for scale.
          </p>

          {/* Billing toggle */}
          <div
            className="mt-10 flex items-center justify-center gap-3"
            role="group"
            aria-label="Billing period"
          >
            <span
              className={`text-sm font-medium transition-colors ${
                billing === "monthly" ? "text-brand-gunmetal" : "text-neutral-500"
              }`}
            >
              Monthly
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={billing === "yearly"}
              aria-label="Toggle yearly billing"
              onClick={() => setBilling((b) => (b === "monthly" ? "yearly" : "monthly"))}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 ${
                billing === "yearly" ? "bg-brand-gunmetal" : "bg-neutral-200"
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-soft transition-transform ${
                  billing === "yearly" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium transition-colors ${
                billing === "yearly" ? "text-brand-gunmetal" : "text-neutral-500"
              }`}
            >
              Yearly <span className="text-brand-gunmetal">25% Discount</span>
            </span>
          </div>
        </div>
      </section>

      {/* Tier cards */}
      <section className="bg-neutral-50 py-section" aria-labelledby="plans-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <h2 id="plans-heading" className="sr-only">
            Pricing plans
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {tiers.map((tier) => (
              <article
                key={tier.id}
                className={`relative flex flex-col rounded-2xl border-2 bg-white p-8 shadow-soft transition-all duration-200 hover:shadow-medium ${
                  tier.recommended
                    ? "border-brand-gunmetal shadow-medium"
                    : "border-neutral-200 hover:border-neutral-300"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-gunmetal px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
                    Recommended
                  </span>
                )}
                <h3 className="text-xl font-semibold text-brand-gunmetal">{tier.name}</h3>
                <p className="mt-2 text-sm text-neutral-600">{tier.tagline}</p>
                <div className="mt-6">
                  <span className="text-3xl font-bold tracking-tight text-neutral-900">
                    € {getDisplayPrice(tier)}
                  </span>
                  <span className="text-neutral-600"> /mo</span>
                </div>
                {tier.addon && !tier.allIncluded && (
                  <label className="mt-3 flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={addonChecked[tier.id as AddonTierId]}
                      onChange={(e) =>
                        setAddonChecked((prev) => ({ ...prev, [tier.id]: e.target.checked }))
                      }
                      className="mt-1 h-4 w-4 shrink-0 rounded border-neutral-300 text-brand-gunmetal focus:ring-2 focus:ring-brand-gunmetal focus:ring-offset-0"
                      aria-label={`Add ${tier.addon.label} for +€${getAddonPerMonth(tier)}/mo`}
                    />
                    <span className="text-sm text-neutral-700">
                      {tier.addon.label} +€{getAddonPerMonth(tier)}/mo
                    </span>
                  </label>
                )}
                {tier.allIncluded && (
                  <p className="mt-3 text-sm font-medium text-brand-gunmetal">
                    ✓ Includes All Advanced Modules
                  </p>
                )}
                <ul className="mt-8 flex-1 space-y-3">
                  {tier.features.map((f, i) => {
                    const showAsIncluded =
                      f.included || (tier.addon && addonChecked[tier.id as AddonTierId]);
                    return (
                      <li
                        key={i}
                        className={`flex items-start gap-2 text-sm ${showAsIncluded ? "text-neutral-700" : "text-neutral-400"}`}
                      >
                        {showAsIncluded ? (
                          <span className="mt-0.5 shrink-0 text-brand-gunmetal" aria-hidden>✓</span>
                        ) : (
                          <span className="mt-0.5 shrink-0 text-neutral-400" aria-hidden>○</span>
                        )}
                        <span>{f.text}</span>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-brand-gunmetal px-6 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-gunmetal-dark hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2"
                >
                  {tier.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Compare table */}
      <section className="bg-white py-section" aria-labelledby="compare-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <h2
            id="compare-heading"
            className="text-center text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl"
          >
            Compare Capabilities
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-neutral-600">
            Choose the depth of intelligence your organization requires.
          </p>
          <div className="mt-12 overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50">
                  <th className="px-6 py-4 font-semibold text-neutral-900">Capability</th>
                  <th className="px-6 py-4 font-semibold text-neutral-900">Financials</th>
                  <th className="px-6 py-4 font-semibold text-neutral-900">Management</th>
                  <th className="px-6 py-4 font-semibold text-neutral-900">Strategy</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/80"
                  >
                    <td className="px-6 py-4 font-medium text-neutral-800">{row.capability}</td>
                    <td className="px-6 py-4 text-neutral-600">{row.financials || "—"}</td>
                    <td className="px-6 py-4 text-neutral-600">{row.management || "—"}</td>
                    <td className="px-6 py-4 text-neutral-600">{row.strategy || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bespoke Strategy */}
      <section className="bg-neutral-50 py-section" aria-labelledby="bespoke-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <p className="section-label text-center">Outside Subscription</p>
          <h2
            id="bespoke-heading"
            className="mt-2 text-center text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl"
          >
            Bespoke Strategy
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-600">
            High-touch engagements for pricing architecture, capital allocation, and business model
            transformation. Scoped for impact.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl bg-brand-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-accent-hover hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
            >
              Request Strategic Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
