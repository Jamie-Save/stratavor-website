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

// TODO: trustedByLogos[] - replace with real logo paths
export const trustedByLogos: LogoItem[] = [
  { alt: "Company 1", name: "Company 1" },
  { alt: "Company 2", name: "Company 2" },
  { alt: "Company 3", name: "Company 3" },
  { alt: "Company 4", name: "Company 4" },
  { alt: "Company 5", name: "Company 5" },
  { alt: "Company 6", name: "Company 6" },
];

export const integrationLogos: LogoItem[] = [
  { src: "/images/logos/integrations/microsoft.png", alt: "Microsoft", name: "Microsoft" },
  { src: "/images/logos/integrations/stripe.png", alt: "Stripe", name: "Stripe" },
  { src: "/images/logos/integrations/oracle-netsuite.png", alt: "Oracle NetSuite", name: "Oracle NetSuite" },
  { src: "/images/logos/integrations/hubspot.png", alt: "HubSpot", name: "HubSpot" },
  { src: "/images/logos/integrations/google.png", alt: "Google", name: "Google" },
  { src: "/images/logos/integrations/xero.png", alt: "Xero", name: "Xero" },
  { src: "/images/logos/integrations/quickbooks.png", alt: "QuickBooks", name: "QuickBooks" },
];

// TODO: whatWeDoImages[] - replace with real image paths
export const whatWeDoImages: ImageItem[] = [
  { src: "/images/what-we-do/placeholder-1.svg", alt: "Placeholder 1" },
  { src: "/images/what-we-do/placeholder-2.svg", alt: "Placeholder 2" },
  { src: "/images/what-we-do/placeholder-3.svg", alt: "Placeholder 3" },
  { src: "/images/what-we-do/placeholder-4.svg", alt: "Placeholder 4" },
  { src: "/images/what-we-do/placeholder-5.svg", alt: "Placeholder 5" },
];
