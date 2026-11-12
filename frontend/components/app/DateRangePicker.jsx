'use client'

import { useState } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'

const formatDay = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

/** Inclusive number of days in a { from, to } range. */
export const rangeDays = ({ from, to }) => Math.round((startOfDay(to) - startOfDay(from)) / 86_400_000) + 1
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

/** Label for a value: a preset's label, or "Jan 1, 2026 – Jan 31, 2026" for a custom range. */
export const rangeLabel = (value, presets) =>
  typeof value === 'object' && value?.from
    ? `${formatDay(value.from)} – ${formatDay(value.to)}`
    : presets.find((p) => p.value === value)?.label ?? 'Select range'

/**
 * Presets on the left, a two-month calendar for a custom range on the right.
 * value: a preset's `value`, or { from: Date, to: Date }. Future days are disabled; a custom range
 * is limited to `maxDays`.
 */
export default function DateRangePicker({ value, onChange, presets, maxDays = 92, align = 'end' }) {
  const [open, setOpen] = useState(false)
  const custom = typeof value === 'object' && value?.from ? value : null
  const [draft, setDraft] = useState(custom)
  const today = new Date()

  const choosePreset = (preset) => {
    onChange(preset)
    setDraft(null)
    setOpen(false)
  }
  const apply = () => {
    onChange({ from: draft.from, to: draft.to ?? draft.from })
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (next) setDraft(custom) // reopen shows the applied range, not an abandoned draft
      }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="min-w-44 justify-between">
          <span className="flex items-center gap-2 truncate">
            <CalendarDays className="size-4" />
            {rangeLabel(value, presets)}
          </span>
          <ChevronDown className="size-4 opacity-60" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="flex w-auto flex-col sm:flex-row">
        <ul className="flex flex-wrap gap-1 border-b p-2 sm:w-40 sm:flex-col sm:flex-nowrap sm:border-e sm:border-b-0" aria-label="Quick ranges">
          {presets.map((p) => (
            <li key={String(p.value)}>
              <button
                type="button"
                onClick={() => choosePreset(p.value)}
                className={cn(
                  'w-full rounded-md px-3 py-1.5 text-start text-sm transition-colors',
                  value === p.value ? 'bg-primary text-primary-foreground' : 'hover:bg-primary/10 hover:text-primary',
                )}
              >
                {p.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex flex-col">
          <Calendar
            mode="range"
            numberOfMonths={2}
            defaultMonth={draft?.from ?? new Date(today.getFullYear(), today.getMonth() - 1, 1)}
            selected={draft ?? undefined}
            onSelect={setDraft}
            disabled={{ after: today }}
            max={maxDays}
          />
          <div className="flex items-center justify-between gap-2 border-t p-3">
            <p className="text-xs text-muted-foreground">
              {draft?.from
                ? `${formatDay(draft.from)} – ${draft.to ? formatDay(draft.to) : '…'}`
                : `Pick a start and end date (up to ${maxDays} days)`}
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={() => setDraft(null)} disabled={!draft}>
                Clear
              </Button>
              <Button type="button" size="sm" onClick={apply} disabled={!draft?.from}>
                Apply
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
