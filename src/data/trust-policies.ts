export type TrustCategory = "Security" | "Privacy" | "Governance" | "ESG" | "Legal";

export interface TrustDocument {
  slug: string;
  title: string;
  description: string;
  category: TrustCategory;
  linkLabel: string; // e.g. "Read policy" or "Read register"
}

export const TRUST_CATEGORIES: TrustCategory[] = [
  "Security",
  "Privacy",
  "Governance",
  "ESG",
  "Legal",
];

export const TRUST_DOCUMENTS: TrustDocument[] = [
  {
    slug: "cyber-security",
    title: "Cyber Security Policy",
    description:
      "How we manage access, security controls, incident response, and operational safeguards.",
    category: "Security",
    linkLabel: "Read policy",
  },
  {
    slug: "sub-processor-register",
    title: "Sub-processor Register",
    description:
      "A current list of third-party sub-processors, including purpose, data categories, and processing locations.",
    category: "Security",
    linkLabel: "Read register",
  },
  {
    slug: "customer-privacy",
    title: "Customer Privacy Notice",
    description:
      "How personal data is handled, supported via rights requests, and protected by governance.",
    category: "Privacy",
    linkLabel: "Read policy",
  },
  {
    slug: "cookie-policy",
    title: "Cookie Policy",
    description: "Cookie usage and tracking disclosure in clear, plain language.",
    category: "Privacy",
    linkLabel: "Read policy",
  },
  {
    slug: "terms-of-use",
    title: "Terms of Use",
    description: "Website terms and conditions for use of Stratavor online services and materials.",
    category: "Legal",
    linkLabel: "Read policy",
  },
  {
    slug: "dpa",
    title: "Data Processing Agreement (DPA)",
    description:
      "Customer-facing processing terms, roles, and obligations for data protection.",
    category: "Legal",
    linkLabel: "Read policy",
  },
  {
    slug: "responsible-ai",
    title: "Responsible AI Policy",
    description:
      "Principles for safe, accountable AI use, oversight, and human-aligned outcomes.",
    category: "Governance",
    linkLabel: "Read policy",
  },
  {
    slug: "whistleblowing",
    title: "Whistleblower Policy",
    description:
      "How concerns can be raised safely, handled consistently, and reviewed appropriately.",
    category: "Governance",
    linkLabel: "Read policy",
  },
  {
    slug: "anti-corruption-anti-bribery",
    title: "Anti-Corruption & Anti-Bribery",
    description:
      "Ethical conduct standards, conflicts policy, and anti-bribery controls.",
    category: "Governance",
    linkLabel: "Read policy",
  },
  {
    slug: "environmental",
    title: "Environmental Policy",
    description:
      "How we manage impact, procurement, and sustainability commitments across operations.",
    category: "ESG",
    linkLabel: "Read policy",
  },
  {
    slug: "human-rights",
    title: "Human Rights Policy",
    description:
      "Commitments and expectations across our people, suppliers, and operating practices.",
    category: "ESG",
    linkLabel: "Read policy",
  },
  {
    slug: "dei",
    title: "DEI Policy",
    description:
      "Our approach to inclusion, fairness, and respectful working practices.",
    category: "ESG",
    linkLabel: "Read policy",
  },
  {
    slug: "data-protection",
    title: "Data Protection Policy",
    description:
      "How we operationalize privacy controls, retention discipline, and governance patterns.",
    category: "Privacy",
    linkLabel: "Read policy",
  },
];
