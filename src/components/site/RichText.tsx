import { Link } from "@tanstack/react-router";
import { Fragment, type ReactNode } from "react";

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
      const href = match[3];
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key++} to={href}>
            {match[2]}
          </Link>,
        );
      } else {
        nodes.push(
          <a key={key++} href={href} target="_blank" rel="noopener noreferrer">
            {match[2]}
          </a>,
        );
      }
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
