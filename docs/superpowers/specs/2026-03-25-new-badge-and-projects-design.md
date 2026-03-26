# "New" Badge, New Projects, and Image Swap — Design Spec

## Summary

Three changes in one batch:
1. Add a "New" badge to project cards that auto-expires 30 days after the project's `date`
2. Add two new projects: HARD Summer Genre Analytics and AI Dream Engine
3. Swap the OpenClaw card/detail image to an architecture GIF

## 1. "New" Badge

### Behavior

At build time, `lib/projects.ts` computes an `isNew` boolean for each project by comparing the frontmatter `date` to the current date. If the project is fewer than 30 days old, `isNew` is `true`.

```typescript
// in lib/projects.ts
const NEW_THRESHOLD_DAYS = 30;

function isProjectNew(dateStr: string): boolean {
  const projectDate = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - projectDate.getTime();
  return diffMs < NEW_THRESHOLD_DAYS * 24 * 60 * 60 * 1000;
}
```

`isNew` is added to the `ProjectMeta` interface as a computed field (not stored in frontmatter).

### Visual Treatment

- **Homepage card:** Blue/indigo badge in the **top-left** corner of the card image area, opposite the existing status badge (top-right). Style: `bg-blue-500/10 text-blue-400 border-blue-500/20 backdrop-blur-sm`. Text: "New".
- **Detail page hero:** "New" badge displayed alongside the status badge in the hero area.
- Badge does not appear if `isNew` is `false`.

### Expiry

Build-time only. The badge disappears on the next build/deploy after 30 days have passed. No client-side JavaScript needed.

## 2. New Projects

### HARD Summer Genre Analytics

**File:** `content/projects/hard-summer-genre-analytics.md`

```yaml
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
```

Markdown body: scaffold from the user-provided description (about the project, motivation, approach, accuracy checks, prompting philosophy).

### AI Dream Engine

**File:** `content/projects/ai-dream-engine.md`

```yaml
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
```

Markdown body: scaffold from the user-provided description (iRobot inspiration, concept, how it works).

### Impact on Homepage

Both new projects are dynamic (have markdown files), so they render via the existing `projects.map()` block. Both will show the "New" badge since their dates are today. The two hardcoded Coming Soon cards (PhotonCore GUI, Next Project) remain at the end, now at positions 7 and 8.

## 3. OpenClaw Image Swap

Update `content/projects/openclaw.md` frontmatter:

```yaml
image: "/openclaw_architecture_1.gif"
```

No other changes to the OpenClaw file.

## Files Changed

| File | Change |
|------|--------|
| `lib/projects.ts` | Add `isNew` computed boolean to `ProjectMeta`, add `NEW_THRESHOLD_DAYS` constant and `isProjectNew()` helper |
| `app/page.tsx` | Render "New" badge on dynamic project cards when `isNew` is true |
| `app/projects/[slug]/page.tsx` | Render "New" badge in detail page hero when `isNew` is true |
| `content/projects/openclaw.md` | Change `image` to `/openclaw_architecture_1.gif` |
| `content/projects/hard-summer-genre-analytics.md` | New file |
| `content/projects/ai-dream-engine.md` | New file |

## Testing

- `npx next build` — all 6 project pages generate (4 existing + 2 new)
- Manual: verify "New" badge appears on HARD Summer and Dream Engine cards
- Manual: verify "New" badge does NOT appear on older projects (OpenClaw, Phantom Depth, eCommerce, Predictive Analytics)
- Manual: verify OpenClaw uses the new GIF image
- Manual: verify HARD Summer and Dream Engine detail pages show GitHub, Demo buttons
- Manual: verify Coming Soon cards are still last in the grid
