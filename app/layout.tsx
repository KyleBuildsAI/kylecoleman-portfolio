import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Kyle Coleman | AI Solutions Architect",
  description: "I design and deploy AI systems that actually work at scale. Specializing in multi-agent orchestration, agentic workflows, and production-grade LLM pipelines.",
  icons: {
    icon: "/favicon.ico", // Add a "KC" favicon to the public folder
  },
  openGraph: {
    title: "Kyle Coleman | AI Solutions Architect",
    description: "I design and deploy AI systems that actually work at scale.",
    url: "https://kylecoleman.ai",
    siteName: "Kyle Coleman Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${inter.variable} font-sans bg-[#0a0a0a] text-zinc-100 antialiased selection:bg-teal-500/30`}>
        {children}
      </body>
    </html>
  );
}