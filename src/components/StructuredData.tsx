import type { BlogPost } from "@/data/blog-posts";
import { PRICING_FAQ } from "@/data/pricing-faq";
import { absoluteUrl, getSiteUrl } from "@/lib/site-url";

export function OrganizationJsonLd() {
  const origin = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Stratavor",
    url: origin,
    logo: absoluteUrl("/images/stratavor-logo.svg"),
    description:
      "Strategic intelligence platform that transforms financial data into board-ready insights for finance leaders.",
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IE",
    },
    sameAs: [] as string[],
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

export function WebSiteJsonLd() {
  const origin = getSiteUrl();
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Stratavor",
    url: origin,
    publisher: {
      "@type": "Organization",
      name: "Stratavor",
      url: origin,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/stratavor-logo.svg"),
      },
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
    url: getSiteUrl(),
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

export function PricingFaqJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: PRICING_FAQ.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function BlogPostingJsonLd({ post }: { post: BlogPost }) {
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: pageUrl,
    datePublished: post.date,
    dateModified: post.date,
    image: [absoluteUrl("/hero/intelligence-hub.png")],
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Stratavor",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/stratavor-logo.svg"),
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
