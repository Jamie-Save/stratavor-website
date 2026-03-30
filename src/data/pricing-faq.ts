export interface PricingFAQItem {
  id: string;
  question: string;
  answer: string;
}

export const PRICING_FAQ: PricingFAQItem[] = [
  {
    id: "pilot",
    question: "What's included in the free pilot?",
    answer:
      "Full Growth tier access for 14 days. Connect your Xero or QuickBooks, and see your real data across every module — Intelligence Hub, Financial Snapshot, Risk Intelligence, Cost Saving Hub, AI chatbot, and more. No credit card required. After 14 days, choose a plan or walk away — your data is deleted automatically.",
  },
  {
    id: "connectors-vs-custom",
    question: "What are core connectors vs custom integrations?",
    answer:
      "Core connectors are integrations built and maintained by Stratavor — currently Xero, QuickBooks Online, and HubSpot, with Deltek Vantagepoint, NetSuite, and Sage on the roadmap. Custom integrations are bespoke connections to systems we don't yet support, scoped and built specifically for your organisation.",
  },
  {
    id: "upgrade",
    question: "Can I upgrade or downgrade at any time?",
    answer:
      "Yes. Move between Essentials and Growth at any time — upgrades are immediate, downgrades take effect at the end of your billing cycle. Enterprise is scoped individually, so changes go through your account manager.",
  },
  {
    id: "cancel-data",
    question: "What happens to my data if I cancel?",
    answer:
      "You can export all reports and snapshots as PDFs before cancelling. After cancellation, your data is retained for 30 days in case you change your mind, then permanently deleted in line with our GDPR-compliant data handling policy.",
  },
  {
    id: "launch-pricing",
    question: 'What does "Launch pricing" mean?',
    answer:
      "These prices are available to early adopters during our launch period. Clients who sign up at launch pricing keep their rate for as long as their subscription remains active, even if we raise prices for new customers later.",
  },
  {
    id: "security",
    question: "Is my data secure?",
    answer:
      "Yes. Stratavor uses read-only OAuth connections (we never store your credentials), encryption in transit and at rest, role-based access controls, and full audit logging. We're SOC 2 readiness-aligned with ISO 27001 and GDPR-compliant data handling. Every insight can be traced back to its source data.",
  },
];
