import { PricingContent } from "@/components/PricingContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Stratavor",
  description:
    "Start with truth. Add judgement. An intelligence architecture designed for scale. Financials, Management, and Strategy tiers.",
};

export default function PricingPage() {
  return <PricingContent />;
}
