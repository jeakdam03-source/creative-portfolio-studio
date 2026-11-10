import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarX,
  Hourglass,
  MessageSquareOff,
  MonitorX,
  Puzzle,
  Repeat,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { testimonials } from "@/content/testimonials";
import { BookingButton, WhatsAppButton } from "./ContactButtons";
import { Stars } from "./icons";
import { Reveal, Stagger, staggerChild } from "./motion";
import { SectionHeading } from "./SectionHeading";

/* ---------------- Problems & solutions ---------------- */

const problems = [
  { icon: MonitorX, title: "Outdated or poorly designed websites", text: "Visitors leave before they understand what you offer." },
  { icon: Hourglass, title: "Leads getting lost", text: "Inquiries sit in inboxes and go cold before anyone replies." },
  { icon: Repeat, title: "Manual follow-up", text: "Every reminder and check-in depends on someone remembering." },
  { icon: Users, title: "Disorganised customer information", text: "Details are scattered across notes, spreadsheets and phones." },
  { icon: CalendarX, title: "Complicated scheduling", text: "Back-and-forth messages just to agree on a time." },
  { icon: Puzzle, title: "Disconnected tools", text: "Information is copied by hand from one system to another." },
  { icon: MessageSquareOff, title: "Inefficient communication", text: "Customers wait, repeat themselves or hear nothing at all." },
];

export function ProblemsSection() {
  return (
    <section className="container-page py-24 lg:py-32">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="Why it matters"
            title="Great Digital Experiences. Smarter Business Systems."
            intro={
              <>
                <p>
                  An attractive online presence is important, but it's only half the picture. Behind every good website
                  there should be systems that capture leads, follow up on time and keep customer information organised.
                </p>
                <p className="mt-4">
                  Thoughtful website design, CRM systems, sales funnels and automation work together to close the gaps
                  where time, leads and opportunities slip away.
                </p>
              </>
            }
          />
          <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="brand" size="xl">
              <Link to="/services">
                See how I help <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
        <Stagger className="grid gap-4 sm:grid-cols-2">
          {problems.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                variants={staggerChild}
                className={
                  "group rounded-3xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sky/60 hover:shadow-soft" +
                  (i === problems.length - 1 ? " sm:col-span-2" : "")
                }
              >
                <span className="grid size-11 place-items-center rounded-xl bg-ice text-deep">
                  <Icon className="size-5" strokeWidth={1.7} />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate/70">{p.text}</p>
              </motion.div>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

/* ---------------- Process ---------------- */

export const processSteps = [
  { n: "01", title: "Discover", text: "Understand the business, its goals, customers, and existing challenges." },
  { n: "02", title: "Plan", text: "Develop a clear strategy for the website, funnel, CRM, or automation system." },
  { n: "03", title: "Build", text: "Design and implement the agreed digital solution." },
  { n: "04", title: "Test", text: "Review functionality, user experience, workflow logic, and responsiveness." },
  { n: "05", title: "Launch", text: "Prepare the completed solution for use and provide a clear handover." },
];

export function ProcessSection() {
  return (
    <section className="bg-ice-soft py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          align="center"
          eyebrow="Working process"
          title="How I Bring Your Ideas to Life"
          intro="A clear, collaborative process, so you always know what's happening and what comes next."
        />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-sky to-transparent lg:block" aria-hidden="true" />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {processSteps.map((s) => (
              <motion.div key={s.n} variants={staggerChild} className="group relative">
                <span className="relative z-10 mx-auto grid size-14 place-items-center rounded-full border-2 border-sky bg-card font-display text-lg font-semibold text-deep transition-colors duration-300 group-hover:bg-deep group-hover:text-deep-foreground lg:mx-0">
                  {s.n}
                </span>
                <div className="mt-5 rounded-3xl border border-border bg-card p-6 text-center shadow-soft transition-transform duration-300 group-hover:-translate-y-1 lg:text-left">
                  <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate/75">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Testimonials ---------------- */

export function TestimonialsSection() {
  if (!site.showTestimonials || testimonials.length === 0) return null;
  const hasSamples = testimonials.some((t) => t.sample);
  return (
    <section className="container-page py-24 lg:py-32" aria-labelledby="testimonials-heading">
      <div className="text-center">
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title={<span id="testimonials-heading">Kind Words From Clients</span>}
          intro="Thoughtful work, clear communication, and digital solutions built with care."
        />
        {hasSamples && (
          <Reveal className="mx-auto mt-6 inline-flex max-w-xl items-center gap-2 rounded-full border border-star/60 bg-star/10 px-4 py-2 text-xs font-medium text-slate">
            Design preview: these are sample reviews, not feedback from real clients.
          </Reveal>
        )}
      </div>
      <Stagger className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.figure
            key={i}
            variants={staggerChild}
            className="group relative flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
          >
            <span aria-hidden="true" className="absolute right-6 top-2 font-display text-8xl leading-none text-ice">
              “
            </span>
            <Stars className="relative flex gap-1" />
            <blockquote className="relative mt-5 flex-1 text-[0.98rem] leading-relaxed text-slate/85">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-border pt-4 text-sm">
              {t.author && <span className="block font-semibold text-deep">{t.author}</span>}
              {t.role && <span className="block text-slate/60">{t.role}</span>}
              <span className="font-medium text-deep">{t.service}</span>
              {t.sample && <span className="text-slate/60">, Sample Review</span>}
            </figcaption>
          </motion.figure>
        ))}
      </Stagger>
    </section>
  );
}

/* ---------------- Closing CTA ---------------- */

export function CtaBand({
  title = "Ready to build something that works for your business?",
  text = "Tell me about your website, funnel, CRM or automation project, I'll reply personally.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="container-page pb-24 lg:pb-32">
      <Reveal className="relative overflow-hidden rounded-[2.25rem] bg-deep px-6 py-14 text-center sm:px-12 lg:py-20">
        <svg aria-hidden="true" viewBox="0 0 800 300" className="pointer-events-none absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
          <path d="M0 220 C 200 140 380 300 800 160" stroke="var(--color-sky)" strokeWidth="2" fill="none" />
          <path d="M0 260 C 260 180 420 320 800 210" stroke="var(--color-sky)" strokeWidth="1" fill="none" />
        </svg>
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-balance font-display text-3xl font-semibold text-deep-foreground sm:text-4xl">{title}</h2>
          <p className="mt-4 text-deep-foreground/80">{text}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WhatsAppButton variant="sky" />
            <Button asChild variant="onDeep" size="xl">
              <Link to="/contact">Send a project inquiry</Link>
            </Button>
            <BookingButton variant="onDeep" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
