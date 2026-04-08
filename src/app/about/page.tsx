import type { Metadata } from "next";
import Link from "next/link";
import { BOOK_DEMO_CALENDAR_URL } from "@/data/contact-links";
import { ABOUT_PAGE, HOME_HERO } from "@/data/marketing-copy";

export const metadata: Metadata = {
  title: "About | Stratavor",
  description: "Stratavor is a strategic intelligence platform that transforms financial data into board-ready insights for finance leaders.",
};

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-neutral-200/80 bg-white py-section" aria-labelledby="about-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <p className="section-label mb-4 text-center">Company</p>
          <h1
            id="about-heading"
            className="mx-auto max-w-3xl text-center text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg"
          >
            {ABOUT_PAGE.heroHeadline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">{ABOUT_PAGE.heroIntro}</p>
        </div>
      </section>

      <section className="bg-neutral-50 py-section" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 id="mission-heading" className="text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl">
              {ABOUT_PAGE.missionHeading}
            </h2>
            <p className="mt-6 text-body-lg text-neutral-600">{ABOUT_PAGE.missionParagraphs[0]}</p>
            <p className="mt-4 text-body-lg text-neutral-600">{ABOUT_PAGE.missionParagraphs[1]}</p>
          </div>
        </div>
      </section>

      <section className="bg-white py-section" aria-labelledby="values-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <h2 id="values-heading" className="text-center text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl">
            {ABOUT_PAGE.valuesHeading}
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {ABOUT_PAGE.values.map((v) => (
              <li key={v.title} className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
                <h3 className="font-semibold text-brand-gunmetal">{v.title}</h3>
                <p className="mt-3 text-sm text-neutral-600">{v.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-gunmetal py-section">
        <div className="mx-auto max-w-content px-content text-center lg:px-8">
          <h2 className="text-heading-lg text-white sm:text-3xl">{ABOUT_PAGE.closingHeading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/90">{ABOUT_PAGE.closingSubline}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={BOOK_DEMO_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-gunmetal shadow-soft transition-all hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
            >
              {HOME_HERO.secondaryCtaLabel}
            </Link>
            <Link
              href="/trust"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-transparent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-brand-gunmetal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
            >
              Visit Trust Centre
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
