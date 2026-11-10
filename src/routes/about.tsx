import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HeartHandshake, Lightbulb, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

import { WhatsAppButton } from "@/components/site/ContactButtons";
import { PORTRAIT_SRC } from "@/components/site/Hero";
import { Reveal, Stagger, staggerChild } from "@/components/site/motion";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CtaBand, ProcessSection } from "@/components/site/Sections";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Ajayi Oluwayemisi — Website Designer & CRM Specialist",
      description:
        "Meet Ajayi Oluwayemisi, a website designer and CRM & automation specialist who turns complicated processes into clear, useful digital solutions.",
      path: "/about",
      type: "profile",
    }),
  component: AboutPage,
});

const values = [
  { icon: Lightbulb, title: "Clarity first", text: "Plain language, clear plans and solutions that are easy to use and manage." },
  { icon: HeartHandshake, title: "Built around you", text: "Every website and system is shaped around how your business actually works." },
  { icon: ShieldCheck, title: "Care in the details", text: "Thorough testing and attention to the small things that make a big difference." },
  { icon: MessageCircle, title: "Honest communication", text: "Regular updates, realistic expectations and a clear handover at the end." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" aria-hidden="true" />
        <div className="container-page relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1fr_1.1fr] lg:pt-20">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2.5rem] bg-ice" aria-hidden="true" />
            <div className="relative rounded-[2.5rem] border border-border bg-background p-6 shadow-lift">
              <img
                src={PORTRAIT_SRC}
                alt="Portrait of Ajayi Oluwayemisi"
                width={960}
                height={960}
                className="aspect-square w-full rounded-full object-cover"
              />
              <div className="mt-5 text-center">
                <p className="font-display text-lg font-semibold text-deep">Ajayi Oluwayemisi</p>
                <p className="text-sm text-slate/70">Website Designer | CRM & Automation Specialist</p>
              </div>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              as="h1"
              eyebrow="About"
              title="A Little About Me"
              intro={
                <p>
                  I'm Ajayi Oluwayemisi, a Website Designer and CRM & Automation Specialist focused on helping businesses
                  create effective digital experiences and smarter systems.
                </p>
              }
            />
            <Reveal delay={0.1} className="mt-5 space-y-4 leading-relaxed text-slate/80">
              <p>
                My work brings together website design, customer relationship management, sales funnels, and automation. I
                enjoy transforming complicated processes into clear, useful digital solutions that help businesses connect
                with customers and manage their operations more efficiently.
              </p>
              <p>
                Whether it's designing a professional website, building a sales funnel, organizing a CRM, or creating an
                automated workflow, my focus is on delivering solutions that are practical, thoughtful, and tailored to the
                needs of each business.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <WhatsAppButton />
              <Button asChild variant="ghostline" size="xl">
                <Link to="/portfolio">
                  See my work <ArrowRight />
                </Link>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ice-soft py-24">
        <div className="container-page">
          <SectionHeading eyebrow="Areas of expertise" title="What I work on" />
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.slug} variants={staggerChild} className="flex items-start gap-4 rounded-3xl border border-border bg-background p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-ice text-deep">
                    <Icon className="size-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-slate/70">{s.deliverables.slice(0, 3).join(" · ")}</p>
                  </div>
                </motion.div>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="container-page py-24">
        <SectionHeading eyebrow="Core values" title="How I like to work" />
        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <motion.div key={v.title} variants={staggerChild} className="rounded-3xl border border-border bg-card p-7 shadow-soft transition-transform duration-300 hover:-translate-y-1">
                <Icon className="size-7 text-sky-strong" strokeWidth={1.6} />
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate/75">{v.text}</p>
              </motion.div>
            );
          })}
        </Stagger>
      </section>

      <ProcessSection />
      <div className="pt-24 lg:pt-32">
        <CtaBand title="Let's work on your next project together" />
      </div>
    </>
  );
}
