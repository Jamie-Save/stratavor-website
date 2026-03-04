import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Stratavor",
  description: "Insights on strategic intelligence, FP&A, and data-driven decision making from the Stratavor team.",
};

const posts = [
  {
    title: "Why variance analysis needs narrative, not just numbers",
    excerpt: "Boards don't want to know what changed. They want to know why it matters and what you're doing about it. Here's how AI-powered narrative closes that gap.",
    category: "Strategic Intelligence",
    date: "Coming soon",
  },
  {
    title: "The CFO's guide to board pack automation",
    excerpt: "Manual board packs consume 40+ hours per cycle. Learn how automation can reduce this to minutes while improving quality and consistency.",
    category: "Finance Operations",
    date: "Coming soon",
  },
  {
    title: "Building a single source of truth across QuickBooks, Xero, and NetSuite",
    excerpt: "Multi-system environments create data silos. Here's how to unify your financial data without replacing your existing tools.",
    category: "Integrations",
    date: "Coming soon",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-neutral-200/80 bg-white py-12 sm:py-16" aria-labelledby="blog-heading">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <p className="section-label mb-4 text-center">Blog</p>
          <h1 id="blog-heading" className="section-heading">
            Insights for finance leaders
          </h1>
          <p className="section-subheading">
            Perspectives on strategic intelligence, FP&amp;A automation, and the future of financial reporting.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-section" aria-label="Blog posts">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <ul className="grid gap-8 md:grid-cols-3">
            {posts.map((post) => (
              <li key={post.title}>
                <article className="card flex h-full flex-col p-6 sm:p-8">
                  <span className="inline-flex w-fit rounded-full bg-brand-gunmetal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gunmetal">
                    {post.category}
                  </span>
                  <h2 className="mt-4 text-lg font-semibold text-brand-gunmetal">{post.title}</h2>
                  <p className="mt-3 flex-1 text-sm text-neutral-600">{post.excerpt}</p>
                  <p className="mt-4 text-xs font-medium text-neutral-400">{post.date}</p>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <p className="text-neutral-500">
              Subscribe for updates when new content is published.
            </p>
            <Link href="/contact?intent=general" className="btn-primary mt-6">
              Get notified
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
