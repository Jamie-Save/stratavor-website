import Link from "next/link";

export function PricingHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-neutral-200/80 bg-gradient-to-b from-brand-mist-light/50 via-white to-white pb-12 pt-section sm:pb-16"
      aria-labelledby="pricing-hero-heading"
    >
      <div
        className="pointer-events-none absolute -right-24 top-1/2 hidden h-[min(420px,55vh)] w-[min(420px,45vw)] -translate-y-1/2 rounded-full bg-brand-mist-light/40 blur-3xl lg:block"
        aria-hidden
      />
      <div className="pricing-inner relative">
        <div className="lg:grid lg:max-w-none lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.55fr)] lg:items-center lg:gap-14 xl:gap-20">
          <div className="text-center lg:text-left">
            <h1
              id="pricing-hero-heading"
              className="text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg"
            >
              Everything you need.{" "}
              <span className="font-medium italic text-brand-gunmetal/85">Nothing hidden.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-body-lg text-neutral-600 lg:mx-0 lg:max-w-lg">
              Choose the tier that fits your business today, then scale as you grow. Capabilities, capacity, and support
              expand with each plan.
            </p>
            <div className="mt-10 flex justify-center lg:justify-start">
              <Link
                href="#compare-heading"
                className="btn-outline inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-semibold"
              >
                Compare plans
              </Link>
            </div>
          </div>
          <div className="mt-12 hidden lg:mt-0 lg:flex lg:justify-end" aria-hidden>
            <div className="relative w-full max-w-sm rounded-2xl border border-neutral-200/80 bg-white/80 p-6 shadow-soft backdrop-blur-sm ring-1 ring-black/[0.04]">
              <p className="text-caption font-semibold uppercase tracking-wider text-brand-gunmetal/70">At a glance</p>
              <ul className="mt-4 space-y-3 text-sm text-neutral-600">
                <li className="flex gap-2">
                  <span className="mt-0.5 font-semibold text-brand-gunmetal">✓</span>
                  Tiered access that grows with your business
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 font-semibold text-brand-gunmetal">✓</span>
                  Capacity scales with connectors &amp; usage
                </li>
                <li className="flex gap-2">
                  <span className="mt-0.5 font-semibold text-brand-gunmetal">✓</span>
                  Optional BI add-on on any plan
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
