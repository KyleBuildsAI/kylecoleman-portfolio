import Link from "next/link";
import Image from "next/image";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/FadeIn";
import { DotPattern } from "@/components/DotPattern";
import { ArrowLeft, Github, ExternalLink, Play } from "lucide-react";
import type { Metadata } from "next";

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  return {
    title: `${project.title} | Kyle Coleman`,
    description: project.description,
  };
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "In Production": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    "In Development": "bg-amber-500/10 text-amber-500 border-amber-500/20",
  };
  return (
    <Badge className={styles[status] ?? "bg-zinc-900/80 text-zinc-300 border-zinc-700"}>
      {status}
    </Badge>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <DotPattern />

      {/* Nav */}
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
            <Link href="/blog" className="text-zinc-400 hover:text-white text-sm transition-colors">Blog</Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <article className="relative z-10 px-6 pt-20 pb-24 max-w-3xl mx-auto">
        <FadeIn>
          {/* Back link */}
          <Link href="/#projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-teal-400 text-sm mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          {/* Hero */}
          <div className="flex items-center gap-3 mb-4">
            <StatusBadge status={project.status} />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
            {project.title}
          </h1>

          <p className="text-lg text-zinc-400 mb-6">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            {project.github && (
              <Button asChild variant="outline" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" /> View on GitHub
                </a>
              </Button>
            )}
            {project.demo && (
              <Button asChild variant="outline" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Live Demo
                </a>
              </Button>
            )}
            {project.video && (
              <Button asChild variant="outline" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full">
                <a href={project.video} target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" /> Watch Video
                </a>
              </Button>
            )}
          </div>

          {/* Project image */}
          {project.image && (
            <div className="relative w-full h-64 md:h-96 mb-10 rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
          )}

          <hr className="border-zinc-800 mb-10" />

          {/* Markdown content */}
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: project.contentHtml }}
          />

          {/* Footer back link */}
          <hr className="border-zinc-800 mt-10 mb-8" />
          <Link href="/#projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-teal-400 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>
        </FadeIn>
      </article>
    </main>
  );
}
