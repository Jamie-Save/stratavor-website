"use client";

import Link from "next/link";
import type { ReactNode } from "react";

const STRATAVOR_HOSTS = new Set(["stratavor.com", "www.stratavor.com"]);

const MD_LINK_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)\)/g;

/** Strip trailing punctuation often glued to pasted URLs. */
function normalizeHref(raw: string): string {
  return raw.trim().replace(/[.,;:!?)]+$/, "");
}

function resolveInternalPath(href: string): string | null {
  const h = normalizeHref(href);
  if (h.startsWith("/")) return h;
  try {
    const u = new URL(h);
    if (STRATAVOR_HOSTS.has(u.hostname)) {
      return u.pathname + u.search + u.hash;
    }
  } catch {
    /* ignore */
  }
  return null;
}

function shortUrlLabel(url: string): string {
  try {
    const u = new URL(normalizeHref(url));
    const host = u.hostname.replace(/^www\./, "");
    const path = u.pathname + u.search;
    if (!path || path === "/") return host;
    const tail = path.length > 28 ? `${path.slice(0, 26)}…` : path;
    return `${host}${tail}`;
  } catch {
    return "Link";
  }
}

const INLINE_LINK_CLASS =
  "mx-0.5 inline-flex max-w-full items-center rounded-md border border-brand-gunmetal/35 bg-white px-2 py-0.5 align-baseline text-xs font-semibold leading-snug text-brand-gunmetal no-underline shadow-sm transition hover:border-brand-gunmetal hover:bg-brand-gunmetal/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gunmetal/35";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const clean = normalizeHref(href);
  const internal = resolveInternalPath(clean);
  if (internal) {
    return (
      <Link href={internal} className={INLINE_LINK_CLASS}>
        {children}
      </Link>
    );
  }
  if (/^https?:\/\//i.test(clean)) {
    return (
      <a href={clean} target="_blank" rel="noopener noreferrer" className={INLINE_LINK_CLASS}>
        {children}
      </a>
    );
  }
  return <span className="text-neutral-600">{children}</span>;
}

const BARE_URL_RE = /https?:\/\/[^\s<>\])'"]+/gi;

function appendBareUrlSegments(s: string, out: ReactNode[], keyRef: { current: number }) {
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(BARE_URL_RE.source, BARE_URL_RE.flags);
  while ((m = re.exec(s)) !== null) {
    if (m.index > last) {
      out.push(s.slice(last, m.index));
    }
    const raw = m[0];
    const clean = normalizeHref(raw);
    out.push(
      <InlineLink key={`url-${keyRef.current++}`} href={clean}>
        {shortUrlLabel(clean)}
      </InlineLink>,
    );
    last = m.index + raw.length;
  }
  if (last < s.length) {
    out.push(s.slice(last));
  }
}

/**
 * Renders assistant text with markdown-style [label](url) and bare https URLs as inline chip links.
 */
export function AssistantMessageBody({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const keyRef = { current: 0 };
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(MD_LINK_RE.source, MD_LINK_RE.flags);
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      appendBareUrlSegments(text.slice(last, m.index), out, keyRef);
    }
    out.push(
      <InlineLink key={`md-${keyRef.current++}`} href={normalizeHref(m[2])}>
        {m[1]}
      </InlineLink>,
    );
    last = re.lastIndex;
  }
  if (last < text.length) {
    appendBareUrlSegments(text.slice(last), out, keyRef);
  }
  return <span className="inline">{out}</span>;
}
