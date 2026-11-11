/**
 * Title row of an admin page: title (+ optional one-line description) on the left,
 * `children` (Create button, refresh, ...) on the right. Every admin page starts with it.
 */
export default function ListingPageHeader({ title, description, children }) {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-x-10 gap-y-3">
      <div className="min-w-0">
        <h1 className="break-words text-xl font-semibold leading-tight text-foreground sm:text-2xl md:text-3xl">
          {title}
        </h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-2">{children}</div>}
    </div>
  )
}
