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
