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
