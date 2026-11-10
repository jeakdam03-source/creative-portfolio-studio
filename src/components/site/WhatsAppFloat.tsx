import { motion, useReducedMotion } from "motion/react";

import { whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "./icons";

/** Floating WhatsApp button shown on every page. Kept small and in the corner so it never covers content. */
export function WhatsAppFloat() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Oluwayemisi on WhatsApp (opens in a new tab)"
      initial={reduce ? false : { opacity: 0, scale: 0.6, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-lift ring-4 ring-background sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.8s]" />
      <WhatsAppIcon className="size-7" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-deep px-3 py-1.5 text-xs font-medium text-deep-foreground opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
