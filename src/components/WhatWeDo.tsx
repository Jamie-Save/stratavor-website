import WhatWeDoGallery from "./WhatWeDoGallery";
import { HOME_WHAT_WE_DO } from "@/data/marketing-copy";

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="bg-white py-section" aria-labelledby="what-we-do-heading">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10 lg:gap-x-12">
          <div className="lg:col-span-5">
            <p className="section-label mb-4">{HOME_WHAT_WE_DO.sectionLabel}</p>
            <h2
              id="what-we-do-heading"
              className="text-left text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
            >
              {HOME_WHAT_WE_DO.heading}
            </h2>
          </div>
          <div className="flex items-end lg:col-span-6 lg:col-start-7">
            <p className="max-w-prose text-left text-body-lg text-neutral-600">{HOME_WHAT_WE_DO.intro}</p>
          </div>
        </div>
      </div>

      {/* Full-bleed product tour band */}
      <div className="mt-12 w-full bg-gradient-to-b from-[var(--mist-light)]/45 via-neutral-50/80 to-white py-14 sm:py-16 lg:mt-16 lg:py-20">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <WhatWeDoGallery />
        </div>
      </div>
    </section>
  );
}
