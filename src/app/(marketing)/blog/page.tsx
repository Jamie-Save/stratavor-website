import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-posts";
import { CONTACT_GENERAL_URL } from "@/data/contact-links";

export const metadata: Metadata = {
  title: "Blog | Stratavor",
  description:
    "Insights on strategic intelligence, FP&A, and data-driven decision making from the Stratavor team.",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatBlogDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const month = MONTHS[(m ?? 1) - 1];
  return `${d ?? 1} ${month} ${y ?? ""}`;
}

const posts = Array.isArray(BLOG_POSTS) ? BLOG_POSTS : [];

export default function BlogPage() {
  return (
    <>
      <section
        className="border-b border-neutral-200/80 bg-white py-12 sm:py-16"
        aria-labelledby="blog-heading"
      >
        <div className="mx-auto max-w-content px-content lg:px-8">
          <p className="section-label mb-4 text-center">Blog</p>
          <h1 id="blog-heading" className="section-heading">
            Insights for finance leaders
          </h1>
          <p className="section-subheading">
            Perspectives on strategic intelligence, FP&A automation, and the
            future of financial reporting.
          </p>
        </div>
      </section>

      <section className="bg-neutral-50 py-section" aria-label="Blog posts">
        <div className="mx-auto max-w-content px-content lg:px-8">
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="card flex h-full flex-col p-6 transition-all hover:border-neutral-300 hover:shadow-medium sm:p-8"
                >
                  <div className="flex flex-wrap gap-2">
                    {post.categories.slice(0, 3).map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full bg-brand-gunmetal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gunmetal"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-brand-gunmetal">
                    {post.title}
                  </h2>
                  <p
                    className="mt-3 flex-1 overflow-hidden text-sm text-neutral-600"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {post.excerpt}
                  </p>
                  <p className="mt-4 text-xs font-medium text-neutral-400">
                    {post.author} · {formatBlogDate(post.date)}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-12 text-center">
            <p className="text-neutral-500">
              Subscribe for updates when new content is published.
            </p>
            <Link href={CONTACT_GENERAL_URL} className="btn-primary mt-6">
              Get notified
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
