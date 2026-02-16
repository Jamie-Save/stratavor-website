import Link from "next/link";

export default function ThreeCtaBand() {
  return (
    <section
      className="border-t border-neutral-200 bg-white py-10"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto flex max-w-content flex-col items-stretch gap-4 px-content sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:gap-8 lg:px-8">
        <h2
          id="final-cta-heading"
          className="sr-only"
        >
          Get started
        </h2>
        <Link
          href="/pricing"
          className="inline-flex w-full items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-orange-hover focus-visible:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:w-auto"
        >
          See Pricing
        </Link>
        <Link
          href="#demo"
          className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:w-auto"
        >
          See Live Preview
        </Link>
        <Link
          href="/contact"
          className="inline-flex w-full items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2 sm:w-auto"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
