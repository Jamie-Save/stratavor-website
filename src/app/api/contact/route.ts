import { isHubSpotInterestValue } from "@/data/contact-interest-options";
import { submitToHubSpotForm, type HubSpotFormField } from "@/lib/hubspot-forms-submit";
import {
  contactRouteLog,
  enforceContactRateLimit,
  getClientIp,
  ipPrefixForLog,
  isContactOriginAllowed,
  MAX_CONTACT_BODY_BYTES,
  readContactJsonBody,
} from "@/lib/contact-route-guards";

export const maxDuration = 30;

const INTENT_VALUES = ["sales", "demo", "pilot", "security", "general"] as const;

function str(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function hubspotFieldName(envKey: string, fallback: string): string {
  const v = process.env[envKey]?.trim();
  return v || fallback;
}

function getHubSpotConfig(): { portalId: string; formGuid: string; formsHost: string } | null {
  const portalId = process.env.HUBSPOT_PORTAL_ID?.trim() ?? "";
  const formGuid = process.env.HUBSPOT_FORM_GUID?.trim() ?? "";
  if (!portalId || !formGuid) return null;
  const formsHost = process.env.HUBSPOT_FORMS_HOST?.trim() || "api-eu1.hsforms.com";
  return { portalId, formGuid, formsHost };
}

export async function POST(req: Request) {
  const ip = getClientIp(req);

  if (!isContactOriginAllowed(req)) {
    contactRouteLog({
      source: "contact_api",
      event: "reject",
      status: 403,
      reason: "origin",
      ipPrefix: ipPrefixForLog(ip),
    });
    return Response.json({ error: "Forbidden" }, { status: 403 });
  }

  const rateLimited = await enforceContactRateLimit(ip);
  if (rateLimited) return rateLimited;

  const hs = getHubSpotConfig();
  if (!hs) {
    contactRouteLog({
      source: "contact_api",
      event: "misconfigured",
      status: 503,
      reason: "missing_hubspot_env",
      ipPrefix: ipPrefixForLog(ip),
    });
    return Response.json(
      { error: "Contact form is not configured. Set HUBSPOT_PORTAL_ID and HUBSPOT_FORM_GUID on the server." },
      { status: 503 },
    );
  }

  const parsed = await readContactJsonBody(req, MAX_CONTACT_BODY_BYTES);
  if (!parsed.ok) return parsed.response;

  const body = parsed.body;
  if (!body || typeof body !== "object") {
    return Response.json({ error: "Invalid payload" }, { status: 400 });
  }

  const o = body as Record<string, unknown>;

  // Honeypot: bots often fill hidden fields
  const trap = str(o.website, 200);
  if (trap.length > 0) {
    contactRouteLog({
      source: "contact_api",
      event: "reject",
      status: 400,
      reason: "honeypot",
      ipPrefix: ipPrefixForLog(ip),
    });
    return Response.json({ error: "Invalid submission" }, { status: 400 });
  }

  const firstName = str(o.firstName, 120);
  const lastName = str(o.lastName, 120);
  const email = str(o.email, 254);
  const company = str(o.company, 200);
  const messageRaw = str(o.message, 8000);
  const interest = str(o.interest, 128);
  const intent = str(o.intent, 64);
  const source = str(o.source, 64);
  const tool = str(o.tool, 120);

  if (!email) {
    return Response.json({ error: "Email is required." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (interest.length > 0 && !isHubSpotInterestValue(interest)) {
    return Response.json({ error: "Please select a valid interest option." }, { status: 400 });
  }

  if (!INTENT_VALUES.includes(intent as (typeof INTENT_VALUES)[number])) {
    return Response.json({ error: "Invalid intent." }, { status: 400 });
  }

  const fnField = hubspotFieldName("HUBSPOT_FIELD_FIRSTNAME", "firstname");
  const lnField = hubspotFieldName("HUBSPOT_FIELD_LASTNAME", "lastname");
  const emailField = hubspotFieldName("HUBSPOT_FIELD_EMAIL", "email");
  const companyField = hubspotFieldName("HUBSPOT_FIELD_COMPANY", "company");
  const messageField = hubspotFieldName("HUBSPOT_FIELD_MESSAGE", "message");
  const interestField = hubspotFieldName("HUBSPOT_FIELD_INTEREST", "im_interested_in");

  const metaLines = [
    intent ? `Intent: ${intent}` : null,
    interest ? `Interest: ${interest}` : null,
    source ? `Source: ${source}` : null,
    tool ? `Requested resource: ${tool}` : null,
  ].filter(Boolean) as string[];

  const messageCombined =
    messageRaw.length > 0 && metaLines.length > 0
      ? `${messageRaw}\n\n---\n${metaLines.join("\n")}`
      : messageRaw.length > 0
        ? messageRaw
        : metaLines.length > 0
          ? metaLines.join("\n")
          : "";

  // Match HubSpot: only send fields that have values (email always). Omit empty optional fields.
  const fields: HubSpotFormField[] = [{ name: emailField, value: email }];
  if (firstName) fields.push({ name: fnField, value: firstName });
  if (lastName) fields.push({ name: lnField, value: lastName });
  if (company) fields.push({ name: companyField, value: company });
  if (interest && isHubSpotInterestValue(interest)) {
    fields.push({ name: interestField, value: interest });
  }

  if (messageField && messageCombined.length > 0) {
    fields.push({ name: messageField, value: messageCombined });
  }

  const referer = req.headers.get("referer") ?? "";
  let pageUri = "https://stratavor.com/contact";
  let pageName = "Contact";
  if (referer) {
    try {
      const u = new URL(referer);
      pageUri = u.href;
      pageName = u.pathname || "Contact";
    } catch {
      /* keep defaults */
    }
  }

  const result = await submitToHubSpotForm({
    portalId: hs.portalId,
    formGuid: hs.formGuid,
    formsHost: hs.formsHost,
    fields,
    pageUri,
    pageName,
  });

  if (!result.ok) {
    contactRouteLog({
      source: "contact_api",
      event: "hubspot_error",
      status: result.status,
      reason: "hubspot_submit",
      ipPrefix: ipPrefixForLog(ip),
    });
    return Response.json(
      {
        error:
          result.status === 400
            ? "The server could not match your submission to the HubSpot form. Check that form field internal names match (see .env.example), or ask your admin to add the missing fields in HubSpot."
            : "We could not send your enquiry. Please try again or email us directly.",
      },
      { status: result.status >= 500 ? 502 : 400 },
    );
  }

  contactRouteLog({
    source: "contact_api",
    event: "ok",
    status: 200,
    ipPrefix: ipPrefixForLog(ip),
  });

  return Response.json({ ok: true });
}
