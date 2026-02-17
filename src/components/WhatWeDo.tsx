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
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content lg:grid-cols-2 lg:gap-16 lg:px-8">
        {/* Left column: Flowstep-style 3D carousel */}
        <div className="order-1 flex items-center justify-center overflow-visible">
          <WhatWeDoGallery />
        </div>

        {/* Right column: text */}
        <div className="flex flex-col justify-center order-2">
          <h2 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            What we do
          </h2>
          <p className="mt-6 max-w-lg text-lg text-neutral-600">
            Stratavor unifies financial reporting, risk management, and
            strategic planning. Get executive-ready snapshots, AI insights, and
            traceability—without the spreadsheet sprawl.
          </p>
          <ul className="mt-8 space-y-3" role="list">
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
