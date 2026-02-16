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

// TODO: integrationLogos[] - replace with real logo paths
export const integrationLogos: LogoItem[] = [
  { alt: "Integration 1", name: "Integration 1" },
  { alt: "Integration 2", name: "Integration 2" },
  { alt: "Integration 3", name: "Integration 3" },
  { alt: "Integration 4", name: "Integration 4" },
  { alt: "Integration 5", name: "Integration 5" },
  { alt: "Integration 6", name: "Integration 6" },
];

// TODO: whatWeDoImages[] - replace with real image paths
export const whatWeDoImages: ImageItem[] = [
  { src: "/images/what-we-do/placeholder-1.svg", alt: "Placeholder 1" },
  { src: "/images/what-we-do/placeholder-2.svg", alt: "Placeholder 2" },
  { src: "/images/what-we-do/placeholder-3.svg", alt: "Placeholder 3" },
  { src: "/images/what-we-do/placeholder-4.svg", alt: "Placeholder 4" },
  { src: "/images/what-we-do/placeholder-5.svg", alt: "Placeholder 5" },
];
