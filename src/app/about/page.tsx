import type { Metadata } from "next";
import Link from "next/link";
import { LIVE_DEMO_URL } from "@/data/demo-config";

export const metadata: Metadata = {
  title: "About | Stratavor",
  description: "Stratavor is a strategic intelligence platform that transforms financial data into board-ready insights for finance leaders.",
};

const values = [
  {
    title: "Clarity over complexity",
    description: "We believe the best intelligence simplifies decisions, not complicates them. Every feature we build must make the next conversation easier.",
  },
  {
    title: "Trust by default",
    description: "Enterprise trust isn't earned with words. We publish our policies, open our architecture, and let the rigour speak for itself.",
  },
  {
    title: "Accountability at every layer",
    description: "From data lineage to AI narratives, every insight is traceable. We don't ask you to trust the answer; we show you how we got there.",
  },
  {
    title: "Built for the boardroom",
    description: "We design for the people who present to boards, not the people who build dashboards. Every output is ready for scrutiny.",
  },
];

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
            Strategic intelligence for the people who run the numbers.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">
            Stratavor was founded on a simple observation: finance teams spend too much time building reports and not enough time explaining what they mean. We built a platform that bridges the gap between operational data and strategic decision-making.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-section" aria-labelledby="mission-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <div className="mx-auto max-w-3xl">
            <h2 id="mission-heading" className="text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl">
              Our mission
            </h2>
            <p className="mt-6 text-body-lg text-neutral-600">
              We exist to give finance leaders the tools to move from reporting to interpreting. Stratavor connects your financial systems, applies contextual AI, and produces board-ready outputs that explain performance, not just display it.
            </p>
            <p className="mt-4 text-body-lg text-neutral-600">
              Founded in Ireland and built for global enterprise, Stratavor serves CFOs, FP&amp;A teams, and strategy leaders who need a single source of truth across their financial and operational data.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-section" aria-labelledby="values-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <h2 id="values-heading" className="text-center text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl">
            What we stand for
          </h2>
          <ul className="mt-12 grid gap-8 sm:grid-cols-2">
            {values.map((v) => (
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
          <h2 className="text-heading-lg text-white sm:text-3xl">Want to learn more?</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-white/90">
            Talk to our team about how Stratavor can transform your financial reporting.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={LIVE_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-7 py-3.5 text-[15px] font-semibold text-brand-gunmetal shadow-soft transition-all hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
            >
              See Live Preview
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
