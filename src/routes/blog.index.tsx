import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Search } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { Reveal } from "@/components/site/motion";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand } from "@/components/site/Sections";
import { articles, blogCategories, formatDate, readingTime, type Article, type BlogCategory } from "@/content/blog";
import { cn } from "@/lib/utils";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: "Insights & Ideas | Website Design, CRM, Funnels & Automation Blog",
      description:
        "Practical insights on website design, CRM systems, sales funnels, and automation to help businesses make smarter digital decisions.",
      path: "/blog",
    }),
  component: BlogPage,
});

const PAGE_SIZE = 6;

function ArticleMeta({ article }: { article: Article }) {
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate/60">
      <time dateTime={article.date}>{formatDate(article.date)}</time>
      <span aria-hidden="true">•</span>
      <span className="inline-flex items-center gap-1">
        <Clock className="size-3.5" aria-hidden="true" /> {readingTime(article)} min read
      </span>
    </p>
  );
}

function ArticleCard({ article }: { article: Article }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="aspect-[16/9] overflow-hidden bg-ice-soft">
        <img
          src={article.image.src}
          alt={article.image.alt}
          width={article.image.width}
          height={article.image.height}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-ice px-3 py-1 text-xs font-semibold text-deep">{article.category}</span>
        <h3 className="mt-4 font-display text-xl font-semibold leading-snug">
          <Link to="/blog/$slug" params={{ slug: article.slug }} className="after:absolute after:inset-0 after:content-['']">
            {article.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-slate/75">{article.excerpt}</p>
        <div className="mt-5 flex items-center justify-between gap-3">
          <ArticleMeta article={article} />
          <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-deep">
            Read Article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function BlogPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<BlogCategory | "All">("All");
  const [page, setPage] = useState(1);

  const featured = articles.find((a) => a.featured) ?? articles[0];
  const filtering = query.trim() !== "" || category !== "All";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (!q) return true;
      const haystack = [a.title, a.excerpt, a.category, ...a.body.map((b) => ("text" in b ? b.text : b.items.join(" ")))]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [query, category]);

  const list = filtering || !featured ? results : results.filter((a) => a.slug !== featured.slug);
  const pages = Math.max(1, Math.ceil(list.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visible = list.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights & Ideas"
        intro="Practical insights on website design, CRM systems, sales funnels, and automation to help businesses make smarter digital decisions."
      />

      <section className="container-page pb-24">
        {/* Featured */}
        {!filtering && featured && (
          <Reveal>
            <article className="group relative grid overflow-hidden rounded-[2rem] border border-border bg-card shadow-soft transition-shadow hover:shadow-lift lg:grid-cols-[1.15fr_1fr]">
              <div className="aspect-[16/10] overflow-hidden bg-ice-soft lg:aspect-auto">
                <img
                  src={featured.image.src}
                  alt={featured.image.alt}
                  width={featured.image.width}
                  height={featured.image.height}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="eyebrow">Featured article</p>
                <span className="mt-4 w-fit rounded-full bg-ice px-3 py-1 text-xs font-semibold text-deep">{featured.category}</span>
                <h2 className="mt-4 text-balance font-display text-2xl font-semibold leading-snug sm:text-3xl">
                  <Link to="/blog/$slug" params={{ slug: featured.slug }} className="after:absolute after:inset-0 after:content-['']">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-3 leading-relaxed text-slate/75">{featured.excerpt}</p>
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                  <ArticleMeta article={featured} />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-deep px-5 py-2.5 text-sm font-semibold text-deep-foreground">
                    Read Article <ArrowRight className="size-4" />
                  </span>
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {/* Controls */}
        <div className="mt-14 flex flex-col-reverse gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap lg:overflow-visible" role="group" aria-label="Filter articles by category">
            {(["All", ...blogCategories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => {
                  setCategory(c);
                  setPage(1);
                }}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  category === c ? "border-deep bg-deep text-deep-foreground" : "border-border bg-ice text-deep hover:border-sky",
                )}
              >
                {c === "All" ? "All articles" : c}
              </button>
            ))}
          </div>
          <label className="relative block w-full shrink-0 lg:w-72">
            <span className="sr-only">Search articles</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate/50" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles…"
              className="h-12 w-full rounded-full border border-border bg-ice pl-11 pr-4 text-sm text-deep outline-none transition-colors placeholder:text-slate/45 focus:border-sky"
            />
          </label>
        </div>

        <p className="mt-6 text-sm text-slate/60" aria-live="polite">
          {filtering ? `${results.length} ${results.length === 1 ? "article" : "articles"} found` : "More articles"}
        </p>

        {visible.length > 0 ? (
          <motion.div layout className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="mt-6 rounded-3xl border border-dashed border-border bg-ice-soft p-12 text-center">
            <p className="font-display text-lg font-semibold text-deep">No articles match your search</p>
            <p className="mt-2 text-sm text-slate/70">Try a different word or category.</p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-5 rounded-full border border-deep/20 px-5 py-2 text-sm font-medium text-deep hover:bg-card"
            >
              Clear filters
            </button>
          </div>
        )}

        {pages > 1 && (
          <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setPage(i + 1)}
                aria-current={current === i + 1 ? "page" : undefined}
                className={cn(
                  "grid size-10 place-items-center rounded-full border text-sm font-medium",
                  current === i + 1 ? "border-deep bg-deep text-deep-foreground" : "border-border text-deep hover:border-sky",
                )}
              >
                {i + 1}
              </button>
            ))}
          </nav>
        )}
      </section>

      <CtaBand />
    </>
  );
}
