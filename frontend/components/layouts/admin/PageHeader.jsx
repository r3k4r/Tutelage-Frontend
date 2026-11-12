import Link from 'next/link'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Header of admin detail and form pages: a back button and the breadcrumb trail (the last crumb
 * names the page, so there is no separate title). `children` are actions on the right.
 * @param crumbs [{ label, href? }]  @param backHref where the back arrow goes
 */
export default function PageHeader({ crumbs, backHref, children }) {
  const current = crumbs.at(-1)
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-3">
      <div className="flex min-w-0 items-center gap-3">
        <Button asChild variant="outline" size="icon" className="shrink-0">
          <Link href={backHref} aria-label="Back">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <nav aria-label="Breadcrumb" className="min-w-0">
          <ol className="flex min-w-0 items-center gap-1.5 text-sm">
            {crumbs.slice(0, -1).map((c) => (
              <li key={c.label} className="flex items-center gap-1.5 text-muted-foreground">
                <Link href={c.href} className="transition-colors hover:text-primary">
                  {c.label}
                </Link>
                <ChevronRight className="size-3.5" aria-hidden />
              </li>
            ))}
            <li aria-current="page" className="min-w-0">
              <h1 className="truncate text-lg font-semibold text-foreground sm:text-xl">{current.label}</h1>
            </li>
          </ol>
        </nav>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}
