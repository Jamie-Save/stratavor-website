/**
 * One-off generator: docs/PRICING_PAGE_FULL_SOURCE.md
 * Run: node scripts/build-pricing-page-bundle.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const files = [
  "src/app/pricing/page.tsx",
  "src/components/pricing/PricingPageClient.tsx",
  "src/components/pricing/PricingHero.tsx",
  "src/components/pricing/PricingToggle.tsx",
  "src/components/pricing/PricingGrid.tsx",
  "src/components/pricing/PricingCard.tsx",
  "src/components/pricing/PilotSection.tsx",
  "src/components/pricing/ConnectorsSection.tsx",
  "src/components/pricing/AddOnsSection.tsx",
  "src/components/pricing/AddOnCard.tsx",
  "src/components/pricing/FeatureComparison.tsx",
  "src/components/pricing/FAQSection.tsx",
  "src/components/pricing/FAQItem.tsx",
  "src/data/pricing-plans.ts",
  "src/data/pricing-comparison.ts",
  "src/data/pricing-faq.ts",
  "src/lib/currency.ts",
  "src/data/contact-links.ts",
  "src/lib/site-url.ts",
  "src/types/supported-currency.ts",
  "src/components/Marquee.tsx",
  "src/data/marquee.ts",
  "tailwind.config.ts",
  "src/app/globals.css",
  "src/styles/tokens.css",
];

const pricingFaqJsonLd = `// Excerpt from src/components/StructuredData.tsx — PricingFaqJsonLd only

import { PRICING_FAQ } from "@/data/pricing-faq";

export function PricingFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
`;

function langFor(p) {
  if (p.endsWith(".tsx")) return "tsx";
  if (p.endsWith(".ts")) return "typescript";
  if (p.endsWith(".css")) return "css";
  return "text";
}

let md = `# Stratavor pricing page — full source bundle

This file bundles **everything needed to recreate the /pricing experience** in a Next.js App Router project (same stack: Next 15, React 19, Tailwind 3, \`next/image\`).

## How to use

1. Copy files below into the same paths (or adjust \`@/\` imports to your alias).
2. Ensure \`tsconfig.json\` has \`"paths": { "@/*": ["./src/*"] }\` (or equivalent).
3. Add a route: \`src/app/pricing/page.tsx\` is included.
4. **Layout**: the live site wraps pages in a root layout (header/footer). This bundle is the pricing **page body** only.
5. **Public assets**: \`ConnectorsSection\` uses \`integrationLogos\` under \`public/images/logos/integrations/\` (see \`marquee.ts\`).
6. Regenerate this file after pricing changes: \`node scripts/build-pricing-page-bundle.mjs\`

---

## Excerpt: \`PricingFaqJsonLd\` (from StructuredData.tsx)

\`\`\`tsx
${pricingFaqJsonLd}
\`\`\`

---

`;

for (const rel of files) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) {
    md += `## MISSING: \`${rel}\`\n\n`;
    continue;
  }
  const body = fs.readFileSync(full, "utf8");
  md += `## \`${rel}\`\n\n\`\`\`${langFor(rel)}\n${body}\n\`\`\`\n\n`;
}

const out = path.join(root, "docs", "PRICING_PAGE_FULL_SOURCE.md");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, md, "utf8");
console.log("Wrote", out);
