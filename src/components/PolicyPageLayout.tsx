import Link from "next/link";

export interface PolicySection {
  heading: string;
  content: string;
}

interface PolicyPageLayoutProps {
  title: string;
  sections: PolicySection[];
}

export function PolicyPageLayout({ title, sections }: PolicyPageLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-content py-12 lg:px-8">
      <Link
        href="/trust#policies"
        className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal"
      >
        ← Back to Trust
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
        {title}
      </h1>
      <div className="mt-10 space-y-10">
        {sections.map((section, i) => (
          <section key={i} aria-labelledby={section.heading ? `section-${i}` : undefined}>
            {section.heading && (
              <h2
                id={`section-${i}`}
                className="text-xl font-semibold text-brand-gunmetal"
              >
                {section.heading}
              </h2>
            )}
            <div className="prose prose-neutral mt-4 max-w-none text-neutral-700">
              {section.content.split(/\n\n+/).map((para, j) =>
                para.trim() ? (
                  <p key={j} className="mb-4 last:mb-0">
                    {para.trim()}
                  </p>
                ) : null
              )}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
