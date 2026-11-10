import { Link } from "@tanstack/react-router";

import { site } from "@/config/site";
import { cn } from "@/lib/utils";

export const LOGO_SRC = "/images/brand/ajayi-oluwayemisi-logo.png";

/** Approved A monogram (from the brand guide). Never recolour, stretch or redraw. */
export function LogoMark({ className }: { className?: string | undefined }) {
  return (
    <img
      src={LOGO_SRC}
      alt=""
      aria-hidden="true"
      width={400}
      height={395}
      className={cn("h-9 w-auto select-none", className)}
      draggable={false}
    />
  );
}

export function Logo({ className, tone = "default" }: { className?: string; tone?: "default" | "onDeep" }) {
  return (
    <Link
      to="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
      aria-label={`${site.name} home page`}
    >
      <span
        className={cn(
          "grid place-items-center rounded-xl transition-transform duration-300 group-hover:-rotate-3",
          "bg-card p-1",
        )}
      >
        <LogoMark className="h-8" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.02rem] font-semibold tracking-tight",
            tone === "onDeep" ? "text-foreground" : "text-deep",
          )}
        >
          {site.name}
        </span>
      </span>
    </Link>
  );
}
