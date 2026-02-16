/**
 * TODO: Replace with real testimonial data.
 * Required fields: quote, name, title, company
 * Optional: avatar (image URL), companyLogo (image URL), role (for filter pills)
 */

export type FilterRole = "All" | "CFO" | "Ops" | "Finance";

export type TestimonialRole = "CFO" | "Ops" | "Finance";

export type Testimonial = {
  quote: string;
  name: string;
  title: string;
  company: string;
  avatar?: string;
  companyLogo?: string;
  role?: TestimonialRole;
};

// TODO: Replace with real testimonials. Use role for filter pills.
export const testimonials: Testimonial[] = [
  {
    quote:
      "We needed better visibility into our financial operations. The platform delivered exactly that—clear reporting and insights we can act on.",
    name: "Sarah Chen",
    title: "CFO",
    company: "Acme Corp",
    role: "CFO",
  },
  {
    quote:
      "Streamlined our workflows significantly. The team adopted it quickly and we saw results within the first month.",
    name: "Marcus Webb",
    title: "Head of Operations",
    company: "TechFlow Inc",
    role: "Ops",
  },
  {
    quote:
      "Finally, a solution that connects our systems without the integration headaches. Data flows where it needs to.",
    name: "Elena Rivera",
    title: "Director of Finance",
    company: "Horizon Group",
    role: "Finance",
  },
  {
    quote:
      "The ROI was clear from day one. We reduced manual work and improved accuracy across the board.",
    name: "David Park",
    title: "VP of Finance",
    company: "Summit Analytics",
    role: "CFO",
  },
  {
    quote:
      "Our ops team runs smoother. Less firefighting, more strategic work. That's the win.",
    name: "Jennifer Walsh",
    title: "Chief Operating Officer",
    company: "Nexus Partners",
    role: "Ops",
  },
  {
    quote:
      "Implementation was straightforward. We were up and running faster than we expected.",
    name: "Robert Kim",
    title: "Finance Lead",
    company: "Stellar Dynamics",
    role: "Finance",
  },
];

export const filterPills: { id: FilterRole; label: string }[] = [
  { id: "All", label: "All" },
  { id: "CFO", label: "CFO" },
  { id: "Ops", label: "Ops" },
  { id: "Finance", label: "Finance" },
];
