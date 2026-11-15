'use client'

import { useId, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Expand from '@/components/app/Expand'
import { cn } from '@/lib/utils'

/** Bordered panel with a header button that expands/collapses its content. */
export default function Collapsible({ title, defaultOpen = false, children, className }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()

  return (
    <div className={cn('overflow-hidden rounded-md border', className)}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="flex w-full items-center justify-between gap-4 bg-card px-6 py-5 text-left font-semibold text-foreground"
      >
        {title}
        <ChevronDown className={cn('size-5 shrink-0 text-muted-foreground transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <Expand open={open} id={id} className={cn('bg-background', open && 'border-t')}>
        <div className="px-6 py-4">{children}</div>
      </Expand>
    </div>
  )
}
