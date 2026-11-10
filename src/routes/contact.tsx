import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Mail } from "lucide-react";
import { motion } from "motion/react";

import { WhatsAppIcon } from "@/components/site/icons";
import { InquiryForm } from "@/components/site/InquiryForm";
import { Reveal, Stagger, staggerChild } from "@/components/site/motion";
import { PageHero } from "@/components/site/PageHero";
import { site } from "@/config/site";
import { getBookingUrl, mailtoLink, whatsappLink } from "@/lib/links";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact — Start Your Website, Funnel or Automation Project",
      description:
        "Have a website, CRM, funnel, or automation project in mind? Message Ajayi Oluwayemisi on WhatsApp, send an email, or submit a project inquiry.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const bookingUrl = getBookingUrl();
  const methods = [
    {
      key: "whatsapp",
      icon: WhatsAppIcon,
      title: "WhatsApp",
      text: "The quickest way to reach me. Tap to start a chat.",
      value: site.whatsapp.display,
      href: whatsappLink(),
      external: true,
      primary: true,
    },
    {
      key: "email",
      icon: Mail,
      title: "Email",
      text: "Prefer email? Send me the details of your project.",
      value: site.email,
      href: mailtoLink(),
      external: false,
      primary: false,
    },
    ...(bookingUrl
      ? [
          {
            key: "booking",
            icon: CalendarDays,
            title: "Book a consultation",
            text: "Pick a time that suits you for a short call.",
            value: "Open booking calendar",
            href: bookingUrl,
            external: true,
            primary: false,
          },
        ]
      : []),
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Build Something That Works for Your Business."
        intro="Have a website, CRM, funnel, or automation project in mind? Tell me what you're working on, and let's explore how to bring it to life."
      />

      <section className="container-page pb-24">
        <Stagger className={`grid gap-5 ${methods.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {methods.map((m) => {
            const Icon = m.icon;
            return (
              <motion.a
                key={m.key}
                variants={staggerChild}
                href={m.href}
                {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={
                  "group relative flex flex-col rounded-3xl border p-7 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift " +
                  (m.primary ? "border-deep bg-deep text-deep-foreground" : "border-border bg-card")
                }
              >
                <span className={"grid size-12 place-items-center rounded-2xl " + (m.primary ? "bg-whatsapp text-whatsapp-foreground" : "bg-ice text-deep")}>
                  <Icon className="size-6" />
                </span>
                <h2 className={"mt-6 font-display text-xl font-semibold " + (m.primary ? "text-deep-foreground" : "")}>{m.title}</h2>
                <p className={"mt-2 text-sm " + (m.primary ? "text-deep-foreground/80" : "text-slate/70")}>{m.text}</p>
                <span className={"mt-5 inline-flex items-center gap-1.5 font-semibold " + (m.primary ? "text-sky" : "text-deep")}>
                  {m.value}
                  <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                {m.external && <span className="sr-only"> (opens in a new tab)</span>}
              </motion.a>
            );
          })}
        </Stagger>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold">Send a project inquiry</h2>
            <p className="mt-4 leading-relaxed text-slate/75">
              Share a few details about your business and what you need. The more context you give, the more useful my reply can be.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-slate/80">
              {["I read every inquiry personally.", "You'll hear back by email or WhatsApp.", "Your details are only used to respond to you."].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-2 rounded-full bg-sky" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <InquiryForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
