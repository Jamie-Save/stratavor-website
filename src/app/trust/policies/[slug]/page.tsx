import { notFound } from "next/navigation";
import { PolicyPageLayout } from "@/components/PolicyPageLayout";
import { getPolicyContent } from "@/data/trust-policy-content";
import { TRUST_DOCUMENTS } from "@/data/trust-policies";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return TRUST_DOCUMENTS.filter(
    (d) => d.slug !== "sub-processor-register" && d.slug !== "dpa"
  ).map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = TRUST_DOCUMENTS.find((d) => d.slug === slug);
  if (!doc) return { title: "Policy | Stratavor" };
  return {
    title: `${doc.title} | Trust | Stratavor`,
    description: doc.description,
  };
}

export default async function PolicyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = getPolicyContent(slug);
  if (!content) notFound();

  return (
    <div className="min-h-screen bg-white">
      <PolicyPageLayout title={content.title} sections={content.sections} />
    </div>
  );
}
