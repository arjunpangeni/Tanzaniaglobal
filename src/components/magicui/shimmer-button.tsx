import { cn } from "@/lib/utils";

export function ShimmerButton({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "relative inline-flex h-11 items-center justify-center overflow-hidden rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition hover:bg-primary/90",
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <span className="animate-shimmer pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </button>
  );
}
