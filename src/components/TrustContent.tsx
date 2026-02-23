"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  TRUST_DOCUMENTS,
  TRUST_CATEGORIES,
  type TrustCategory,
  type TrustDocument,
} from "@/data/trust-policies";

export function TrustContent() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<TrustCategory | "All">("All");

  const filtered = useMemo(() => {
    let list = TRUST_DOCUMENTS;
    if (category !== "All") {
      list = list.filter((d) => d.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, category]);

  return (
    <>
      {/* Hero */}
      <section
        className="border-b border-neutral-200/80 bg-white py-12 sm:py-16"
        aria-labelledby="trust-heading"
      >
        <div className="mx-auto max-w-content px-content lg:px-8">
          <h1
            id="trust-heading"
            className="text-center text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl"
          >
            Confidence built on accountability.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-neutral-600">
            A single source of truth for Stratavor&apos;s security, privacy, and governance
            commitments, written clearly and maintained with the rigor due diligence expects.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="#policies"
              className="inline-flex items-center justify-center rounded-xl bg-brand-gunmetal px-6 py-3 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-brand-gunmetal-dark hover:shadow-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2"
            >
              Browse policies
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white px-6 py-3 text-[15px] font-semibold text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2"
            >
              Request a security review
            </Link>
          </div>
        </div>
      </section>

      {/* Policies and customer documents */}
      <section
        id="policies"
        className="bg-neutral-50 py-section"
        aria-labelledby="policies-heading"
      >
        <div className="mx-auto max-w-content px-content lg:px-8">
          <h2
            id="policies-heading"
            className="text-center text-2xl font-semibold tracking-tight text-brand-gunmetal sm:text-3xl"
          >
            Policies and customer documents
          </h2>
          <p className="mt-3 text-center text-neutral-600">
            Search by topic or filter by category.
          </p>

          {/* Search + Filter */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by topic..."
              aria-label="Search policies"
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-800 shadow-xs transition-colors placeholder:text-neutral-400 focus:border-brand-gunmetal focus:outline-none focus:ring-2 focus:ring-brand-gunmetal/20 sm:max-w-xs"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setCategory("All")}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 ${
                  category === "All"
                    ? "bg-brand-gunmetal text-white"
                    : "bg-white text-neutral-600 shadow-xs hover:bg-neutral-100 hover:text-neutral-900"
                }`}
              >
                All
              </button>
              {TRUST_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2 ${
                    category === cat
                      ? "bg-brand-gunmetal text-white"
                      : "bg-white text-neutral-600 shadow-xs hover:bg-neutral-100 hover:text-neutral-900"
                  }`}
                >
                  {cat}
                </button>
              ))}
              {(search || category !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                  }}
                  className="rounded-full px-4 py-2 text-sm font-medium text-neutral-600 underline-offset-2 hover:text-brand-gunmetal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal focus-visible:ring-offset-2"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <p className="mt-6 text-sm text-neutral-500">
            {filtered.length} document{filtered.length !== 1 ? "s" : ""}
          </p>

          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doc) => (
              <PolicyCard key={doc.slug} doc={doc} />
            ))}
          </ul>

          {filtered.length === 0 && (
            <p className="mt-12 text-center text-neutral-500">
              No documents match your search or filter. Try clearing filters or a different search.
            </p>
          )}
        </div>
      </section>
    </>
  );
}

function PolicyCard({ doc }: { doc: TrustDocument }) {
  const href =
    doc.slug === "sub-processor-register"
      ? "/trust/sub-processor-register"
      : doc.slug === "dpa"
        ? "/trust/dpa"
        : `/trust/policies/${doc.slug}`;

  return (
    <li>
      <article className="flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-6 shadow-soft transition-all hover:border-neutral-300 hover:shadow-medium">
        <h3 className="font-semibold text-brand-gunmetal">{doc.title}</h3>
        <p className="mt-2 flex-1 text-sm text-neutral-600">{doc.description}</p>
        <Link
          href={href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gunmetal transition-colors hover:text-brand-gunmetal-dark focus-visible:underline"
        >
          {doc.linkLabel}
          <span aria-hidden>→</span>
        </Link>
      </article>
    </li>
  );
}
