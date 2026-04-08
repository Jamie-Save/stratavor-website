/**
 * Security section content - home page SecurityGrid and chat assistant context.
 */

/** Intro copy for the home page security band (also fed to the site assistant). */
export const SECURITY_HOME_SECTION = {
  label: "Security & compliance",
  heading: "Enterprise-grade security",
  subheading:
    "Built for teams who demand control, auditability, and compliance by design.",
  /** In-app route for Trust Centre */
  trustCentrePath: "/trust",
  /** Canonical URL for chat / external references */
  trustCentreUrl: "https://stratavor.com/trust",
} as const;

export type SecurityItem = {
  title: string;
  description: string;
  icon: "shield" | "cert" | "gavel" | "lock" | "users" | "trace";
};

export const securityItems: SecurityItem[] = [
  {
    title: "SOC 2 readiness",
    description:
      "Controls and auditability designed in from day one, with enterprise-grade evidence trails.",
    icon: "shield",
  },
  {
    title: "Information security (ISO 27001)",
    description:
      "A security management approach that scales with customers, users, and data sensitivity.",
    icon: "cert",
  },
  {
    title: "GDPR-aligned handling",
    description:
      "Clear purpose, retention, and governance patterns for defensible EU-grade compliance.",
    icon: "gavel",
  },
  {
    title: "Encryption in transit + at rest",
    description:
      "Secure transport and storage patterns so sensitive reporting stays protected end-to-end.",
    icon: "lock",
  },
  {
    title: "Role-based access + audit logs",
    description:
      "Permissions that match real org structure, with clear accountability and change history.",
    icon: "users",
  },
  {
    title: "Show-your-work traceability",
    description:
      "Every KPI and narrative can be tied back to source fields and period logic.",
    icon: "trace",
  },
];

/** Plain-text block aligned with the home page security section for LLM context. */
export function buildHomeSecurityChatContext(): string {
  const bullets = securityItems
    .map((item) => `- ${item.title}: ${item.description}`)
    .join("\n");

  return `${SECURITY_HOME_SECTION.label}
${SECURITY_HOME_SECTION.heading}
${SECURITY_HOME_SECTION.subheading}

Points shown on the home page:
${bullets}

Official policies and customer documents: ${SECURITY_HOME_SECTION.trustCentreUrl} (same as ${SECURITY_HOME_SECTION.trustCentrePath} on this site).`;
}
