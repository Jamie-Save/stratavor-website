import Link from "next/link";
import { securityItems } from "@/data/security";
import { SecurityIcon } from "./SecurityIcons";

export default function SecurityGrid() {
  return (
    <section
      id="security"
      className="bg-neutral-50 py-section"
      aria-labelledby="security-heading"
    >
      <div className="mx-auto max-w-content px-content lg:px-8">
        <p className="section-label mb-4 text-center">
          Security & compliance
        </p>
        <h2
          id="security-heading"
          className="mx-auto max-w-2xl text-center text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl"
        >
          Enterprise-grade security
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-lg text-neutral-600">
          Built for teams who demand control, auditability, and compliance by design.
        </p>

        <ul className="mt-16 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, i) => (
            <li key={i}>
              <article
                className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-medium focus-within:ring-2 focus-within:ring-brand-orange/20 sm:p-8"
                style={{ contain: "layout" }}
              >
                <SecurityIcon name={item.icon} />
                <h3 className="mt-5 font-semibold text-neutral-900">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-neutral-600">
                  {item.description}
                </p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 flex flex-wrap justify-center gap-4">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-xl bg-brand-gunmetal px-7 py-3.5 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-gunmetal-dark hover:shadow-medium focus-visible:bg-brand-gunmetal-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2"
          >
            See pricing
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-7 py-3.5 text-[15px] font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:border-brand-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </section>
  );
}
