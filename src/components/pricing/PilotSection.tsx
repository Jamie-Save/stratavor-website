import Link from "next/link";
import { CONTACT_PILOT_URL } from "@/data/contact-links";

export function PilotSection() {
  return (
    <section className="py-section sm:pb-20 sm:pt-16" aria-labelledby="pilot-heading">
      <div className="pricing-inner">
        <div className="flex flex-col items-stretch gap-10 overflow-hidden rounded-2xl border border-brand-gunmetal/10 bg-gradient-to-br from-brand-gunmetal via-brand-gunmetal to-brand-gunmetal-dark px-8 py-12 text-white shadow-medium md:flex-row md:items-center md:gap-12 md:px-12 md:py-14 lg:px-14">
          <div className="flex-1 text-center md:text-left">
            <h2 id="pilot-heading" className="font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              14-day free pilot: full Growth access
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-body text-neutral-300 md:mx-0">
              Connect your Xero or QuickBooks. See your real data in the portal. Every module, every report, full AI. No
              credit card required. After 14 days, pick a tier or walk away.
            </p>
          </div>
          <div className="flex shrink-0 justify-center md:justify-end">
            <Link
              href={CONTACT_PILOT_URL}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-8 py-3.5 text-[15px] font-semibold text-brand-gunmetal shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
            >
              Start your pilot
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 8h10M9 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
