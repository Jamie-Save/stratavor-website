import Link from "next/link";
import { BOOK_DEMO_CALENDAR_URL, CONTACT_GENERAL_URL, CONTACT_LOGIN_URL } from "@/data/contact-links";
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
          <Link href={CONTACT_LOGIN_URL} className="btn-primary w-full sm:w-auto">
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
