import { CalendarDays } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { getBookingUrl, whatsappLink } from "@/lib/links";
import { WhatsAppIcon } from "./icons";

type Props = Omit<ButtonProps, "asChild"> & { label?: string; message?: string };

export function WhatsAppButton({ label = "Let's Talk on WhatsApp", message, variant = "brand", size = "xl", ...rest }: Props) {
  return (
    <Button asChild variant={variant} size={size} {...rest}>
      <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer">
        <WhatsAppIcon />
        {label}
        <span className="sr-only"> (opens WhatsApp in a new tab)</span>
      </a>
    </Button>
  );
}

/** Renders only when a valid booking URL is configured in src/config/site.ts. */
export function BookingButton({ label = "Book a Consultation", variant = "ghostline", size = "xl", ...rest }: Props) {
  const url = getBookingUrl();
  if (!url) return null;
  return (
    <Button asChild variant={variant} size={size} {...rest}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        <CalendarDays />
        {label}
        <span className="sr-only"> (opens the booking calendar in a new tab)</span>
      </a>
    </Button>
  );
}
