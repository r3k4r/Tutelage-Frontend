import { cn } from '@/lib/utils'

/**
 * The site's "nothing here" block: an icon in a soft brand circle, a title, one helpful
 * sentence and an optional action (a <Button>/<Link>). `tone="error"` for a failed load.
 * Spans a whole grid row (`col-span-full`), so it can sit inside a card grid.
 */
export default function EmptyState({ icon: Icon, title, children, action, tone = 'empty', as: Heading = 'h3', className }) {
  const error = tone === 'error'
  return (
    <div
      role={error ? 'alert' : 'status'}
      className={cn('col-span-full flex flex-col items-center px-4 py-16 text-center sm:py-20', className)}
    >
      {Icon && (
        <span
          aria-hidden
          className={cn(
            'flex size-16 items-center justify-center rounded-full ring-8',
            error ? 'bg-destructive/10 text-destructive ring-destructive/5' : 'bg-primary/10 text-primary ring-primary/5',
          )}
        >
          <Icon className="size-7" />
        </span>
      )}
      <Heading className="mt-6 text-xl font-semibold text-foreground">{title}</Heading>
      {children && <p className="mt-2 max-w-md text-muted-foreground">{children}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
