import Link from "next/link";

export function PricingHero() {
  return (
    <section
      className="relative overflow-hidden border-b border-neutral-200/80 bg-gradient-to-b from-brand-mist-light/50 via-white to-white pb-12 pt-section sm:pb-16"
      aria-labelledby="pricing-hero-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[min(420px,55vh)] w-[min(520px,70vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-mist-light/25 blur-3xl lg:block"
        aria-hidden
      />
      <div className="pricing-inner relative">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            id="pricing-hero-heading"
            className="text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg 2xl:text-display-xl"
          >
            Everything you need.{" "}
            <span className="font-medium italic text-brand-gunmetal/85">Nothing hidden.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-body-lg text-neutral-600">
            Choose the tier that fits your business today, then scale as you grow. Capabilities, capacity, and support
            expand with each plan.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="#compare-heading"
              className="btn-outline inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-semibold"
            >
              Compare plans
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
