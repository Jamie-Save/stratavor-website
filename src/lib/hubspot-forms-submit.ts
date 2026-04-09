/**
 * Server-side submit to a HubSpot marketing form (EU data centre).
 * Field `name` values must match the form’s internal field names in HubSpot.
 * @see https://developers.hubspot.com/docs/methods/forms/submit_form
 */

export type HubSpotFormField = { name: string; value: string };

export type SubmitToHubSpotFormParams = {
  portalId: string;
  formGuid: string;
  /** Default api-eu1.hsforms.com for EU portals */
  formsHost: string;
  fields: HubSpotFormField[];
  pageUri: string;
  pageName: string;
};

export type HubSpotSubmitResult =
  | { ok: true }
  | { ok: false; status: number; message: string; details?: unknown };

export async function submitToHubSpotForm(params: SubmitToHubSpotFormParams): Promise<HubSpotSubmitResult> {
  const url = `https://${params.formsHost}/submissions/v3/integration/submit/${params.portalId}/${params.formGuid}`;

  const body = {
    fields: params.fields,
    context: {
      pageUri: params.pageUri,
      pageName: params.pageName,
    },
  };

  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Network error";
    return { ok: false, status: 502, message: msg };
  }

  if (res.ok) {
    return { ok: true };
  }

  let details: unknown;
  try {
    details = await res.json();
  } catch {
    details = await res.text().catch(() => null);
  }

  const message =
    typeof details === "object" && details !== null && "message" in details
      ? String((details as { message: unknown }).message)
      : res.statusText || "HubSpot rejected the submission";

  return { ok: false, status: res.status, message, details };
}
