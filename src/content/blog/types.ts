export const blogCategories = [
  "Website Design",
  "CRM & Automation",
  "Sales Funnels",
  "Business Growth",
  "AI & Digital Solutions",
] as const;

export type BlogCategory = (typeof blogCategories)[number];

/**
 * Article body blocks. Paragraph and list text supports **bold** and
 * [link text](/path) inline formatting.
 */
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; text: string };

export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  /** ISO date, e.g. "2026-11-10" */
  date: string;
  author: string;
  image: { src: string; alt: string; width: number; height: number };
  featured?: boolean;
  body: Block[];
};
