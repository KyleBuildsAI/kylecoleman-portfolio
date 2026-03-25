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
