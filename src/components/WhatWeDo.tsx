"use client";

import WhatWeDoGallery from "./WhatWeDoGallery";

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-white py-section" aria-labelledby="what-we-do-heading">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="section-label mb-4 text-center">
          Product
        </p>
        <h2 id="what-we-do-heading" className="text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          What we do
        </h2>

        {/* Intro text above carousel */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">
          Stratavor unifies financial reporting, risk management, and strategic
          planning. Get executive-ready snapshots, AI insights, and
          traceability—without the spreadsheet sprawl.
        </p>

        {/* Carousel - larger and centered */}
        <div className="mt-10 flex justify-center overflow-visible">
          <WhatWeDoGallery />
        </div>
      </div>
    </section>
  );
}
