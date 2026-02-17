"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useScrollState } from "@/hooks/useScrollState";
import { useFocusTrap } from "@/hooks/useFocusTrap";

const navLinks = [
  { href: "#what-we-do", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "#integrations", label: "Resources" },
];

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
      className={`sticky top-0 z-50 w-full border-b bg-white/85 backdrop-blur-md transition-shadow duration-200 ${
        isScrolled ? "border-neutral-300/80 shadow-header-scrolled" : "border-neutral-200/60"
      }`}
      role="banner"
    >
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-content py-4 lg:px-8">
        {/* Logo: left */}
        <Link
          href="/"
          className="relative flex h-9 shrink-0 focus-visible:rounded-lg"
          aria-label="Stratavor home"
        >
          <Image
            src="/images/stratavor-logo.svg"
            alt="Stratavor"
            width={140}
            height={44}
            className="h-9 w-auto object-contain"
            priority
          />
        </Link>

        {/* Nav: center (desktop) */}
        <nav
          className="hidden flex-1 items-center justify-center gap-8 md:flex"
          aria-label="Main"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right: CTAs (desktop) | Hamburger + Free Trial (mobile) */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Hamburger: mobile only */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900 md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <svg
              className="h-5 w-5"
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
            href="/login"
            className="hidden shrink-0 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900 focus-visible:text-neutral-900 md:inline-flex"
          >
            Login
          </Link>

          {/* Free Trial */}
          <Link
            href="/pricing"
            className="shrink-0 rounded-lg bg-brand-orange px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-orange-hover focus-visible:bg-brand-orange-hover"
          >
            Free Trial
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
          <ul className="flex flex-col px-content py-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-neutral-200 pt-2">
              <Link
                href="/login"
                onClick={closeMenu}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900"
              >
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
