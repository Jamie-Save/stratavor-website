import { PolicyPageLayout } from "@/components/PolicyPageLayout";
import { getPolicyContent } from "@/data/trust-policy-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Data Processing Agreement (DPA) | Trust | Stratavor",
  description:
    "Customer-facing processing terms, roles, and obligations for data protection.",
};

export default function DPAPage() {
  const content = getPolicyContent("dpa");
  if (!content) return null;

  return (
    <div className="min-h-screen bg-white">
      <PolicyPageLayout title={content.title} sections={content.sections} />
    </div>
  );
}
