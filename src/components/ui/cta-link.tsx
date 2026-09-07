import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VariantProps } from "class-variance-authority";

type Props = VariantProps<typeof buttonVariants> & {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export function CtaLink({ href, children, variant, size = "default", className, onClick }: Props) {
  return (
    <Link href={href} onClick={onClick} className={cn(buttonVariants({ variant, size }), className)}>
      {children}
    </Link>
  );
}
