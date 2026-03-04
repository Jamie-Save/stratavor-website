import Link from "next/link";

export default function ProblemSolutionSection() {
  return (
    <section
      className="bg-white py-section"
      aria-labelledby="problem-solution-heading"
    >
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="flex flex-col justify-center">
          <p className="section-label mb-4">The problem</p>
          <h2
            id="problem-solution-heading"
            className="text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
          >
            Most financial data informs. Stratavor interprets.
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-neutral-600">
            Finance leaders don&apos;t need more dashboards. They need clarity. Stratavor transforms disconnected metrics into contextual intelligence, bridging operational data with executive decision-making.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/demo" className="btn-primary">
              See Live Preview
            </Link>
            <Link href="/contact?intent=demo" className="btn-outline">
              Book a Demo
            </Link>
          </div>
        </div>

        <div
          className="card flex min-h-0 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 p-8"
          style={{ aspectRatio: "4/3" }}
          aria-hidden
        >
          <div className="w-full space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-brand-accent/60" />
              <div className="h-2 w-32 rounded-full bg-neutral-200" />
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="flex items-baseline justify-between">
                <div className="h-2.5 w-20 rounded bg-neutral-200" />
                <div className="h-6 w-16 rounded bg-brand-gunmetal/10" />
              </div>
              <div className="mt-3 flex gap-2">
                <div className="h-16 flex-1 rounded-lg bg-brand-gunmetal/5" />
                <div className="h-16 flex-1 rounded-lg bg-brand-accent/10" />
                <div className="h-16 flex-1 rounded-lg bg-brand-gunmetal/5" />
              </div>
            </div>
            <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-xs">
              <div className="space-y-2">
                <div className="h-2 w-full rounded bg-neutral-100" />
                <div className="h-2 w-4/5 rounded bg-neutral-100" />
                <div className="h-2 w-3/5 rounded bg-neutral-100" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
