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
const defaultOgImage = "/hero/intelligence-hub.png";

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

export const metadata: Metadata = {
  title: {
    default: "Stratavor | Strategic Intelligence & FP&A Platform",
    template: "%s | Stratavor",
  },
  description:
    "Stratavor turns your financial data into board-ready insights. AI-powered reporting, variance narratives, and strategic intelligence, connected to your systems.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: "Stratavor",
    url: siteUrl,
    title: "Stratavor | Strategic Intelligence Platform",
    description:
      "Transform financial data into board-ready insights with AI-powered commentary and strategic intelligence.",
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Stratavor Intelligence Hub dashboard preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratavor | Strategic Intelligence Platform",
    description:
      "Transform financial data into board-ready insights with AI-powered commentary.",
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
