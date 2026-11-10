import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "./motion";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
};

export function SectionHeading({ eyebrow, title, intro, align = "left", className, as = "h2" }: Props) {
  const H = as;
  return (
    <Reveal className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className={cn("eyebrow flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="accent-rule" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <H
        className={cn(
          "mt-4 text-balance font-display font-semibold",
          as === "h1" ? "text-4xl sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]" : "text-3xl sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]",
        )}
      >
        {title}
      </H>
      {intro && <div className="mt-5 text-base leading-relaxed text-slate/80 sm:text-lg">{intro}</div>}
    </Reveal>
  );
}
