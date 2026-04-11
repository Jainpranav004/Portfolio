import { getAllPosts } from "@/lib/mdx";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollReveal } from "@/components/ScrollReveal";
import type { ProjectFrontmatter } from "@/lib/types";
import type { Metadata } from "next";

const PROJECTS_URL = "https://jainpranav.vercel.app/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Things I've built — from RAG-based AI systems to real-time gesture recognition and full-stack platforms.",
  alternates: {
    canonical: PROJECTS_URL,
  },
  openGraph: {
    title: "Projects | Pranav Jain",
    description:
      "A curated list of projects spanning AI/ML, full-stack development, and real-world problem solving.",
    url: PROJECTS_URL,
    siteName: "Pranav Jain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Pranav Jain",
    description:
      "Things I've built — from RAG-based AI systems to real-time gesture recognition and full-stack platforms.",
  },
};

export default function ProjectsPage() {
  const projects = getAllPosts() as unknown as ProjectFrontmatter[];

  return (
    <div className="pt-[70px]">
      <section className="py-[110px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-14">
          <ScrollReveal>
            <span className="font-mono text-[13px] text-peach tracking-[0.12em] block mb-4">
              {"// Work"}
            </span>
            <h1
              className="font-display font-extrabold text-text tracking-[-0.04em] leading-[0.9]"
              style={{ fontSize: "clamp(56px, 7vw, 96px)" }}
            >
              Projects
            </h1>
            <p className="font-display font-light italic text-peach text-[clamp(18px,2vw,26px)] mt-3 mb-4">
              Things I've shipped.
            </p>
            <p className="font-body text-[15px] font-light text-subtext0 leading-[1.85] max-w-[560px] mb-12">
              A selection of projects I've built, from AI-powered systems and
              full-stack platforms to ML-based accessibility tools. Each one
              pushed me to learn something new.
            </p>
          </ScrollReveal>

          <div
            className="grid grid-cols-1 md:grid-cols-2"
            style={{ gap: "2px", background: "var(--surface0)" }}
          >
            {projects.map((project, i) => {
              const isFeatured = i === 0 && project.featured;

              return (
                <ScrollReveal
                  key={project.slug}
                  delay={i * 0.08}
                  className={`h-full ${isFeatured ? "md:col-span-2" : ""}`}
                >
                  <ProjectCard project={project} index={i} featured={isFeatured} />
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
