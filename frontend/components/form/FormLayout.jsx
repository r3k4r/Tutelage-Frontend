'use client'

import { Loader2, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Every admin form page: header (back + breadcrumb) on top, a scrolling body of FormSections,
 * and a sticky action bar at the bottom. Render it as the <form> itself:
 *   <FormPage header={<PageHeader …/>} onSubmit={…} actions={<FormActions …/>}>sections</FormPage>
 */
export function FormPage({ header, actions, onSubmit, formRef, children }) {
  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="flex h-full flex-col gap-4">
      {header}
      <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
      {actions}
    </form>
  )
}

/** A titled card grouping related fields. */
export function FormSection({ title, description, className, children }) {
  return (
    <section className={cn('rounded-lg border bg-card', className)}>
      <header className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">{title}</h2>
        {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
      </header>
      <div className="space-y-4 p-4">{children}</div>
    </section>
  )
}

/** Sticky action bar: an error hint on the left, Cancel + Submit on the right. */
export function FormActions({ submitting, submitLabel, onCancel, error }) {
  return (
    <div className="flex shrink-0 items-center justify-end gap-2 border-t pt-4">
      {error && (
        <p role="alert" className="me-auto text-sm text-destructive">
          {error}
        </p>
      )}
      <Button type="button" variant="outline" onClick={onCancel} disabled={submitting}>
        Cancel
      </Button>
      <Button type="submit" disabled={submitting}>
        {submitting && <Loader2 className="size-4 animate-spin" />}
        {submitLabel}
      </Button>
    </div>
  )
}

/** Field wrapper: label, control, hint and error, with the spacing every form uses. */
export function FormField({ label, htmlFor, required, hint, error, errorId, name, children }) {
  return (
    <div className="space-y-1.5" data-field={name}>
      <label htmlFor={htmlFor} className="flex items-center gap-1 text-sm font-medium leading-none">
        {label}
        {required && <span className="text-destructive">*</span>}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-xs text-destructive">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  )
}

/** Shown instead of an edit form whose record failed to load — never an empty form that would blank it. */
export function LoadError({ what, onRetry }) {
  return (
    <div role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-6 text-sm">
      <p className="font-medium text-destructive">Couldn&apos;t load this {what}.</p>
      <p className="mt-1 text-muted-foreground">It may have been deleted, or the server is unreachable.</p>
      <Button type="button" variant="outline" size="sm" className="mt-4" onClick={onRetry}>
        <RefreshCw className="size-4" />
        Try again
      </Button>
    </div>
  )
}

/** Placeholder with the form's footprint while the record loads. */
export function FormSkeleton() {
  return (
    <div className="grid animate-pulse gap-4 xl:grid-cols-3" aria-busy>
      <div className="h-96 rounded-lg border bg-card xl:col-span-2" />
      <div className="h-96 rounded-lg border bg-card" />
    </div>
  )
}
