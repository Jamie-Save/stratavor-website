"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useScrollState } from "@/hooks/useScrollState";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { BOOK_DEMO_CALENDAR_URL, CONTACT_LOGIN_URL } from "@/data/contact-links";
import { HOME_HERO } from "@/data/marketing-copy";
import { MARKETING_NAV_LINKS } from "@/data/nav";
import { NavDropdown } from "@/components/nav/NavDropdown";

export default function HeaderSticky() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = useScrollState(8);
  const menuRef = useFocusTrap(mobileOpen);

  const hamburgerRef = React.useRef<HTMLButtonElement>(null);
  const closeMenu = useCallback(() => {
    setMobileOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mobileOpen, closeMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        isScrolled
          ? "border-neutral-200/50 bg-white/70 shadow-header-scrolled backdrop-blur-xl backdrop-saturate-[1.8]"
          : "border-transparent bg-white/90"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-9 px-content py-6 lg:px-8">
        {/* Logo: left */}
        <Link
          href="/"
          className="relative flex h-16 shrink-0 focus-visible:rounded-lg"
          aria-label="Stratavor home"
        >
          <Image
            src="/images/stratavor-logo.svg"
            alt="Stratavor"
            width={544}
            height={173}
            className="h-14 w-auto max-w-[min(100%,20rem)] object-contain sm:h-16"
            priority
          />
        </Link>

        {/* Nav: center (desktop) */}
        <nav
          className="hidden flex-1 items-center justify-center gap-10 md:flex"
          aria-label="Main"
        >
          {MARKETING_NAV_LINKS.map((link) =>
            "children" in link ? (
              <NavDropdown key={link.label} label={link.label} items={link.children} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal focus-visible:text-brand-gunmetal"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-gunmetal after:transition-all after:duration-300 hover:after:w-full">
                  {link.label}
                </span>
              </Link>
            )
          )}
        </nav>

        {/* Right: CTAs (desktop) | Hamburger + Free Trial (mobile) */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Hamburger: mobile only */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Login: desktop only */}
          <Link
            href={CONTACT_LOGIN_URL}
            className="hidden shrink-0 text-sm font-medium text-neutral-500 transition-colors hover:text-brand-gunmetal focus-visible:text-brand-gunmetal md:inline-flex"
          >
            Sign in
          </Link>

          {/* Book a demo: desktop only */}
          <Link
            href={BOOK_DEMO_CALENDAR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 rounded-xl border border-neutral-200 bg-white px-5 py-2.5 text-sm font-semibold text-brand-gunmetal transition-all hover:border-brand-gunmetal hover:bg-brand-gunmetal hover:text-white focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 focus-visible:ring-offset-white md:inline-flex"
          >
            {HOME_HERO.secondaryCtaLabel}
          </Link>

          {/* Free Trial */}
          <Link
            href={CONTACT_LOGIN_URL}
            className="shrink-0 rounded-xl bg-brand-accent px-5 py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-brand-accent-hover hover:shadow-medium focus-visible:bg-brand-accent-hover focus-visible:ring-2 focus-visible:ring-brand-accent/30"
          >
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Mobile menu: keyboard trapped, ESC to close */}
      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`border-t border-neutral-200 bg-white md:hidden ${
          mobileOpen ? "block" : "hidden"
        }`}
      >
        <nav aria-label="Mobile">
          <ul className="flex flex-col px-content py-6">
            {MARKETING_NAV_LINKS.map((link) =>
              "children" in link ? (
                <li key={link.label}>
                  <p className="px-5 py-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMenu}
                      {...(child.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="block rounded-xl py-3 pl-8 pr-5 text-base text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
                    >
                      {child.label}
                    </Link>
                  ))}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block rounded-xl px-5 py-4 text-base font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            <li className="mt-3 border-t border-neutral-200 pt-3">
              <Link
                href={CONTACT_LOGIN_URL}
                onClick={closeMenu}
                className="block rounded-xl px-5 py-4 text-base font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900"
              >
                Customer login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
