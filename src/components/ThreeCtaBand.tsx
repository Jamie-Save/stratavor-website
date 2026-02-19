import Link from "next/link";

export default function ThreeCtaBand() {
  return (
    <section
      className="bg-brand-gunmetal py-16"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <h2
          id="final-cta-heading"
          className="mb-8 text-center text-heading-lg text-white"
        >
          Ready to get started?
        </h2>
        <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:gap-8">
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 sm:w-auto"
          >
            See Pricing
          </Link>
          <Link
            href="#demo"
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-gunmetal shadow-soft transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal sm:w-auto"
          >
            See Live Preview
          </Link>
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-7 py-3.5 text-[15px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 sm:w-auto"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
