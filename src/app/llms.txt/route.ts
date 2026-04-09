import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";

/**
 * Machine-readable site summary for LLM / AI crawlers (llms.txt convention).
 * @see https://llmstxt.org/
 */
export function GET() {
  const base = getSiteUrl().replace(/\/$/, "");
  const body = [
    "# Stratavor",
    "",
    "Stratavor is a strategic intelligence and FP&A platform for finance leaders: board-ready reporting, AI commentary, variance narratives, risk signals, and integrations (e.g. Xero, QuickBooks).",
    "",
    "## Key pages",
    `${base}/`,
    `${base}/pricing`,
    `${base}/power-bi`,
    `${base}/about`,
    `${base}/contact`,
    `${base}/blog`,
    `${base}/tools`,
    `${base}/trust`,
    `${base}/trust/dpa`,
    "",
    "## Not for indexing",
    "API routes under /api/ are for application use only, not public documentation endpoints.",
    "",
    "## Contact",
    "General enquiries: https://stratavor.com/contact",
    "Company: Stratavor Limited, Ireland.",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
