import { Link } from "@tanstack/react-router";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import { motion } from "motion/react";

import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

export function ProjectCard({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ice-soft">
        <img
          src={project.cover.src}
          alt={project.cover.alt}
          width={project.cover.width}
          height={project.cover.height}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-deep/35 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-background/95 px-3 py-1 text-xs font-semibold text-deep shadow-soft">
          {project.category}
        </span>
        {project.video && (
          <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-deep px-2.5 py-1 text-xs font-medium text-deep-foreground">
            <PlayCircle className="size-3.5" /> Video
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        {project.context && <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate/60">{project.context}</p>}
        <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
          <Link
            to="/portfolio/$slug"
            params={{ slug: project.slug }}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate/75">{project.summary}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-deep">
            View Case Study
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 text-xs font-medium text-slate/70 underline decoration-sky decoration-2 underline-offset-4 hover:text-deep"
            >
              Live site<span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
