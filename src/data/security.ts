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

/** Maps to SVG assets in public/images/security/ (same artwork as brand compliance icons). */
export type SecurityIconId =
  | "soc2"
  | "iso27001"
  | "gdpr"
  | "encryption"
  | "rba"
  | "traceability";

export const SECURITY_ICON_SRC: Record<SecurityIconId, string> = {
  soc2: "/images/security/soc-2.svg",
  iso27001: "/images/security/iso-27001.svg",
  gdpr: "/images/security/gdpr.svg",
  encryption: "/images/security/encryption.svg",
  rba: "/images/security/rba.svg",
  traceability: "/images/security/traceability.svg",
};

export type SecurityItem = {
  title: string;
  description: string;
  icon: SecurityIconId;
};

export const securityItems: SecurityItem[] = [
  {
    title: "SOC 2 readiness",
    description:
      "Controls and auditability designed in from day one, with enterprise-grade evidence trails.",
    icon: "soc2",
  },
  {
    title: "Information security (ISO 27001)",
    description:
      "A security management approach that scales with customers, users, and data sensitivity.",
    icon: "iso27001",
  },
  {
    title: "GDPR-aligned handling",
    description:
      "Clear purpose, retention, and governance patterns for defensible EU-grade compliance.",
    icon: "gdpr",
  },
  {
    title: "Encryption in transit + at rest",
    description:
      "Secure transport and storage patterns so sensitive reporting stays protected end-to-end.",
    icon: "encryption",
  },
  {
    title: "Role-based access + audit logs",
    description:
      "Permissions that match real org structure, with clear accountability and change history.",
    icon: "rba",
  },
  {
    title: "Show-your-work traceability",
    description:
      "Every KPI and narrative can be tied back to source fields and period logic.",
    icon: "traceability",
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
