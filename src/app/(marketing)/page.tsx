import HeroSplit from "@/components/HeroSplit";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import { HomeLiveDemoSection } from "@/components/HomeLiveDemoSection";
import OutcomeGrid from "@/components/OutcomeGrid";
import WhatWeDo from "@/components/WhatWeDo";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import SecurityGrid from "@/components/SecurityGrid";
import ThreeCtaBand from "@/components/ThreeCtaBand";
import { TaglineStrip } from "@/components/TaglineStrip";

export default function Home() {
  return (
    <>
      <HeroSplit />
      <TrustedByMarquee />
      <HomeLiveDemoSection />
      <OutcomeGrid />
      <WhatWeDo />
      <IntegrationsMarquee />
      <TestimonialsShowcase />
      <SecurityGrid />
      <ThreeCtaBand />
      <TaglineStrip />
    </>
  );
}
