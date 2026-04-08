import Link from "next/link";
import Image from "next/image";
import { BOOK_DEMO_CALENDAR_URL } from "@/data/contact-links";

const footerLinks = {
  Platform: [
    { href: "/#what-we-do", label: "Features" },
    { href: "/#integrations", label: "Integrations" },
    { href: BOOK_DEMO_CALENDAR_URL, label: "Book a demo", external: true },
    { href: "/power-bi", label: "Power BI" },
    { href: "/pricing", label: "Pricing" },
  ],
  Resources: [
    { href: "/blog", label: "Blog" },
    { href: "/tools", label: "Tools & Templates" },
    { href: "/trust", label: "Trust Centre" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/trust/policies/customer-privacy", label: "Privacy" },
    { href: "/trust/policies/terms-of-use", label: "Terms" },
    { href: "/trust/policies/cookie-policy", label: "Cookies" },
    { href: "/trust/dpa", label: "DPA" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-brand-gunmetal text-white/70">
      <div className="mx-auto max-w-content px-content py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-block focus-visible:rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
            >
              <Image
                src="/images/stratavor-logo-white.svg"
                alt="Stratavor"
                width={220}
                height={70}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/50">
              Strategic intelligence for finance leaders. Turn your data into board-ready insights.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-caption font-semibold uppercase tracking-widest text-white/40">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-white/60 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-white/40">
            &copy; {new Date().getFullYear()} Stratavor Limited. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            Registered in Ireland
          </p>
        </div>
      </div>
    </footer>
  );
}
