'use client'

import { useEffect, useState } from 'react'

/** Returns `value` once it has stopped changing for `delay` ms (search boxes). */
export function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(id)
  }, [value, delay])
  return debounced
}
