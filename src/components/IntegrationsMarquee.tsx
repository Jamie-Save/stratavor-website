"use client";

import Marquee from "./Marquee";
import { integrationLogos } from "@/data/marquee";

export default function IntegrationsMarquee() {
  return (
    <section id="integrations" className="bg-white py-section">
      <div className="mx-auto max-w-content px-content text-center lg:px-8">
        <p className="section-label mb-4 text-center">
          Integrations
        </p>
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          Integrate your systems
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-body-lg text-neutral-600">
          Connect your ERP, CRM, and finance tools. Stratavor pulls data from
          Xero, QuickBooks, Stripe, and more—so insights stay current.
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
