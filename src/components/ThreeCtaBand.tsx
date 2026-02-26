import Link from "next/link";

export default function ThreeCtaBand() {
  return (
    <section
      className="bg-brand-gunmetal py-16"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-content px-content text-center lg:px-8">
        <h2
          id="final-cta-heading"
          className="text-heading-lg text-white sm:text-3xl"
        >
          Stop Reporting. Start Explaining.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/90">
          Turn your financial systems into strategic intelligence.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-accent-hover hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal sm:w-auto"
          >
            Start Free Trial
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal sm:w-auto"
          >
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
