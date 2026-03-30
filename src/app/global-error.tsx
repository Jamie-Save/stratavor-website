"use client";

import "./globals.css";

/** App-wide error UI; must define its own `html` / `body` (Next.js App Router). */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 px-6 py-16 font-sans text-neutral-800">
        <h1 className="text-xl font-semibold text-brand-gunmetal">Something went wrong</h1>
        {process.env.NODE_ENV === "development" && error?.digest ? (
          <p className="mt-2 text-sm text-neutral-500">Digest: {error.digest}</p>
        ) : null}
        <button
          type="button"
          className="mt-6 rounded-lg border border-neutral-300 bg-white px-4 py-2 text-sm font-medium text-brand-gunmetal hover:bg-neutral-50"
          onClick={() => reset()}
        >
          Try again
        </button>
      </body>
    </html>
  );
}
