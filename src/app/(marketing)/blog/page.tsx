import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Stratavor",
  description: "Insights on strategic intelligence, FP&A, and data-driven decision making.",
};

export default function BlogPage() {
  return (
    <section className="min-h-screen bg-white py-section">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          Blog
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">
          This page is coming soon. Check back for insights on strategy, reporting, and AI-powered analytics.
        </p>
      </div>
    </section>
  );
}
