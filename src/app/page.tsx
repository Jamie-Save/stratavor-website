import HeaderSticky from "@/components/HeaderSticky";
import Footer from "@/components/Footer";
import HeroSplit from "@/components/HeroSplit";
import TrustedByMarquee from "@/components/TrustedByMarquee";
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
        <HeroSplit />
        <TrustedByMarquee />
        <WhatWeDo />
        <IntegrationsMarquee />
        <TestimonialsShowcase />
        <SecurityGrid />
        <ThreeCtaBand />
        <TaglineStrip />
      </main>
      <Footer />
    </>
  );
}
