import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock, Link2, Mail } from "lucide-react";
import { motion, useScroll, useSpring } from "motion/react";
import { useState } from "react";

import { WhatsAppButton } from "@/components/site/ContactButtons";
import { WhatsAppIcon } from "@/components/site/icons";
import { LogoMark } from "@/components/site/Logo";
import { Reveal } from "@/components/site/motion";
import { RichText } from "@/components/site/RichText";
import { formatDate, getArticle, readingTime, relatedArticles, tableOfContents, type Block } from "@/content/blog";
import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/links";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { slug: article.slug };
  },
  head: ({ loaderData, params }) => {
    const article = loaderData ? getArticle(loaderData.slug) : undefined;
    if (!article) {
      return seo({ title: "Article unavailable", description: "This article could not be found.", path: `/blog/${params.slug}`, noindex: true });
    }
    const base = seo({
      title: article.title,
      description: article.excerpt,
      path: `/blog/${article.slug}`,
      type: "article",
    });
    const url = absoluteUrl(`/blog/${article.slug}`);
    return {
      ...base,
      meta: [
        ...base.meta,
        { property: "article:published_time", content: article.date },
        { property: "article:section", content: article.category },
        { name: "author", content: article.author },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.excerpt,
            datePublished: article.date,
            author: { "@type": "Person", name: article.author },
            articleSection: article.category,
            ...(url ? { url, mainEntityOfPage: url } : {}),
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} id={block.id}>
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside key={i} className="my-8 rounded-2xl border-l-4 border-sky bg-ice-soft p-5 text-[0.98rem]">
          <RichText text={block.text} />
        </aside>
      );
    default:
      return (
        <p key={i}>
          <RichText text={block.text} />
        </p>
      );
  }
}

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const share = (kind: "linkedin" | "x" | "whatsapp" | "email" | "copy") => {
    const url = window.location.href;
    const text = encodeURIComponent(title);
    const u = encodeURIComponent(url);
    const targets = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      x: `https://twitter.com/intent/tweet?text=${text}&url=${u}`,
      whatsapp: `https://wa.me/?text=${text}%20${u}`,
      email: `mailto:?subject=${text}&body=${u}`,
    };
    if (kind === "copy") {
      navigator.clipboard?.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
      return;
    }
    window.open(targets[kind], "_blank", "noopener,noreferrer");
  };
  const btn = "inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-deep transition-colors hover:border-sky hover:bg-ice-soft";
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this article">
      <span className="mr-1 text-sm font-semibold text-deep">Share:</span>
      <button type="button" className={btn} onClick={() => share("linkedin")}>LinkedIn</button>
      <button type="button" className={btn} onClick={() => share("x")}>X</button>
      <button type="button" className={btn} onClick={() => share("whatsapp")}>
        <WhatsAppIcon className="size-4" /> WhatsApp
      </button>
      <button type="button" className={btn} onClick={() => share("email")}>
        <Mail className="size-4" /> Email
      </button>
      <button type="button" className={btn} onClick={() => share("copy")} aria-live="polite">
        {copied ? <Check className="size-4" /> : <Link2 className="size-4" />} {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}

function ArticlePage() {
  const { slug } = Route.useLoaderData();
  const article = getArticle(slug)!;
  const toc = tableOfContents(article);
  const related = relatedArticles(article);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <article>
      <motion.div style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[55] h-1 origin-left bg-sky" aria-hidden="true" />

      <header className="container-page pb-10 pt-10 lg:pt-16">
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-slate/70 hover:text-deep">
          <ArrowLeft className="size-4" /> All articles
        </Link>
        <Reveal className="mx-auto mt-8 max-w-3xl text-center">
          <span className="rounded-full bg-ice px-3 py-1 text-xs font-semibold text-deep">{article.category}</span>
          <h1 className="mt-5 text-balance font-display text-3xl font-semibold leading-tight sm:text-5xl">{article.title}</h1>
          <p className="mt-5 text-lg text-slate/75">{article.excerpt}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-slate/65">
            <span className="inline-flex items-center gap-2 font-medium text-deep">
              <LogoMark className="h-6" /> {article.author}
            </span>
            <time dateTime={article.date}>{formatDate(article.date)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="size-4" aria-hidden="true" /> {readingTime(article)} min read
            </span>
          </div>
        </Reveal>
      </header>

      <div className="container-page">
        <Reveal>
          <img
            src={article.image.src}
            alt={article.image.alt}
            width={article.image.width}
            height={article.image.height}
            className="mx-auto aspect-[16/8] w-full max-w-5xl rounded-[2rem] border border-border object-cover shadow-frame"
          />
        </Reveal>
      </div>

      <div className="container-page grid gap-12 py-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[240px_minmax(0,720px)] xl:justify-center">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <nav aria-label="Table of contents" className="rounded-3xl border border-border bg-ice-soft p-5">
            <p className="eyebrow">In this article</p>
            <ol className="mt-4 space-y-2.5 text-sm">
              {toc.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-slate/75 hover:text-deep">
                    {h.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="prose-article">{article.body.map(renderBlock)}</div>

          <div className="mt-12 border-t border-border pt-8">
            <ShareBar title={article.title} />
          </div>

          <div className="mt-10 rounded-3xl bg-deep p-7 text-deep-foreground sm:p-9">
            <h2 className="font-display text-2xl font-semibold text-deep-foreground">Want help putting this into practice?</h2>
            <p className="mt-3 text-deep-foreground/80">
              I help businesses with websites, sales funnels, CRM systems and automation. Tell me what you're working on.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <WhatsAppButton variant="sky" message={`Hi Oluwayemisi, I read "${article.title}" and would like to discuss a project.`} />
              <Link to="/contact" className="inline-flex h-12 items-center rounded-full bg-background px-6 font-semibold text-deep hover:bg-ice">
                Send an inquiry
              </Link>
            </div>
          </div>

          <p className="mt-8 text-sm text-slate/60">
            Written by {article.author}, {site.title}.
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-ice-soft py-20">
          <div className="container-page">
            <h2 className="font-display text-2xl font-semibold">Related articles</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group flex flex-col gap-5 overflow-hidden rounded-3xl border border-border bg-background p-4 shadow-soft transition-shadow hover:shadow-lift sm:flex-row sm:items-center"
                >
                  <img src={r.image.src} alt="" width={r.image.width} height={r.image.height} loading="lazy" className="aspect-[16/10] w-full rounded-2xl object-cover sm:w-48" />
                  <div className="p-2">
                    <span className="text-xs font-semibold text-slate/60">{r.category}</span>
                    <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{r.title}</h3>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-deep">
                      Read Article <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
