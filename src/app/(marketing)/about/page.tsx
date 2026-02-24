import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Stratavor",
  description: "Learn about Stratavor and our mission to turn data into board-ready strategy.",
};

export default function AboutPage() {
  return (
    <section className="min-h-screen bg-white py-section">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          About Stratavor
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">
          This page is coming soon. In the meantime, explore our product, pricing, and trust centre.
        </p>
      </div>
    </section>
  );
}
