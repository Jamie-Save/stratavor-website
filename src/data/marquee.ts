/**
 * TODO: Replace with real assets and data.
 * - trustedByLogos: Add logo files to public/images/logos/trusted/
 * - integrationLogos: Add logo files to public/images/logos/integrations/
 * - whatWeDoImages: Add image files to public/images/what-we-do/
 */

export type LogoItem = {
  src?: string;
  alt: string;
  name: string;
};

export type ImageItem = {
  src: string;
  alt: string;
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
  { src: "/images/what-we-do/what-we-do-1.png", alt: "Stratavor OKRs & Initiatives" },
  { src: "/images/what-we-do/what-we-do-2.png", alt: "Stratavor Data & Settings" },
  { src: "/images/what-we-do/what-we-do-3.png", alt: "Stratavor Strategic Insights" },
];
