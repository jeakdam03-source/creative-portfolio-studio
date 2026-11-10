/**
 * Portfolio projects. Add, edit or reorder projects here — every portfolio card
 * and case study page is generated from this list. See CONTENT_GUIDE.md.
 *
 * Content rules:
 *  - Describe only what is confirmed or visible in the supplied material.
 *  - Do not invent client results or metrics. Leave `outcomes` empty if none are documented.
 *  - Never name CRM / automation software brands in public text.
 *  - Only use screenshots that have been checked for private customer data.
 */

export const categories = [
  "Website Design",
  "Sales Funnels",
  "CRM & Automation",
  "AI Automation",
  "Integrations",
] as const;

export type Category = (typeof categories)[number];

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
  /** "desktop" renders in a browser frame, "mobile" in a phone frame, "app" as a plain screenshot. */
  kind?: "desktop" | "mobile" | "app";
  width: number;
  height: number;
};

export type Project = {
  slug: string;
  title: string;
  category: Category;
  summary: string;
  /** Industry or context, only when confirmed. */
  context?: string;
  cover: ProjectImage;
  overview: string[];
  /** Business challenge — only when confirmed by the project owner. */
  challenge?: string[];
  scope: string[];
  solution: string[];
  capabilities: string[];
  gallery: ProjectImage[];
  video?: { src: string; poster: string; title: string; description: string };
  /** Documented outcomes only. Leave empty when none are published. */
  outcomes: string[];
  liveUrl?: string;
  /** Short note shown on the case study about how the material was prepared. */
  note?: string;
};

const w = (name: string) => `/images/work/${name}.webp`;

const desktop = (name: string, alt: string, caption?: string): ProjectImage => ({
  src: w(name),
  alt,
  caption,
  kind: "desktop",
  width: 1440,
  height: 900,
});
const mobile = (name: string, alt: string, caption?: string): ProjectImage => ({
  src: w(name),
  alt,
  caption,
  kind: "mobile",
  width: 600,
  height: 1298,
});

const PRIVACY_NOTE =
  "Screenshots come from the working system. Names, IDs, avatars and other identifying details have been blurred to protect client and customer privacy.";

export const projects: Project[] = [
  {
    slug: "funding-credit-website-experience",
    title: "Funding Credit Website Experience",
    category: "Website Design",
    context: "Credit & funding services",
    summary:
      "A multi-service website for a business and personal credit company, organised so visitors can quickly find the service they need.",
    cover: desktop(
      "funding-credit-website-desktop-1",
      "Funding Credit website homepage with service navigation and family hero image",
    ),
    overview: [
      "Funding Credit offers personal credit, business credit and funding services. The website presents several service lines in one place, with a clear top navigation and a consistent green-and-navy visual identity.",
      "The homepage introduces the team's approach, highlights the main service areas in card layouts, and brings in client testimonials and partner logos further down the page.",
    ],
    scope: ["Website design", "Responsive page layouts", "Service presentation"],
    solution: [
      "Dedicated navigation for each service line — credit counseling, business credit, funding, credit cards, credit boost, rent reporting and mortgage/real estate.",
      "Service cards with icons and clear Learn More calls to action.",
      "Supporting trust sections: value statements, testimonials and a partner strip.",
      "Layouts that adapt from desktop to mobile, with a persistent contact button.",
    ],
    capabilities: ["Responsive web design", "Information architecture", "Conversion-focused layouts"],
    gallery: [
      desktop(
        "funding-credit-website-desktop-2",
        "Funding Credit value statements and one-stop-shop section",
        "Value statements and service introduction",
      ),
      desktop(
        "funding-credit-website-desktop-3",
        "Funding Credit service cards for funding and credit boost",
        "Service cards with calls to action",
      ),
      desktop(
        "funding-credit-website-desktop-4",
        "Funding Credit testimonials, partners and footer",
        "Testimonials, partners and footer",
      ),
      mobile("funding-credit-website-mobile", "Funding Credit homepage on a mobile phone", "Mobile view"),
    ],
    outcomes: [],
    liveUrl: "https://funding-credit.com/home-9702",
    note: "Screenshots were captured from the live website. Live content may have changed since.",
  },
  {
    slug: "mail-waves-digital-website",
    title: "Mail Waves Digital Website",
    category: "Website Design",
    context: "Email marketing agency",
    summary:
      "A dark, modern website for an email marketing agency, built around case studies, services and booking a call.",
    cover: desktop(
      "mail-waves-website-desktop-1",
      "Mail Waves website hero with headline, client logos and call to action",
    ),
    overview: [
      "Mail Waves is an email marketing agency that works with eCommerce brands. The website uses a deep navy and electric-blue look with glowing accents to feel premium and technical.",
      "The page guides visitors through the agency's positioning, client case studies, services and frequently asked questions, with repeated calls to book a call.",
    ],
    scope: ["Website design", "Responsive page layouts", "Case-study presentation"],
    solution: [
      "A bold hero with a clear value statement, a featured client quote and a logo wall.",
      "Case-study sections that pair a short story with before-and-after dashboard visuals.",
      "Service cards for email/SMS marketing and cold traffic & funnel optimisation, each with an Apply Now button.",
      "Sticky navigation linking to testimonials, case studies, FAQ, services and careers.",
    ],
    capabilities: ["Responsive web design", "Visual storytelling", "Conversion-focused layouts"],
    gallery: [
      desktop(
        "mail-waves-website-desktop-2",
        "Mail Waves case study section with dashboard visual",
        "Case study presentation",
      ),
      desktop(
        "mail-waves-website-desktop-3",
        "Mail Waves second case study layout",
        "Case study layout",
      ),
      desktop(
        "mail-waves-website-desktop-4",
        "Mail Waves service cards with Apply Now buttons",
        "Service cards",
      ),
      mobile("mail-waves-website-mobile", "Mail Waves homepage on a mobile phone", "Mobile view"),
    ],
    outcomes: [],
    liveUrl: "https://mail-waves.com/",
    note: "Screenshots were captured from the live website. Figures shown inside the screenshots are the client's own published case-study content, not results claimed for this project.",
  },
  {
    slug: "credit-funding-webinar-funnel",
    title: "Credit Funding Webinar Funnel",
    category: "Sales Funnels",
    context: "Business credit education",
    summary:
      "A webinar registration funnel that introduces a business credit program and drives visitors to reserve their seat.",
    cover: desktop(
      "credit-funding-webinar-funnel-desktop-1",
      "Business Credit Program webinar registration page with speaker photos",
    ),
    overview: [
      "This funnel promotes a business credit webinar. It focuses on one action — reserving a seat — and repeats that call to action throughout the page.",
      "The page introduces the speakers, lists what attendees will learn and finishes with a blog preview and contact details.",
    ],
    scope: ["Funnel page design", "Registration-focused layout"],
    solution: [
      "A high-contrast hero with the program title, speaker portraits and a Reserve Your Seat button.",
      "A checklist of webinar topics so visitors know exactly what they will learn.",
      "Repeated registration buttons at natural decision points down the page.",
      "A mobile layout that keeps the headline and call to action prominent.",
    ],
    capabilities: ["Funnel design", "Webinar registration", "Landing page copy layout"],
    gallery: [
      desktop(
        "credit-funding-webinar-funnel-desktop-2",
        "Webinar topics checklist with Reserve Your Seat button",
        "Webinar topics and call to action",
      ),
      desktop(
        "credit-funding-webinar-funnel-desktop-3",
        "Latest blog post section on the webinar funnel",
        "Blog preview section",
      ),
      desktop(
        "credit-funding-webinar-funnel-desktop-4",
        "Webinar funnel footer with final call to action",
        "Final call to action and footer",
      ),
      mobile(
        "credit-funding-webinar-funnel-mobile",
        "Webinar registration funnel on a mobile phone",
        "Mobile view",
      ),
    ],
    outcomes: [],
    liveUrl: "https://webinars.funding-credit.com/home-2-page-2354",
    note: "Screenshots were captured from the live funnel. Live content may have changed since.",
  },
  {
    slug: "business-credit-lead-generation-funnel",
    title: "Business Credit Lead Generation Funnel",
    category: "Sales Funnels",
    context: "Credit & funding partner program",
    summary:
      "A lead generation page for a credit and funding partner program, presenting three core services with clear Get Started buttons.",
    cover: desktop(
      "business-credit-lead-funnel-desktop-1",
      "Lead generation funnel hero with one-stop-shop headline and View All Services button",
    ),
    overview: [
      "This page presents a credit and funding partner program as a one-stop shop for business and personal financial needs.",
      "Each core service — personal credit counseling, business credit consulting and funding services — has its own illustrated block and Get Started call to action, followed by partners and testimonials.",
    ],
    scope: ["Funnel page design", "Lead capture layout"],
    solution: [
      "A hero card with a short promise and a View All Services button.",
      "Alternating service blocks with illustrations and Get Started buttons.",
      "Partner logos and a testimonial to build trust before the footer.",
      "Responsive layout for mobile visitors.",
    ],
    capabilities: ["Funnel design", "Lead generation", "Service presentation"],
    gallery: [
      desktop(
        "business-credit-lead-funnel-desktop-2",
        "Business credit consulting and funding services blocks",
        "Service blocks with calls to action",
      ),
      desktop(
        "business-credit-lead-funnel-desktop-3",
        "Personal credit counseling and business credit consulting blocks",
        "Service introductions",
      ),
      desktop(
        "business-credit-lead-funnel-desktop-4",
        "Partners strip, testimonial and footer",
        "Partners, testimonial and footer",
      ),
      mobile("business-credit-lead-funnel-mobile", "Lead generation funnel on a mobile phone", "Mobile view"),
    ],
    outcomes: [],
    liveUrl: "https://app.funding-credit.com/v2/preview/1ki1N1r2EMwSuv76bnbg",
    note: "Screenshots were captured from the funnel's preview link. Preview content may change.",
  },
  {
    slug: "real-estate-buyer-follow-up-automation",
    title: "Real Estate Buyer Follow-Up Automation",
    category: "CRM & Automation",
    context: "Real estate",
    summary:
      "Lead capture, welcome and follow-up workflows that tag new buyers, create opportunities, alert the team and keep leads engaged over time.",
    cover: {
      src: w("lead-capture-poster"),
      alt: "Lead capture and welcome sequence workflow with add tag, create opportunity and internal notification steps",
      kind: "app",
      width: 1280,
      height: 592,
    },
    overview: [
      "These workflows organise what happens after a buyer lead comes in. New leads are tagged and added to the pipeline as an opportunity, the team is notified, and a multi-day welcome sequence begins.",
      "Separate workflows watch for replies and alert the team when a buyer responds by email, while a long-term nurture sequence re-engages leads who are not ready yet.",
    ],
    scope: ["Workflow design and build", "Pipeline and tagging logic", "Email follow-up sequences"],
    solution: [
      "Lead capture workflow: add tag → create or update opportunity → internal notification, followed by a five-day welcome sequence with conditional branches.",
      "Reply detection: when a customer replies by email, the team receives internal notifications so no response is missed.",
      "Long-term nurture / reactivation: a long sequence of timed emails with waits between each step.",
    ],
    capabilities: [
      "CRM workflow automation",
      "Lead tagging and pipeline updates",
      "Email nurture sequences",
      "Internal team notifications",
    ],
    gallery: [
      {
        src: w("crm-email-reply-notification"),
        alt: "Workflow: customer replied via email triggers two internal notifications",
        caption: "Email reply notification workflow",
        kind: "app",
        width: 1600,
        height: 737,
      },
      {
        src: w("crm-long-term-nurture"),
        alt: "Long-term nurture and reactivation email sequence with alternating waits and emails",
        caption: "Long-term nurture / reactivation sequence",
        kind: "app",
        width: 670,
        height: 720,
      },
    ],
    video: {
      src: "/media/lead-capture-welcome-sequence-demo.mp4",
      poster: w("lead-capture-poster"),
      title: "Walkthrough: lead capture + welcome sequence",
      description:
        "A silent screen recording scrolling through the full workflow — tagging, opportunity creation, notifications, branches and the multi-day sequence.",
    },
    outcomes: [],
    note: PRIVACY_NOTE,
  },
  {
    slug: "automated-appointment-reminder-system",
    title: "Automated Appointment & Reminder System",
    category: "CRM & Automation",
    summary:
      "Organised booking calendars and an email + SMS reminder flow that follows up before each appointment.",
    cover: {
      src: w("crm-calendar-setup"),
      alt: "Calendar management screen listing several active 30-minute booking calendars",
      kind: "app",
      width: 1600,
      height: 849,
    },
    overview: [
      "This system combines calendar setup with automated reminders. Booking calendars are organised into groups, each with its own event type and duration.",
      "Once an appointment is booked, a reminder workflow sends messages at set times before the appointment and checks engagement before deciding the next step.",
    ],
    scope: ["Calendar configuration", "Reminder workflow design and build"],
    solution: [
      "Multiple booking calendars organised into groups for different appointment types.",
      "Timed reminder emails ahead of the appointment.",
      "Branches that check whether an email was opened and send an SMS follow-up when it was not.",
      "Internal notification to the team before the appointment.",
    ],
    capabilities: ["Appointment automation", "Email & SMS reminders", "Calendar setup"],
    gallery: [
      {
        src: w("crm-appointment-reminder-flow"),
        alt: "Appointment booking reminder workflow with email and SMS branches",
        caption: "Appointment reminder flow — email and SMS",
        kind: "app",
        width: 480,
        height: 657,
      },
    ],
    outcomes: [],
    note: PRIVACY_NOTE,
  },
  {
    slug: "ai-voice-agent-conversational-automation",
    title: "AI Voice Agent & Conversational Automation",
    category: "AI Automation",
    summary:
      "A receptionist-style AI voice agent that can transfer calls, book appointments and capture contact details, plus AI follow-up with a human hand-over.",
    cover: {
      src: w("ai-voice-agent-poster"),
      alt: "AI voice agent builder showing call transfer, appointment booking and contact field actions",
      kind: "app",
      width: 1280,
      height: 584,
    },
    overview: [
      "The voice agent answers inbound calls as a receptionist. It follows a structured prompt with clear rules, and can take actions during the call — transferring to a team member, booking an appointment, and saving the caller's details.",
      "Related workflows activate an AI assistant when a customer replies, and notify the team when a conversation is tagged for human hand-over.",
    ],
    scope: ["Voice agent configuration", "Conversation rules and prompt design", "Supporting workflows"],
    solution: [
      "In-call actions: call transfer, appointment booking, and updating first name, last name, email and phone.",
      "Inbound and outbound scenarios with a configurable welcome message.",
      "AI engagement workflow: a customer reply triggers the AI assistant.",
      "Human hand-over workflow: a hand-over tag sends internal notifications to the team.",
    ],
    capabilities: ["AI voice agents", "Conversational automation", "AI-assisted booking", "Lead qualification"],
    gallery: [
      {
        src: w("crm-ai-engagement"),
        alt: "Workflow: customer replied triggers activation of the AI assistant",
        caption: "AI engagement workflow",
        kind: "app",
        width: 1600,
        height: 743,
      },
      {
        src: w("crm-ai-human-handover"),
        alt: "Workflow: human hand-over tag triggers three internal notifications",
        caption: "Human hand-over notifications",
        kind: "app",
        width: 1600,
        height: 730,
      },
    ],
    video: {
      src: "/media/ai-voice-agent-demo.mp4",
      poster: w("ai-voice-agent-poster"),
      title: "Walkthrough: AI voice agent setup",
      description:
        "A short silent screen recording of the agent's configuration. The prompt text is blurred because it contains client business details.",
    },
    outcomes: [],
    note: PRIVACY_NOTE,
  },
  {
    slug: "workflow-integrations",
    title: "Workflow Integrations",
    category: "Integrations",
    summary:
      "Connected workflows that sync calendars with a database, answer chat messages with AI, and run an AI messaging assistant with tools.",
    cover: {
      src: w("integration-calendar-database-sync"),
      alt: "Integration scenario routing database changes to create, update or delete calendar events",
      kind: "app",
      width: 1280,
      height: 621,
    },
    overview: [
      "These integrations connect everyday business tools so information moves automatically instead of being copied by hand.",
      "They range from a scheduled two-way sync between a calendar and a database, to AI-powered message handling.",
    ],
    scope: ["Integration design and build", "Routing and filter logic", "AI step configuration"],
    solution: [
      "Calendar ↔ database sync: watches database items every 15 minutes and routes each change to create, update or delete the matching calendar event, then writes back to the database.",
      "AI chat responder: watches a team chat channel, generates a reply with an AI model and posts it back.",
      "AI messaging assistant: receives messages (including voice notes, which are transcribed), uses an AI agent with memory and tools — a menu document, calendar lookup and booking, and a spreadsheet log — then replies to the customer.",
    ],
    capabilities: ["System integrations", "Data sync", "AI agents with tools", "Workflow routing"],
    gallery: [
      {
        src: w("integration-ai-chat-responder"),
        alt: "Three-step integration: watch channel messages, create AI completion, send a message",
        caption: "AI chat responder",
        kind: "app",
        width: 1080,
        height: 518,
      },
      {
        src: w("integration-ai-messaging-agent"),
        alt: "AI messaging agent workflow with transcription, AI agent, memory and calendar and spreadsheet tools",
        caption: "AI messaging assistant with tools",
        kind: "app",
        width: 720,
        height: 298,
      },
    ],
    outcomes: [],
    note: "Screenshots are from the working scenarios. Third-party app names are blurred to keep the presentation platform-independent.",
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
