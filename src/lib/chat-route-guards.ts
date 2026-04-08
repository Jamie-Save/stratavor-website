import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const MAX_CHAT_REQUEST_BYTES = 128_000;

export { MAX_CHAT_REQUEST_BYTES };

type ChatRouteLogPayload = {
  source: "chat_api";
  event: string;
  status?: number;
  ipPrefix?: string;
  reason?: string;
};

/** Structured logs only; never log message bodies or full IPs. */
export function chatRouteLog(payload: ChatRouteLogPayload): void {
  console.log(JSON.stringify(payload));
}

/** First public IP from x-forwarded-for, or "unknown". */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (!forwarded) return "unknown";
  const first = forwarded.split(",")[0]?.trim();
  return first || "unknown";
}

/** IPv4 prefix for logs (e.g. 203.0.113.x); avoids storing full IPs in logs. */
export function ipPrefixForLog(ip: string): string {
  if (ip === "unknown") return "unknown";
  const v4 = ip.match(/^(\d+\.\d+\.\d+)\.\d+$/);
  if (v4) return `${v4[1]}.x`;
  if (ip.includes(":")) return "ipv6";
  return "other";
}

let ratelimitInstance: Ratelimit | null | undefined;

function getChatRatelimit(): Ratelimit | null {
  if (ratelimitInstance !== undefined) return ratelimitInstance;
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) {
    ratelimitInstance = null;
    return null;
  }
  const redis = new Redis({ url, token });
  const perMinute = Math.max(
    1,
    Math.min(300, Number(process.env.CHAT_RATE_LIMIT_PER_MINUTE ?? "20") || 20),
  );
  ratelimitInstance = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(perMinute, "1 m"),
    prefix: "stratavor-chat",
    analytics: true,
  });
  return ratelimitInstance;
}

export async function enforceChatRateLimit(ip: string): Promise<Response | null> {
  const limiter = getChatRatelimit();
  if (!limiter) return null;
  const identifier = ip === "unknown" ? "unknown-ip" : ip;
  const { success, reset } = await limiter.limit(identifier);
  if (success) return null;
  const retryAfterSec = Math.max(1, Math.ceil((reset - Date.now()) / 1000));
  chatRouteLog({
    source: "chat_api",
    event: "rate_limited",
    status: 429,
    ipPrefix: ipPrefixForLog(ip),
  });
  return Response.json(
    { error: "Too many chat requests. Please try again shortly." },
    {
      status: 429,
      headers: { "Retry-After": String(retryAfterSec) },
    },
  );
}

/**
 * Optional abuse hardening: set CHAT_ALLOWED_ORIGINS to a comma-separated list of origins
 * (e.g. https://stratavor.com,https://www.stratavor.com). Preview deployments must include
 * their https://*.vercel.app origin if enforced.
 */
export function isChatOriginAllowed(req: Request): boolean {
  const raw = process.env.CHAT_ALLOWED_ORIGINS?.trim();
  if (!raw) return true;
  const allowed = raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (allowed.length === 0) return true;

  const origin = req.headers.get("origin");
  if (origin && allowed.includes(origin)) return true;

  const referer = req.headers.get("referer");
  if (referer) {
    try {
      const refOrigin = new URL(referer).origin;
      if (allowed.includes(refOrigin)) return true;
    } catch {
      /* ignore */
    }
  }

  return false;
}

export async function readChatJsonBody(
  req: Request,
  maxBytes: number,
): Promise<{ ok: true; body: unknown } | { ok: false; response: Response }> {
  const cl = req.headers.get("content-length");
  if (cl) {
    const n = Number(cl);
    if (Number.isFinite(n) && n > maxBytes) {
      chatRouteLog({
        source: "chat_api",
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
    chatRouteLog({ source: "chat_api", event: "reject", status: 400, reason: "body_read" });
    return {
      ok: false,
      response: Response.json({ error: "Invalid request body" }, { status: 400 }),
    };
  }

  if (text.length > maxBytes) {
    chatRouteLog({
      source: "chat_api",
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
    chatRouteLog({ source: "chat_api", event: "reject", status: 400, reason: "json_parse" });
    return {
      ok: false,
      response: Response.json({ error: "Invalid JSON body" }, { status: 400 }),
    };
  }

  return { ok: true, body };
}
