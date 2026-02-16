/**
 * Security section content - Stratavor security section replication
 */

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
