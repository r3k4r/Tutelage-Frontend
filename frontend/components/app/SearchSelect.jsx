'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { Check, ChevronsUpDown, Loader2, Search } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { cn } from '@/lib/utils'

/**
 * A select that searches the server as you type (as in portal-iq's CustomerSelect): nothing loads
 * until `minChars` letters are typed, then `loadOptions(query)` runs 300ms after typing stops.
 * Options are `{ value, label, hint?, disabled?, note? }`; `selected` is the chosen option (or null)
 * and stays shown on the trigger whatever the current results are.
 */
export default function SearchSelect({
  id,
  selected,
  onSelect,
  loadOptions,
  placeholder = 'Select…',
  searchPlaceholder = 'Type to search…',
  minChars = 3,
  invalid,
  disabled,
  className,
}) {
  const listId = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [state, setState] = useState({ status: 'idle', options: [], query: '' })
  const [active, setActive] = useState(0)
  const debounced = useDebouncedValue(query.trim(), 300)
  const latest = useRef(0)

  useEffect(() => {
    if (debounced.length < minChars) {
      setState({ status: 'idle', options: [], query: '' })
      return
    }
    const call = ++latest.current
    setState((s) => ({ ...s, status: 'loading' }))
    loadOptions(debounced).then(
      (options) => call === latest.current && (setState({ status: 'done', options, query: debounced }), setActive(0)),
      () => call === latest.current && setState({ status: 'error', options: [], query: debounced }),
    )
  }, [debounced, minChars, loadOptions])

  const tooShort = query.trim().length < minChars
  const options = tooShort ? [] : state.options
  const choose = (option) => {
    if (option.disabled) return
    onSelect(option)
    setOpen(false)
  }
  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault()
      if (!options.length) return
      setActive((i) => (i + (e.key === 'ArrowDown' ? 1 : -1) + options.length) % options.length)
    } else if (e.key === 'Enter') {
      e.preventDefault() // never submit the surrounding form from the search box
      if (options[active]) choose(options[active])
    }
  }

  let message = null
  if (tooShort) message = `Type at least ${minChars} characters to search`
  else if (state.status === 'loading' && !options.length) message = 'Searching…'
  else if (state.status === 'error') message = "Couldn't search right now. Try again."
  else if (state.status === 'done' && !options.length && state.query === query.trim()) message = 'No results found'

  return (
    <Popover open={open} onOpenChange={(next) => (setOpen(next), next || setQuery(''))}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          id={id}
          type="button"
          aria-invalid={invalid}
          aria-haspopup="listbox"
          className={cn(
            'flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 text-left text-sm shadow-xs outline-none transition-[color,box-shadow] dark:bg-input/30 dark:hover:bg-input/50',
            'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
        >
          <span className={cn('truncate', !selected && 'text-muted-foreground')}>{selected?.label ?? placeholder}</span>
          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-[var(--radix-popover-trigger-width)] min-w-72 p-0">
        <div className="flex items-center gap-2 border-b px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
          <input
            autoFocus
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={options[active] ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={searchPlaceholder}
            className="h-10 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          {state.status === 'loading' && !tooShort && <Loader2 className="size-4 shrink-0 animate-spin text-muted-foreground" aria-hidden />}
        </div>
        <ul id={listId} role="listbox" className="max-h-72 overflow-y-auto p-1">
          {message && <li className="px-2 py-6 text-center text-sm text-muted-foreground">{message}</li>}
          {options.map((option, i) => (
            <li
              key={option.value}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={selected?.value === option.value}
              aria-disabled={option.disabled || undefined}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => e.preventDefault()} // keep focus in the search box
              onClick={() => choose(option)}
              className={cn(
                'flex cursor-pointer items-start gap-2 rounded-md px-2 py-2 text-sm',
                i === active && !option.disabled && 'bg-primary/10 text-primary',
                option.disabled && 'cursor-not-allowed opacity-50',
              )}
            >
              <Check className={cn('mt-0.5 size-4 shrink-0', selected?.value === option.value ? 'opacity-100' : 'opacity-0')} aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="line-clamp-2">{option.label}</span>
                {option.hint && <span className="mt-0.5 block text-xs text-muted-foreground">{option.hint}</span>}
              </span>
              {option.note && <span className="shrink-0 text-xs text-muted-foreground">{option.note}</span>}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  )
}
