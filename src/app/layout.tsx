import type { Metadata } from "next";
import { Titillium_Web } from "next/font/google";
import { AnalyticsScript } from "@/components/Analytics";
import { OrganizationJsonLd, SoftwareApplicationJsonLd } from "@/components/StructuredData";
import "./globals.css";

const titillium = Titillium_Web({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  variable: "--font-titillium",
});

export const metadata: Metadata = {
  title: {
    default: "Stratavor | Strategic Intelligence & FP&A Platform",
    template: "%s | Stratavor",
  },
  description:
    "Stratavor turns your financial data into board-ready insights. AI-powered reporting, variance narratives, and strategic intelligence — connected to your systems.",
  metadataBase: new URL("https://stratavor.com"),
  openGraph: {
    type: "website",
    locale: "en_IE",
    siteName: "Stratavor",
    title: "Stratavor | Strategic Intelligence Platform",
    description:
      "Transform financial data into board-ready insights with AI-powered commentary and strategic intelligence.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stratavor | Strategic Intelligence Platform",
    description:
      "Transform financial data into board-ready insights with AI-powered commentary.",
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
    <html lang="en" className={titillium.variable}>
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-gunmetal"
        >
          Skip to content
        </a>
        {children}
        <AnalyticsScript />
        <OrganizationJsonLd />
        <SoftwareApplicationJsonLd />
      </body>
    </html>
  );
}
