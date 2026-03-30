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
      <button
        type="button"
        role="switch"
        aria-checked={isAnnual}
        aria-label="Toggle annual billing"
        onClick={() => onBillingChange(isAnnual ? "monthly" : "annual")}
        className={
          "relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 " +
          (isAnnual ? "bg-brand-gunmetal" : "bg-neutral-200")
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
