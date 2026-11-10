import { Sparkle } from "lucide-react";

import { expertise } from "@/content/services";

/** Moving expertise strip. Lists capabilities only — never software brands. */
export function ExpertiseMarquee() {
  const items = [...expertise, ...expertise];
  return (
    <section aria-label="Areas of expertise" className="relative overflow-hidden border-y border-border bg-ice-soft py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ice-soft to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ice-soft to-transparent" />
      <ul className="flex w-max animate-marquee items-center gap-8 motion-reduce:animate-none hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <li
            key={`${item}-${i}`}
            aria-hidden={i >= expertise.length}
            className="flex items-center gap-8 whitespace-nowrap font-display text-base font-medium text-deep sm:text-lg"
          >
            {item}
            <Sparkle className="size-4 fill-sky text-sky" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}
