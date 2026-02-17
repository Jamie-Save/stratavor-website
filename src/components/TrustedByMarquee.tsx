"use client";

import Marquee from "./Marquee";
import { trustedByLogos } from "@/data/marquee";

export default function TrustedByMarquee() {
  return (
    <section
      className="border-y border-neutral-200 bg-neutral-50 py-10"
      aria-label="Trusted by"
    >
      <div className="mx-auto flex max-w-content items-center gap-8 px-content lg:px-8">
        <p className="shrink-0 text-caption font-semibold uppercase tracking-widest text-neutral-400">
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
