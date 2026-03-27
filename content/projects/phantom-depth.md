---
title: "Phantom Depth"
subtitle: "Proprietary Real-Time Visual Conversion Pipeline"
description: "Production-grade computer vision system architected from the ground up across a 200+ file codebase."
date: "2026-02-01"
order: 2
status: "In Development"
tags: ["Python", "PyTorch", "OpenCV", "Claude Code", "AI-Assisted Dev"]
image: "/PhantomDepth.png"
---

## The Goal

Build a real-time 2D-to-3D video converter that runs on consumer hardware — not just expensive enterprise GPUs. The kind of tool that anyone with a decent graphics card could actually use.

## Where It Started

I found an open-source project on GitHub that hadn't been updated in two years. I forked it, modified it, extended the CLI, and pushed the frame rate and strength settings well beyond what it originally supported.

![Phantom Depth V1 CLI](/v1%20CLI%201.png)

![Phantom Depth V1 CLI — Processing Output](/v1%20CLI%202.png)

But the more features I added, the less stable it became. Results weren't improving. I made the call to rebuild from scratch — 100% my own code.

## The Real Problem

The codebase grew to over 200 files, and the AI coding tools I was using couldn't hold that much context. They'd forget what was already built, create duplicate files, and try to rebuild features that already existed. After a 12-hour Saturday session where I was still no closer to a working build, I stopped and asked myself a different question: what if the code isn't the problem? What if my tools and my process are the problem?

So I changed both.

I moved to Claude Code and Cline with OpenRouter, then set up persistent markdown files so the AI always knew what had been built and what the architecture looked like. That single change eliminated the duplicate file problem entirely. For the first time, I could make changes to a 200+ file codebase without losing what I'd already built.

## The Breakthrough

![Phantom Depth V1 Window](/v1%20Window.png)

I got a working demo with real optimizations, settings that actually function, and no more phantom duplicate files. Then I discovered Google Stitch, which let me redesign the entire interface from a screenshot.

![Phantom Depth V2 — Current Version](/v2%20Window.png)

I'm now on version 4 with a completely redesigned UI that's intuitive enough for non-technical users — a ground-up rebuild with improved processing and better performance on consumer GPU hardware.

## The Lesson

The whole project taught me that sometimes the breakthrough isn't writing better code — it's recognizing when your process is what's broken and having the discipline to stop and fix that first. When something isn't working, I don't just push harder. I step back, figure out whether the problem is the work or the workflow, and I'm willing to scrap my approach even after 12 hours of effort.
