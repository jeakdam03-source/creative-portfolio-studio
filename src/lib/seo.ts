import { site } from "@/config/site";
import { absoluteUrl } from "@/lib/links";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  /** Absolute https image URL only. Relative images are skipped. */
  image?: string;
  noindex?: boolean;
};

/** Builds route head() metadata: title, description, Open Graph, Twitter and canonical. */
export function seo({ title, description, path, type = "website", image, noindex }: SeoInput) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  const canonical = absoluteUrl(path);
  const meta: Array<Record<string, string>> = [
    { title: fullTitle },
    { name: "description", content: description },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: description },
    { property: "og:type", content: type },
    { property: "og:site_name", content: site.name },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: description },
  ];
  if (canonical) meta.push({ property: "og:url", content: canonical });
  if (image && /^https:\/\//.test(image)) {
    meta.push({ property: "og:image", content: image }, { name: "twitter:image", content: image });
  }
  if (noindex) meta.push({ name: "robots", content: "noindex" });
  const links = canonical ? [{ rel: "canonical", href: canonical }] : [];
  return { meta, links };
}
