import { TrustContent } from "@/components/TrustContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust | Privacy, Security and ESG Standards",
  description:
    "A single source of truth for Stratavor's security, privacy, and governance commitments. Browse policies and customer documents.",
};

export default function TrustPage() {
  return <TrustContent />;
}
