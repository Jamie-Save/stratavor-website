import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sub-processor Register | Trust | Stratavor",
  description:
    "A current list of third-party sub-processors, including purpose, data categories, and processing locations.",
};

const ROWS = [
  { service: "Microsoft Azure", purpose: "Hosting, DB, storage", data: "Pseudonymised customer data, logs", location: "Ireland (primary), EU failover", transfer: "EEA processing; SCCs if cross-region" },
  { service: "Microsoft 365", purpose: "Corporate email & docs", data: "Business contact, docs", location: "EU/EEA (tenant config)", transfer: "SCC" },
  { service: "Stripe", purpose: "Payments/billing", data: "Billing contact; payment tokens", location: "EU + US processing", transfer: "SCCs/DPF as applicable" },
  { service: "HubSpot", purpose: "CRM & marketing", data: "Lead/contact data", location: "EU DC (may use US support)", transfer: "SCCs (incl. DPF if applicable)" },
  { service: "GitHub", purpose: "Source control", data: "Dev identities; code", location: "EU/US", transfer: "SCCs/DPF as applicable" },
  { service: "OpenAI", purpose: "LLM narrative generation", data: "Derived metrics & prompts (no raw PII)", location: "US", transfer: "SCCs Module 3 (processor)" },
  { service: "Xero", purpose: "Accounting data source", data: "Financial records; vendor/customer names", location: "Customer's region (Xero)", transfer: "Customer's own transfer basis" },
  { service: "QuickBooks Online", purpose: "Accounting data source", data: "Financial records; vendor/customer names", location: "Customer's region (Intuit)", transfer: "Customer's own transfer basis" },
];

export default function SubProcessorRegisterPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-content px-content py-12 lg:px-8">
        <Link
          href="/trust#policies"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal"
        >
          ← Back to Trust
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          Sub-processor Register
        </h1>
        <p className="mt-4 text-neutral-600">
          A current list of third-party sub-processors, including purpose, data categories, and
          processing locations.
        </p>
        <div className="mt-10 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-200 bg-neutral-50">
                <th className="px-6 py-4 font-semibold text-neutral-900">Service</th>
                <th className="px-6 py-4 font-semibold text-neutral-900">Purpose</th>
                <th className="px-6 py-4 font-semibold text-neutral-900">Data categories</th>
                <th className="px-6 py-4 font-semibold text-neutral-900">Location/Region</th>
                <th className="px-6 py-4 font-semibold text-neutral-900">Transfer mechanism</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-neutral-100 last:border-b-0 hover:bg-neutral-50/80"
                >
                  <td className="px-6 py-4 font-medium text-neutral-800">{row.service}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.purpose}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.data}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.location}</td>
                  <td className="px-6 py-4 text-neutral-600">{row.transfer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
