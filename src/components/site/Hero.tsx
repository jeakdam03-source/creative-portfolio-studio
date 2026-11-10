import { Link } from "@tanstack/react-router";
import { ArrowRight, LayoutTemplate, Sparkles, Workflow } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "./ContactButtons";
import { BrowserFrame } from "./Frames";
import { ease } from "./motion";

export const PORTRAIT_SRC = "/images/brand/ajayi-oluwayemisi-portrait.webp";

const headline = ["Your", "Business", "Deserves", "More", "Than", "Just", "a", "Website."];

function FloatCard({
  children,
  className,
  delay = 0,
  float = 10,
  duration = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  float?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      <motion.div
        animate={reduce ? {} : { y: [0, -float, 0] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 50]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 25]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid-soft opacity-40 [mask-image:radial-gradient(ellipse_at_70%_40%,black,transparent_70%)]" aria-hidden="true" />
      <svg aria-hidden="true" viewBox="0 0 1440 600" className="pointer-events-none absolute -bottom-10 left-0 w-full text-ice" preserveAspectRatio="none">
        <path fill="currentColor" d="M0 420c240-80 480-90 720-40s480 60 720-20v240H0Z" opacity="0.7" />
      </svg>

      <div className="container-page relative grid items-center gap-14 pb-20 pt-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-28 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="eyebrow inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 shadow-soft"
          >
            <Sparkles className="size-3.5 text-sky-strong" aria-hidden="true" />
            Website Design • CRM • Automation
          </motion.p>

          <h1 className="mt-7 font-display text-[2.6rem] font-semibold leading-[1.06] sm:text-6xl lg:text-[4.1rem]">
            <span className="sr-only">Your Business Deserves More Than Just a Website.</span>
            <span aria-hidden="true">
              {headline.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                  <motion.span
                    className={
                      "inline-block " + (word === "More" || word === "Than" ? "relative text-sky-strong" : "")
                    }
                    initial={reduce ? { opacity: 0 } : { y: "110%" }}
                    animate={reduce ? { opacity: 1 } : { y: 0 }}
                    transition={{ duration: 0.8, ease, delay: 0.15 + i * 0.07 }}
                  >
                    {word}
                  </motion.span>
                  {i < headline.length - 1 && "\u00A0"}
                </span>
              ))}
            </span>
          </h1>

          <motion.svg
            aria-hidden="true"
            viewBox="0 0 300 20"
            className="-mt-1 h-3 w-48 text-sky sm:w-64"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.path
              d="M2 14 C 80 2, 200 2, 298 12"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: reduce ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.9, delay: 0.9, ease }}
            />
          </motion.svg>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.75 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate/80"
          >
            I design professional websites, build conversion-focused sales funnels, and create smart CRM and automation
            systems that help businesses capture leads, streamline operations, and grow.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
            className="mt-5 flex items-center gap-3 font-medium text-deep"
          >
            <span className="accent-rule" aria-hidden="true" />
            Hi, I'm Oluwayemisi — Website Designer &amp; CRM Automation Specialist.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.95 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <WhatsAppButton />
            <Button asChild variant="ghostline" size="xl">
              <Link to="/portfolio">
                Explore My Work <ArrowRight />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Visual composition */}
        <div className="relative mx-auto aspect-square w-full max-w-[520px] lg:max-w-none">
          {/* decorative rings */}
          <motion.div
            aria-hidden="true"
            className="absolute inset-[6%] rounded-full border border-dashed border-sky/60"
            animate={reduce ? {} : { rotate: 360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
          <div aria-hidden="true" className="absolute inset-[14%] rounded-full bg-ice" />

          {/* back mockup */}
          <motion.div style={{ y: yBack }} className="absolute -left-[4%] top-[4%] w-[52%] sm:-left-[8%]">
            <FloatCard delay={0.6} float={8} duration={7}>
              <BrowserFrame
                src="/images/work/mail-waves-website-desktop-1.webp"
                alt="Mail Waves website project preview"
                priority
                className="rotate-[-4deg]"
              />
            </FloatCard>
          </motion.div>

          {/* portrait */}
          <motion.div
            style={{ y: yPortrait }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.25 }}
            className="absolute inset-[15%] z-10"
          >
            <img
              src={PORTRAIT_SRC}
              alt="Portrait of Ajayi Oluwayemisi, website designer and CRM automation specialist"
              width={960}
              height={960}
              fetchPriority="high"
              className="h-full w-full rounded-full object-cover drop-shadow-[0_30px_40px_color-mix(in_oklab,var(--color-deep)_25%,transparent)]"
            />
          </motion.div>

          {/* front mockup */}
          <motion.div style={{ y: yFront }} className="absolute -right-[2%] bottom-[6%] z-20 w-[50%] sm:-right-[6%]">
            <FloatCard delay={0.8} float={10} duration={6.5}>
              <BrowserFrame
                src="/images/work/funding-credit-website-desktop-1.webp"
                alt="Funding Credit website project preview"
                priority
                className="rotate-[3deg]"
              />
            </FloatCard>
          </motion.div>

          {/* small UI chips */}
          <FloatCard delay={1.05} float={6} duration={5} className="absolute right-[2%] top-[10%] z-20">
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-background px-3.5 py-2.5 shadow-lift">
              <span className="grid size-8 place-items-center rounded-xl bg-ice text-deep">
                <LayoutTemplate className="size-4" />
              </span>
              <span className="text-xs font-semibold text-deep">Website Design</span>
            </div>
          </FloatCard>
          <FloatCard delay={1.2} float={7} duration={5.5} className="absolute bottom-[2%] left-[2%] z-20 sm:left-[4%]">
            <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-background px-3.5 py-2.5 shadow-lift">
              <span className="grid size-8 place-items-center rounded-xl bg-deep text-deep-foreground">
                <Workflow className="size-4" />
              </span>
              <span className="text-xs font-semibold text-deep">CRM &amp; Automation</span>
            </div>
          </FloatCard>

          {/* star motif from the logo */}
          <motion.svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="absolute right-[16%] top-[2%] z-20 size-7 text-sky"
            animate={reduce ? {} : { rotate: [0, 15, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <path fill="currentColor" d="M12 0 L14.2 9.8 L24 12 L14.2 14.2 L12 24 L9.8 14.2 L0 12 L9.8 9.8 Z" />
          </motion.svg>
        </div>
      </div>
    </section>
  );
}
