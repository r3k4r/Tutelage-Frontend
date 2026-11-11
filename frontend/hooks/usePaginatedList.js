'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { api } from '@/common/utils/api'
import { readPage } from '@/common/utils/pagination'

/**
 * Page-based list backed by the URL (`?page=N`), so reloads and shared links keep the page.
 * Changing `params` (search, level, ...) returns to page 1.
 * Callers must sit inside <Suspense> (useSearchParams requirement in the App Router).
 */
export function usePaginatedList(endpoint, { listKey, limit = 9, params = {} } = {}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const page = Math.max(1, Number.parseInt(searchParams.get('page'), 10) || 1)

  const [state, setState] = useState({ items: [], totalPages: 1, totalItems: 0, loading: true, error: null })
  const [version, setVersion] = useState(0)
  const paramsKey = JSON.stringify(params)

  const setPage = useCallback(
    (next) => {
      const sp = new URLSearchParams(searchParams.toString())
      if (next <= 1) sp.delete('page')
      else sp.set('page', String(next))
      const qs = sp.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    },
    [router, pathname, searchParams],
  )

  // New filters -> back to page 1 (not on first render, which must honor ?page=)
  const firstRender = useRef(true)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    if (page !== 1) setPage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramsKey])

  useEffect(() => {
    let cancelled = false
    setState((s) => ({ ...s, loading: true, error: null }))
    api(endpoint, { query: { ...JSON.parse(paramsKey), page, limit } }).then((res) => {
      if (cancelled) return
      if (!res.ok) {
        setState({ items: [], totalPages: 1, totalItems: 0, loading: false, error: res.message })
        return
      }
      setState({ ...readPage(res.data, listKey), loading: false, error: null })
    })
    return () => {
      cancelled = true
    }
  }, [endpoint, listKey, limit, page, paramsKey, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])

  return { ...state, page, setPage, reload }
}
