"use client";

type EventName =
  | "cta_click"
  | "form_submit"
  | "page_view"
  | "demo_request"
  | "trial_start"
  | "security_review_request";

type EventProperties = Record<string, string | number | boolean>;

export function trackEvent(name: EventName, properties?: EventProperties) {
  if (typeof window === "undefined") return;

  try {
    // Google Analytics 4
    const win = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof win.gtag === "function") {
      win.gtag("event", name, properties);
    }

    // Generic dataLayer push (GTM)
    const w = window as unknown as { dataLayer?: unknown[] };
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: name, ...properties });
    }

    // Dev logging
    if (process.env.NODE_ENV === "development") {
      console.log(`[Analytics] ${name}`, properties);
    }
  } catch {
    // Silently fail for analytics
  }
}

export function AnalyticsScript() {
  return (
    <>
      {/* Placeholder for GA4 / GTM script tag */}
      {/* Replace GA_MEASUREMENT_ID with your actual ID */}
      {/*
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID');
        `}
      </Script>
      */}
    </>
  );
}
