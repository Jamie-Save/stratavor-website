import Link from "next/link";
import { BOOK_DEMO_CALENDAR_URL, CONTACT_GENERAL_URL } from "@/data/contact-links";
import { HOME_BOTTOM_CTA } from "@/data/marketing-copy";

export default function ThreeCtaBand() {
  return (
    <section
      className="border-t border-neutral-200 bg-white py-section"
      aria-labelledby="final-cta-heading"
    >
      <div className="mx-auto max-w-content px-content text-center lg:px-8">
        <h2
          id="final-cta-heading"
          className="text-heading-lg text-brand-gunmetal sm:text-3xl"
        >
          {HOME_BOTTOM_CTA.heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body-lg text-brand-gunmetal/85">{HOME_BOTTOM_CTA.subline}</p>
        <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-6">
          <Link
            href={BOOK_DEMO_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline w-full sm:w-auto"
          >
            {HOME_BOTTOM_CTA.bookDemoLabel}
          </Link>
          <Link
            href="/pricing"
            className="inline-flex w-full items-center justify-center rounded-xl bg-brand-accent px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-accent-hover hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 focus-visible:ring-offset-white sm:w-auto"
          >
            {HOME_BOTTOM_CTA.trialLabel}
          </Link>
          <Link href={CONTACT_GENERAL_URL} className="btn-outline w-full sm:w-auto">
            {HOME_BOTTOM_CTA.contactUsLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
