import { cn } from "@/lib/utils";

export function BorderBeam({
  className,
  size = 80,
  duration = 8,
}: {
  className?: string;
  size?: number;
  duration?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 rounded-[inherit] [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]",
        className
      )}
    >
      <div
        className="absolute aspect-square animate-[spin_var(--d)_linear_infinite] bg-[conic-gradient(from_90deg,transparent_0_70%,var(--tz-pink-deep)_82%,var(--tz-blue-deep)_90%,var(--tz-green-deep)_96%,var(--tz-gold)_100%)] opacity-70"
        style={
          {
            width: size,
            "--d": `${duration}s`,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
