import Image from "next/image";
import Link from "next/link";
import { Brain, Workflow, Users, CheckCircle, Github, Mail, Linkedin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/FadeIn";
import { DotPattern } from "@/components/DotPattern";
import { GitHubRepoCount } from "@/components/GitHubRepoCount";
import { CurrentYear } from "@/components/CurrentYear";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <DotPattern />

      {/* NAV */}
      <nav className="relative z-10 border-b border-zinc-900 bg-[#0a0a0a]/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-white font-bold text-lg">Kyle Coleman</span>
          <div className="flex items-center gap-6">
            <Link href="#projects" className="text-zinc-400 hover:text-white text-sm transition-colors">Projects</Link>
            <Link href="/blog" className="text-zinc-400 hover:text-white text-sm transition-colors">Blog</Link>
            <Link href="#contact" className="text-zinc-400 hover:text-white text-sm transition-colors">Contact</Link>
          </div>
        </div>
      </nav>

      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center text-center z-10">
        <FadeIn delay={0.1}>
          <div className="relative mb-8 h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-full ring-2 ring-zinc-800 ring-offset-4 ring-offset-[#0a0a0a] shadow-[0_0_40px_rgba(20,184,166,0.15)]">
            <Image
              src="/ME_GPT.jpg"
              alt="Kyle Coleman"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 160px) 100vw, 160px"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Kyle Coleman
          </h1>
          <p className="text-xl md:text-2xl text-teal-400 font-medium mb-6">
            AI Solutions Architect
          </p>
          <p className="max-w-2xl text-lg md:text-xl text-zinc-400 mb-4 leading-relaxed mx-auto">
            I architect AI systems engineered for production and built to scale.
          </p>
          <p className="max-w-2xl text-base text-zinc-500 mb-10 leading-relaxed mx-auto">
            Specializing in multi-agent orchestration, agentic workflows, and production-grade LLM pipelines.
          </p>
        </FadeIn>

        <FadeIn delay={0.3} className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-16">
          <Button asChild size="lg" className="bg-[#14b8a6] hover:bg-teal-500 text-zinc-950 font-bold rounded-full px-8 w-full sm:w-auto">
            <Link href="#projects">See My Work</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white w-full sm:w-auto">
            <Link href="#contact">Let's Talk</Link>
          </Button>
        </FadeIn>

      </section>

      {/* 2. WHAT I DO */}
      <section className="py-24 px-6 relative z-10 border-t border-zinc-900 bg-zinc-950/30">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-center text-white">What I Actually Do</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Brain, title: "Multi-Agent Orchestration",
                desc: "Design and deploy hierarchical AI systems where specialized agents handle complex, long-running tasks autonomously, with self-healing redundancy and intelligent model routing built in."
              },
              {
                icon: Workflow, title: "LLM Pipeline Architecture",
                desc: "Build cost-optimized inference pipelines that route intelligently between frontier models and local LLMs, reducing API costs while maintaining output quality at scale."
              },
              {
                icon: Users, title: "AI-Assisted Development",
                desc: "Leverage the full frontier model stack to architect and ship production systems faster than traditional development cycles allow, without sacrificing quality or maintainability."
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i} className="h-full">
                <Card className="bg-zinc-900/60 border-zinc-800 group hover:border-teal-500/30 transition-colors h-full">
                  <CardHeader>
                    <item.icon className="w-8 h-8 text-teal-400 mb-4" />
                    <CardTitle className="text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-zinc-400 leading-relaxed">
                    {item.desc}
                  </CardContent>
                </Card>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HUMAN + AI */}
      <section className="py-24 px-6 max-w-4xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">AI That Empowers Your Team, Not Replaces It</h2>
          <p className="text-lg text-zinc-400 leading-relaxed">
            The gap between AI proof-of-concept and production comes down to architecture. I build systems designed to run reliably, minimize cost, and scale with your business.
          </p>
        </FadeIn>
      </section>

      {/* 4. RESULTS */}
      <section className="py-24 px-6 bg-teal-950/10 border-y border-zinc-900 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <FadeIn>
            <h2 className="text-3xl font-bold mb-12 text-white">Real Results, Not Just Demos</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              {[
                { stat: "$2M+", label: "Attributed Revenue Managed" },
                { stat: "15%", label: "YoY Growth" },
                { stat: "50%", label: "Reduction in Manual Tasks" },
                { stat: "500K+", label: "Keywords Managed" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                  <span className="text-4xl md:text-5xl font-bold text-white mb-3">{item.stat}</span>
                  <span className="text-sm text-teal-400 font-medium tracking-wide">{item.label}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-zinc-500 max-w-2xl mx-auto italic">
              Results from my work at Accessory Power, managing data analytics and automation for their eCommerce category.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* 5. PROJECTS */}
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <FadeIn>
          <h2 className="text-3xl font-bold mb-12 text-center text-white">What I've Built</h2>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Project 1 — OpenClaw */}
          <FadeIn delay={0.1}>
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
              <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">
                <Image src="/OpenClaw-Setup.png" alt="OpenClaw — Multi-Agent AI Orchestration System" fill className="object-cover object-top opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                <Badge className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm pointer-events-none">In Production</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">OpenClaw — Multi-Agent AI Orchestration System</CardTitle>
                <CardDescription className="text-teal-400 font-medium">Hierarchical Agent Orchestration</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Self-hosted hierarchical orchestration system with 20+ agents across executive, primary, and sub-agent tiers. Features tiered LLM routing via OpenRouter and LiteLLM, self-healing failure recovery, MCP tool integration, and Docker Compose deployment on custom RTX 5090 hardware.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Multi-Agent", "LiteLLM", "OpenRouter", "Docker", "MCP", "TrueNAS"].map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Project 2 — Phantom Depth */}
          <FadeIn delay={0.2}>
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
              <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">
                <Image src="/PhantomDepth.png" alt="Phantom Depth" fill className="object-cover object-top opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                <Badge className="absolute top-4 right-4 bg-amber-500/10 text-amber-500 border-amber-500/20 backdrop-blur-sm pointer-events-none">In Development</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Phantom Depth</CardTitle>
                <CardDescription className="text-teal-400 font-medium">Proprietary Real-Time Visual Conversion Pipeline</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Production-grade computer vision system architected from the ground up across a 200+ file codebase. Built entirely using frontier AI coding tools including Claude Code, Codex, and Cline, demonstrating that a single architect with the right AI stack can deliver systems at the scale and speed of a full engineering team. Targets professional-grade performance on consumer GPU hardware.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Python", "PyTorch", "OpenCV", "Claude Code", "AI-Assisted Dev"].map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Project 3 — PhotonCore GUI */}
          <FadeIn delay={0.3}>
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
              <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">
                <Image src="/PhotonCore-GUI.png" alt="PhotonCore GUI" fill className="object-cover object-top opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                <Badge className="absolute top-4 right-4 bg-zinc-900/80 text-zinc-300 border-zinc-700 backdrop-blur-sm pointer-events-none">Open Source Coming Soon</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">PhotonCore GUI</CardTitle>
                <CardDescription className="text-teal-400 font-medium">Custom LLM Interface</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">A unified interface for local LLMs and AI APIs. Features project-based chat organization, prompt queuing, session parameter controls, and memory management. Built for power users who need flexibility and control.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Python", "Local LLMs", "API Integration", "Custom UI"].map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Project 4 */}
          <FadeIn delay={0.4}>
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
              <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden">
                <Image src="/ecommerce_pipeline.png" alt="eCommerce Data Pipeline" fill className="object-cover object-top opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
                <Badge className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm pointer-events-none">In Production</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">eCommerce Data Pipeline</CardTitle>
                <CardDescription className="text-teal-400 font-medium">Production Automation System</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Custom-built system that collects and analyzes eCommerce data hourly instead of weekly. Reduced manual task time by 50% and enabled data-driven decisions that drove 15% revenue growth.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Python", "Automation", "Data Analysis", "Production"].map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Project 5 — Predictive Analytics System */}
          <FadeIn delay={0.5}>
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
              <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <Brain className="w-16 h-16 text-teal-400/40 mx-auto mb-2" />
                  <span className="text-zinc-600 text-xs font-medium tracking-wider uppercase">Predictive Analytics</span>
                </div>
                <Badge className="absolute top-4 right-4 bg-emerald-500/10 text-emerald-400 border-emerald-500/20 backdrop-blur-sm pointer-events-none">In Production</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Multi-Model Predictive Analytics System</CardTitle>
                <CardDescription className="text-teal-400 font-medium">AI-Powered Forecasting Engine</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Fully automated pipeline combining 5 frontier LLMs as a consensus decision layer for market trend and demand forecasting. Covers timed web scraping, structured data organization, multi-model analysis with custom algorithmic prompt chains, and a consolidated results dashboard. Achieved 77%+ prediction accuracy, outperforming any single-model approach.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["Python", "Multi-LLM Consensus", "Web Scraping", "Prompt Engineering", "Data Pipeline"].map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Project 6 — Coming Soon */}
          <FadeIn delay={0.6}>
            <Card className="bg-zinc-900/60 border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col h-full hover:shadow-[0_0_30px_rgba(20,184,166,0.05)]">
              <div className="relative h-56 w-full border-b border-zinc-800 bg-zinc-950 overflow-hidden flex items-center justify-center">
                <div className="text-center">
                  <Terminal className="w-16 h-16 text-zinc-700 mx-auto mb-2" />
                  <span className="text-zinc-600 text-xs font-medium tracking-wider uppercase">In Progress</span>
                </div>
                <Badge className="absolute top-4 right-4 bg-zinc-900/80 text-zinc-300 border-zinc-700 backdrop-blur-sm pointer-events-none">Coming Soon</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-white">Next Project</CardTitle>
                <CardDescription className="text-teal-400 font-medium">Coming Soon</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-zinc-400 mb-6 text-sm leading-relaxed">Something new is in the works. Stay tuned.</p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {["TBA"].map(tag => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-900">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>

        </div>
      </section>

      {/* 6. BACKGROUND */}
      <section className="py-24 px-6 border-t border-zinc-900 bg-zinc-950/30 relative z-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <Terminal className="w-6 h-6 text-teal-500" /> Experience
            </h3>
            <div className="space-y-8 relative border-l border-zinc-800 ml-3 pl-6">
              {[
                { role: "Data Analyst and Automation Developer", company: "Accessory Power", time: "Currently" },
                { role: "Senior IT Specialist and Technical Lead", company: "Malibu Tech Support | Calabasas, CA | October 2013 - September 2024", time: "Previously" },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-zinc-900 border-2 border-teal-500"></div>
                  <h4 className="text-lg font-medium text-white">{item.role}</h4>
                  <p className="text-teal-400 text-sm">{item.company} • {item.time}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
              <Brain className="w-6 h-6 text-teal-500" /> Education & Certs
            </h3>
            <ul className="space-y-6 text-zinc-400">
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">BS, Management Information Systems</p>
                  <p className="text-sm">CSU Sacramento</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">AA, Science & Mathematics / Economics</p>
                  <p className="text-sm">Santa Barbara City College</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" /> 
                <div>
                  <p className="text-white font-medium">NVIDIA Certified</p>
                  <p className="text-sm">Building RAG Agents with LLMs & Transformer-Based NLP</p>
                </div>
              </li>
              <li className="flex gap-3 items-start">
                <CheckCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" /> 
                <div>
                  <p className="text-white font-medium">CompTIA A+</p>
                </div>
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* 7. GITHUB */}
      <section className="py-16 px-6 bg-zinc-900/50 border-y border-zinc-800 text-center relative z-10">
        <FadeIn className="flex flex-col items-center">
          <Github className="w-10 h-10 text-white mb-4" />
          <h3 className="text-xl font-bold mb-2 text-white">Explore my code</h3>
          <a href="https://github.com/KyleBuildsAI" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 transition-colors mb-2">
            github.com/KyleBuildsAI
          </a>
          <GitHubRepoCount username="KyleBuildsAI" />
        </FadeIn>
      </section>

      {/* 8. CONTACT */}
      <section id="contact" className="py-24 px-6 max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <h2 className="text-4xl font-bold mb-6 text-white">Let's Talk</h2>
          <p className="text-lg text-zinc-400 mb-10 max-w-xl mx-auto">
            Whether you're exploring AI for your team or have a specific project in scope, let's connect.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild variant="outline" size="lg" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full">
              <a href="mailto:hello@kylecoleman.ai">
                <Mail className="w-4 h-4 mr-2" /> hello@kylecoleman.ai
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full">
              <a href="https://linkedin.com/in/kyledcoleman" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white rounded-full">
              <a href="https://github.com/KyleBuildsAI" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 mr-2" /> GitHub
              </a>
            </Button>
          </div>
        </FadeIn>
      </section>

      {/* 9. FOOTER */}
      <footer className="py-8 px-6 border-t border-zinc-900 text-center bg-[#0a0a0a] relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-4">
          <div className="flex justify-center gap-6">
            <a href="mailto:hello@kylecoleman.ai" className="text-zinc-600 hover:text-teal-400 transition-colors"><Mail className="w-5 h-5" /></a>
            <a href="https://linkedin.com/in/kyledcoleman" className="text-zinc-600 hover:text-teal-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="https://github.com/KyleBuildsAI" className="text-zinc-600 hover:text-teal-400 transition-colors"><Github className="w-5 h-5" /></a>
          </div>
          <p className="text-zinc-500 text-sm">© <CurrentYear /> Kyle Coleman</p>
        </div>
      </footer>
    </main>
  );
}