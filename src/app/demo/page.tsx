import HeaderSticky from "@/components/HeaderSticky";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Preview | Stratavor",
  description:
    "Explore Stratavor in action. Interactive dashboards and strategic intelligence at a glance.",
};

const POWERBI_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiM2ExODA4YjgtNjcwNS00YTQxLTkzYmUtODUzNzg2ZmUxODAzIiwidCI6ImE4NDcyNTg3LTZiY2QtNGUyMi1hYmQ2LWE3MjU5NGU4ZTQzYiIsImMiOjh9";

export default function DemoPage() {
  return (
    <>
      <HeaderSticky />
      <main id="main-content" tabIndex={-1} className="flex min-h-screen flex-col">
        {/* Intro – elevated section */}
        <section
          className="border-b border-neutral-200/80 bg-white py-12 sm:py-16"
          aria-labelledby="demo-heading"
        >
          <div className="mx-auto max-w-content px-content lg:px-8">
            <p className="section-label text-center">Live preview</p>
            <h1
              id="demo-heading"
              className="mt-3 text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
            >
              See your strategy, live
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-neutral-600">
              Explore an interactive snapshot of how Stratavor turns your data into board-ready
              insights. Drill down, filter, and experience the intelligence layer in action.
            </p>
          </div>
        </section>

        {/* Iframe container – full width, elevated frame */}
        <section
          className="flex-1 bg-neutral-100 py-8 sm:py-10 md:py-12"
          aria-label="Embedded report"
        >
          <div className="mx-auto flex w-full max-w-content flex-col px-content lg:px-8">
            <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white shadow-large ring-1 ring-neutral-200/50">
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/20" aria-hidden />
              <iframe
                src={POWERBI_EMBED_URL}
                title="Stratavor Power BI report – Live preview"
                allowFullScreen
                className="min-h-[70vh] w-full border-0 sm:min-h-[75vh] md:min-h-[78vh]"
                allow="fullscreen"
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
