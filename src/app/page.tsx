import HeaderSticky from "@/components/HeaderSticky";
import Footer from "@/components/Footer";
import HeroSplit from "@/components/HeroSplit";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import ProblemSolutionSection from "@/components/ProblemSolutionSection";
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
      <HeaderSticky />
      <main id="main-content" tabIndex={-1}>
        {/* 1. Outcome-led hero */}
        <HeroSplit />
        {/* 2. Social proof strip */}
        <TrustedByMarquee />
        {/* 3. Problem → solution with product visual */}
        <ProblemSolutionSection />
        {/* 4. Core capabilities */}
        <OutcomeGrid />
        {/* 5. Platform deep-dive */}
        <WhatWeDo />
        {/* 6. Integration ecosystem */}
        <IntegrationsMarquee />
        {/* 7. Customer proof */}
        <TestimonialsShowcase />
        {/* 8. Security & compliance */}
        <SecurityGrid />
        {/* 9. Final CTA split */}
        <ThreeCtaBand />
        <TaglineStrip />
      </main>
      <Footer />
    </>
  );
}
