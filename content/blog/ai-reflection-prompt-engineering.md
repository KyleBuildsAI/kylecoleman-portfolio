---
title: "AI Reflection: A New Way to Prompt Engineer AI"
date: "2025-09-25"
description: "A prompting technique I developed called AI Reflect — forcing AI to evaluate and improve its own output. Later picked up and published by AI researcher Nir Diamant."
tags: ["Prompt Engineering", "AI Reflection", "LLMs", "AI Strategy"]
---

![AI Reflection](/reflect.jpeg)

## The Problem with AI Reasoning

AI reasoning works like a one-way street. The model receives your prompt, processes it through billions of parameters trained on massive datasets, identifies patterns, and generates a coherent response. It's incredibly fast and can connect information in ways that seem almost magical. But here's what I noticed: it delivers its reasoning and stops. There's no built-in mechanism for it to pause, evaluate what it just produced, or consider if there's a better approach.

This is fundamentally different from how humans think. When we solve problems, we naturally reflect. We ask ourselves if our answer makes sense, if we missed something, if there's a better way. AI has all the reasoning power but lacks this reflection loop. It produces its first thought and moves on. Without that natural pause to reconsider, you get an answer — not necessarily the *best* answer.

## AI Reflect: The Technique

Here's what I've been doing to unlock better responses: I ask the AI to reflect on its own work. Simple prompts like **"What do you think about this?"** force it to evaluate what it just produced. **"So what do you think can be improved?"** shifts the focus from defending to enhancing. After it identifies the gaps, I hit it with **"Okay now rewrite it with the suggested changes"** to get the refined version.

### Reflection Prompts I Use Regularly

- "What do you think about your last response?"
- "Rate your answer and explain why"
- "What assumptions did you make that might be wrong?"
- "What alternative perspectives should we consider?"

## The Results

The results have been game-changing. Without reflection prompts, you get first-draft thinking. With them, you get something that's been tested against its own logic. You're not just getting better answers — you're fundamentally changing how the AI engages with the problem. It transforms from an answer generator into a thought partner that can iterate and improve.

AI has the capacity for reflection but needs you to activate it. Try AI Reflect on your next project and watch the quality jump.

## Published Research

This technique was later picked up and published by [Nir Diamant](https://www.linkedin.com/feed/update/urn:li:activity:7378945464018194432/), a well-known AI researcher, who validated the approach and expanded on the methodology in his research. You can read the full methodology in his publication: [This Simple Trick Makes AI Agents Better](https://diamantai.substack.com/p/this-simple-trick-makes-ai-agents).

---

*Originally posted on [LinkedIn](https://www.linkedin.com/feed/update/urn:li:activity:7368897829563527168/) on September 25, 2025.*
