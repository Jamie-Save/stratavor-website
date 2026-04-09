/**
 * Assembles additional site-wide context for the chat assistant from shared marketing data.
 */

import {
  ABOUT_PAGE,
  HOME_BOTTOM_CTA,
  HOME_HERO,
  HOME_INTEGRATIONS,
  HOME_OUTCOMES,
  HOME_SOLUTIONS,
  HOME_WHAT_WE_DO,
  POWER_BI_PAGE,
  TOOLS_PAGE,
} from "@/data/marketing-copy";
import {
  BOOK_DEMO_CALENDAR_URL,
  CONTACT_DEMO_URL,
  CONTACT_GENERAL_URL,
  CONTACT_LOGIN_URL,
  CONTACT_PILOT_URL,
  CONTACT_SECURITY_URL,
} from "@/data/contact-links";
import { integrationLogos, whatWeDoImages } from "@/data/marquee";
import { MARKETING_NAV_LINKS, type NavLink } from "@/data/nav";

const SITE_ORIGIN = "https://stratavor.com";

function absoluteUrl(pathOrUrl: string): string {
  if (pathOrUrl.startsWith("http://") || pathOrUrl.startsWith("https://")) {
    return pathOrUrl;
  }
  return `${SITE_ORIGIN}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

function flattenNavLinks(links: NavLink[]): string[] {
  const lines: string[] = [];
  for (const entry of links) {
    if ("children" in entry) {
      lines.push(`${entry.label}:`);
      for (const child of entry.children) {
        const url = absoluteUrl(child.href);
        const ext = child.external ? " (external)" : "";
        lines.push(`  - ${child.label}: ${url}${ext}`);
      }
    } else {
      lines.push(`- ${entry.label}: ${absoluteUrl(entry.href)}`);
    }
  }
  return lines;
}

/** Contact form intents (same query params as /contact page). */
function contactIntentLines(): string {
  return [
    `Book a time (HubSpot scheduler): ${BOOK_DEMO_CALENDAR_URL}`,
    `Pilot / trial interest: ${absoluteUrl(CONTACT_PILOT_URL)}`,
    `Book a demo (contact form): ${absoluteUrl(CONTACT_DEMO_URL)}`,
    `Security / compliance pack: ${absoluteUrl(CONTACT_SECURITY_URL)}`,
    `Login help: ${absoluteUrl(CONTACT_LOGIN_URL)}`,
    `General: ${absoluteUrl(CONTACT_GENERAL_URL)}`,
  ].join("\n");
}

export function buildExtendedSiteContext(): string {
  const integrationNames = integrationLogos.map((l) => l.name).join(", ");
  const productSurfaces = whatWeDoImages
    .map(
      (img, i) =>
        `${i + 1}. ${img.title}: ${img.description} (Alt for imagery: ${img.alt})`,
    )
    .join("\n");

  const outcomesBlock = HOME_OUTCOMES.map(
    (o) => `- ${o.title}: ${o.description}`,
  ).join("\n");

  const valuesBlock = ABOUT_PAGE.values
    .map((v) => `- ${v.title}: ${v.description}`)
    .join("\n");

  const toolsBlock = TOOLS_PAGE.tools
    .map((t) => `- [${t.category}] ${t.title}: ${t.description}`)
    .join("\n");

  const navBlock = flattenNavLinks(MARKETING_NAV_LINKS).join("\n");

  return `## Home page (hero)
Label: ${HOME_HERO.sectionLabel}
Headline: ${HOME_HERO.headline}
Body: ${HOME_HERO.subline}
Note: ${HOME_HERO.trialNote}
Primary CTA: ${HOME_HERO.primaryCtaLabel} → ${absoluteUrl("/pricing")}
Secondary CTA: ${HOME_HERO.secondaryCtaLabel} → ${BOOK_DEMO_CALENDAR_URL}

## Home page — What we do
${HOME_WHAT_WE_DO.sectionLabel}: ${HOME_WHAT_WE_DO.heading}
${HOME_WHAT_WE_DO.intro}

Product surfaces (screenshot descriptions on the site):
${productSurfaces}

## Home page — What Stratavor delivers
${HOME_SOLUTIONS.sectionLabel}: ${HOME_SOLUTIONS.heading}
${HOME_SOLUTIONS.subheading}
${outcomesBlock}

## Home page — Integrations band
${HOME_INTEGRATIONS.sectionLabel}
${HOME_INTEGRATIONS.intro}
Logos and brands shown in the integrations marquee (visual/marketing list, not the full "core connector" contract list): ${integrationNames}.
For which systems are core connectors vs roadmap, use the Pricing FAQ in the main prompt.

## Home page — Closing call to action
${HOME_BOTTOM_CTA.heading}
${HOME_BOTTOM_CTA.subline}
Actions: ${HOME_BOTTOM_CTA.bookDemoLabel} (${BOOK_DEMO_CALENDAR_URL}), ${HOME_BOTTOM_CTA.trialLabel} (${absoluteUrl("/pricing")}), ${HOME_BOTTOM_CTA.contactUsLabel} (${absoluteUrl(CONTACT_GENERAL_URL)})

## About / company (https://stratavor.com/about)
Headline: ${ABOUT_PAGE.heroHeadline}
${ABOUT_PAGE.heroIntro}

${ABOUT_PAGE.missionHeading}
${ABOUT_PAGE.missionParagraphs.join("\n\n")}

${ABOUT_PAGE.valuesHeading}
${valuesBlock}

Closing: ${ABOUT_PAGE.closingHeading} ${ABOUT_PAGE.closingSubline}

## Power BI page (https://stratavor.com/power-bi)
${POWER_BI_PAGE.sectionLabel}: ${POWER_BI_PAGE.heading}
${POWER_BI_PAGE.intro}

## Tools & templates (https://stratavor.com/tools)
${TOOLS_PAGE.sectionLabel}: ${TOOLS_PAGE.heading}
${TOOLS_PAGE.intro}
Items (request access via contact — typically ${absoluteUrl(CONTACT_GENERAL_URL)}):
${toolsBlock}

## Primary navigation (marketing site)
${navBlock}

## Book a demo
Public meeting scheduler (pick a time): ${BOOK_DEMO_CALENDAR_URL}
Form-based demo / sales enquiry: ${absoluteUrl(CONTACT_DEMO_URL)}

## Contact intents (use when directing users)
${contactIntentLines()}`;
}
