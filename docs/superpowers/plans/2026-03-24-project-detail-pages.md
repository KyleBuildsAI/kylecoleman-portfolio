# Project Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make portfolio project cards clickable, linking to dedicated `/projects/[slug]` detail pages with markdown content, GitHub links, and optional demo/video links.

**Architecture:** Extract shared markdown parsing into `lib/markdown.ts`, create `lib/projects.ts` for project-specific logic, add `/app/projects/[slug]/page.tsx` for detail pages, create markdown content files in `/content/projects/`, and update homepage to render dynamic project cards with links.

**Tech Stack:** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, shadcn/ui, gray-matter, remark, remark-html, lucide-react

**Spec:** `docs/superpowers/specs/2026-03-24-project-detail-pages-design.md`

---

### Task 1: Create shared markdown utilities

**Files:**
- Create: `lib/markdown.ts`

- [ ] **Step 1: Create `lib/markdown.ts` with `parseFrontmatter()` and `parseMarkdown()`**

```typescript
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

/**
 * Parse frontmatter only (no HTML conversion). Used by listing pages.
 */
export function parseFrontmatter(filePath: string): {
  data: Record<string, unknown>;
} {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data } = matter(fileContents);
  return { data };
}

/**
 * Parse frontmatter and convert markdown body to HTML. Used by detail pages.
 */
export async function parseMarkdown(filePath: string): Promise<{
  data: Record<string, unknown>;
  htmlContent: string;
}> {
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const processed = await remark().use(html).process(content);
  return { data, htmlContent: processed.toString() };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/markdown.ts
git commit -m "feat: add shared markdown parsing utilities"
```

---

### Task 2: Refactor `lib/blog.ts` to use shared utilities

**Files:**
- Modify: `lib/blog.ts`

- [ ] **Step 1: Refactor `lib/blog.ts` to import from `lib/markdown.ts`**

Replace the file contents with:

```typescript
import fs from "fs";
import path from "path";
import { parseFrontmatter, parseMarkdown } from "./markdown";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
}

export interface Post extends PostMeta {
  contentHtml: string;
}

export function getAllPostSlugs(): string[] {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllPosts(): PostMeta[] {
  const slugs = getAllPostSlugs();
  return slugs
    .map((slug) => getPostMeta(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

function getPostMeta(slug: string): PostMeta {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const { data } = parseFrontmatter(filePath);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
  };
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  const { data, htmlContent } = await parseMarkdown(filePath);
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    description: data.description as string,
    tags: (data.tags as string[]) ?? [],
    contentHtml: htmlContent,
  };
}
```

- [ ] **Step 2: Verify blog still works**

Run: `npx next build`
Expected: Build succeeds, blog pages generated in output.

- [ ] **Step 3: Commit**

```bash
git add lib/blog.ts
git commit -m "refactor: use shared markdown utilities in blog"
```

---

### Task 3: Create `lib/projects.ts`

**Files:**
- Create: `lib/projects.ts`

- [ ] **Step 1: Create `lib/projects.ts`**

```typescript
import fs from "fs";
import path from "path";
import { parseFrontmatter, parseMarkdown } from "./markdown";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  order: number;
  status: "In Production" | "In Development" | "Coming Soon";
  tags: string[];
  image?: string;
  github?: string;
  demo?: string;
  video?: string;
}

export interface Project extends ProjectMeta {
  contentHtml: string;
}

export function getAllProjectSlugs(): string[] {
  if (!fs.existsSync(projectsDirectory)) return [];
  return fs
    .readdirSync(projectsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getAllProjects(): ProjectMeta[] {
  const slugs = getAllProjectSlugs();
  return slugs
    .map((slug) => getProjectMeta(slug))
    .sort((a, b) => a.order - b.order);
}

function getProjectMeta(slug: string): ProjectMeta {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  const { data } = parseFrontmatter(filePath);
  return {
    slug,
    title: data.title as string,
    subtitle: data.subtitle as string,
    description: data.description as string,
    date: data.date as string,
    order: data.order as number,
    status: data.status as ProjectMeta["status"],
    tags: (data.tags as string[]) ?? [],
    image: (data.image as string) || undefined,
    github: (data.github as string) || undefined,
    demo: (data.demo as string) || undefined,
    video: (data.video as string) || undefined,
  };
}

export async function getProjectBySlug(slug: string): Promise<Project> {
  const filePath = path.join(projectsDirectory, `${slug}.md`);
  const { data, htmlContent } = await parseMarkdown(filePath);
  return {
    slug,
    title: data.title as string,
    subtitle: data.subtitle as string,
    description: data.description as string,
    date: data.date as string,
    order: data.order as number,
    status: data.status as ProjectMeta["status"],
    tags: (data.tags as string[]) ?? [],
    image: (data.image as string) || undefined,
    github: (data.github as string) || undefined,
    demo: (data.demo as string) || undefined,
    video: (data.video as string) || undefined,
    contentHtml: htmlContent,
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add project content utilities"
```

---

### Task 4: Create scaffold markdown files for projects

**Files:**
- Create: `content/projects/openclaw.md`
- Create: `content/projects/phantom-depth.md`
- Create: `content/projects/ecommerce-data-pipeline.md`
- Create: `content/projects/multi-model-predictive-analytics.md`

- [ ] **Step 1: Create `content/projects/openclaw.md`**

```markdown
---
title: "OpenClaw — Multi-Agent AI Orchestration System"
subtitle: "Hierarchical Agent Orchestration"
description: "Self-hosted hierarchical orchestration system with 20+ agents across executive, primary, and sub-agent tiers."
date: "2026-02-23"
order: 1
status: "In Production"
tags: ["Multi-Agent", "LiteLLM", "OpenRouter", "Docker", "MCP", "TrueNAS"]
image: "/OpenClaw-Setup.png"
github: "https://github.com/KyleBuildsAI/openclaw"
---

## Overview

Self-hosted hierarchical orchestration system with 20+ agents across executive, primary, and sub-agent tiers. Features tiered LLM routing via OpenRouter and LiteLLM, self-healing failure recovery, MCP tool integration, and Docker Compose deployment on custom RTX 5090 hardware.

## Architecture

*Coming soon — detailed architecture write-up.*

## Results

*Coming soon — performance metrics and outcomes.*
```

- [ ] **Step 2: Create `content/projects/phantom-depth.md`**

```markdown
---
title: "Phantom Depth"
subtitle: "Proprietary Real-Time Visual Conversion Pipeline"
description: "Production-grade computer vision system architected from the ground up across a 200+ file codebase."
date: "2026-03-01"
order: 2
status: "In Development"
tags: ["Python", "PyTorch", "OpenCV", "Claude Code", "AI-Assisted Dev"]
image: "/PhantomDepth.png"
---

## Overview

Production-grade computer vision system architected from the ground up across a 200+ file codebase. Built entirely using frontier AI coding tools including Claude Code, Codex, and Cline, demonstrating that a single architect with the right AI stack can deliver systems at the scale and speed of a full engineering team. Targets professional-grade performance on consumer GPU hardware.

## Technical Approach

*Coming soon — detailed technical write-up.*

## AI-Assisted Development

*Coming soon — how frontier AI tools were used to build this.*
```

- [ ] **Step 3: Create `content/projects/ecommerce-data-pipeline.md`**

```markdown
---
title: "eCommerce Data Pipeline"
subtitle: "Production Automation System"
description: "Custom-built system that collects and analyzes eCommerce data hourly instead of weekly."
date: "2025-06-01"
order: 3
status: "In Production"
tags: ["Python", "Automation", "Data Analysis", "Production"]
image: "/ecommerce_pipeline.png"
---

## Overview

Custom-built system that collects and analyzes eCommerce data hourly instead of weekly. Reduced manual task time by 50% and enabled data-driven decisions that drove 15% revenue growth.

## How It Works

*Coming soon — pipeline architecture and data flow.*

## Impact

*Coming soon — detailed metrics and business outcomes.*
```

- [ ] **Step 4: Create `content/projects/multi-model-predictive-analytics.md`**

```markdown
---
title: "Multi-Model Predictive Analytics System"
subtitle: "AI-Powered Forecasting Engine"
description: "Fully automated pipeline combining 5 frontier LLMs as a consensus decision layer for market trend and demand forecasting."
date: "2025-09-01"
order: 4
status: "In Production"
tags: ["Python", "Multi-LLM Consensus", "Web Scraping", "Prompt Engineering", "Data Pipeline"]
---

## Overview

Fully automated pipeline combining 5 frontier LLMs as a consensus decision layer for market trend and demand forecasting. Covers timed web scraping, structured data organization, multi-model analysis with custom algorithmic prompt chains, and a consolidated results dashboard. Achieved 77%+ prediction accuracy, outperforming any single-model approach.

## Multi-Model Consensus

*Coming soon — how the LLM consensus layer works.*

## Results

*Coming soon — prediction accuracy and business impact.*
```

- [ ] **Step 5: Commit**

```bash
git add content/projects/
git commit -m "feat: add scaffold markdown content for 4 projects"
```

---

### Task 5: Create the project detail page

**Files:**
- Create: `app/projects/[slug]/page.tsx`

- [ ] **Step 1: Create `app/projects/[slug]/page.tsx`**

```tsx
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
```

- [ ] **Step 2: Verify build**

Run: `npx next build`
Expected: Build succeeds, `/projects/openclaw`, `/projects/phantom-depth`, `/projects/ecommerce-data-pipeline`, `/projects/multi-model-predictive-analytics` pages generated.

- [ ] **Step 3: Commit**

```bash
git add app/projects/
git commit -m "feat: add project detail page with dynamic routing"
```

---

### Task 6: Update homepage to use dynamic project cards

**Files:**
- Modify: `app/page.tsx:1-290`

- [ ] **Step 1: Update imports and add project data loading**

At the top of `app/page.tsx`, add the import for `getAllProjects` and make the component async:

```typescript
import { getAllProjects } from "@/lib/projects";
```

Change `export default function Home()` to `export default async function Home()`.

- [ ] **Step 2: Add project data loading at the start of the component**

Inside the `Home` component, before the return statement:

```typescript
const projects = await getAllProjects();
```

- [ ] **Step 3: Replace 4 specific hardcoded project cards with dynamic rendering**

Delete these 4 specific `<FadeIn>` blocks from the projects grid (identified by their code comments):
- `{/* Project 1 — OpenClaw */}` (lines ~152-171)
- `{/* Project 2 — Phantom Depth */}` (lines ~174-193)
- `{/* Project 4 */}` (eCommerce Data Pipeline, lines ~218-237)
- `{/* Project 5 — Predictive Analytics System */}` (lines ~240-262)

**IMPORTANT:** Do NOT delete `{/* Project 3 — PhotonCore GUI */}` or `{/* Project 6 — Coming Soon */}`. These stay hardcoded.

In their place (at the top of the grid, before the PhotonCore card), add this `.map()` over the `projects` array:

```tsx
{projects.map((project, i) => (
  <FadeIn key={project.slug} delay={0.1 * (i + 1)}>
    <Link href={`/projects/${project.slug}`} className="block h-full">
      <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)] cursor-pointer">
        <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">
          {project.image ? (
            <Image src={project.image} alt={project.title} fill className="object-cover object-top opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Brain className="w-16 h-16 text-teal-400/40 mx-auto mb-2" />
                <span className="text-zinc-600 text-xs font-medium tracking-wider uppercase">{project.subtitle}</span>
              </div>
            </div>
          )}
          <Badge className={`absolute top-4 right-4 backdrop-blur-sm pointer-events-none ${
            project.status === "In Production"
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
              : "bg-amber-500/10 text-amber-500 border-amber-500/20"
          }`}>
            {project.status}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-2xl text-white">{project.title}</CardTitle>
          <CardDescription className="text-teal-400 font-medium">{project.subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col">
          <p className="text-zinc-400 mb-6 text-sm leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map(tag => (
              <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
            ))}
          </div>
          <p className="text-teal-400 text-xs mt-4 font-medium group-hover:text-teal-300 transition-colors">Read more →</p>
        </CardContent>
      </Card>
    </Link>
  </FadeIn>
))}
```

- [ ] **Step 4: Keep PhotonCore GUI and Next Project cards hardcoded after the dynamic cards**

These two cards remain as-is (no `<Link>` wrapper, no cursor pointer). They must appear AFTER the dynamic `.map()` block in the grid. This means card ordering changes from the original layout:
- **Before:** OpenClaw, Phantom Depth, PhotonCore, eCommerce, Predictive Analytics, Next Project
- **After:** OpenClaw, Phantom Depth, eCommerce, Predictive Analytics, PhotonCore, Next Project

This is intentional per the spec — dynamic cards first (sorted by `order`), then hardcoded Coming Soon cards.

- [ ] **Step 5: Update FadeIn delays on the two remaining hardcoded cards**

Since there are 4 dynamic cards (delays 0.1 through 0.4), update the hardcoded cards to continue the stagger:
- PhotonCore GUI: change `delay={0.3}` to `delay={0.5}`
- Next Project: change `delay={0.6}` stays as `delay={0.6}` (already correct)

- [ ] **Step 6: Verify build and dev server**

Run: `npx next build`
Expected: Build succeeds. Homepage shows 4 dynamic clickable cards + 2 hardcoded non-clickable cards. Clicking a dynamic card navigates to `/projects/[slug]`.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "feat: render project cards from markdown content with links to detail pages"
```

---

### Task 7: Final verification and build

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Clean build with no errors. Output shows all generated routes including `/projects/openclaw`, `/projects/phantom-depth`, `/projects/ecommerce-data-pipeline`, `/projects/multi-model-predictive-analytics`, and all `/blog/*` routes.

- [ ] **Step 2: Start dev server and manually verify**

Run: `npx next dev`

Verify:
1. Homepage loads, shows 6 project cards (4 clickable, 2 non-clickable)
2. Clicking OpenClaw card navigates to `/projects/openclaw` with hero, badges, GitHub button, image, and markdown content
3. Clicking Phantom Depth navigates to `/projects/phantom-depth` — no GitHub button shown (not set)
4. "Back to Projects" links navigate back to homepage `#projects` section
5. Blog pages still work at `/blog` and `/blog/building-openclaw`
6. PhotonCore GUI and Next Project cards are not clickable

- [ ] **Step 3: Commit any final fixes if needed**
