import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Brand variants
        brand:
          "rounded-full bg-deep text-deep-foreground shadow-soft hover:-translate-y-0.5 hover:shadow-lift hover:bg-deep/95 transition-all duration-300",
        sky: "rounded-full bg-sky text-deep font-semibold shadow-soft hover:-translate-y-0.5 hover:shadow-lift hover:bg-sky-strong transition-all duration-300",
        whatsapp:
          "rounded-full bg-whatsapp text-whatsapp-foreground font-semibold shadow-soft hover:-translate-y-0.5 hover:shadow-lift transition-all duration-300",
        ghostline:
          "rounded-full border border-deep/20 bg-background text-deep hover:border-sky hover:bg-ice-soft hover:-translate-y-0.5 transition-all duration-300",
        onDeep:
          "rounded-full bg-background text-deep font-semibold hover:bg-ice hover:-translate-y-0.5 transition-all duration-300",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-12 px-6 text-[0.95rem] [&_svg]:size-[18px]",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
