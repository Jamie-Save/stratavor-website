# Chat API safety and operations

This document supports production hardening for `POST /api/chat`. Code enforces limits, optional rate limiting, and optional origin checks; the items below are mostly dashboard and process steps.

## Environment variables (Vercel)

| Variable | Purpose |
|----------|---------|
| `OPENAI_API_KEY` | Required. Server-only. |
| `OPENAI_CHAT_MODEL` | Optional model id. |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST URL for rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash token. If either Redis var is missing, rate limiting is skipped (local dev OK; set both in production). |
| `CHAT_RATE_LIMIT_PER_MINUTE` | Optional. Default `20` requests per IP per rolling minute. |
| `CHAT_ALLOWED_ORIGINS` | Optional. Comma-separated `Origin` values (e.g. `https://stratavor.com,https://www.stratavor.com`). If set, requests without a matching `Origin` or `Referer` get `403`. Add each Vercel preview origin if you use previews with the widget. |

See also [`.env.example`](../.env.example).

## OpenAI (alerts and budgets)

1. In the OpenAI dashboard, open **Usage** / **Limits** (wording varies by account).
2. Set a **monthly budget** or hard cap appropriate for marketing traffic.
3. Enable **email or webhook alerts** when usage crosses a threshold (e.g. 50% and 90% of budget).
4. Review **API key** scope: use a dedicated key for the website; rotate if exposed.

## Vercel (monitoring)

1. Open the project on Vercel → **Analytics** or **Observability** (plan-dependent).
2. Watch **function invocations**, **error rate**, and latency for routes matching `/api/chat`.
3. Optionally add a **log drain** or connect to your APM if you need long-term retention.
4. Application logs: the chat route emits single-line JSON with `source: "chat_api"` and events such as `rate_limited`, `reject`, `misconfigured`. These logs do **not** include message bodies or full client IPs (only a short IP prefix for `rate_limited`).

## If abuse continues

- Tighten `CHAT_RATE_LIMIT_PER_MINUTE` or lower `maxDuration` / `maxOutputTokens` in code after reviewing UX impact.
- Set `CHAT_ALLOWED_ORIGINS` in production.
- Consider **Cloudflare Turnstile** or reCAPTCHA after N messages (not implemented in repo; add server-verified token check before calling OpenAI).

## Dependency audit

CI runs `npm audit --audit-level=high`. Run `npm audit` locally after dependency changes and apply fixes when safe (`npm audit fix`).
