"use client";

import Marquee from "./Marquee";
import { trustedByLogos } from "@/data/marquee";

export default function TrustedByMarquee() {
  return (
    <section
      className="border-y border-neutral-200/60 bg-white py-8"
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-neutral-400">
          Trusted by finance leaders at
        </p>
        <Marquee items={trustedByLogos} variant="trusted" />
      </div>
    </section>
  );
}
