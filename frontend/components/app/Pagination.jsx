'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { pageItems } from '@/common/utils/pagination'
import { cn } from '@/lib/utils'

/** Compact pager aligned to the end of its row: Previous · page numbers · Next. */
export default function Pagination({ page, totalPages, onPageChange, disabled = false, className }) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className={cn('flex items-center justify-end gap-1', className)}>
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={disabled || page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft className="size-4" />
        <span className="hidden sm:inline">Previous</span>
      </Button>

      <p className="px-2 text-sm text-muted-foreground sm:hidden" aria-live="polite">
        Page {page} of {totalPages}
      </p>

      <ul className="hidden items-center gap-1 sm:flex">
        {pageItems(page, totalPages).map((item, i) =>
          item === '…' ? (
            <li key={`gap-${i}`} aria-hidden className="w-8 text-center text-sm text-muted-foreground">
              …
            </li>
          ) : (
            <li key={item}>
              <Button
                variant={item === page ? 'default' : 'outline'}
                size="icon"
                className="size-8"
                onClick={() => item !== page && onPageChange(item)}
                disabled={disabled}
                aria-current={item === page ? 'page' : undefined}
                aria-label={item === page ? undefined : `Page ${item}`}
              >
                {item}
              </Button>
            </li>
          ),
        )}
      </ul>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={disabled || page >= totalPages}
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  )
}
