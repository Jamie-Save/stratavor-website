import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Stratavor",
  description: "Get in touch with Stratavor for demos, support, or partnership.",
};

export default function ContactPage() {
  return (
    <section className="min-h-screen bg-white py-section">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <h1 className="text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
          Contact us
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center text-body-lg text-neutral-600">
          This page is coming soon. For now, use the Free Trial or See Pricing options to get started.
        </p>
      </div>
    </section>
  );
}
