export type ComparisonEntry =
  | { kind: "section"; title: string }
  | {
      kind: "row";
      feature: string;
      essentials: string;
      growth: string;
      enterprise: string;
    };

export const PRICING_COMPARISON: ComparisonEntry[] = [
  { kind: "section", title: "Portal modules" },
  { kind: "row", feature: "Intelligence Hub", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Financial Snapshot + PDF", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Management Snapshot", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Risk Intelligence", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Strategy Delivery", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Ask Stratavor (AI chatbot)", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Signals inbox", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Cost Saving Intelligence Hub", essentials: "—", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Benchmarking engine", essentials: "—", growth: "✓", enterprise: "✓" },
  { kind: "section", title: "Capacity" },
  { kind: "row", feature: "Core connectors", essentials: "1", growth: "All available", enterprise: "All available" },
  { kind: "row", feature: "Custom integrations", essentials: "—", growth: "1 included", enterprise: "Scoped" },
  { kind: "row", feature: "Portal users", essentials: "3", growth: "10", enterprise: "Unlimited" },
  { kind: "row", feature: "AI queries / month", essentials: "100", growth: "500", enterprise: "Unlimited" },
  { kind: "row", feature: "Data history", essentials: "12 months", growth: "36 months", enterprise: "Full history" },
  { kind: "section", title: "Reporting & customisation" },
  {
    kind: "row",
    feature: "Branded PDF exports",
    essentials: "Your logo + Stratavor footer",
    growth: "Full white-label",
    enterprise: "Full white-label",
  },
  { kind: "row", feature: "Report layout customisation", essentials: "—", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Custom report templates", essentials: "—", growth: "—", enterprise: "✓" },
  { kind: "row", feature: "Snapshot scheduling", essentials: "—", growth: "✓", enterprise: "✓" },
  { kind: "section", title: "Enterprise" },
  { kind: "row", feature: "Multi-entity consolidation", essentials: "—", growth: "—", enterprise: "✓" },
  { kind: "row", feature: "SSO + advanced security", essentials: "—", growth: "—", enterprise: "✓" },
  { kind: "row", feature: "API access", essentials: "—", growth: "—", enterprise: "✓" },
  { kind: "row", feature: "Dedicated account manager", essentials: "—", growth: "—", enterprise: "✓" },
  { kind: "section", title: "Support" },
  { kind: "row", feature: "Email support", essentials: "✓", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Priority support (24h SLA)", essentials: "—", growth: "✓", enterprise: "✓" },
  { kind: "row", feature: "Dedicated onboarding", essentials: "—", growth: "—", enterprise: "✓" },
];
