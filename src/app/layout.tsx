import type { Metadata } from "next";
import "./globals.css";
// TODO: plug real Stratavor font – e.g. import { Inter } from "next/font/google"; const font = Inter({ subsets: ["latin"] });
// TODO: Update metadata title and description

export const metadata: Metadata = {
  title: "Stratavor | TODO: Update title",
  description: "TODO: Update meta description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-neutral-900 focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-orange"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
