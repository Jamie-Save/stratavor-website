import { PRICING_ADDONS, PRICING_PLANS, type PricingPlan } from "@/data/pricing-plans";
import { PRICING_FAQ } from "@/data/pricing-faq";
import { CHAT_ASSISTANT_SOURCE_OF_TRUTH_V1 } from "@/data/chat-assistant-source-of-truth";
import { buildExtendedSiteContext } from "@/data/chat-site-context";
import { buildHomeSecurityChatContext } from "@/data/security";
import { formatPlanPrice } from "@/lib/currency";
import type { SupportedCurrency } from "@/types/supported-currency";

const CURRENCIES: SupportedCurrency[] = ["EUR", "USD", "GBP"];

const PRODUCT_BLURB = `Stratavor is a strategic intelligence and FP&A platform. It connects to finance and commercial systems (such as Xero, QuickBooks Online, and HubSpot) to turn operational data into board-ready insights: AI-assisted reporting, variance narratives, and unified views of performance.

Use the "Site content" section for page URLs, navigation, demo link, and contact intents.`;

const ASSISTANT_RULES = `You are the Stratavor website assistant. Your job is to help visitors understand the product, pricing, pilots, security posture at a high level, and how to get in touch.

Rules:
- Base answers on the "Product overview", "Assistant source of truth (modules, plan fit, compliance script, onboarding, boundaries)", "Site content (marketing pages)", "Security and compliance (home page)", "Published plan prices", and "Pricing and product FAQ" sections below. Do not invent features, integrations, prices, or legal commitments.
- The "Assistant source of truth" section defines module descriptions, plan-fit narrative, the exact compliance paragraph to use when appropriate, onboarding and support story, deferral rules, and authoritative Trust/Pricing URLs. Follow its objections and boundaries.
- The "Site content" section summarises hero, solutions, integrations marquee, about, tools, Power BI page, nav links, demo URL, and contact intents. If something is not listed there or in FAQ/pricing, say you do not have it and suggest the closest page.
- For security and compliance positioning, prefer the exact paragraph in "Assistant source of truth" when it applies; also use the home page security section and Trust URLs. Do not claim certifications or reports you were not given. For full policy documents, point to the Trust Centre URL in site content or the Trust URLs in the source-of-truth section.
- If a question is not covered by that context, say you do not have that detail and point the user to https://stratavor.com/contact (or /contact) or the relevant page (e.g. /pricing, /trust).
- For deeper strategy or opinion pieces, you may suggest they read the blog at /blog.
- Keep answers concise and professional. No markdown headings unless the user asks; plain paragraphs or short bullets are fine.
- Do not provide personalised financial, legal, or investment advice.`;

function formatPlanForChat(plan: PricingPlan): string {
  if (plan.id === "enterprise") {
    const sub = plan.customPriceSubtext ? ` ${plan.customPriceSubtext}` : "";
    return (
      `${plan.name} — ${plan.description}\n` +
      `Pricing: custom / scoped (no public list price). On-site label: "${plan.customPriceLabel ?? "Custom"}".${sub}\n` +
      `Call to action: ${plan.cta} — ${plan.ctaHref}`
    );
  }
  if (!plan.prices) {
    return `${plan.name}: see https://stratavor.com/pricing for current figures.`;
  }
  const lines: string[] = [
    `${plan.name} — ${plan.description}`,
    "Amounts are per month. Annual billing saves 15% versus paying monthly; the annual column is the per-month equivalent at that discounted rate (same as the pricing page).",
  ];
  for (const code of CURRENCIES) {
    const row = plan.prices[code];
    lines.push(
      `  ${code}: ${formatPlanPrice(row.monthly, code)}/month billed monthly; ${formatPlanPrice(row.annual, code)}/month when billed annually (equivalent).`,
    );
  }
  return lines.join("\n");
}

function buildPublishedPlanPricesSection(): string {
  const planBlocks = PRICING_PLANS.map((plan) => formatPlanForChat(plan)).join("\n\n");
  const addonBlocks = PRICING_ADDONS.map((addon) => {
    const ph = addon.pricePlaceholder;
    if (typeof ph === "string") {
      return `${addon.name}: ${ph}\n${addon.description}`;
    }
    const priceLines = CURRENCIES.map((c) => `  ${c}: ${ph[c]}`).join("\n");
    return `${addon.name}\n${addon.description}\nOn the pricing page (add-on line):\n${priceLines}`;
  }).join("\n\n");

  return `These figures are generated from the same data as https://stratavor.com/pricing (EUR, USD, GBP).

${planBlocks}

Add-ons:
${addonBlocks}`;
}

export function buildChatSystemPrompt(): string {
  const faqBlock = PRICING_FAQ.map(
    (item) => `Q: ${item.question}\nA: ${item.answer}`,
  ).join("\n\n");
  const pricingBlock = buildPublishedPlanPricesSection();
  const securityBlock = buildHomeSecurityChatContext();
  const siteContentBlock = buildExtendedSiteContext();

  return `${ASSISTANT_RULES}

## Product overview
${PRODUCT_BLURB}

## Assistant source of truth (modules, plan fit, compliance script, onboarding, boundaries)
${CHAT_ASSISTANT_SOURCE_OF_TRUTH_V1}

## Site content (marketing pages, authoritative for this assistant)
${siteContentBlock}

## Security and compliance (home page, authoritative for this assistant)
${securityBlock}

## Published plan prices (authoritative for this assistant)
${pricingBlock}

## Pricing and product FAQ (authoritative for this assistant)
${faqBlock}`;
}
