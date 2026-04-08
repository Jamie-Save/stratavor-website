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
  trialNote: "14-day free trial. No credit card required.",
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

export const HOME_OUTCOMES: readonly { title: string; description: string }[] = [
  {
    title: "Board-Ready Reporting",
    description:
      "Turn manual reporting into automated, audit-ready outputs. Stratavor surfaces the numbers that matter so you spend less time building decks and more time on strategy.",
  },
  {
    title: "AI-Powered Variance Narratives",
    description:
      "Ask your data questions in plain language. Get clear, contextual explanations of what changed and why, so you can explain variances to the board without digging through spreadsheets.",
  },
  {
    title: "Unified System Intelligence",
    description:
      "Connect QuickBooks, Xero, NetSuite, Stripe and more in one place. One source of truth across your systems so your strategic view is always current and consistent.",
  },
  {
    title: "Savings & initiative tracking",
    description:
      "See cost-saving and efficiency programmes in one view—owners, timelines, and impact versus plan—so leadership can sponsor initiatives without chasing spreadsheets.",
  },
  {
    title: "Risk intelligence",
    description:
      "Surface concentrations, threshold breaches, and early-warning signals across financial and operational data. Give the board context on what could move the numbers, not just what already did.",
  },
  {
    title: "Ask Stratavor anything",
    description:
      "Query connected data in natural language: drill into drivers, compare periods, or prep talking points. Built for exploration and follow-ups, alongside structured variance narratives.",
  },
];

export const HOME_INTEGRATIONS = {
  sectionLabel: "Integrations",
  intro:
    "Connect your ERP, CRM, and finance tools. Stratavor pulls data from Xero, QuickBooks, Stripe, and more, so insights stay current.",
} as const;

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
      title: "Board Pack Template",
      description:
        "A structured, executive-ready board pack template covering financials, KPIs, strategic initiatives, and risk. Ready to customise.",
      category: "Template",
    },
    {
      title: "Variance Analysis Framework",
      description:
        "A systematic approach to explaining what changed, why it matters, and what action to take. Designed for CFOs and FP&A leads.",
      category: "Framework",
    },
    {
      title: "KPI Selection Guide",
      description:
        "How to choose the right metrics for your stage, industry, and audience. Avoid vanity metrics and focus on what drives decisions.",
      category: "Guide",
    },
    {
      title: "Integration Readiness Checklist",
      description:
        "Evaluate your finance stack before connecting to a strategic intelligence platform. Covers data quality, access, and governance.",
      category: "Checklist",
    },
    {
      title: "AI Readiness Assessment",
      description:
        "A quick diagnostic to understand whether your organisation is ready to adopt AI-assisted financial commentary and insights.",
      category: "Assessment",
    },
    {
      title: "Strategic Planning Calendar",
      description:
        "Annual planning cadence for finance and strategy teams. Aligns board reporting, forecasting, and strategic reviews.",
      category: "Template",
    },
  ],
};
