import Link from "next/link";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { DotPattern } from "@/components/DotPattern";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `${post.title} | Kyle Coleman`,
    description: post.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <DotPattern />

      {/* Header */}
      <nav className="relative z-10 border-b border-zinc-900 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-white font-bold text-lg hover:text-teal-400 transition-colors">
            Kyle Coleman
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#projects" className="text-zinc-400 hover:text-white text-sm transition-colors">Projects</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white text-sm transition-colors">Blog</Link>
            <Link href="/#contact" className="text-zinc-400 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="relative z-10 px-6 pt-20 pb-24 max-w-3xl mx-auto">
        <FadeIn>
          <Link href="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-teal-400 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="flex items-center gap-2 text-sm text-zinc-500 mb-4">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>
              {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
            {post.title}
          </h1>

          <p className="text-lg text-zinc-400 mb-6">{post.description}</p>

          <div className="flex flex-wrap gap-2 mb-10">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">
                {tag}
              </Badge>
            ))}
          </div>

          <hr className="border-zinc-800 mb-10" />

          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </FadeIn>
      </article>
    </main>
  );
}
