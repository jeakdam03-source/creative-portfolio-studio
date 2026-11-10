import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";

import { WhatsAppButton } from "@/components/site/ContactButtons";
import { Reveal } from "@/components/site/motion";
import { PageHero } from "@/components/site/PageHero";
import { CtaBand, ProcessSection } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () =>
    seo({
      title: "Services | Website Design, Sales Funnels, CRM & Automation",
      description:
        "Website design and development, sales funnels and landing pages, CRM setup, workflow and marketing automation, AI automation and CRM integrations for growing businesses.",
      path: "/services",
    }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Digital solutions that look good and work hard"
        intro="I help businesses build a strong online presence and the systems behind it, so leads are captured, followed up and looked after. Every solution is tailored to the tools and needs of your business."
      >
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-deep transition-colors hover:border-sky hover:bg-ice-soft"
            >
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      <div className="container-page space-y-6 pb-24">
        {services.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.slug}>
              <section
                id={s.slug}
                aria-labelledby={`${s.slug}-title`}
                className="scroll-mt-28 grid gap-10 rounded-[2rem] border border-border bg-card p-7 shadow-soft sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:p-12"
              >
                <div>
                  <div className="flex items-center gap-4">
                    <span className="grid size-14 place-items-center rounded-2xl bg-deep text-deep-foreground">
                      <Icon className="size-7" strokeWidth={1.6} />
                    </span>
                    <span className="font-display text-sm font-medium text-slate/40">{String(i + 1).padStart(2, "0")} / 06</span>
                  </div>
                  <h2 id={`${s.slug}-title`} className="mt-6 font-display text-3xl font-semibold">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-lg leading-relaxed text-slate/85">{s.description}</p>
                  {s.detail.map((d, j) => (
                    <p key={j} className="mt-4 leading-relaxed text-slate/75">
                      {d}
                    </p>
                  ))}
                  <div className="mt-8 flex flex-wrap gap-3">
                    <WhatsAppButton
                      label="Discuss This Service"
                      message={`Hi Oluwayemisi, I came across your portfolio and would like to discuss ${s.title}.`}
                    />
                    {s.portfolioCategory && (
                      <Button asChild variant="ghostline" size="xl">
                        <Link to="/portfolio">
                          View related work <ArrowRight />
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
                <div className="rounded-3xl bg-ice-soft p-7">
                  <h3 className="eyebrow">What this can include</h3>
                  <ul className="mt-5 space-y-3">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-3 text-slate/85">
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky text-deep">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Reveal>
          );
        })}
      </div>

      <ProcessSection />
      <div className="pt-24 lg:pt-32">
        <CtaBand title="Not sure which service you need?" text="Tell me about your business and goals. I'll help you work out the right starting point." />
      </div>
    </>
  );
}
