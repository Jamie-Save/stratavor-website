import Link from "next/link";
import HeroCarousel from "./HeroCarousel";

export default function HeroSplit() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Premium mesh gradient */}
      <div
        className="absolute inset-0 -z-10"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% -20%, rgba(57, 84, 96, 0.06) 0%, transparent 50%), radial-gradient(ellipse 60% 50% at 80% 20%, rgba(232, 104, 58, 0.06) 0%, transparent 40%), radial-gradient(ellipse 90% 70% at 50% 100%, rgba(209, 215, 218, 0.12) 0%, transparent 50%)",
        }}
      />
      {/* Faint noise texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
        }}
      />

      <div className="mx-auto grid max-w-content grid-cols-1 gap-12 px-content py-24 lg:grid-cols-2 lg:gap-16 lg:py-32 lg:px-8">
        {/* LEFT COLUMN */}
        <div className="flex flex-col justify-center">
          <p className="section-label mb-4">Strategic Intelligence Platform</p>
          <h1 className="text-display font-semibold tracking-tight text-brand-gunmetal lg:text-display-lg">
            Stratavor
          </h1>
          <p className="text-body-lg mt-6 max-w-xl text-neutral-500">
            Turn your data into board-ready strategy. Financial snapshots, risk
            registers, OKRs, and AI commentary—all connected to your systems.
          </p>
          <p className="mt-3 text-lg font-semibold text-brand-gunmetal">
            Devour the data. Deliver the strategy.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-xl bg-brand-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-accent-hover hover:shadow-medium focus-visible:bg-brand-accent-hover focus-visible:shadow-medium"
            >
              Free Trial
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-gunmetal transition-colors hover:border-brand-accent/30 hover:bg-brand-accent-light focus-visible:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent/20"
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
