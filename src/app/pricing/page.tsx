import { PricingPageClient } from "@/components/pricing/PricingPageClient";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { initialCurrencyFromGeoHeaders } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Pricing | Stratavor",
  description:
    "Essentials, Growth, and Enterprise plans: every module and full AI at every tier. Compare capacity and start a 14-day free pilot with Growth access.",
};

export default async function PricingPage() {
  const h = await headers();
  const currency = initialCurrencyFromGeoHeaders((name) => h.get(name));

  return <PricingPageClient initialCurrency={currency} />;
}
