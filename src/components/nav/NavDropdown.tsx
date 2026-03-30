"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import type { NavChild } from "@/data/nav";

type NavDropdownProps = {
  label: string;
  items: NavChild[];
};

export function NavDropdown({ label, items }: NavDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuId = `${label.toLowerCase().replace(/\s+/g, "-")}-menu`;
  const triggerId = `${label.toLowerCase().replace(/\s+/g, "-")}-trigger`;

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
        className="flex items-center gap-1.5 text-base font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal focus-visible:text-brand-gunmetal"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
        id={triggerId}
      >
        {label}
        <svg
          className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        id={menuId}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby={triggerId}
        className={`absolute left-1/2 top-full z-50 -mt-2 -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white py-2 shadow-large origin-top transition-all duration-150 ${
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            role="menuitem"
            {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="block min-w-[270px] whitespace-nowrap px-6 py-4 text-base text-neutral-600 transition-colors hover:bg-neutral-50 hover:text-neutral-900"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
