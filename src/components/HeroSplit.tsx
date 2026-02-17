import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function HeroSplit() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Gradient atmosphere */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -20%, rgba(249, 115, 22, 0.12) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 30%, rgba(249, 115, 22, 0.05) 0%, transparent 45%)",
        }}
      />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content py-20 lg:grid-cols-2 lg:gap-16 lg:py-28 lg:px-8">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Stratavor
          </h1>
          <p className="mt-6 max-w-xl text-lg text-neutral-600">
            Turn your data into board-ready strategy. Financial snapshots, risk
            registers, OKRs, and AI commentary—all connected to your systems.
            <br />
            <span className="mt-2 block font-medium text-neutral-700">
              Devour the data. Deliver the strategy.
            </span>
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-lg bg-brand-orange px-6 py-3 text-base font-medium text-white shadow-soft transition-all hover:bg-brand-orange-hover hover:shadow-medium focus-visible:bg-brand-orange-hover focus-visible:shadow-medium"
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
        <div id="demo" className="flex items-center scroll-mt-20">
          <HeroCarousel />
        </div>
      </div>
    </section>
  );
}
