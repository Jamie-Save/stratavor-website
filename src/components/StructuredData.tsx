export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stratavor",
    url: "https://stratavor.com",
    logo: "https://stratavor.com/images/stratavor-logo.svg",
    description:
      "Strategic intelligence platform that transforms financial data into board-ready insights for finance leaders.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IE",
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@stratavor.com",
      contactType: "sales",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Stratavor",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "AI-powered strategic intelligence platform for CFOs, FP&A teams, and finance leaders. Board-ready reporting, variance narratives, and unified system intelligence.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "EUR",
      lowPrice: "97",
      highPrice: "999",
      offerCount: "3",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
