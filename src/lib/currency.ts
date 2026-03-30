import type { SupportedCurrency } from "@/types/supported-currency";

/** Avoid Intl.RangeError / TypeError when RSC props or data are unexpectedly missing at runtime. */
export function coerceSupportedCurrency(value: unknown): SupportedCurrency {
  if (value === "EUR" || value === "USD" || value === "GBP") return value;
  return "EUR";
}

/** Geo headers from Vercel / Cloudflare; default EUR (IE + rest). */
export function initialCurrencyFromGeoHeaders(
  getHeader: (name: string) => string | null | undefined,
): SupportedCurrency {
  const country =
    getHeader("x-vercel-ip-country")?.toUpperCase() ??
    getHeader("cf-ipcountry")?.toUpperCase() ??
    null;
  return country === "US" ? "USD" : country === "GB" ? "GBP" : "EUR";
}

export function formatPlanPrice(amount: number, currency: SupportedCurrency): string {
  const code = coerceSupportedCurrency(currency);
  if (typeof amount !== "number" || !Number.isFinite(amount)) {
    return "—";
  }
  // Intentionally no cents for plan pricing.
  // Using en-US for consistent separators while keeping correct currency symbol.
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    maximumFractionDigits: 0,
  }).format(amount);
}

