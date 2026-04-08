import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getBlogPost,
  getAllBlogSlugs,
} from "@/data/blog-posts";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatBlogDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const month = MONTHS[(m ?? 1) - 1];
  return `${d ?? 1} ${month} ${y ?? ""}`;
}

function BlogPostBody({ body }: { body: string }) {
  const blocks = body
    .split(/\n\n+/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="mt-10 space-y-6">
      {blocks.map((block, i) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={i}
              id={block.slice(3).replace(/\s+/g, "-").toLowerCase().slice(0, 60)}
              className="text-xl font-semibold tracking-tight text-brand-gunmetal sm:text-2xl"
            >
              {block.slice(3)}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          return (
            <h3
              key={i}
              className="text-lg font-semibold text-brand-gunmetal sm:text-xl"
            >
              {block.slice(4)}
            </h3>
          );
        }
        return (
          <p key={i} className="text-neutral-600 leading-relaxed">
            {block}
          </p>
        );
      })}
    </div>
  );
}

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post | Stratavor" };
  return {
    title: `${post.title} | Blog | Stratavor`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const formattedDate = formatBlogDate(post.date);

  return (
    <article className="min-h-screen bg-white">
      <div className="mx-auto max-w-3xl px-content py-12 lg:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-neutral-600 transition-colors hover:text-brand-gunmetal"
        >
          ← Back to Blog
        </Link>

        <header>
          <div className="flex flex-wrap gap-2">
            {post.categories.map((cat) => (
              <span
                key={cat}
                className="rounded-full bg-brand-gunmetal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-gunmetal"
              >
                {cat}
              </span>
            ))}
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-brand-gunmetal sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-neutral-500">
            {post.author} · {formattedDate}
          </p>
        </header>

        <BlogPostBody body={post.body} />

        <footer className="mt-16 border-t border-neutral-200 pt-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1 text-sm font-medium text-brand-gunmetal transition-colors hover:underline"
          >
            ← All posts
          </Link>
        </footer>
      </div>
    </article>
  );
}
