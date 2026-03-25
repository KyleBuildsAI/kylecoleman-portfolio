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
subtitle: "Hierarchical Agent Orchestration"   # short tagline shown on homepage card
description: "20-agent orchestration system for autonomous task execution"
date: "2026-02-23"
order: 1                         # display order on homepage (ascending)
status: "In Production"          # In Production | In Development | Coming Soon
tags: [Multi-Agent, LiteLLM, OpenRouter, Docker, MCP, TrueNAS]
image: "/OpenClaw-Setup.png"     # optional - path to screenshot, omit for icon fallback
github: "https://github.com/KyleBuildsAI/openclaw"  # optional - omit if no public repo
demo: ""                         # optional - live demo URL
video: ""                        # optional - YouTube/Vimeo URL (opens in new tab)
---

Markdown body with project write-up...
```

Required fields: `title`, `subtitle`, `description`, `date`, `status`, `tags`, `order`.
Optional fields: `image`, `github`, `demo`, `video` — omitted or empty means the corresponding button/section is not rendered. Projects without an `image` fall back to an icon placeholder (matching current homepage behavior). Projects without `github` show no repo link button.

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
- Data (title, subtitle, description, tags, status, image) pulled from markdown frontmatter via `getAllProjects()`

**Non-clickable projects** (Coming Soon / no markdown file):
- Cards render as they do now — no link, no cursor pointer
- Slightly muted appearance signals nothing to click through to
- Data stays hardcoded in `page.tsx`

**Card ordering:** Homepage renders clickable project cards in the order returned by `getAllProjects()`, which sorts by a frontmatter `order` field (integer, ascending). This replaces date-based sorting since project display order is editorial, not chronological. Hardcoded Coming Soon cards render after the dynamic cards.

**Slug-to-URL mappings:**
- `openclaw` → `/projects/openclaw`
- `phantom-depth` → `/projects/phantom-depth`
- `ecommerce-data-pipeline` → `/projects/ecommerce-data-pipeline`
- `multi-model-predictive-analytics` → `/projects/multi-model-predictive-analytics`

## Project Detail Page Layout

Route: `/projects/[slug]`

Top to bottom:

1. **Back navigation** — "← Back to Projects" link (`href="/#projects"`) that navigates to the homepage projects section
2. **Project hero:**
   - Title (large heading)
   - Status badge (emerald = In Production, amber = In Development)
   - Description (one-liner subtitle)
   - Tech stack tags (row of badges)
   - Action buttons: "View on GitHub" + "Live Demo" (if `demo` provided) + "Watch Video" (if `video` provided)
3. **Project image** — full-width screenshot
4. **Markdown content** — rendered HTML using existing `.prose-blog` styles
5. **Footer nav** — "← Back to Projects" link at bottom

**`/projects` route (no slug):** No listing page. Navigating to `/projects` returns a 404. This is intentional — the homepage IS the project listing. If this becomes confusing, a redirect can be added later.

Uses `generateStaticParams()` for static export compatibility and `generateMetadata()` for SEO (same patterns as blog).

**Video handling:** The "Watch Video" button opens the video URL in a new tab (`target="_blank"`). No iframe embedding — avoids CSP complexity for static export.

## Shared Markdown Utilities

`lib/markdown.ts` extracts two shared functions:

```typescript
// Metadata-only read (no remark processing) — used by listing pages
parseFrontmatter(filePath: string) → { data: Record<string, unknown> }

// Full parse with HTML conversion — used by detail pages
parseMarkdown(filePath: string) → { data: Record<string, unknown>; htmlContent: string }
```

- `parseFrontmatter()` reads file and parses YAML frontmatter with gray-matter only (no markdown-to-HTML). Used by blog listing and homepage project cards to avoid unnecessary remark processing.
- `parseMarkdown()` does the same plus converts the markdown body to HTML with remark + remark-html. Used by detail pages (blog posts, project pages).

Both return untyped `data` — calling code in `lib/blog.ts` and `lib/projects.ts` is responsible for mapping into their own typed interfaces (`PostMeta`, `ProjectMeta`, etc.).

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
