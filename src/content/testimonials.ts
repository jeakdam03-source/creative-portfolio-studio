/**
 * Testimonials.
 *
 * IMPORTANT: the three entries below are SAMPLE reviews written to preview the design.
 * They are not real client feedback and are always shown with a "Sample Review" label.
 *
 * To add a verified review: replace an entry, set `sample: false`, and fill in `author`
 * (and optionally `role`) with details the client has approved for publication.
 */
export type Testimonial = {
  quote: string;
  service: string;
  sample: boolean;
  author?: string;
  role?: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "The website design was clean, professional, and exactly the kind of online presence we wanted for our business. The layout was thoughtfully organized, easy to navigate, and reflected our brand beautifully.",
    service: "Website Design",
    sample: true,
  },
  {
    quote:
      "Our customer follow-up process became much more organized. The workflows were carefully structured, and the entire system was easier for our team to manage. Everything was clearly explained and thoughtfully implemented.",
    service: "CRM & Automation",
    sample: true,
  },
  {
    quote:
      "The landing page communicated our offer clearly, and the entire experience felt professional from start to finish. The attention to detail and understanding of our business needs really stood out.",
    service: "Sales Funnels",
    sample: true,
  },
];
