import { z } from "zod";

export const serviceOptions = [
  "Website Design",
  "Website Redesign",
  "CRM Setup",
  "CRM Optimization",
  "Sales Funnel",
  "Workflow Automation",
  "AI Automation",
  "System Integration",
  "Other",
] as const;

export const budgetOptions = [
  "Not sure yet",
  "Under $500",
  "$500 to $1,500",
  "$1,500 to $3,000",
  "$3,000 to $5,000",
  "$5,000+",
] as const;

export const timelineOptions = [
  "As soon as possible",
  "Within 1 month",
  "1 to 3 months",
  "3+ months",
  "Flexible",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

export const inquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  whatsapp: z
    .string()
    .trim()
    .min(7, "Please enter your WhatsApp number")
    .max(25)
    .regex(/^\+?[0-9\s\-()]{7,25}$/, "Use digits, spaces, + or dashes only"),
  businessName: z.string().trim().min(2, "Please enter your business name").max(120),
  service: z.enum(serviceOptions, { errorMap: () => ({ message: "Please choose a service" }) }),
  description: z
    .string()
    .trim()
    .min(20, "Please share a little more detail (at least 20 characters)")
    .max(3000),
  budget: optionalText(60),
  timeline: optionalText(60),
  website: z
    .string()
    .trim()
    .max(255)
    .optional()
    .transform((v) => (v ? v : undefined))
    .refine((v) => !v || /^(https?:\/\/)?[\w.-]+\.[a-z]{2,}(\/\S*)?$/i.test(v), {
      message: "Please enter a valid website address",
    }),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy notice" }) }),
  /** Honeypot — must stay empty. */
  company_url: z.string().max(0).optional(),
  /** Milliseconds the form was open before submitting. */
  elapsedMs: z.number().int().nonnegative(),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export type InquiryResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "spam" | "rate_limited" | "not_configured" | "delivery_failed"; message: string };
