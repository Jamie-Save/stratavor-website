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
