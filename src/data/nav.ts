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
      { href: "/power-bi", label: "Power BI" },
    ],
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "Company" },
  {
    label: "Resources",
    children: [
      { href: "/blog", label: "Blog" },
      { href: "/tools", label: "Tools & Templates" },
      { href: "/trust", label: "Trust Centre" },
    ],
  },
];
