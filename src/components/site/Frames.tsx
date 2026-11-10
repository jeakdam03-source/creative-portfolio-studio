import { cn } from "@/lib/utils";
import type { ProjectImage } from "@/content/projects";

export function BrowserFrame({
  src,
  alt,
  className,
  width = 1440,
  height = 900,
  priority = false,
  label,
}: {
  src: string;
  alt: string;
  className?: string | undefined;
  width?: number | undefined;
  height?: number | undefined;
  priority?: boolean | undefined;
  label?: string | undefined;
}) {
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-background shadow-frame", className)}>
      <div className="flex h-7 items-center gap-1.5 border-b border-border bg-ice-soft px-3">
        <span className="size-2 rounded-full bg-deep/15" />
        <span className="size-2 rounded-full bg-deep/15" />
        <span className="size-2 rounded-full bg-deep/15" />
        {label && (
          <span className="ml-3 truncate rounded-full bg-background px-3 py-0.5 text-[10px] text-slate/60">
            {label}
          </span>
        )}
      </div>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}

export function PhoneFrame({ src, alt, className }: { src: string; alt: string; className?: string | undefined }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[260px] overflow-hidden rounded-[2rem] border-[6px] border-deep bg-deep shadow-frame",
        className,
      )}
    >
      <div className="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-deep" />
      <img src={src} alt={alt} width={600} height={1298} loading="lazy" decoding="async" className="block w-full rounded-[1.5rem]" />
    </div>
  );
}

/** Renders a project image in the frame that suits it. */
export function ProjectMedia({ image, className, priority }: { image: ProjectImage; className?: string | undefined; priority?: boolean | undefined }) {
  if (image.kind === "mobile") return <PhoneFrame src={image.src} alt={image.alt} className={className} />;
  if (image.kind === "desktop")
    return (
      <BrowserFrame
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        priority={priority}
        className={className}
      />
    );
  return (
    <div className={cn("overflow-hidden rounded-2xl border border-border bg-ice-soft shadow-frame", className)}>
      <img
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="block h-auto w-full"
      />
    </div>
  );
}
