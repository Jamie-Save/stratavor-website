import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_GENERAL_URL } from "@/data/contact-links";

export const metadata: Metadata = {
  title: "Tools & Templates | Stratavor",
  description: "Free resources, templates, and tools for finance leaders. Board packs, variance analysis frameworks, and strategic planning guides.",
};

const tools = [
  {
    title: "Board Pack Template",
    description: "A structured, executive-ready board pack template covering financials, KPIs, strategic initiatives, and risk. Ready to customise.",
    category: "Template",
  },
  {
    title: "Variance Analysis Framework",
    description: "A systematic approach to explaining what changed, why it matters, and what action to take. Designed for CFOs and FP&A leads.",
    category: "Framework",
  },
  {
    title: "KPI Selection Guide",
    description: "How to choose the right metrics for your stage, industry, and audience. Avoid vanity metrics and focus on what drives decisions.",
    category: "Guide",
  },
  {
    title: "Integration Readiness Checklist",
    description: "Evaluate your finance stack before connecting to a strategic intelligence platform. Covers data quality, access, and governance.",
    category: "Checklist",
  },
  {
    title: "AI Readiness Assessment",
    description: "A quick diagnostic to understand whether your organisation is ready to adopt AI-assisted financial commentary and insights.",
    category: "Assessment",
  },
  {
    title: "Strategic Planning Calendar",
    description: "Annual planning cadence for finance and strategy teams. Aligns board reporting, forecasting, and strategic reviews.",
    category: "Template",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="border-b border-neutral-200/80 bg-white py-12 sm:py-16" aria-labelledby="tools-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <p className="section-label mb-4 text-center">Resources</p>
          <h1 id="tools-heading" className="text-center text-display font-semibold tracking-tight text-brand-gunmetal sm:text-display-lg">
            Tools &amp; Templates
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">
            Free resources built for finance leaders who want to move from reporting to strategic intelligence.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-section" aria-label="Available tools">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <li key={tool.title}>
                <article className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-soft transition-all hover:border-neutral-300 hover:shadow-medium sm:p-8">
                  <span className="inline-flex w-fit rounded-full bg-brand-gunmetal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gunmetal">
                    {tool.category}
                  </span>
                  <h3 className="mt-4 font-semibold text-neutral-900">{tool.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-neutral-600">{tool.description}</p>
                  <Link
                    href={CONTACT_GENERAL_URL}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-brand-gunmetal transition-colors hover:text-brand-gunmetal-dark"
                  >
                    Request access <span aria-hidden>→</span>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
