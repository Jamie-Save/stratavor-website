import Link from "next/link";
import Image from "next/image";
import { BOOK_DEMO_CALENDAR_URL } from "@/data/contact-links";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/stratavor/",
    label: "LinkedIn",
    icon: (
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    ),
  },
  {
    href: "https://www.facebook.com/stratavor",
    label: "Facebook",
    icon: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    href: "https://x.com/stratavor",
    label: "X",
    icon: (
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    ),
  },
  {
    href: "https://www.instagram.com/stratavor/",
    label: "Instagram",
    icon: (
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    ),
  },
];

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

const linkClass =
  "inline-block text-sm text-white/60 underline-offset-4 transition-all duration-200 hover:text-white motion-safe:hover:translate-x-0.5 motion-safe:hover:underline focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-gunmetal text-white/70">
      <div
        className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-[min(28rem,100%)] w-[min(28rem,100vw)] max-w-[55%] sm:max-w-none lg:h-[26rem] lg:w-[32rem]"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 38% 42%, color-mix(in srgb, var(--accent) 11%, transparent), transparent 68%)",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-content px-content py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="relative lg:col-span-2">
            <div className="rounded-2xl bg-white/[0.04] p-6 shadow-medium ring-1 ring-white/10 lg:p-8">
              <Link
                href="/"
                className="block w-fit rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
              >
                <Image
                  src="/images/stratavor-logo-white.svg"
                  alt="Stratavor"
                  width={360}
                  height={110}
                  className="h-20 w-auto object-contain sm:h-[5.25rem] lg:h-24"
                />
              </Link>
            </div>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-white/55">
              Strategic intelligence for finance leaders. Turn your data into board-ready insights.
            </p>

            <div className="mt-6">
              <h3 className="text-caption font-semibold uppercase tracking-widest text-white/40">
                Social
              </h3>
              <ul className="mt-4 flex flex-wrap gap-3" role="list">
                {socialLinks.map(({ href, label, icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Stratavor on ${label}`}
                      className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/65 transition-colors hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-gunmetal"
                    >
                      <svg
                        className="h-5 w-5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden
                      >
                        {icon}
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="lg:border-l lg:border-white/5 lg:pl-8">
              <h3 className="text-caption font-semibold uppercase tracking-widest text-white/40">
                {heading}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      {...("external" in link && link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={linkClass}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="relative mt-20">
          <div className="mb-6 flex items-center justify-center gap-2" aria-hidden>
            <span className="h-px w-14 bg-gradient-to-r from-transparent to-brand-accent/35 sm:w-20" />
            <span className="size-1 shrink-0 rounded-full bg-brand-accent/40 ring-2 ring-brand-accent/15" />
            <span className="h-px w-14 bg-gradient-to-l from-transparent to-brand-accent/35 sm:w-20" />
          </div>
          <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} Stratavor Limited. All rights reserved.
            </p>
            <p className="text-xs text-white/30">Registered in Ireland</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
