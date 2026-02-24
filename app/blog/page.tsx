import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { DotPattern } from "@/components/DotPattern";
import { ArrowLeft, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Kyle Coleman",
  description: "Thoughts on AI architecture, multi-agent systems, and building production-grade AI pipelines.",
};

export default function BlogPage() {
  const posts = getAllPosts();

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
            <span className="text-zinc-700">|</span>
            <Link href="/#contact" className="text-zinc-400 hover:text-white text-sm transition-colors">Contact</Link>
            <span className="text-zinc-700">|</span>
            <Link href="/blog" className="text-teal-400 text-sm font-medium">Blog</Link>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <section className="relative pt-20 pb-12 px-6 max-w-5xl mx-auto z-10">
        <FadeIn>
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-teal-400 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Blog</h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Thoughts on AI architecture, multi-agent systems, and building production-grade pipelines.
          </p>
        </FadeIn>
      </section>

      {/* Post List */}
      <section className="relative px-6 pb-24 max-w-5xl mx-auto z-10">
        <div className="space-y-6">
          {posts.map((post, i) => (
            <FadeIn key={post.slug} delay={0.1 * i}>
              <Link href={`/blog/${post.slug}`} className="block group">
                <article className="p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-teal-500/30 transition-all hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
                  <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  </div>
                  <h2 className="text-xl md:text-2xl font-bold text-white group-hover:text-teal-400 transition-colors mb-2">
                    {post.title}
                  </h2>
                  <p className="text-zinc-400 leading-relaxed mb-4">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
