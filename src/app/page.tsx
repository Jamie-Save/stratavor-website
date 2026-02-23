import HeaderSticky from "@/components/HeaderSticky";
import HeroSplit from "@/components/HeroSplit";
import TrustedByMarquee from "@/components/TrustedByMarquee";
import WhatWeDo from "@/components/WhatWeDo";
import IntegrationsMarquee from "@/components/IntegrationsMarquee";
import TestimonialsShowcase from "@/components/TestimonialsShowcase";
import SecurityGrid from "@/components/SecurityGrid";
import ThreeCtaBand from "@/components/ThreeCtaBand";
import Footer from "@/components/Footer";

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
        <section className="border-t border-neutral-200 bg-neutral-100 py-10 text-center">
          <p className="text-lg font-semibold tracking-tight text-brand-gunmetal">
            Devour the data. Deliver the strategy.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
