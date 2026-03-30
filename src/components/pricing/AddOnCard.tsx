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
