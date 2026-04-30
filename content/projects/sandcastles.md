---
title: "SandCastles"
subtitle: "Custom Agentic AI Harness"
description: "A self-hosted, single-user agentic AI operating system. Multi-model orchestration, persistent memory, and self-improvement, running 24/7 on my own hardware."
date: "2026-04-29"
order: 1
status: "In Development"
tags: ["Multi-Agent", "Agentic OS", "Self-Hosted", "Multi-Model", "Docker", "PostgreSQL", "Tailscale"]
image: "/SandCastles Image 1.png"
---

> **one harness · every model · total control**

A personal AI operating system that runs forever on my own hardware.

## Overview

SandCastles is a fully self-hosted agentic AI operating system that runs 24/7 on my home server. It routes every request through a planning Orchestrator that decomposes complex tasks, delegates work to specialized sub-agents (Researcher, Coder, Writer, Analyst, and seven more), and assembles the results.

It is multi-model by design — Claude, GPT, Gemini, and local Ollama all plug in through one gateway — cost-aware, self-improving through a weekly Meta-Harness analysis loop, and accessible from anywhere on my Tailnet through CLI, web, Telegram, Discord, or voice.

The architecture is locked at v0.6 (29 chapters, 51+ design decisions) and the Phase 1 build is underway.

## What It Actually Is

SandCastles is the agentic AI harness I am building for myself. It is not a chatbot wrapper or a LangChain demo. It is a full multi-layer operating system that takes a request from any interface, plans it, decomposes it into a task graph, delegates work to the right specialized sub-agent, picks the right model for the job (cloud or local, frontier or fast), runs the work in sandboxed containers, and assembles the final output.

The Orchestrator is the only component that runs continuously. Everything else spins up on demand and idles out.

## Inside the Platform

### Dashboard / Home

![SandCastles Dashboard / Home — Mission control for the SandCastles platform. Live system health across API, PostgreSQL, Redis, and LiteLLM, with real-time CPU, memory, and disk telemetry. Task counters, daily spend tracking against budget cap, active task feed, and recent activity stream all in one glance.](/SandCastles%20Image%201.png)

Mission control for the SandCastles platform. Live system health across API, PostgreSQL, Redis, and LiteLLM, with real-time CPU, memory, and disk telemetry. Task counters, daily spend tracking against budget cap, active task feed, and recent activity stream all in one glance.

### Chat Interface

![SandCastles Chat Interface — The conversational front door. Multi-session chat history in the left rail, model routing set to Auto, with attachments, tools, agent handoff, flow mode, and standard mode all wired into a single composer. Personalized greeting on entry.](/SandCastles%20Image%202.png)

The conversational front door. Multi-session chat history in the left rail, model routing set to Auto, with attachments, tools, agent handoff, flow mode, and standard mode all wired into a single composer. Personalized greeting on entry.

### Kanban Board

![SandCastles Kanban Board — Task lifecycle visualization across Backlog, Planning, In Progress, Review, and Done columns. Each card surfaces execution status, model used, runtime, and cost. 100 tasks tracked, 1 actively executing on local Qwen 3.6.](/SandCastles%20Image%203.png)

Task lifecycle visualization across Backlog, Planning, In Progress, Review, and Done columns. Each card surfaces execution status, model used, runtime, and cost. 100 tasks tracked, 1 actively executing on local Qwen 3.6.

### Workflow Builder

![SandCastles Workflow Builder — Visual node-based workflow editor built on React Flow. Triggers, Assistants, Agents, Tools, MCPs, and Skills available as draggable nodes. Pictured: a user-message workflow routing through a General Assistant, into the Calendar Optimizer skill, and back out as a reply.](/SandCastles%20Image%204.png)

Visual node-based workflow editor built on React Flow. Triggers, Assistants, Agents, Tools, MCPs, and Skills available as draggable nodes. Pictured: a user-message workflow routing through a General Assistant, into the Calendar Optimizer skill, and back out as a reply.

### Assistants Library

![SandCastles Assistants Library — Six purpose-built assistant personas with tier classifications (fast, balanced, frontier). Coder, Concierge, General, Researcher, Sandy, and Writer, each backed by a different Claude model and optimized for a distinct interaction style.](/SandCastles%20Image%205.png)

Six purpose-built assistant personas with tier classifications (fast, balanced, frontier). Coder, Concierge, General, Researcher, Sandy, and Writer, each backed by a different Claude model and optimized for a distinct interaction style.

### Agents Catalog

![SandCastles Agents Catalog — Twenty production-ready autonomous agents covering API building, blog writing, bug fixing, code review, competitive analysis, market research, resume building, and more. Each card shows step budget, cost ceiling, and tool count up front.](/SandCastles%20Image%206.png)

Twenty production-ready autonomous agents covering API building, blog writing, bug fixing, code review, competitive analysis, market research, resume building, and more. Each card shows step budget, cost ceiling, and tool count up front.

### Skills Registry

![SandCastles Skills Registry — The atomic capability layer. Skills like Agent Kanban, API Client Generator, Blog Post Writer, Calendar Optimizer, CI/CD Pipeline Designer, and Code Review, each tagged with permissions (file_read, file_write, web_fetch, code_execute, memory_search) for transparent capability scoping.](/SandCastles%20Image%207.png)

The atomic capability layer. Skills like Agent Kanban, API Client Generator, Blog Post Writer, Calendar Optimizer, CI/CD Pipeline Designer, and Code Review, each tagged with permissions (file_read, file_write, web_fetch, code_execute, memory_search) for transparent capability scoping.

### Routing Rules

![SandCastles Routing Rules — Priority-ordered routing engine. Frontier model for orchestrator planning, fast tier for short inputs, balanced tier for coding, with a default fallback to assistant-preferred tier. Cost optimization meets capability matching.](/SandCastles%20Image%208.png)

Priority-ordered routing engine. Frontier model for orchestrator planning, fast tier for short inputs, balanced tier for coding, with a default fallback to assistant-preferred tier. Cost optimization meets capability matching.

### Observability

![SandCastles Observability — Full system observability in one view. Health checks, 7-day performance metrics, cost per task, error breakdowns by component, and a searchable log stream filterable by level, component, and task ID.](/SandCastles%20Image%209.png)

Full system observability in one view. Health checks, 7-day performance metrics, cost per task, error breakdowns by component, and a searchable log stream filterable by level, component, and task ID.

### Meta-Harness

![SandCastles Meta-Harness — Self-monitoring weekly reports generated by the system about itself. Success rates, cost attribution, top models, and top assistants, all auto-generated on a schedule. The system observing its own performance.](/SandCastles%20Image%2010.png)

Self-monitoring weekly reports generated by the system about itself. Success rates, cost attribution, top models, and top assistants, all auto-generated on a schedule. The system observing its own performance.

### AutoSkill (Labs)

![SandCastles AutoSkill (Labs) — Pattern detection layer that watches recurring task shapes and proposes new skills automatically. Pending review queue, detected patterns with task counts, and a history log of approved promotions like "Explain Algorithm with Python Implementation."](/SandCastles%20Image%2011.png)

Pattern detection layer that watches recurring task shapes and proposes new skills automatically. Pending review queue, detected patterns with task counts, and a history log of approved promotions like "Explain Algorithm with Python Implementation."

### Experiments (Labs)

![SandCastles Experiments (Labs) — Side-by-side A/B/C/D model comparison harness. Run one prompt across up to four models simultaneously (Claude Sonnet, GPT-5, Gemini 3 Pro, local Qwen3-4b), plus a structured experiment builder for routing rules, assistants, and skills with sample-size targeting.](/SandCastles%20Image%2012.png)

Side-by-side A/B/C/D model comparison harness. Run one prompt across up to four models simultaneously (Claude Sonnet, GPT-5, Gemini 3 Pro, local Qwen3-4b), plus a structured experiment builder for routing rules, assistants, and skills with sample-size targeting.

### Telegram Bot Integration

![SandCastles Telegram Bot Integration — SandCastles in your pocket. Full assistant access through Telegram with slash commands like /assistants to list available personas, @-mention routing to pick the right one, and live tool calls executing against the harness. Pictured: dispatching the Researcher to scout trending 2026 AI buzzwords paired with available .AI domains under $200, all from a mobile chat thread.](/SandCastles%20Image%2013.png)

SandCastles in your pocket. Full assistant access through Telegram with slash commands like `/assistants` to list available personas, @-mention routing to pick the right one, and live tool calls executing against the harness. Pictured: dispatching the Researcher to scout trending 2026 AI buzzwords paired with available .AI domains under $200, all from a mobile chat thread.

### TrueNAS Deployment Shell

![SandCastles TrueNAS Deployment Shell — The infrastructure layer. SandCastles running self-hosted on TrueNAS Community Edition, accessed through the web shell with a custom ASCII boot banner and an authenticated PLAN-mode REPL. "One harness, every model, total control" — versioned, containerized, and fully under the operator's roof.](/SandCastles%20Image%2014.png)

The infrastructure layer. SandCastles running self-hosted on TrueNAS Community Edition, accessed through the web shell with a custom ASCII boot banner and an authenticated PLAN-mode REPL. "One harness, every model, total control" — versioned, containerized, and fully under the operator's roof.

## Stack & Highlights

**Architecture:** Multi-layer agentic OS. 17 layers, 11 specialized assistants, unlimited task-graph depth.

**Runtime:** Docker Compose · LiteLLM · Redis + BullMQ · Caddy · Tailscale · Node 22

**Data & Memory:** PostgreSQL 17 + pgvector · Letta-style three-tier memory · Mem0g-style knowledge graph · HashiCorp Vault for credentials

**Models:** Anthropic Claude (primary) · OpenAI · Google · Ollama on a local 32GB GPU for Private Mode

**Interfaces:** CLI · React PWA · Telegram · Discord · Voice (Whisper + ElevenLabs)

**Observability:** Loki + Grafana · structured audit logs · weekly self-improvement reports · full task-trace replay

**Highlights:**
- Multi-model intelligent routing with cost, latency, and privacy as routing dimensions
- Private Mode keeps sensitive queries on local hardware with a quarantined memory scope
- Three-tier human approval system (confirm, approve, PIN) for irreversible actions
- AutoSkill auto-generates reusable skills after detecting two-or-more repeated patterns
- KAIROS-inspired proactive monitoring on top of the request-response loop
- Git-versioned everything, with automatic backup and rollback on every config change

## Status

*Personal project · 2026 · In active development.*

Phase 1 (foundation: gateway, API, single assistant, CLI, database) is currently being built against the locked v0.6 architecture.
