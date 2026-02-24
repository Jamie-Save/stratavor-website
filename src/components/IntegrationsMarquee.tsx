"use client";

import Marquee from "./Marquee";
import { integrationLogos } from "@/data/marquee";

export default function IntegrationsMarquee() {
  return (
    <section id="integrations" className="bg-white pt-12 pb-section">
      <div className="mx-auto max-w-content px-content text-center lg:px-8">
        <p className="section-label mb-4 text-center">
          Integrations
        </p>
        <p className="mx-auto max-w-2xl text-center text-body-lg text-neutral-600">
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
