import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { BOOK_DEMO_CALENDAR_URL } from "@/data/contact-links";

export const metadata: Metadata = {
  title: "Contact | Stratavor",
  description: "Talk to sales, book a demo, or request a security review. Get in touch with the Stratavor team.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ intent?: string; source?: string; tool?: string }>;
}) {
  const params = await searchParams;
  if (params.intent === "demo") {
    redirect(BOOK_DEMO_CALENDAR_URL);
  }
  return (
    <section className="bg-neutral-50 py-section">
      <div className="mx-auto max-w-content px-content lg:px-8">
        <ContactForm intent={params.intent} source={params.source} tool={params.tool} />
      </div>
    </section>
  );
}
