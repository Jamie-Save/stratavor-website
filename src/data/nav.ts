import { LIVE_DEMO_URL } from "@/data/demo-config";

export type NavChild = { href: string; label: string; external?: boolean };

export type NavLink =
  | { href: string; label: string }
  | { label: string; children: NavChild[] };

/** Primary marketing nav (desktop dropdowns + mobile sheet). */
export const MARKETING_NAV_LINKS: NavLink[] = [
  {
    label: "Solutions",
    children: [
      { href: "/#what-we-do", label: "Platform" },
      { href: "/#solutions", label: "What We Deliver" },
      { href: LIVE_DEMO_URL, label: "Live Demo", external: true },
      { href: "/power-bi", label: "Power BI" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  {
    label: "Resources",
    children: [
      { href: "/blog", label: "Blog" },
      { href: "/tools", label: "Tools & Templates" },
      { href: "/trust", label: "Trust Centre" },
    ],
  },
  { href: "/about", label: "Company" },
];
