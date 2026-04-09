import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getClientIp, ipPrefixForLog, isChatOriginAllowed } from "@/lib/chat-route-guards";

function hostHeaderHostname(req: Request): string | null {
  const host = req.headers.get("host");
  if (!host) return null;
  return host.split(":")[0]?.trim().toLowerCase() || null;
}

/** Allow requests whose Origin or Referer hostname matches Host (same deployment / preview URL). */
function originRefererMatchesHost(req: Request): boolean {
  const expected = hostHeaderHostname(req);
  if (!expected) return false;

  const matches = (urlStr: string | null): boolean => {
    if (!urlStr) return false;
    try {
      return new URL(urlStr).hostname.toLowerCase() === expected;
    } catch {
      return false;
    }
  };

  return matches(req.headers.get("origin")) || matches(req.headers.get("referer"));
}

const MAX_CONTACT_BODY_BYTES = 24_000;

export { MAX_CONTACT_BODY_BYTES };

type ContactLogPayload = {
  source: "contact_api";
  event: string;
  status?: number;
  ipPrefix?: string;
  reason?: string;
};

export function contactRouteLog(payload: ContactLogPayload): void {
  console.log(JSON.stringify(payload));
}

let contactRatelimitInstance: Ratelimit | null | undefined;

function getContactRatelimit(): Ratelimit | null {
  if (contactRatelimitInstance !== undefined) return contactRatelimitInstance;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    contactRatelimitInstance = null;
    return null;
  }
  const redis = new Redis({ url, token });
  const perMinute = Math.max(
    1,
    Math.min(120, Number(process.env.CONTACT_RATE_LIMIT_PER_MINUTE ?? "10") || 10),
  );
  contactRatelimitInstance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(perMinute, "1 m"),
    prefix: "stratavor-contact",
    analytics: true,
  });
  return contactRatelimitInstance;
}

export async function enforceContactRateLimit(ip: string): Promise<Response | null> {
  const limiter = getContactRatelimit();
  if (!limiter) return null;
  const identifier = ip === "unknown" ? "unknown-ip" : ip;
  const { success, reset } = await limiter.limit(identifier);
  if (success) return null;
  const retryAfterSec = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
  contactRouteLog({
    source: "contact_api",
    event: "rate_limited",
    status: 429,
    ipPrefix: ipPrefixForLog(ip),
  });
  return Response.json(
    { error: "Too many submissions. Please try again shortly." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    },
  );
}

/**
 * Reuse chat origin allowlist when set. If the allowlist rejects the request but
 * Origin/Referer hostname matches Host, still allow (covers *.vercel.app previews
 * without listing every deployment URL).
 */
export function isContactOriginAllowed(req: Request): boolean {
  if (isChatOriginAllowed(req)) return true;
  return originRefererMatchesHost(req);
}

export async function readContactJsonBody(
  req: Request,
  maxBytes: number,
): Promise<{ ok: true; body: unknown } | { ok: false; response: Response }> {
  const cl = req.headers.get("content-length");
  if (cl) {
    const n = Number(cl);
    if (Number.isFinite(n) && n > maxBytes) {
      contactRouteLog({
        source: "contact_api",
        event: "reject",
        status: 413,
        reason: "content_length",
      });
      return {
        ok: false,
        response: Response.json({ error: "Request body too large" }, { status: 413 }),
      };
    }
  }

  let text: string;
  try {
    text = await req.text();
  } catch {
    contactRouteLog({ source: "contact_api", event: "reject", status: 400, reason: "body_read" });
    return {
      ok: false,
      response: Response.json({ error: "Invalid request body" }, { status: 400 }),
    };
  }

  if (text.length > maxBytes) {
    contactRouteLog({
      source: "contact_api",
      event: "reject",
      status: 413,
      reason: "body_size",
    });
    return {
      ok: false,
      response: Response.json({ error: "Request body too large" }, { status: 413 }),
    };
  }

  let body: unknown;
  try {
    body = text.length ? JSON.parse(text) : null;
  } catch {
    contactRouteLog({ source: "contact_api", event: "reject", status: 400, reason: "json_parse" });
    return {
      ok: false,
      response: Response.json({ error: "Invalid JSON body" }, { status: 400 }),
    };
  }

  return { ok: true, body };
}

export { getClientIp, ipPrefixForLog };
