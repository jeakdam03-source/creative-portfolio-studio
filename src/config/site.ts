/**
 * Site-wide settings. Edit this file to update contact details, booking link,
 * social links and other global values. See CONTENT_GUIDE.md for details.
 */

export const site = {
  name: "Ajayi Oluwayemisi",
  shortName: "Oluwayemisi",
  title: "Website Designer | CRM & Automation Specialist",
  tagline: "Design. Automate. Create.",
  description:
    "Thoughtful websites, connected systems, and smart automation solutions for businesses ready to work more efficiently.",

  /**
   * Public production URL, without a trailing slash. Leave empty until the final
   * domain is confirmed — canonical tags are only emitted when this is set.
   * Preferred (subject to availability): https://ajayioluwayemisi.vercel.app
   * Can also be set with the VITE_SITE_URL environment variable.
   */
  url: (import.meta.env["VITE_SITE_URL"] as string | undefined)?.replace(/\/$/, "") ?? "",

  email: "yemisioluwa2020@gmail.com",

  whatsapp: {
    /** International format, digits only. */
    number: "2349019914329",
    display: "+234 901 991 4329",
    message: "Hi Oluwayemisi, I came across your portfolio and would like to discuss a project.",
  },

  /**
   * Google Calendar appointment booking page. Leave empty until the real link is
   * available — every booking button stays hidden while this is empty.
   * Can also be set with the VITE_BOOKING_URL environment variable.
   */
  bookingUrl: (import.meta.env["VITE_BOOKING_URL"] as string | undefined) ?? "",

  /**
   * Social links. Only add real profile URLs. Empty list = no social icons shown.
   * Example: { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile" }
   */
  socials: [] as { label: string; href: string }[],

  /**
   * The testimonial section currently shows clearly labelled SAMPLE reviews to preview
   * the design. Set to false to hide the section until verified reviews are added in
   * src/content/testimonials.ts.
   */
  showTestimonials: true,
};

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;
