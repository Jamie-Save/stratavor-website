import { PricingPageClient } from "@/components/pricing/PricingPageClient";
import { PricingFaqJsonLd } from "@/components/StructuredData";
import type { Metadata } from "next";
import { headers } from "next/headers";
import { initialCurrencyFromGeoHeaders } from "@/lib/currency";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Pricing | Stratavor",
  description:
    "Essentials, Growth, and Enterprise plans: every module and full AI at every tier. Compare capacity and start a 14-day free pilot with Growth access.",
  alternates: {
    canonical: absoluteUrl("/pricing"),
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/pricing"),
    title: "Pricing | Stratavor",
    description:
      "Essentials, Growth, and Enterprise plans with full AI at every tier. Start a 14-day free pilot.",
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
