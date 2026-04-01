"use client";

import Marquee from "./Marquee";
import { trustedByLogos } from "@/data/marquee";

export default function TrustedByMarquee() {
  return (
    <section
      className="border-y border-white/10 bg-gradient-to-b from-brand-gunmetal to-brand-gunmetal-dark py-8"
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-white/90">
          Trusted by
        </p>
        <Marquee items={trustedByLogos} variant="trusted" surface="dark" />
      </div>
    </section>
  );
}
