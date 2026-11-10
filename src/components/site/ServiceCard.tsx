import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

import type { Service } from "@/content/services";
import { staggerChild } from "./motion";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <motion.article
      variants={staggerChild}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow duration-500 hover:border-sky/60 hover:shadow-lift"
    >
      <span
        aria-hidden="true"
        className="absolute -right-10 -top-10 size-32 rounded-full bg-ice opacity-0 transition-all duration-500 group-hover:scale-125 group-hover:opacity-100"
      />
      <div className="relative flex items-start justify-between">
        <span className="grid size-12 place-items-center rounded-2xl bg-ice text-deep transition-colors duration-300 group-hover:bg-deep group-hover:text-deep-foreground">
          <Icon className="size-6" strokeWidth={1.6} />
        </span>
        <span className="font-display text-sm font-medium text-slate/40">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <h3 className="relative mt-6 font-display text-xl font-semibold leading-snug">{service.title}</h3>
      <p className="relative mt-3 flex-1 text-[0.95rem] leading-relaxed text-slate/75">{service.description}</p>
      <Link
        to="/services"
        hash={service.slug}
        className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-deep"
      >
        Learn More
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        <span className="sr-only"> about {service.title}</span>
      </Link>
    </motion.article>
  );
}
