/**
 * Values must match HubSpot dropdown options for property internal name `im_interested_in`
 * (labels / stored values as configured in the HubSpot form).
 */
export const HUBSPOT_INTEREST_OPTIONS = [
  "Personalized Demo",
  "Pricing & Plans",
  "Security Review",
  "Partnership",
  "Something Else",
] as const;

export type HubSpotInterestValue = (typeof HUBSPOT_INTEREST_OPTIONS)[number];

export function isHubSpotInterestValue(s: string): s is HubSpotInterestValue {
  return (HUBSPOT_INTEREST_OPTIONS as readonly string[]).includes(s);
}
