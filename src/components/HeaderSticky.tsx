"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useScrollState } from "@/hooks/useScrollState";
import { useFocusTrap } from "@/hooks/useFocusTrap";

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: { href: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal focus-visible:text-brand-gunmetal"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="resources-menu"
        id="resources-trigger"
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id="resources-menu"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="resources-trigger"
        className={`absolute left-1/2 top-full z-50 -mt-1.5 -translate-x-1/2 overflow-hidden rounded-lg border border-neutral-200 bg-white py-1 shadow-large origin-top transition-all duration-150 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            className="block min-w-[180px] whitespace-nowrap px-5 py-3 text-sm text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

type NavLink =
  | { href: string; label: string }
  | { label: string; children: { href: string; label: string }[] };

const navLinks: NavLink[] = [
  { href: "#what-we-do", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  {
    label: "Resources",
    children: [
      { href: "/blog", label: "Blog" },
      { href: "/trust", label: "Trust" },
      { href: "/tools", label: "Tools" },
    ],
  },
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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        isScrolled
          ? "border-neutral-200/60 bg-white/80 shadow-header-scrolled backdrop-blur-xl backdrop-saturate-[1.8]"
          : "border-transparent bg-transparent"
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
          {navLinks.map((link) =>
            "children" in link ? (
              <NavDropdown key={link.label} label={link.label} items={link.children} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal focus-visible:text-brand-gunmetal"
              >
                <span className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-brand-gunmetal after:transition-all after:duration-300 hover:after:w-full">
                  {link.label}
                </span>
              </Link>
            )
          )}
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
            className="hidden shrink-0 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal focus-visible:text-brand-gunmetal md:inline-flex"
          >
            Login
          </Link>

          {/* Free Trial */}
          <Link
            href="/pricing"
            className="shrink-0 rounded-lg bg-brand-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-all hover:bg-brand-accent-hover hover:shadow-medium focus-visible:bg-brand-accent-hover focus-visible:ring-2 focus-visible:ring-brand-accent/30"
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
            {navLinks.map((link) =>
              "children" in link ? (
                <li key={link.label}>
                  <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    {link.label}
                  </p>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={closeMenu}
                      className="block rounded-lg py-2 pl-6 pr-4 text-sm text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
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
                    className="block rounded-lg px-4 py-3 text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 focus-visible:bg-neutral-100 focus-visible:text-neutral-900"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
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
