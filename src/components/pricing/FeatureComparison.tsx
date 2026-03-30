import { PRICING_COMPARISON } from "@/data/pricing-comparison";

/** Base cell styles; row uses `group` + `hover:bg-brand-gunmetal` for group-hover text on gunmetal. */
function cellClass(value: string): string {
  if (value === "✓") return "text-brand-gunmetal font-semibold group-hover:text-white";
  if (value === "—") return "text-neutral-300 group-hover:text-neutral-400";
  return "text-neutral-600 group-hover:text-white";
}

export function FeatureComparison() {
  return (
    <section className="scroll-mt-24 py-section sm:py-20" aria-labelledby="compare-heading">
      <div className="pricing-inner">
        <header className="text-center md:text-left">
          <h2 id="compare-heading" className="section-heading-flow mx-auto md:mx-0">
            Compare plans
          </h2>
          <p className="section-subheading-flow mx-auto mt-3 text-center md:mx-0 md:text-left">
            Same product. Different capacity.
          </p>
        </header>
        <div className="mt-10 overflow-x-auto rounded-2xl border border-neutral-200/90 bg-white shadow-soft ring-1 ring-black/[0.03] sm:mt-12">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50/90">
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Feature
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Essentials
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Growth
                </th>
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-neutral-500 sm:px-6">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICING_COMPARISON.map((entry, i) =>
                entry.kind === "section" ? (
                  <tr
                    key={`s-${i}`}
                    className="group border-b border-brand-mist/80 bg-brand-mist-light/35 transition-colors hover:border-brand-mist/80 hover:bg-brand-gunmetal"
                  >
                    <td
                      colSpan={4}
                      className="px-5 pb-2 pt-5 text-xs font-bold uppercase tracking-wider text-brand-gunmetal transition-colors group-hover:text-white sm:px-6 sm:pt-6"
                    >
                      {entry.title}
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={`r-${i}`}
                    className="group border-b border-neutral-100 transition-colors last:border-b-0 hover:bg-brand-gunmetal"
                  >
                    <td className="px-5 py-3.5 font-medium text-neutral-800 transition-colors group-hover:text-white sm:px-6 sm:py-4">
                      {entry.feature}
                    </td>
                    <td className={`px-5 py-3.5 text-center transition-colors sm:px-6 sm:py-4 ${cellClass(entry.essentials)}`}>
                      {entry.essentials}
                    </td>
                    <td className={`px-5 py-3.5 text-center transition-colors sm:px-6 sm:py-4 ${cellClass(entry.growth)}`}>
                      {entry.growth}
                    </td>
                    <td className={`px-5 py-3.5 text-center transition-colors sm:px-6 sm:py-4 ${cellClass(entry.enterprise)}`}>
                      {entry.enterprise}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
