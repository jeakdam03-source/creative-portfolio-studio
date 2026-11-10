import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Hero } from "@/components/site/Hero";
import { ExpertiseMarquee } from "@/components/site/Marquee";
import { Reveal, Stagger } from "@/components/site/motion";
import { ProjectCard } from "@/components/site/ProjectCard";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand, ProblemsSection, ProcessSection, TestimonialsSection } from "@/components/site/Sections";
import { ServiceCard } from "@/components/site/ServiceCard";
import { WorkflowDemo } from "@/components/site/WorkflowDemo";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { projects } from "@/content/projects";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/links";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => {
    const base = seo({
      title: `${site.name} | Website Designer & CRM Automation Specialist`,
      description:
        "Website designer and CRM & automation specialist building professional websites, sales funnels, CRM systems and workflow automation that help businesses capture leads and grow.",
      path: "/",
      type: "profile",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            jobTitle: site.title,
            email: `mailto:${site.email}`,
            ...(absoluteUrl("/") ? { url: absoluteUrl("/") } : {}),
            knowsAbout: [
              "Website Design",
              "Sales Funnels",
              "CRM Setup",
              "Workflow Automation",
              "AI Automation",
              "Business Automation",
            ],
          }),
        },
      ],
    };
  },
  component: Index,
});

const featuredSlugs = [
  "funding-credit-website-experience",
  "credit-funding-webinar-funnel",
  "ai-voice-agent-conversational-automation",
];

function Index() {
  const featured = featuredSlugs.map((s) => projects.find((p) => p.slug === s)!).filter(Boolean);
  return (
    <>
      <Hero />
      <ExpertiseMarquee />
      <ProblemsSection />

      {/* Services */}
      <section className="bg-ice-soft py-24 lg:py-32">
        <div className="container-page">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              eyebrow="Services"
              title="Websites and systems, designed to work together"
              intro="From your first impression online to what happens after someone gets in touch."
            />
            <Reveal>
              <Button asChild variant="ghostline" size="xl">
                <Link to="/services">
                  All services <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} service={s} index={i} />
            ))}
          </Stagger>
        </div>
      </section>

      {/* Workflow demo */}
      <section className="container-page py-24 lg:py-32">
        <SectionHeading
          align="center"
          eyebrow="See it in action"
          title="From First Click to Booked Appointment"
          intro="Here's how a connected website, CRM and automation can work together. Watch it play, or explore each step yourself."
        />
        <Reveal className="mt-14">
          <WorkflowDemo />
        </Reveal>
      </section>

      {/* Selected work */}
      <section className="container-page pb-24 lg:pb-32">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="Real projects across websites, funnels and automation"
          />
          <Reveal>
            <Button asChild variant="brand" size="xl">
              <Link to="/portfolio">
                Explore My Work <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <ProcessSection />
      <TestimonialsSection />
      <CtaBand />
    </>
  );
}
