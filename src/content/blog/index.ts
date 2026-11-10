import { crmAutomationStopLosingLeads } from "./crm-automation-stop-losing-leads";
import { moreThanABeautifulWebsite } from "./more-than-a-beautiful-website";
import type { Article, Block } from "./types";
import { websiteVsSalesFunnel } from "./website-vs-sales-funnel";

export * from "./types";

/** Add new articles to this list (newest first is not required — sorting is automatic). */
const allArticles: Article[] = [moreThanABeautifulWebsite, crmAutomationStopLosingLeads, websiteVsSalesFunnel];

export const articles = [...allArticles].sort((a, b) => b.date.localeCompare(a.date));

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

function blockText(block: Block): string {
  switch (block.type) {
    case "ul":
      return block.items.join(" ");
    default:
      return block.text;
  }
}

export function wordCount(article: Article) {
  return article.body
    .map(blockText)
    .join(" ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .split(/\s+/)
    .filter(Boolean).length;
}

/** Reading time in minutes at ~220 words per minute (minimum 1). */
export function readingTime(article: Article) {
  return Math.max(1, Math.round(wordCount(article) / 220));
}

export function tableOfContents(article: Article) {
  return article.body.filter((b): b is Extract<Block, { type: "h2" }> => b.type === "h2");
}

export function relatedArticles(article: Article, limit = 2) {
  const others = articles.filter((a) => a.slug !== article.slug);
  return [
    ...others.filter((a) => a.category === article.category),
    ...others.filter((a) => a.category !== article.category),
  ].slice(0, limit);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
