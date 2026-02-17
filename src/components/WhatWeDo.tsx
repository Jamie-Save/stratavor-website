"use client";

import WhatWeDoGallery from "./WhatWeDoGallery";

const bullets = [
  "Reporting snapshots: Board-ready financials with AI narrative on what matters.",
  "Risk register & OKRs: Monitor strategic risks and track objectives in one place.",
  "Strategic profile: Configure ambition, posture, and priorities so AI generates relevant recommendations.",
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="py-24">
      <div className="mx-auto max-w-content px-content lg:px-8">
        {/* Title above carousel */}
        <h2 className="text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
          What we do
        </h2>

        {/* Carousel - larger and centered */}
        <div className="mt-10 flex justify-center overflow-visible">
          <WhatWeDoGallery />
        </div>

        {/* Text below carousel */}
        <div className="mx-auto mt-12 max-w-2xl text-center">
          <p className="text-lg text-neutral-600">
            Stratavor unifies financial reporting, risk management, and
            strategic planning. Get executive-ready snapshots, AI insights, and
            traceability—without the spreadsheet sprawl.
          </p>
          <ul className="mx-auto mt-8 max-w-lg space-y-3" role="list">
            {bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-neutral-600">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orange"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
