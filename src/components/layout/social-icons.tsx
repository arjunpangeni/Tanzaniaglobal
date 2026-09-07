import { site } from "@/content/site";
import { cn } from "@/lib/utils";

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl transition hover:scale-105 hover:opacity-90"
    >
      {children}
    </a>
  );
}

export function SocialIcons({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <IconLink href={site.social.instagram} label="Instagram">
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
          <defs>
            <radialGradient id="tz-ig" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#tz-ig)" />
          <path
            fill="none"
            stroke="#fff"
            strokeWidth="1.55"
            d="M16.4 3.75H7.6A3.85 3.85 0 0 0 3.75 7.6v8.8a3.85 3.85 0 0 0 3.85 3.85h8.8a3.85 3.85 0 0 0 3.85-3.85V7.6A3.85 3.85 0 0 0 16.4 3.75z"
          />
          <circle cx="12" cy="12" r="3.35" fill="none" stroke="#fff" strokeWidth="1.55" />
          <circle cx="16.7" cy="7.3" r="1.05" fill="#fff" />
        </svg>
      </IconLink>
      <IconLink href={site.social.facebook} label="Facebook">
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
          <circle cx="12" cy="12" r="12" fill="#1877F2" />
          <path
            fill="#fff"
            d="M16.67 15.4l.53-3.47h-3.33V9.68c0-.95.47-1.87 1.96-1.87h1.51V4.86s-1.37-.24-2.69-.24c-2.74 0-4.53 1.66-4.53 4.67v2.89H7.08v3.47h3.05v8.38a12.2 12.2 0 0 0 3.75 0V15.4h2.79z"
          />
        </svg>
      </IconLink>
      <IconLink href={site.social.linkedin} label="LinkedIn">
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
          <rect width="24" height="24" rx="3" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.15 9.25H4.7V19.2h2.45V9.25zM5.92 4.8a1.42 1.42 0 1 0 .01 2.84 1.42 1.42 0 0 0-.01-2.84zM19.3 19.2h-2.44v-5.08c0-1.42-.51-2.39-1.67-2.39-.91 0-1.45.61-1.69 1.21-.09.21-.11.5-.11.8V19.2h-2.44s.03-9.41 0-10.5h2.44v1.49c.33-.5 1.15-1.68 3.18-1.68 2.32 0 4.06 1.52 4.06 4.78V19.2z"
          />
        </svg>
      </IconLink>
      <IconLink href={site.social.x} label="X">
        <svg viewBox="0 0 24 24" className="size-8" aria-hidden>
          <rect width="24" height="24" rx="4" className="fill-black dark:fill-white" />
          <path
            className="fill-white dark:fill-black"
            d="M16.6 6.2h1.86l-4.06 4.64 4.78 6.32h-3.75l-2.65-3.5-3.03 3.5H8.9l4.34-4.96-4.34-6h3.84l2.39 3.3 2.47-3.3zm-.65 9.85h1.03L8.98 7.2H7.87l7.08 8.85z"
          />
        </svg>
      </IconLink>
    </div>
  );
}
