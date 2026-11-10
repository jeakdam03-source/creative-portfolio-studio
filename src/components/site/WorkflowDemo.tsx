import { CalendarCheck, ClipboardList, Database, MailCheck, Pause, Play, RotateCcw } from "lucide-react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const stages = [
  {
    icon: ClipboardList,
    title: "Inquiry submitted",
    short: "Visitor fills in a form",
    description: "A website visitor submits an inquiry form with their name, contact details and what they need.",
    preview: [
      ["Form", "Project inquiry"],
      ["Service", "Website design"],
      ["Status", "Received"],
    ],
  },
  {
    icon: Database,
    title: "Lead recorded in the CRM",
    short: "Contact created & tagged",
    description: "The details are saved as a new contact, tagged by service and added to the sales pipeline as a new opportunity.",
    preview: [
      ["Pipeline", "New lead"],
      ["Tag", "website-inquiry"],
      ["Owner", "Assigned"],
    ],
  },
  {
    icon: MailCheck,
    title: "Automated follow-up",
    short: "Instant reply & team alert",
    description: "A friendly confirmation is sent straight away, the team gets a notification, and a short follow-up sequence begins.",
    preview: [
      ["Email", "Confirmation sent"],
      ["SMS", "Follow-up queued"],
      ["Team", "Notified"],
    ],
  },
  {
    icon: CalendarCheck,
    title: "Appointment booked",
    short: "Call booked & reminders set",
    description: "The customer picks a time from the booking link. Reminders are scheduled automatically before the appointment.",
    preview: [
      ["Booking", "Consultation"],
      ["Reminder", "24 hours before"],
      ["Reminder", "1 hour before"],
    ],
  },
] as const;

const STEP_MS = 2600;

/** Illustrative workflow animation. It does not process any real visitor data. */
export function WorkflowDemo() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(!reduce);

  useEffect(() => {
    if (!playing || !inView) return;
    if (active >= stages.length - 1) {
      const t = setTimeout(() => setPlaying(false), STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [active, playing, inView]);

  useEffect(() => {
    if (reduce) setPlaying(false);
  }, [reduce]);

  const replay = () => {
    setActive(0);
    setPlaying(true);
  };

  const select = (i: number) => {
    setPlaying(false);
    setActive(i);
  };

  const stage = stages[active] ?? stages[0];

  return (
    <div ref={ref} className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-5 shadow-lift sm:p-8 lg:p-10">
      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-50" aria-hidden="true" />

      <div className="relative flex flex-wrap items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-sky/50 bg-ice px-3 py-1 text-xs font-semibold text-deep">
          <span className="size-1.5 rounded-full bg-sky" aria-hidden="true" />
          Example workflow · illustration only, no real data
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (active >= stages.length - 1 && !playing ? replay() : setPlaying((p) => !p))}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-medium text-deep hover:border-sky hover:bg-ice-soft"
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            {playing ? "Pause" : "Play"}
          </button>
          <button
            type="button"
            onClick={replay}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-deep px-4 text-sm font-medium text-deep-foreground hover:bg-deep/90"
          >
            <RotateCcw className="size-4" /> Replay
          </button>
        </div>
      </div>

      {/* Stage track */}
      <ol className="relative mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0" aria-label="Workflow stages">
        {stages.map((s, i) => {
          const Icon = s.icon;
          const isActive = i === active;
          const isDone = i < active;
          return (
            <li key={s.title} className="relative lg:px-3">
              {/* connector (desktop) */}
              {i < stages.length - 1 && (
                <div className="absolute left-[calc(50%+2.25rem)] right-[calc(-50%+2.25rem)] top-9 hidden h-[3px] overflow-hidden rounded-full bg-border lg:block" aria-hidden="true">
                  <motion.div
                    className="h-full origin-left rounded-full bg-sky"
                    initial={false}
                    animate={{ scaleX: i < active ? 1 : 0 }}
                    transition={{ duration: reduce ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => select(i)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition-all duration-300 lg:flex-col lg:border-transparent lg:p-2 lg:text-center",
                  isActive ? "border-sky bg-ice-soft lg:bg-transparent" : "border-border bg-card hover:border-sky/60 lg:bg-transparent",
                )}
              >
                <span
                  className={cn(
                    "relative grid size-14 shrink-0 place-items-center rounded-2xl border-2 transition-all duration-500 lg:size-[4.5rem]",
                    isActive && "border-sky bg-deep text-deep-foreground shadow-lift",
                    isDone && "border-sky bg-ice text-deep",
                    !isActive && !isDone && "border-border bg-card text-slate/50",
                  )}
                >
                  {isActive && !reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-2xl border-2 border-sky"
                      initial={{ opacity: 0.8, scale: 1 }}
                      animate={{ opacity: 0, scale: 1.35 }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                  <Icon className="size-6 lg:size-7" strokeWidth={1.7} />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-slate/50">Step {i + 1}</span>
                  <span className={cn("mt-0.5 block font-display text-[0.98rem] font-semibold", isActive || isDone ? "text-deep" : "text-slate/70")}>
                    {s.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-slate/60">{s.short}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      {/* Progress bar (mobile / tablet) */}
      <div className="relative mt-6 h-1 overflow-hidden rounded-full bg-border lg:hidden" aria-hidden="true">
        <motion.div
          className="h-full rounded-full bg-sky"
          animate={{ width: `${((active + 1) / stages.length) * 100}%` }}
          transition={{ duration: reduce ? 0 : 0.6 }}
        />
      </div>

      {/* Detail panel */}
      <div className="relative mt-8 grid gap-6 rounded-3xl border border-border bg-ice-soft/80 p-5 sm:p-7 md:grid-cols-[1.2fr_1fr]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: reduce ? 0 : 0.35 }}
          >
            <p className="eyebrow">Step {active + 1} of {stages.length}</p>
            <h3 className="mt-2 font-display text-2xl font-semibold">{stage.title}</h3>
            <p className="mt-3 leading-relaxed text-slate/80">{stage.description}</p>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.dl
            key={`p-${active}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: reduce ? 0 : 0.35, delay: reduce ? 0 : 0.05 }}
            className="rounded-2xl border border-border bg-card p-4 shadow-soft"
          >
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate/50">Sample preview</p>
            {stage.preview.map(([k, v], i) => (
              <motion.div
                key={`${k}-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0 : 0.12 * (i + 1) }}
                className="flex items-center justify-between border-b border-border py-2 text-sm last:border-0"
              >
                <dt className="text-slate/60">{k}</dt>
                <dd className="font-medium text-deep">{v}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </AnimatePresence>
      </div>
    </div>
  );
}
