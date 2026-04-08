"use client";

import Marquee from "./Marquee";
import { integrationLogos } from "@/data/marquee";
import { HOME_INTEGRATIONS } from "@/data/marketing-copy";

export default function IntegrationsMarquee() {
  return (
    <section id="integrations" className="bg-white pt-12 pb-section">
      <div className="mx-auto max-w-content px-content text-center lg:px-8">
        <p className="section-label mb-4 text-center">{HOME_INTEGRATIONS.sectionLabel}</p>
        <p className="mx-auto max-w-2xl text-center text-body-lg text-neutral-600">{HOME_INTEGRATIONS.intro}</p>
        <div className="mt-10">
          <Marquee items={integrationLogos} variant="integrations" />
        </div>
      </div>
    </section>
  );
}
