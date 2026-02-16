"use client";

import Marquee from "./Marquee";
import { integrationLogos } from "@/data/marquee";

export default function IntegrationsMarquee() {
  return (
    <section id="integrations" className="border-y border-neutral-200 bg-neutral-50 py-20">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Integrate your systems
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
          Connect with the tools you already use. Placeholder subtext for
          integration value.
        </p>
        <div className="mt-10">
          <Marquee
            direction="horizontal"
            items={integrationLogos}
            variant="integrations"
            showPlayPause
          />
        </div>
      </div>
    </section>
  );
}
