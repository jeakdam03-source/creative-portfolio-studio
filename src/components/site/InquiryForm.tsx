import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Loader2, Mail, Send, TriangleAlert } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { submitInquiry } from "@/lib/contact.functions";
import { budgetOptions, inquirySchema, serviceOptions, timelineOptions, type InquiryResult } from "@/lib/contact.schema";
import { mailtoLink, whatsappLink } from "@/lib/links";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "./icons";

type Values = {
  fullName: string;
  email: string;
  whatsapp: string;
  businessName: string;
  service: string;
  description: string;
  budget: string;
  timeline: string;
  website: string;
  consent: boolean;
  company_url: string;
};

const initial: Values = {
  fullName: "",
  email: "",
  whatsapp: "",
  businessName: "",
  service: "",
  description: "",
  budget: "",
  timeline: "",
  website: "",
  consent: false,
  company_url: "",
};

const inputCls =
  "mt-2 block h-12 w-full rounded-xl border border-input bg-card px-4 text-[0.95rem] text-slate outline-none transition-colors placeholder:text-slate/40 focus:border-sky focus:ring-2 focus:ring-sky/30 aria-[invalid=true]:border-destructive";

function Field({ id, label, required, error, children, hint }: { id: string; label: string; required?: boolean; error?: string | undefined; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium text-deep">
        {label} {required ? <span className="text-destructive" aria-hidden="true">*</span> : <span className="font-normal text-slate/50">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1.5 text-xs text-slate/55">{hint}</p>}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function InquiryForm() {
  const send = useServerFn(submitInquiry);
  const startedAt = useRef(Date.now());
  const [values, setValues] = useState<Values>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [failure, setFailure] = useState<InquiryResult | null>(null);

  const set = <K extends keyof Values>(k: K, v: Values[K]) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const payload = { ...values, elapsedMs: Date.now() - startedAt.current };
    const parsed = inquirySchema.safeParse(payload);
    if (!parsed.success) {
      const next: Partial<Record<keyof Values, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof Values;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setStatus("sending");
    setFailure(null);
    try {
      const result = await send({ data: payload });
      if (result.ok) {
        setStatus("sent");
        setValues(initial);
      } else {
        setStatus("failed");
        setFailure(result);
      }
    } catch {
      setStatus("failed");
      setFailure({ ok: false, reason: "delivery_failed", message: "Your message could not be sent. Please check your connection and try again." });
    }
  };

  const fallbackBody = [
    `Name: ${values.fullName}`,
    `Business: ${values.businessName}`,
    `WhatsApp: ${values.whatsapp}`,
    `Service: ${values.service}`,
    "",
    values.description,
  ].join("\n");

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center rounded-[2rem] border border-border bg-card p-10 text-center shadow-soft"
        role="status"
      >
        <span className="grid size-16 place-items-center rounded-full bg-ice text-deep">
          <CheckCircle2 className="size-8" />
        </span>
        <h3 className="mt-6 font-display text-2xl font-semibold">Thank you — your inquiry was sent</h3>
        <p className="mt-3 max-w-md text-slate/75">
          I've received your message and will reply by email or WhatsApp soon. For anything urgent, feel free to message me on WhatsApp.
        </p>
        <Button variant="ghostline" size="xl" className="mt-8" onClick={() => { setStatus("idle"); startedAt.current = Date.now(); }}>
          Send another inquiry
        </Button>
      </motion.div>
    );
  }

  const err = (k: keyof Values) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": `f-${k}-error` } : {});

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-border bg-card p-6 shadow-soft sm:p-9" aria-label="Project inquiry form">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="f-fullName" label="Full Name" required error={errors.fullName}>
          <input id="f-fullName" className={inputCls} autoComplete="name" value={values.fullName} onChange={(e) => set("fullName", e.target.value)} {...err("fullName")} />
        </Field>
        <Field id="f-email" label="Email Address" required error={errors.email}>
          <input id="f-email" type="email" className={inputCls} autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} {...err("email")} />
        </Field>
        <Field id="f-whatsapp" label="WhatsApp Number" required error={errors.whatsapp} hint="Include your country code, e.g. +234…">
          <input id="f-whatsapp" type="tel" className={inputCls} autoComplete="tel" value={values.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} {...err("whatsapp")} />
        </Field>
        <Field id="f-businessName" label="Business Name" required error={errors.businessName}>
          <input id="f-businessName" className={inputCls} autoComplete="organization" value={values.businessName} onChange={(e) => set("businessName", e.target.value)} {...err("businessName")} />
        </Field>
        <div className="sm:col-span-2">
          <Field id="f-service" label="Service Needed" required error={errors.service}>
            <select id="f-service" className={inputCls} value={values.service} onChange={(e) => set("service", e.target.value)} {...err("service")}>
              <option value="">Choose a service…</option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field id="f-description" label="Project Description" required error={errors.description}>
            <textarea
              id="f-description"
              rows={5}
              className={cn(inputCls, "h-auto py-3 leading-relaxed")}
              placeholder="What are you working on, and what would you like to achieve?"
              value={values.description}
              onChange={(e) => set("description", e.target.value)}
              {...err("description")}
            />
          </Field>
        </div>
        <Field id="f-budget" label="Estimated Budget" error={errors.budget}>
          <select id="f-budget" className={inputCls} value={values.budget} onChange={(e) => set("budget", e.target.value)}>
            <option value="">Select…</option>
            {budgetOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="f-timeline" label="Preferred Timeline" error={errors.timeline}>
          <select id="f-timeline" className={inputCls} value={values.timeline} onChange={(e) => set("timeline", e.target.value)}>
            <option value="">Select…</option>
            {timelineOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </select>
        </Field>
        <div className="sm:col-span-2">
          <Field id="f-website" label="Existing Website URL" error={errors.website}>
            <input id="f-website" type="url" inputMode="url" placeholder="https://" className={inputCls} value={values.website} onChange={(e) => set("website", e.target.value)} {...err("website")} />
          </Field>
        </div>

        {/* Honeypot: hidden from people, tempting for bots */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
          <label htmlFor="f-company_url">Company URL</label>
          <input id="f-company_url" tabIndex={-1} autoComplete="off" value={values.company_url} onChange={(e) => set("company_url", e.target.value)} />
        </div>

        <div className="sm:col-span-2">
          <label className="flex items-start gap-3 text-sm text-slate/80">
            <input
              id="f-consent"
              type="checkbox"
              checked={values.consent}
              onChange={(e) => set("consent", e.target.checked)}
              className="mt-0.5 size-5 shrink-0 rounded border-input accent-deep"
              {...err("consent")}
            />
            <span>
              I agree that my details will be used to respond to this inquiry, as described in the{" "}
              <a href="/privacy" className="font-medium text-deep underline decoration-sky decoration-2 underline-offset-4">
                Privacy Policy
              </a>
              . <span className="text-destructive" aria-hidden="true">*</span>
            </span>
          </label>
          {errors.consent && <p id="f-consent-error" className="mt-1.5 text-xs font-medium text-destructive">{errors.consent}</p>}
        </div>
      </div>

      <AnimatePresence>
        {status === "failed" && failure && !failure.ok && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div role="alert" className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-5">
              <p className="flex items-start gap-2 text-sm font-medium text-slate">
                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
                {failure.message}
              </p>
              {(failure.reason === "not_configured" || failure.reason === "delivery_failed" || failure.reason === "rate_limited") && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-whatsapp px-4 text-sm font-semibold text-whatsapp-foreground">
                    <WhatsAppIcon className="size-4" /> Message on WhatsApp
                  </a>
                  <a href={mailtoLink(`Project inquiry: ${values.service || "New project"}`, fallbackBody)} className="inline-flex h-10 items-center gap-2 rounded-full border border-deep/20 bg-card px-4 text-sm font-semibold text-deep">
                    <Mail className="size-4" /> Email {site.email}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs text-slate/55">Fields marked * are required.</p>
        <Button type="submit" variant="brand" size="xl" disabled={status === "sending"}>
          {status === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
          {status === "sending" ? "Sending…" : "Send Inquiry"}
        </Button>
      </div>
    </form>
  );
}
