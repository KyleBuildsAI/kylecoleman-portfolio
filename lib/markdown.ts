import fs from "fs";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";

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
  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(content);
  return { data, htmlContent: processed.toString() };
}
