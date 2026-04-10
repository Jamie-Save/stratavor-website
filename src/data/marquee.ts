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
  /** Integrations marquee only: multiplier on default logo height (1 = baseline) for visual balance. */
  logoScale?: number;
};

export type ImageItem = {
  src: string;
  alt: string;
  /** Short label for UI and chat context */
  title: string;
  /** On-page caption: what the screenshot shows and why it matters */
  description: string;
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
  {
    src: "/images/logos/integrations/oracle-netsuite.png",
    alt: "Oracle NetSuite",
    name: "Oracle NetSuite",
    logoScale: 1.2,
  },
  { src: "/images/logos/integrations/hubspot.png", alt: "HubSpot", name: "HubSpot" },
  { src: "/images/logos/integrations/google.png", alt: "Google", name: "Google" },
  { src: "/images/logos/integrations/xero.png", alt: "Xero", name: "Xero", logoScale: 1.2 },
  {
    src: "/images/logos/integrations/quickbooks.png",
    alt: "QuickBooks",
    name: "QuickBooks",
    logoScale: 3.5,
  },
];

/** Hero platform animation: `maxHeightPx` caps rendered logo size in the diagram (PNG or SVG). */
export type HeroIntegrationLogo = {
  src: string;
  alt: string;
  maxHeightPx: number;
};

/** Xero + QuickBooks in the hero diagram only (SVG; same box size). Rest of site uses integration logos. */
export const HERO_ACCOUNTING_LOGOS: readonly HeroIntegrationLogo[] = [
  { src: "/images/hero/accounting-xero.svg", alt: "Xero", maxHeightPx: 48 },
  { src: "/images/hero/accounting-quickbooks.svg", alt: "QuickBooks", maxHeightPx: 48 },
];

/** Google + Windows in the hero diagram only (SVG; same box size). Rest of site uses integration logos. */
export const HERO_WORKSPACE_LOGOS: readonly HeroIntegrationLogo[] = [
  { src: "/images/hero/workspace-google.svg", alt: "Google", maxHeightPx: 34 },
  { src: "/images/hero/workspace-windows.svg", alt: "Microsoft Windows", maxHeightPx: 34 },
];

export const HERO_ERP_LOGO: HeroIntegrationLogo = {
  src: "/images/logos/integrations/oracle-netsuite.png",
  alt: "Oracle NetSuite",
  maxHeightPx: 74,
};

export const HERO_CRM_LOGO: HeroIntegrationLogo = {
  src: "/images/logos/integrations/hubspot.png",
  alt: "HubSpot",
  maxHeightPx: 68,
};

export const whatWeDoImages: ImageItem[] = [
  {
    src: "/hero/intelligence-hub.png",
    alt: "Stratavor Intelligence Hub dashboard with executive summary and KPI cards",
    title: "Intelligence Hub",
    description:
      "Your executive cockpit: KPI cards, summaries, and health signals in one place so leadership scans performance without opening five tools.",
  },
  {
    src: "/hero/reporting-snapshots.png",
    alt: "Stratavor Reporting Snapshots library with report types and ready-to-view reports",
    title: "Reporting snapshots",
    description:
      "A library of ready-to-view report types—pick a snapshot, drill in, and share consistent narratives instead of rebuilding decks from scratch.",
  },
  {
    src: "/hero/risk-intelligence.png",
    alt: "Stratavor Risk Intelligence risk register with scores and AI-suggested mitigations",
    title: "Risk intelligence",
    description:
      "A live risk register with scores and AI-suggested mitigations, so concentrations and threshold breaches surface before they hit the board deck.",
  },
  {
    src: "/hero/dashboard-with-chat.png",
    alt: "Stratavor dashboard with Ask Stratavor AI assistant panel open alongside reporting",
    title: "Insights beside your data",
    description:
      "Keep reporting on screen while Ask Stratavor answers follow-ups in plain language—explore variances without losing your place in the numbers.",
  },
  {
    src: "/hero/ask-stratavor.png",
    alt: "Ask Stratavor AI chat with suggested questions and input field",
    title: "Ask Stratavor",
    description:
      "Suggested questions and a natural-language input so anyone can probe drivers, periods, and talking points without writing SQL or pivot tables.",
  },
];
