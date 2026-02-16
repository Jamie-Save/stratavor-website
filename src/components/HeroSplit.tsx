import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function HeroSplit() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft gradient atmosphere (pure CSS) */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249, 115, 22, 0.08) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 20%, rgba(249, 115, 22, 0.04) 0%, transparent 40%)",
        }}
      />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content py-20 lg:grid-cols-2 lg:gap-16 lg:py-28 lg:px-8">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Stratavor
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600">
            Placeholder subcopy line one. Describe your value proposition in
            clear, confident language.
            <br />
            Placeholder subcopy line two. Emphasize outcomes and trust.
            <br />
            Placeholder subcopy line three. Optional closing hook.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-base font-medium text-white transition-colors hover:bg-brand-orange-hover focus-visible:bg-brand-orange-hover"
            >
              Free Trial
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-6 py-3 text-base font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:border-brand-orange focus-visible:ring-2 focus-visible:ring-brand-orange/20"
            >
              See Live Preview
            </Link>
          </div>
          <p className="mt-4 text-sm text-neutral-500">
            No credit card required. Full access for 14 days.
          </p>
        </div>

        {/* RIGHT COLUMN: Carousel */}
        <div className="flex items-center">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
