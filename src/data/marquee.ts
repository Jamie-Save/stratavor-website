/**
 * TODO: Replace with real assets and data.
 * - trustedByLogos: Add logo files to public/images/logos/trusted/
 * - integrationLogos: Add logo files to public/images/logos/integrations/
 * - whatWeDoImages: Product screenshots in public/hero/ (same set as the home hero carousel)
 */

export type LogoItem = {
  src?: string;
  alt: string;
  name: string;
};

export type ImageItem = {
  src: string;
  alt: string;
  bullet?: string;
};

// TODO: Add real logo files to public/images/logos/trusted/ and set src
export const trustedByLogos: LogoItem[] = [
  { alt: "Finance teams", name: "Finance" },
  { alt: "Strategy leaders", name: "Strategy" },
  { alt: "Board members", name: "Board" },
  { alt: "FP&A teams", name: "FP&A" },
  { alt: "Executive teams", name: "Executive" },
  { alt: "CFOs", name: "CFO" },
];

export const integrationLogos: LogoItem[] = [
  { src: "/images/logos/integrations/microsoft.png", alt: "Microsoft", name: "Microsoft" },
  { src: "/images/logos/integrations/stripe.png", alt: "Stripe", name: "Stripe" },
  { src: "/images/logos/integrations/oracle-netsuite.png", alt: "Oracle NetSuite", name: "Oracle NetSuite" },
  { src: "/images/logos/integrations/hubspot.png", alt: "HubSpot", name: "HubSpot" },
  { src: "/images/logos/integrations/google.png", alt: "Google", name: "Google" },
  { src: "/images/logos/integrations/xero.png", alt: "Xero", name: "Xero" },
  { src: "/images/logos/integrations/quickbooks.svg", alt: "QuickBooks", name: "QuickBooks" },
];

export const whatWeDoImages: ImageItem[] = [
  {
    src: "/hero/intelligence-hub.png",
    alt: "Stratavor Intelligence Hub dashboard with executive summary and KPI cards",
  },
  {
    src: "/hero/reporting-snapshots.png",
    alt: "Stratavor Reporting Snapshots library with report types and ready-to-view reports",
  },
  {
    src: "/hero/risk-intelligence.png",
    alt: "Stratavor Risk Intelligence risk register with scores and AI-suggested mitigations",
  },
  {
    src: "/hero/dashboard-with-chat.png",
    alt: "Stratavor dashboard with Ask Stratavor AI assistant panel open alongside reporting",
  },
  {
    src: "/hero/ask-stratavor.png",
    alt: "Ask Stratavor AI chat with suggested questions and input field",
  },
];
