# Project Detail Pages — Design Spec

## Summary

Turn portfolio project cards into clickable links that navigate to dedicated project detail pages (`/projects/[slug]`). Each project's content is authored in markdown with structured frontmatter. Projects without a markdown file (Coming Soon) remain non-clickable.

## Goals

- Each project card links to a detailed write-up with history, architecture, and results
- Prominent GitHub repo link, optional live demo link, optional video embed
- Content authored in markdown for easy editing
- Homepage cards and detail pages share the same data source (no duplication)
- Coming Soon / placeholder projects are visually distinct and non-clickable

## Content & Data Model

Each project gets a markdown file at `/content/projects/[slug].md`:

```yaml
---
title: "OpenClaw"
description: "20-agent orchestration system for autonomous task execution"
date: "2026-02-23"
status: "In Production"          # In Production | In Development | Coming Soon
tags: [Multi-Agent, LiteLLM, OpenRouter, Docker, MCP, TrueNAS]
image: "/OpenClaw-Setup.png"
github: "https://github.com/KyleBuildsAI/openclaw"
demo: ""                         # optional - live demo URL
video: ""                        # optional - YouTube/Vimeo embed URL
---

Markdown body with project write-up...
```

Required fields: `title`, `description`, `date`, `status`, `tags`, `image`, `github`.
Optional fields: `demo`, `video` — omitted or empty means the corresponding button is not rendered.

Only projects with a markdown file get clickable cards on the homepage. The frontmatter is the single source of truth for both the homepage card and the detail page.

## File & Route Architecture

### New files

| File | Purpose |
|------|---------|
| `lib/markdown.ts` | Shared markdown parsing: `parseMarkdown()` reads a file, parses frontmatter with gray-matter, converts body to HTML with remark |
| `lib/projects.ts` | Project-specific utilities: `getAllProjects()`, `getProjectBySlug()` |
| `app/projects/[slug]/page.tsx` | Project detail page with project-specific layout |
| `content/projects/openclaw.md` | OpenClaw project write-up |
| `content/projects/phantom-depth.md` | Phantom Depth project write-up |
| `content/projects/ecommerce-data-pipeline.md` | eCommerce Data Pipeline write-up |
| `content/projects/multi-model-predictive-analytics.md` | Multi-Model Predictive Analytics write-up |

### Modified files

| File | Change |
|------|--------|
| `lib/blog.ts` | Refactored to use shared `lib/markdown.ts` for parsing |
| `app/page.tsx` | Project cards with markdown files become `<Link>` to `/projects/[slug]`; Coming Soon cards remain non-clickable |

### Not created (non-clickable)

- PhotonCore GUI — Coming Soon, stays hardcoded on homepage
- "Next Project" placeholder — stays as-is

## Homepage Card Behavior

**Clickable projects** (have markdown files):
- Card wraps in a Next.js `<Link>` to `/projects/[slug]`
- Existing hover effects (border glow, shadow) serve as visual affordance
- Cursor pointer and a "Read more →" hint at card bottom
- Data (title, description, tags, status, image) pulled from markdown frontmatter

**Non-clickable projects** (Coming Soon / no markdown file):
- Cards render as they do now — no link, no cursor pointer
- Slightly muted appearance signals nothing to click through to
- Data stays hardcoded in `page.tsx`

## Project Detail Page Layout

Route: `/projects/[slug]`

Top to bottom:

1. **Back navigation** — "← Back to Projects" link that navigates to homepage projects section
2. **Project hero:**
   - Title (large heading)
   - Status badge (emerald = In Production, amber = In Development)
   - Description (one-liner subtitle)
   - Tech stack tags (row of badges)
   - Action buttons: "View on GitHub" + "Live Demo" (if `demo` provided) + "Watch Video" (if `video` provided)
3. **Project image** — full-width screenshot
4. **Markdown content** — rendered HTML using existing `.prose-blog` styles
5. **Footer nav** — "← Back to Projects" link at bottom

Uses `generateStaticParams()` for static export compatibility and `generateMetadata()` for SEO (same patterns as blog).

## Shared Markdown Utilities

`lib/markdown.ts` extracts the common parsing logic:

```typescript
parseMarkdown(filePath: string) → { frontmatter, htmlContent }
```

- Reads file from disk
- Parses YAML frontmatter with gray-matter
- Converts markdown body to HTML with remark + remark-html
- Returns both parts

`lib/blog.ts` and `lib/projects.ts` each use `parseMarkdown()` internally but maintain their own typed interfaces, sorting logic, and content directory paths.

## Error Handling

- **Malformed frontmatter:** Build fails with a clear error (same as blog)
- **Missing optional fields:** Buttons/sections simply don't render
- **Unknown slug:** Next.js static export returns 404 (page not generated)
- **Empty markdown body:** Hero/metadata still renders, no content section below

## Testing

No unit tests — content/routing is best verified by:

1. `next build` — confirms static export generates all project pages
2. Manual verification:
   - Clickable cards link to correct project pages
   - Coming Soon cards are not clickable
   - Optional fields (demo, video) show/hide correctly
   - Responsive layout works on mobile
   - Back navigation works correctly

## Scaffold Content

Starter markdown files will be created for the 4 active projects with placeholder content based on existing card descriptions. Kyle will edit these with full write-ups later.
