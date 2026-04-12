import type { Metadata } from "next";
import { POWER_BI_PAGE } from "@/data/marketing-copy";

export const metadata: Metadata = {
  title: "Power BI | Stratavor",
  description:
    "Explore Stratavor in Power BI. Interactive dashboards and strategic intelligence at a glance.",
};

const POWERBI_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiNzZkMGZmNDgtYmRjYS00NWY4LTk2M2MtNGZmM2FlNmZlODcyIiwidCI6ImE4NDcyNTg3LTZiY2QtNGUyMi1hYmQ2LWE3MjU5NGU4ZTQzYiIsImMiOjh9";

export default function PowerBIPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section
        className="border-b border-neutral-200/80 bg-white py-12 sm:py-16"
        aria-labelledby="powerbi-heading"
      >
        <div className="mx-auto max-w-content px-content lg:px-8">
          <p className="section-label text-center">{POWER_BI_PAGE.sectionLabel}</p>
          <h1
            id="powerbi-heading"
            className="mt-3 text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
          >
            {POWER_BI_PAGE.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg leading-relaxed text-neutral-600">{POWER_BI_PAGE.intro}</p>
        </div>
      </section>

      <section
        className="flex-1 bg-neutral-100 py-8 sm:py-10 md:py-12"
        aria-label="Embedded report"
      >
        <div className="mx-auto flex w-full max-w-content flex-col px-content lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-large ring-1 ring-neutral-200/50">
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" aria-hidden />
            <iframe
              src={POWERBI_EMBED_URL}
              title="Stratavor Power BI report"
              allowFullScreen
              className="min-h-[70vh] w-full border-0 sm:min-h-[75vh] md:min-h-[78vh]"
              allow="fullscreen"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
