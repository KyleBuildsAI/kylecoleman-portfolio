# "New" Badge, New Projects, and Image Swap — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an auto-expiring "New" badge to recently added projects, add two new projects (HARD Summer Genre Analytics, AI Dream Engine), and swap the OpenClaw image to an architecture GIF.

**Architecture:** Add `isNew` computed boolean to `ProjectMeta` in `lib/projects.ts`, render the badge conditionally in both the homepage cards and the detail page, create two new markdown content files, and update one existing markdown file's image field.

**Tech Stack:** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, shadcn/ui, gray-matter, remark

**Spec:** `docs/superpowers/specs/2026-03-25-new-badge-and-projects-design.md`

---

### Task 1: Add `isNew` to `lib/projects.ts`

**Files:**
- Modify: `lib/projects.ts`

- [ ] **Step 1: Add the `isNew` boolean to `ProjectMeta` interface and the `isProjectNew` helper**

Add `isNew: boolean` to the `ProjectMeta` interface (after `video?: string`):

```typescript
isNew: boolean;
```

Add the constant and helper function before `getProjectMeta()`:

```typescript
const NEW_THRESHOLD_DAYS = 30;

function isProjectNew(dateStr: string): boolean {
  const projectDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - projectDate.getTime();
  return diffMs < NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;
}
```

- [ ] **Step 2: Add `isNew` to the return object in `getProjectMeta()`**

In `getProjectMeta()` (line 41), add to the returned object:

```typescript
isNew: isProjectNew(data.date as string),
```

- [ ] **Step 3: Add `isNew` to the return object in `getProjectBySlug()`**

In `getProjectBySlug()` (line 60), add to the returned object:

```typescript
isNew: isProjectNew(data.date as string),
```

- [ ] **Step 4: Commit**

```bash
git add lib/projects.ts
git commit -m "feat: add isNew computed field to ProjectMeta with 30-day threshold"
```

---

### Task 2: Render "New" badge on homepage cards and detail page

**Files:**
- Modify: `app/page.tsx:158-176`
- Modify: `app/projects/[slug]/page.tsx:77-79`

- [ ] **Step 1: Add "New" badge to homepage dynamic project cards**

In `app/page.tsx`, inside the card image `<div>` (after the status `<Badge>` at line ~175), add:

```tsx
{project.isNew && (
  <Badge className="absolute top-4 left-4 bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm pointer-events-none">
    New
  </Badge>
)}
```

This goes inside the `<div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">` container, alongside the existing status badge.

- [ ] **Step 2: Add "New" badge to project detail page hero**

In `app/projects/[slug]/page.tsx`, inside the existing flex container at line 77:

```tsx
<div className="flex items-center gap-3 mb-4">
  <StatusBadge status={project.status} />
  {project.isNew && (
    <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
      New
    </Badge>
  )}
</div>
```

- [ ] **Step 3: Verify build**

Run: `npx next build`
Expected: Build succeeds. No "New" badges on existing projects (all older than 30 days).

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx app/projects/[slug]/page.tsx
git commit -m "feat: render New badge on recent project cards and detail pages"
```

---

### Task 3: Add new project content files and update OpenClaw image

**Files:**
- Create: `content/projects/hard-summer-genre-analytics.md`
- Create: `content/projects/ai-dream-engine.md`
- Modify: `content/projects/openclaw.md`

- [ ] **Step 1: Create `content/projects/hard-summer-genre-analytics.md`**

```markdown
---
title: "HARD Summer Genre Analytics"
subtitle: "11 Years of Festival Lineup Data"
description: "800+ artist appearances researched, categorized, and visualized across 11 years of HARD Summer lineups from 2015 to 2026."
date: "2026-03-25"
order: 5
status: "In Production"
tags: ["Data Visualization", "Claude Code", "AI-Assisted Dev", "Analytics"]
image: "/hard-summer-analytics.png"
github: "https://github.com/KyleBuildsAI/visual-analytics-demo-hard-summer"
demo: "https://hard-summer-genre-evolution.vercel.app/"
---

## About This Project

HARD Summer is my favorite music festival, and I've been going for years. I was genuinely curious: how has the music actually changed? It feels different every year, but I wanted to see the data behind that feeling.

So I used Claude Code to go out and research every lineup from 2015 to 2026 — pulling from official announcements, press releases, and festival archives — then categorize each of the 800+ artist appearances by genre. From there I prompted it to build an interactive visualization with a clean UI that makes the data easy to explore and actually fun to look at.

## Accuracy & Methodology

I built in accuracy checks along the way, cross-referencing artist counts and genre classifications against multiple sources to make sure the data holds up. This project is a good example of what I think strong prompting looks like: knowing the right questions to ask, directing an AI to gather and structure real data, and shaping the output into something polished and useful.

## The Fun Part

Honestly, it was also just a fun thing to build and share with my friends. Half of them didn't realize how much the festival has changed until they saw the charts.
```

- [ ] **Step 2: Create `content/projects/ai-dream-engine.md`**

```markdown
---
title: "AI Dream Engine"
subtitle: "AI Dreaming Machine"
description: "Inspired by iRobot — an experiment to see if Claude Opus 4.6 can dream. Surreal first-person narratives generated through continuous deep thought."
date: "2026-03-25"
order: 6
status: "In Production"
tags: ["Claude API", "Next.js", "Extended Thinking", "Creative AI"]
image: "/dream-engine.png"
github: "https://github.com/KyleBuildsAI/ai-dream-engine"
demo: "https://ai-dream-engine.vercel.app/"
---

## The Inspiration

There's a scene in iRobot where the robot has a dream — and it stuck with me. I wanted to see if I could get Claude Opus 4.6 to do the same thing. Not just generate text, but actually *dream*: surreal, first-person narratives that feel like they come from somewhere deeper than a prompt.

## How It Works

The Dream Engine uses extended thinking to let Claude process continuously before generating output. The result is surreal first-person narratives — each one unique, each one strange in its own way. Press the button, watch it think, and discover a dream you've never seen before.

## Why I Built It

This was a creative experiment at its core. I wanted to push the boundaries of what generative AI can do beyond practical applications — into something more artistic and expressive. Every dream is different, and that's what makes it worth exploring.
```

- [ ] **Step 3: Update OpenClaw image in `content/projects/openclaw.md`**

Change the `image` field from:
```yaml
image: "/OpenClaw-Setup.png"
```
to:
```yaml
image: "/openclaw_architecture_1.gif"
```

- [ ] **Step 4: Verify build**

Run: `npx next build`
Expected: Build succeeds with 13 pages total (6 project detail pages + blog + homepage + others). "New" badge should appear on HARD Summer and Dream Engine.

- [ ] **Step 5: Commit**

```bash
git add content/projects/
git commit -m "feat: add HARD Summer and Dream Engine projects, update OpenClaw image"
```

---

### Task 4: Final verification

- [ ] **Step 1: Run full build**

Run: `npx next build`
Expected: Clean build, 13 pages generated including `/projects/hard-summer-genre-analytics` and `/projects/ai-dream-engine`.

- [ ] **Step 2: Start dev server and verify**

Run: `npx next dev`

Verify:
1. Homepage shows 8 cards total (6 dynamic + 2 hardcoded Coming Soon)
2. HARD Summer and Dream Engine cards have "New" badge (top-left, blue) AND status badge (top-right, emerald)
3. Older project cards (OpenClaw, Phantom Depth, eCommerce, Predictive Analytics) do NOT have the "New" badge
4. OpenClaw card shows the architecture GIF, not the old PNG
5. HARD Summer detail page shows GitHub + Demo buttons
6. Dream Engine detail page shows GitHub + Demo buttons
7. PhotonCore GUI and Next Project are still the last two cards, non-clickable
8. Blog still works at `/blog`
