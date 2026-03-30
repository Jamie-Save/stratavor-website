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
