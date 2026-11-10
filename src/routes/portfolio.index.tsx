import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";

import { PageHero } from "@/components/site/PageHero";
import { ProjectCard } from "@/components/site/ProjectCard";
import { CtaBand } from "@/components/site/Sections";
import { categories, projects, type Category } from "@/content/projects";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/portfolio/")({
  head: () =>
    seo({
      title: "Portfolio | Websites, Sales Funnels, CRM & Automation Projects",
      description:
        "Selected website design, sales funnel, CRM automation, AI automation and integration projects by Ajayi Oluwayemisi.",
      path: "/portfolio",
    }),
  component: PortfolioPage,
});

type Filter = "All Projects" | Category;

function PortfolioPage() {
  const [filter, setFilter] = useState<Filter>("All Projects");
  const filters: Filter[] = ["All Projects", ...categories];
  const visible = useMemo(
    () => (filter === "All Projects" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work I've been part of"
        intro="Websites, funnels and the systems behind them. Each case study describes what the project includes, using real screenshots and recordings."
      />

      <section className="container-page pb-24" aria-label="Projects">
        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects by category" className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-2">
            {filters.map((f) => {
              const count = f === "All Projects" ? projects.length : projects.filter((p) => p.category === f).length;
              const active = f === filter;
              return (
                <button
                  key={f}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative shrink-0 rounded-full border px-4 py-2.5 text-sm font-medium transition-colors",
                    active ? "border-deep text-deep-foreground" : "border-border bg-ice text-deep hover:border-sky",
                  )}
                >
                  {active && (
                    <motion.span layoutId="filter-pill" className="absolute inset-0 -z-10 rounded-full bg-deep" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                  )}
                  <span className="relative">
                    {f} <span className={cn("ml-1 text-xs", active ? "text-deep-foreground/60" : "text-slate/60")}>{count}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard key={p.slug} project={p} priority={i < 3} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>

      <CtaBand title="Have a similar project in mind?" />
    </>
  );
}
