"use client";

import Marquee from "./Marquee";
import { integrationLogos } from "@/data/marquee";

export default function IntegrationsMarquee() {
  return (
    <section id="integrations" className="border-y border-neutral-200 bg-neutral-50/90 py-24">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="mb-4 text-sm font-medium uppercase tracking-wider text-brand-orange">
          Integrations
        </p>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl">
          Integrate your systems
        </h2>
        <p className="mt-3 max-w-2xl text-neutral-600">
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
