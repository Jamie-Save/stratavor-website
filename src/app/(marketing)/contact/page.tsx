import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | Stratavor",
  description: "Talk to sales, book a demo, or request a security review. Get in touch with the Stratavor team.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string }>;
}) {
  const params = await searchParams;
  return (
    <section className="bg-neutral-50 py-section">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <ContactForm intent={params.intent} />
      </div>
    </section>
  );
}
