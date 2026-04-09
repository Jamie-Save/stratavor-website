import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostingJsonLd } from "@/components/StructuredData";
import { getAllBlogSlugs, getBlogPost } from "@/data/blog-posts";
import { absoluteUrl } from "@/lib/site-url";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function formatBlogDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  const month = MONTHS[(m ?? 1) - 1];
  return `${d ?? 1} ${month} ${y ?? ""}`;
}

function headingId(text: string, maxLen: number): string {
  return text
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, maxLen);
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
          const text = block.slice(3);
          const hid = headingId(text, 60) || `h2-${i}`;
          return (
            <h2
              key={i}
              id={hid}
              className="text-xl font-semibold tracking-tight text-brand-gunmetal sm:text-2xl"
            >
              {text}
            </h2>
          );
        }
        if (block.startsWith("### ")) {
          const text = block.slice(4);
          const hid = headingId(text, 60) || `h3-${i}`;
          return (
            <h3
              key={i}
              id={hid}
              className="text-lg font-semibold text-brand-gunmetal sm:text-xl"
            >
              {text}
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

const articleOgImage = "/hero/intelligence-hub.png";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Post | Stratavor" };

  const canonical = absoluteUrl(`/blog/${post.slug}`);
  const publishedTime = `${post.date}T12:00:00.000Z`;

  return {
    title: `${post.title} | Blog | Stratavor`,
    description: post.excerpt,
    alternates: { canonical },
    authors: [{ name: post.author }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: canonical,
      publishedTime,
      modifiedTime: publishedTime,
      authors: [post.author],
      images: [
        {
          url: articleOgImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [articleOgImage],
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
      <BlogPostingJsonLd post={post} />
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
            {post.author} · <time dateTime={post.date}>{formattedDate}</time>
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
