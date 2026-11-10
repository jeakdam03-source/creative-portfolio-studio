import { Link, type LinkProps } from "@tanstack/react-router";
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
      const href = match[3] ?? "";
      const label = match[2] ?? "";
      if (href.startsWith("/")) {
        nodes.push(
          <Link key={key++} to={href as LinkProps["to"]}>
            {label}
          </Link>,
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
