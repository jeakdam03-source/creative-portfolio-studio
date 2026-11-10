import { useRouter } from "@tanstack/react-router";
import { Fragment, type MouseEvent, type ReactNode } from "react";

/** Internal link for content strings: real <a href> for crawlers, client-side navigation on click. */
function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  const router = useRouter();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    void router.navigate({ href });
  };
  return (
    <a href={href} onClick={onClick}>
      {children}
    </a>
  );
}

/**
 * Tiny inline formatter for content strings: supports **bold** and [text](/path or https://url).
 */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    if (match[1]) {
      nodes.push(<strong key={key++}>{match[1]}</strong>);
    } else {
      const href = match[3] ?? "";
      const label = match[2] ?? "";
      if (href.startsWith("/")) {
        nodes.push(
          <InternalLink key={key++} href={href}>
            {label}
          </InternalLink>,
        );
      } else {
        nodes.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {label}
          </a>,
        );
      }
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
