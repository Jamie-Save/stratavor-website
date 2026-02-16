"use client";

import Marquee from "./Marquee";
import { trustedByLogos } from "@/data/marquee";

export default function TrustedByMarquee() {
  return (
    <section
      className="border-y border-neutral-200 bg-white py-6"
      aria-label="Trusted by"
    >
      <div className="mx-auto flex max-w-content items-center gap-8 px-content lg:px-8">
        <p className="shrink-0 text-sm font-medium uppercase tracking-wider text-neutral-500">
          Trusted by
        </p>
        <div className="min-w-0 flex-1">
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
