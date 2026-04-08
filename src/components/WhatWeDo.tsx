"use client";

import WhatWeDoGallery from "./WhatWeDoGallery";
import { HOME_WHAT_WE_DO } from "@/data/marketing-copy";

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-white py-section" aria-labelledby="what-we-do-heading">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="section-label mb-4 text-center">{HOME_WHAT_WE_DO.sectionLabel}</p>
        <h2 id="what-we-do-heading" className="text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          {HOME_WHAT_WE_DO.heading}
        </h2>

        {/* Intro text above carousel */}
        <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">{HOME_WHAT_WE_DO.intro}</p>

        {/* Carousel - larger and centered */}
        <div className="mt-10 flex justify-center overflow-visible">
          <WhatWeDoGallery />
        </div>
      </div>
    </section>
  );
}
