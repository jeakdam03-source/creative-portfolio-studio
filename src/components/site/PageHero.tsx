import type { ReactNode } from "react";

import { SectionHeading } from "./SectionHeading";

/** Consistent intro block for inner pages. */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: ReactNode; intro?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-ice blur-3xl" aria-hidden="true" />
      <div className="container-page relative pb-14 pt-16 lg:pb-20 lg:pt-24">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} intro={intro} className="max-w-3xl" />
        {children}
      </div>
    </section>
  );
}
