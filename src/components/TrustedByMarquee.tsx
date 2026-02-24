"use client";

import Marquee from "./Marquee";
import { trustedByLogos } from "@/data/marquee";

export default function TrustedByMarquee() {
  return (
    <section
      className="bg-neutral-50 py-6"
      aria-label="Trusted by"
    >
      <div className="mx-auto max-w-content px-content text-center lg:px-8">
        <p className="section-label mb-4 text-center">
          Trusted by
        </p>
        <div className="mt-6">
          <Marquee
            direction="horizontal"
            items={trustedByLogos}
            variant="trusted"
            showPlayPause
          />
        </div>
      </div>
    </section>
  );
}
