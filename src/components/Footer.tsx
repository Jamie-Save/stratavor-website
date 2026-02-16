import Link from "next/link";

// TODO: Replace with actual Stratavor logo
const LogoPlaceholder = () => (
  <span className="text-lg font-semibold text-neutral-900">Stratavor</span>
);

const footerLinks = {
  Product: [
    { href: "#what-we-do", label: "Features" },
    { href: "#integrations", label: "Integrations" },
    { href: "/pricing", label: "Pricing" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-content px-content py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block focus-visible:rounded-lg">
              <LogoPlaceholder />
            </Link>
            <p className="mt-4 max-w-xs text-sm text-neutral-600">
              Placeholder tagline. Short company description.
            </p>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-neutral-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-neutral-500">
            © {new Date().getFullYear()} Stratavor. Placeholder.
          </p>
        </div>
      </div>
    </footer>
  );
}
