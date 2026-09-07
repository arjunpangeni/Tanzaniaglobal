import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

export { PAGE_SIZE };

function hrefFor(params: Record<string, string | undefined>, page: number) {
  const next = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (!value || key === "page") continue;
    next.set(key, value);
  }
  if (page > 1) next.set("page", String(page));
  const query = next.toString();
  return query ? `/universities?${query}` : "/universities";
}

function pageWindow(current: number, total: number) {
  const pages: (number | "ellipsis")[] = [];
  const start = Math.max(1, current - 2);
  const end = Math.min(total, current + 2);
  if (start > 1) {
    pages.push(1);
    if (start > 2) pages.push("ellipsis");
  }
  for (let page = start; page <= end; page += 1) pages.push(page);
  if (end < total) {
    if (end < total - 1) pages.push("ellipsis");
    pages.push(total);
  }
  return pages;
}

function PageLink({
  href,
  active,
  disabled,
  children,
}: {
  href: string;
  active?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-w-9 items-center justify-center rounded-full px-3 py-2 text-sm",
        active && "border border-border bg-card font-medium text-foreground",
        !active && !disabled && "text-muted-foreground hover:bg-muted hover:text-foreground",
        disabled && "pointer-events-none opacity-40"
      )}
    >
      {children}
    </Link>
  );
}

export function UniversityPager({
  page,
  total,
  params,
}: {
  page: number;
  total: number;
  params: Record<string, string | undefined>;
}) {
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pageCount <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-1 pt-4">
      <PageLink href={hrefFor(params, Math.max(1, page - 1))} disabled={page <= 1}>
        Previous
      </PageLink>
      {pageWindow(page, pageCount).map((item, index) =>
        item === "ellipsis" ? (
          <span key={`e-${index}`} className="px-2 text-muted-foreground">
            …
          </span>
        ) : (
          <PageLink key={item} href={hrefFor(params, item)} active={item === page}>
            {item}
          </PageLink>
        )
      )}
      <PageLink href={hrefFor(params, Math.min(pageCount, page + 1))} disabled={page >= pageCount}>
        Next
      </PageLink>
    </nav>
  );
}
