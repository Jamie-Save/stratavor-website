import { formatPlanPrice } from "@/lib/currency";
import type { SupportedCurrency } from "@/types/supported-currency";
import { CONTACT_PILOT_URL } from "./contact-links";

export type { SupportedCurrency };
export type BillingPeriod = "monthly" | "annual";

export type MoneyByCurrency = Record<
  SupportedCurrency,
  {
    monthly: number;
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

/** Scale EUR list prices to USD/GBP using the same ratios as the legacy Finance Intelligence tier. */
function eurScaledMoney(monthlyEur: number, annualEur: number): MoneyByCurrency {
  const usdFactor = 649 / 590;
  const gbpFactor = 519 / 590;
  return {
    EUR: { monthly: monthlyEur, annual: annualEur },
    USD: { monthly: Math.round(monthlyEur * usdFactor), annual: Math.round(annualEur * usdFactor) },
    GBP: { monthly: Math.round(monthlyEur * gbpFactor), annual: Math.round(annualEur * gbpFactor) },
  };
}

export type PlanCtaStyle = "accent" | "outline" | "inverse-outline";

export interface PricingPlan {
  id: string;
  name: string;
  description: string;
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
    priceMonthly: 199,
    priceAnnual: 169,
    prices: eurScaledMoney(199, 169),
    capacityRows: [
      { label: "Core connectors", value: "1" },
      { label: "Custom integrations", value: "—" },
      { label: "Portal users", value: "3" },
      { label: "AI queries / month", value: "100" },
      { label: "Data history", value: "12 months" },
      { label: "Branded exports", value: "Your logo" },
      { label: "Support", value: "Email (48h)" },
    ],
    includedHeading: "Full platform — no feature gates",
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
    priceMonthly: 499,
    priceAnnual: 419,
    prices: eurScaledMoney(499, 419),
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
    ctaHref: "https://stratavor.com/meetings/jamie-saveall/group-schedule",
    ctaExternal: true,
    ctaStyle: "inverse-outline",
  },
];

const powerBiMoney = eurScaledMoney(149, 149);

const powerBiPriceByCurrency: Record<SupportedCurrency, string> = {
  EUR: `+${formatPlanPrice(powerBiMoney.EUR.monthly, "EUR")}/mo · any tier`,
  USD: `+${formatPlanPrice(powerBiMoney.USD.monthly, "USD")}/mo · any tier`,
  GBP: `+${formatPlanPrice(powerBiMoney.GBP.monthly, "GBP")}/mo · any tier`,
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
