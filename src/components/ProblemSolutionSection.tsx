export default function ProblemSolutionSection() {
  return (
    <section
      className="bg-white py-section"
      aria-labelledby="problem-solution-heading"
    >
      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        {/* Left: headline + paragraph */}
        <div className="flex flex-col justify-center">
          <h2
            id="problem-solution-heading"
            className="text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
          >
            Most financial data informs. Stratavor interprets.
          </h2>
          <p className="mt-6 max-w-xl text-body-lg text-neutral-600">
            Finance leaders don&apos;t need more dashboards. They need clarity. Stratavor transforms disconnected metrics into contextual intelligence, bridging operational data with executive decision-making.
          </p>
        </div>

        {/* Right: product UI placeholder */}
        <div
          className="min-h-0 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 shadow-soft"
          style={{ aspectRatio: "4/3" }}
          aria-hidden
        >
          <div className="flex h-full w-full items-center justify-center text-neutral-400">
            <span className="text-sm font-medium">Product UI</span>
          </div>
        </div>
      </div>
    </section>
  );
}
