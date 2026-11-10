import type { LucideIcon } from "lucide-react";
import { Bot, Filter, LayoutTemplate, Network, Users, Workflow } from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  detail: string[];
  deliverables: string[];
  icon: LucideIcon;
  /** Portfolio category to link to, when one exists. */
  portfolioCategory?: string;
};

/** Platform-independent service descriptions. Do not add software brand names here. */
export const services: Service[] = [
  {
    slug: "website-design",
    title: "Website Design & Development",
    short: "Websites",
    description:
      "Modern, responsive websites designed to communicate your brand's value, create a strong first impression, and make it easier for potential customers to take action.",
    detail: [
      "Your website is often the first conversation a customer has with your business. I design sites that explain what you do clearly, look professional on every screen size, and guide visitors toward a next step such as a call, a booking or an inquiry.",
      "Every project starts with understanding your audience and your goals, so the structure, wording and layout support how your business actually wins customers.",
    ],
    deliverables: [
      "Business websites",
      "Website redesign",
      "Responsive websites",
      "Landing pages",
      "Conversion-focused layouts",
      "Website optimization",
    ],
    icon: LayoutTemplate,
    portfolioCategory: "Website Design",
  },
  {
    slug: "sales-funnels",
    title: "Sales Funnels & Landing Pages",
    short: "Funnels",
    description:
      "Strategically designed sales funnels and landing pages that guide visitors toward inquiries, bookings, registrations, and other important business actions.",
    detail: [
      "A funnel focuses attention on one offer and one action. I plan the journey from the first click to the final step, then design pages that remove distractions and make that action easy to take.",
      "Funnels can be connected to forms, calendars and follow-up sequences so new leads are captured and looked after automatically.",
    ],
    deliverables: [
      "Lead generation funnels",
      "Booking funnels",
      "Webinar funnels",
      "Sales pages",
      "Landing pages",
      "Funnel optimization",
    ],
    icon: Filter,
    portfolioCategory: "Sales Funnels",
  },
  {
    slug: "crm-setup",
    title: "CRM Setup & Optimization",
    short: "CRM",
    description:
      "Organized CRM systems that help businesses manage contacts, monitor opportunities, track customer interactions, and improve internal processes.",
    detail: [
      "A CRM only helps when it reflects how your team really works. I set up contact records, pipelines, custom fields and tags so information is easy to find and every lead has a clear status.",
      "For existing systems, I review what is already in place and tidy up the structure so it is easier to manage day to day.",
    ],
    deliverables: [
      "CRM setup",
      "Contact organization",
      "Sales pipeline configuration",
      "Lead management",
      "Custom fields and tagging",
      "Customer journey organization",
    ],
    icon: Users,
    portfolioCategory: "CRM & Automation",
  },
  {
    slug: "workflow-automation",
    title: "Workflow & Marketing Automation",
    short: "Automation",
    description:
      "Smart automation systems that reduce repetitive tasks, organize communication, and keep leads and customers moving through the right processes.",
    detail: [
      "Automation handles the repetitive steps (sending a welcome message, reminding a customer about an appointment, alerting your team when someone replies), so nothing depends on someone remembering to do it.",
      "I map each workflow before building it, with clear triggers, timing and conditions, then test it thoroughly before it goes live.",
    ],
    deliverables: [
      "Email automation",
      "SMS follow-ups",
      "Appointment reminders",
      "Lead nurturing",
      "Customer onboarding",
      "Internal notifications",
      "Re-engagement sequences",
    ],
    icon: Workflow,
    portfolioCategory: "CRM & Automation",
  },
  {
    slug: "ai-automation",
    title: "AI & Conversational Automation",
    short: "AI",
    description:
      "AI-powered communication and workflow solutions designed to support customer interactions, lead qualification, and repetitive business tasks.",
    detail: [
      "AI assistants can answer common questions, collect contact details and help book appointments, with clear rules about what they should and should not say, and a hand-over to a real person when needed.",
      "I design these conversations carefully so they stay helpful, on-brand and appropriate for your business.",
    ],
    deliverables: [
      "AI voice-agent workflows",
      "Chat automation",
      "Conversational automation",
      "AI-assisted appointment booking",
      "Lead qualification workflows",
    ],
    icon: Bot,
    portfolioCategory: "AI Automation",
  },
  {
    slug: "integrations",
    title: "CRM Integrations & Business Optimization",
    short: "Integrations",
    description:
      "Connected business systems that make it easier for tools, teams, and customer information to work together.",
    detail: [
      "When your tools don't talk to each other, information gets copied by hand or lost. I connect systems so data moves where it is needed: calendars, forms, databases, messaging and your CRM.",
      "I also troubleshoot existing automations and review processes to find steps that can be simplified.",
    ],
    deliverables: [
      "CRM integrations",
      "Automation troubleshooting",
      "System audits",
      "Workflow optimization",
      "Business process improvements",
      "Data flow and integration setup",
    ],
    icon: Network,
    portfolioCategory: "Integrations",
  },
];

/** Expertise strip — capabilities only, never software brand names. */
export const expertise = [
  "Website Design",
  "Website Redesign",
  "Landing Pages",
  "Sales Funnels",
  "CRM Setup",
  "Pipeline Management",
  "Lead Management",
  "Workflow Automation",
  "Email & SMS Follow-up",
  "Appointment Automation",
  "AI Voice Agents",
  "Conversational AI",
  "System Integrations",
  "Business Process Automation",
];
