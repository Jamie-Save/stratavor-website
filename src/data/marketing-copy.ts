/**
 * Single source for on-page marketing text shared by UI components and the site chat assistant.
 */

export const HOME_HERO = {
  sectionLabel: "Strategic Intelligence Platform",
  headline: "Make Your Financial Data Speak Strategy.",
  subline:
    "Connect QuickBooks, Xero, NetSuite, Stripe and more. Stratavor turns your raw financial data into strategic insights, AI-powered commentary, and executive clarity.",
  primaryCtaLabel: "Start Free Trial",
  secondaryCtaLabel: "Book a demo",
  trialNote: "7-day free trial. No credit card required.",
} as const;

export const HOME_WHAT_WE_DO = {
  sectionLabel: "Product",
  heading: "What we do",
  intro:
    "Stratavor unifies financial reporting, risk management, and strategic planning. Get executive-ready snapshots, AI insights, and traceability, without the spreadsheet sprawl.",
} as const;

export const HOME_SOLUTIONS = {
  sectionLabel: "Solutions",
  heading: "What Stratavor Delivers",
  subheading:
    "Six capabilities that help finance teams report with confidence, explain what changed, and act before issues compound.",
} as const;

/** Rotating HTML snippets for the AI narratives demo card (allows <strong>…</strong>). */
export const HOME_AI_NARRATIVE_SNIPPETS: readonly string[] = [
  "Revenue declined <strong>32% YoY</strong> to €117.5m. Implementation revenue is the primary drag while subscription lines remain stable.",
  "Cash position strengthened to <strong>€36.3m</strong>, up 55% YoY. Receivable days at <strong>1,208</strong> signal collection risk requiring review.",
  "EBITDA compressed <strong>39%</strong> to €89.2m. OpEx grew from 13.8% to 20.9% of revenue. Cost discipline recommended across operating expenses.",
  "Return on equity dropped <strong>72pp</strong> to 28%. Four of ten KPIs flagged Critical, concentrated in profitability and efficiency.",
];

export type HomeSolutionCard = {
  id: string;
  iconSrc: string;
  title: string;
  description: string;
  spanWide: boolean;
  variant: "default" | "featured" | "ask";
};

/** Bento layout order matches home reference (featured AI + Ask span two columns on large screens). */
export const HOME_SOLUTION_CARDS: readonly HomeSolutionCard[] = [
  {
    id: "ai-narratives",
    iconSrc: "/images/solutions-deliver/ai-narratives.svg",
    title: "AI-powered variance narratives",
    description:
      "Stratavor acts like a seasoned financial analyst, explaining your key metrics in plain language. It highlights trends, flags anomalies, and provides the context you need so you walk into every board meeting prepared.",
    spanWide: true,
    variant: "featured",
  },
  {
    id: "board-ready",
    iconSrc: "/images/solutions-deliver/board-ready.svg",
    title: "Board-ready reporting",
    description:
      "Turn manual reporting into automated, polished board packs in minutes. Stratavor surfaces the numbers that matter and generates executive commentary, so your team spends less time building decks and more time on strategy.",
    spanWide: false,
    variant: "default",
  },
  {
    id: "unified",
    iconSrc: "/images/solutions-deliver/unified.svg",
    title: "Unified system intelligence",
    description:
      "Connect QuickBooks, Xero, NetSuite, HubSpot and more into one secure hub. Reports always reflect the latest data, with no manual gathering, no reconciliation errors, and no version conflicts across your finance stack.",
    spanWide: false,
    variant: "default",
  },
  {
    id: "savings",
    iconSrc: "/images/solutions-deliver/savings.svg",
    title: "Savings and initiative tracking",
    description:
      "See every cost-saving and efficiency programme in one view. Track owners, timelines, and real impact versus plan so leadership can sponsor initiatives with confidence and without chasing updates across spreadsheets.",
    spanWide: false,
    variant: "default",
  },
  {
    id: "risk",
    iconSrc: "/images/solutions-deliver/risk.svg",
    title: "Risk intelligence",
    description:
      "Surface concentrations, threshold breaches, and early-warning signals across your financial and operational data. Give the board context on what could move the numbers next, not just what already happened.",
    spanWide: false,
    variant: "default",
  },
  {
    id: "ask",
    iconSrc: "/images/solutions-deliver/ask.svg",
    title: "Ask Stratavor anything",
    description:
      "Query your connected data in natural language. Drill into revenue drivers, compare periods side by side, or prep talking points for your next board meeting. Built for exploration and follow-ups alongside your structured reports.",
    spanWide: true,
    variant: "ask",
  },
];

export const HOME_OUTCOMES: readonly { title: string; description: string }[] = HOME_SOLUTION_CARDS.map(
  ({ title, description }) => ({ title, description }),
);

export const HOME_INTEGRATIONS = {
  sectionLabel: "Integrations",
  intro:
    "Connect your ERP, CRM, and finance tools. Stratavor pulls data from Xero, QuickBooks, Stripe, and more, so insights stay current.",
} as const;

export const HOME_TRUSTED_BY = {
  sectionLabel: "Trusted by",
  /** Two lines for the trusted card headline (line break between). */
  headlineLines: ["Leaders who live in", "the numbers."] as const,
  /** Two lines for the right-column subline. */
  sublineLines: ["Finance, strategy, FP&A, and ops —", "aligned on what matters."] as const,
  credentialLine: "Built on 15+ years leading finance & data transformations",
} as const;

/** Role labels in the trusted-by ticker (highlighted = brighter in the marquee). */
export const TRUSTED_BY_TICKER_ROLES: readonly { label: string; highlighted: boolean }[] = [
  { label: "CFO", highlighted: true },
  { label: "Finance Director", highlighted: false },
  { label: "FP&A", highlighted: false },
  { label: "Executive", highlighted: true },
  { label: "Strategy", highlighted: false },
  { label: "Board", highlighted: true },
  { label: "Controller", highlighted: false },
  { label: "COO", highlighted: false },
  { label: "CEO", highlighted: true },
  { label: "Operations", highlighted: false },
  { label: "Investor Relations", highlighted: false },
  { label: "Head of Finance", highlighted: false },
];

export const HOME_BOTTOM_CTA = {
  heading: "Ready to turn financial data into strategic clarity?",
  subline: "Join the finance leaders who stopped reporting and started explaining.",
  trialLabel: "Start Free Trial",
  bookDemoLabel: "Book a demo",
  contactUsLabel: "Contact us",
} as const;

export const ABOUT_PAGE = {
  heroHeadline: "Strategic intelligence for the people who run the numbers.",
  heroIntro:
    "Stratavor was founded on a simple observation: finance teams spend too much time building reports and not enough time explaining what they mean. We built a platform that bridges the gap between operational data and strategic decision-making.",
  missionHeading: "Our mission",
  missionParagraphs: [
    "We exist to give finance leaders the tools to move from reporting to interpreting. Stratavor connects your financial systems, applies contextual AI, and produces board-ready outputs that explain performance, not just display it.",
    "Founded in Ireland and built for global enterprise, Stratavor serves CFOs, FP&A teams, and strategy leaders who need a single source of truth across their financial and operational data.",
  ],
  valuesHeading: "What we stand for",
  values: [
    {
      title: "Clarity over complexity",
      description:
        "We believe the best intelligence simplifies decisions, not complicates them. Every feature we build must make the next conversation easier.",
    },
    {
      title: "Trust by default",
      description:
        "Enterprise trust isn't earned with words. We publish our policies, open our architecture, and let the rigour speak for itself.",
    },
    {
      title: "Accountability at every layer",
      description:
        "From data lineage to AI narratives, every insight is traceable. We don't ask you to trust the answer; we show you how we got there.",
    },
    {
      title: "Built for the boardroom",
      description:
        "We design for the people who present to boards, not the people who build dashboards. Every output is ready for scrutiny.",
    },
  ],
  closingHeading: "Want to learn more?",
  closingSubline:
    "Talk to our team about how Stratavor can transform your financial reporting.",
} as const;

export const POWER_BI_PAGE = {
  sectionLabel: "Power BI",
  heading: "See your strategy in Power BI",
  intro:
    "Explore an interactive snapshot of how Stratavor turns your data into board-ready insights. Drill down, filter, and experience the intelligence layer in action.",
} as const;

export const TOOLS_PAGE = {
  sectionLabel: "Resources",
  heading: "Tools & Templates",
  intro:
    "Free resources built for finance leaders who want to move from reporting to strategic intelligence.",
  tools: [
    {
      slug: "board-pack-template",
      title: "Board Pack Template",
      description:
        "A structured, executive-ready board pack template covering financials, KPIs, strategic initiatives, and risk. Ready to customise.",
      category: "Template",
    },
    {
      slug: "variance-analysis-framework",
      title: "Variance Analysis Framework",
      description:
        "A systematic approach to explaining what changed, why it matters, and what action to take. Designed for CFOs and FP&A leads.",
      category: "Framework",
    },
    {
      slug: "kpi-selection-guide",
      title: "KPI Selection Guide",
      description:
        "How to choose the right metrics for your stage, industry, and audience. Avoid vanity metrics and focus on what drives decisions.",
      category: "Guide",
    },
    {
      slug: "integration-readiness-checklist",
      title: "Integration Readiness Checklist",
      description:
        "Evaluate your finance stack before connecting to a strategic intelligence platform. Covers data quality, access, and governance.",
      category: "Checklist",
    },
    {
      slug: "ai-readiness-assessment",
      title: "AI Readiness Assessment",
      description:
        "A quick diagnostic to understand whether your organisation is ready to adopt AI-assisted financial commentary and insights.",
      category: "Assessment",
    },
    {
      slug: "strategic-planning-calendar",
      title: "Strategic Planning Calendar",
      description:
        "Annual planning cadence for finance and strategy teams. Aligns board reporting, forecasting, and strategic reviews.",
      category: "Template",
    },
  ],
};
