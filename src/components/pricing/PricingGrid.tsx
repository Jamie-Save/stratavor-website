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
