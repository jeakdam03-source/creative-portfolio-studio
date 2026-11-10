import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

import { WhatsAppButton } from "@/components/site/ContactButtons";
import { ProjectMedia } from "@/components/site/Frames";
import { Reveal } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Button } from "@/components/ui/button";
import { getProject, projects, type ProjectImage } from "@/content/projects";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { slug: project.slug };
  },
  head: ({ loaderData, params }) => {
    const project = loaderData ? getProject(loaderData.slug) : undefined;
    if (!project) {
      return seo({ title: "Project unavailable", description: "This project could not be found.", path: `/portfolio/${params.slug}`, noindex: true });
    }
    return seo({
      title: `${project.title} | ${project.category} Case Study`,
      description: project.summary,
      path: `/portfolio/${project.slug}`,
      type: "article",
    });
  },
  component: CaseStudyPage,
});

function Lightbox({ images, index, onClose, onIndex }: { images: ProjectImage[]; index: number; onClose: () => void; onIndex: (i: number) => void }) {
  const prev = useCallback(() => onIndex((index - 1 + images.length) % images.length), [index, images.length, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % images.length), [index, images.length, onIndex]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);
  const img = images[index];
  if (!img) return null;
  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={img.caption ?? img.alt}
      className="fixed inset-0 z-[60] flex flex-col bg-deep/95 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="flex items-center justify-between text-deep-foreground">
        <p className="text-sm">{img.caption ?? img.alt} <span className="text-deep-foreground/60">· {index + 1} / {images.length}</span></p>
        <button type="button" onClick={onClose} aria-label="Close gallery" className="grid size-11 place-items-center rounded-full bg-deep-foreground/10 hover:bg-deep-foreground/20" autoFocus>
          <X className="size-5" />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center py-4" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="max-h-full max-w-full rounded-xl object-contain shadow-lift"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25 }}
          />
        </AnimatePresence>
        {images.length > 1 && (
          <>
            <button type="button" onClick={prev} aria-label="Previous image" className="absolute left-0 grid size-12 place-items-center rounded-full bg-card text-deep shadow-lift hover:bg-ice">
              <ChevronLeft className="size-5" />
            </button>
            <button type="button" onClick={next} aria-label="Next image" className="absolute right-0 grid size-12 place-items-center rounded-full bg-card text-deep shadow-lift hover:bg-ice">
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>
    </motion.div>
  );
}

function CaseStudyPage() {
  const { slug } = Route.useLoaderData();
  const project = getProject(slug)!;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const allImages = [project.cover, ...project.gallery];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(idx + 1) % projects.length] ?? projects[0]!;
  const related = projects.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, 2);

  return (
    <article>
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="container-page relative pb-12 pt-10 lg:pt-16">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm font-medium text-slate/70 hover:text-deep">
            <ArrowLeft className="size-4" /> All projects
          </Link>
          <Reveal className="mt-8 max-w-3xl">
            <p className="eyebrow flex items-center gap-3">
              <span className="accent-rule" aria-hidden="true" />
              {project.category}
              {project.context && <span className="font-medium normal-case tracking-normal text-slate/60">· {project.context}</span>}
            </p>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold sm:text-5xl">{project.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-slate/80">{project.summary}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.liveUrl && (
                <Button asChild variant="brand" size="xl">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Visit live site <ArrowUpRight />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </Button>
              )}
              <WhatsAppButton
                variant={project.liveUrl ? "ghostline" : "brand"}
                label="Discuss a similar project"
                message={`Hi Oluwayemisi, I saw your "${project.title}" project and would like to discuss something similar.`}
              />
            </div>
          </Reveal>
        </div>
      </header>

      {/* Hero media */}
      <div className="container-page">
        <Reveal>
          <button type="button" onClick={() => setLightbox(0)} className="block w-full cursor-zoom-in text-left" aria-label={`Enlarge: ${project.cover.alt}`}>
            <ProjectMedia image={project.cover} priority />
          </button>
        </Reveal>
      </div>

      {/* Body */}
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1fr_320px] lg:gap-16 lg:py-24">
        <div className="min-w-0 space-y-14">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Project overview</h2>
            {project.overview.map((p, i) => (
              <p key={i} className="mt-4 leading-relaxed text-slate/85">{p}</p>
            ))}
          </Reveal>

          {project.challenge && project.challenge.length > 0 && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">The challenge</h2>
              {project.challenge.map((p, i) => (
                <p key={i} className="mt-4 leading-relaxed text-slate/85">{p}</p>
              ))}
            </Reveal>
          )}

          <Reveal>
            <h2 className="font-display text-2xl font-semibold">What the solution includes</h2>
            <ul className="mt-5 space-y-3">
              {project.solution.map((s) => (
                <li key={s} className="flex items-start gap-3 leading-relaxed text-slate/85">
                  <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-sky text-deep">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>

          {project.video && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">{project.video.title}</h2>
              <p className="mt-3 text-slate/75">{project.video.description}</p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-ice-soft shadow-frame">
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                  poster={project.video.poster}
                  className="block h-auto w-full"
                  aria-label={project.video.title}
                >
                  <source src={project.video.src} type="video/mp4" />
                  Your browser does not support embedded videos.
                </video>
              </div>
            </Reveal>
          )}

          {project.gallery.length > 0 && (
            <Reveal>
              <h2 className="font-display text-2xl font-semibold">Gallery</h2>
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                {project.gallery.map((img, i) => (
                  <figure key={img.src} className={img.kind === "mobile" ? "sm:row-span-2" : undefined}>
                    <button
                      type="button"
                      onClick={() => setLightbox(i + 1)}
                      className="group block w-full cursor-zoom-in overflow-hidden rounded-2xl text-left transition-transform duration-300 hover:-translate-y-1"
                      aria-label={`Enlarge: ${img.alt}`}
                    >
                      <ProjectMedia image={img} />
                    </button>
                    {img.caption && <figcaption className="mt-3 text-sm text-slate/65">{img.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Outcomes</h2>
            {project.outcomes.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-slate/85">
                {project.outcomes.map((o) => (
                  <li key={o}>{o}</li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 leading-relaxed text-slate/75">
                No performance figures have been published for this project, so none are shown here.
              </p>
            )}
          </Reveal>

          {project.note && (
            <p className="flex items-start gap-3 rounded-2xl border border-border bg-ice-soft p-4 text-sm leading-relaxed text-slate/75">
              <Info className="mt-0.5 size-4 shrink-0 text-deep" aria-hidden="true" />
              {project.note}
            </p>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
            <h2 className="eyebrow">Project details</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div>
                <dt className="text-slate/55">Category</dt>
                <dd className="mt-1 font-medium text-deep">{project.category}</dd>
              </div>
              {project.context && (
                <div>
                  <dt className="text-slate/55">Industry</dt>
                  <dd className="mt-1 font-medium text-deep">{project.context}</dd>
                </div>
              )}
              <div>
                <dt className="text-slate/55">Scope of work</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.scope.map((s) => (
                    <span key={s} className="rounded-full bg-ice px-3 py-1 text-xs font-medium text-deep">{s}</span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="text-slate/55">Capabilities</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {project.capabilities.map((s) => (
                    <span key={s} className="rounded-full border border-border px-3 py-1 text-xs font-medium text-slate/80">{s}</span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
          <div className="rounded-3xl bg-deep p-6 text-deep-foreground">
            <h2 className="font-display text-lg font-semibold text-deep-foreground">Want something similar?</h2>
            <p className="mt-2 text-sm text-deep-foreground/80">Tell me about your project and I'll reply personally.</p>
            <WhatsAppButton variant="sky" size="default" className="mt-5 h-11 w-full px-5" label="Let's Talk" message={`Hi Oluwayemisi, I saw your "${project.title}" project and would like to discuss something similar.`} />
          </div>
        </aside>
      </div>

      {/* Next / related */}
      <section className="border-t border-border bg-ice-soft py-20">
        <div className="container-page">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-2xl font-semibold">{related.length ? "More in " + project.category : "More projects"}</h2>
            <Link to="/portfolio/$slug" params={{ slug: nextProject.slug }} className="inline-flex items-center gap-2 text-sm font-semibold text-deep">
              Next project: {nextProject.title} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(related.length ? related : [nextProject]).map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {lightbox !== null && <Lightbox images={allImages} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />}
      </AnimatePresence>
    </article>
  );
}
