import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { AnalyticsScript } from "@/components/Analytics";
import ChatAssistant from "@/components/ChatAssistant";
import Footer from "@/components/Footer";
import HeaderSticky from "@/components/HeaderSticky";
import {
  OrganizationJsonLd,
  SoftwareApplicationJsonLd,
  WebSiteJsonLd,
} from "@/components/StructuredData";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();
/** Social / link-preview image. Use 1200×630 JPG or PNG at `public/og/…` for best results across platforms. */
const defaultOgImage = "/og/stratavor-share.png";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-serif",
});

/** Keep in sync: default title, Open Graph, and Twitter — most apps use og:title / og:description for link previews. */
const siteTitle = "Stratavor | Strategic Intelligence Platform";
/** ~155–200 chars is safe for most cards; LinkedIn/Facebook allow more but may truncate in compact UI. */
const siteDescription =
  "AI-powered business intelligence: financial reports, risk analysis, cost savings, and customer insights, all from your live data. One platform, every decision.";

export const metadata: Metadata = {
  title: {
    default: siteTitle,
    template: "%s | Stratavor",
  },
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: "Stratavor",
    url: siteUrl,
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Stratavor — executive reporting and intelligence hub",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexSerif.variable}`}>
      <head>
        <meta name="color-scheme" content="light" />
      </head>
      <body
        className="min-h-screen"
        style={{
          /* Fallback when /_next/static CSS fails (OneDrive .next issues, embedded browsers) */
          backgroundColor: "#F8F9FA",
          color: "#596068",
        }}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-gunmetal"
        >
          Skip to content
        </a>
        <HeaderSticky />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <AnalyticsScript />
        <ChatAssistant />
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SoftwareApplicationJsonLd />
      </body>
    </html>
  );
}
