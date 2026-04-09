import type { Metadata } from "next";
import HeroSplit from "@/components/HeroSplit";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import OutcomeGrid from "@/components/OutcomeGrid";
import WhatWeDo from "@/components/WhatWeDo";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import SecurityGrid from "@/components/SecurityGrid";
import ThreeCtaBand from "@/components/ThreeCtaBand";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl("/") },
  openGraph: { url: absoluteUrl("/") },
};

export default function Home() {
  return (
    <>
      <HeroSplit />
      <TrustedByMarquee />
      <OutcomeGrid />
      <WhatWeDo />
      <IntegrationsMarquee />
      <TestimonialsShowcase />
      <SecurityGrid />
      <ThreeCtaBand />
    </>
  );
}
