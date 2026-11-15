'use client'

import { useSyncExternalStore } from 'react'

// Tailwind's `md` breakpoint: below it the layout is the phone layout.
const QUERY = '(max-width: 767px)'

const subscribe = (onChange) => {
  const media = window.matchMedia(QUERY)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

/** True on a phone-sized screen (and follows rotation/resizing); false during the server render. */
export function useIsPhone() {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false)
}
