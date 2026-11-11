'use client'

import { useCallback, useEffect, useState } from 'react'
import { api } from '@/common/utils/api'

/** Fetches `${endpoint}/${id}` -> `{ data, loading, notFound, reload }` (data is the response's `data`). */
export function useResource(endpoint, id) {
  const [state, setState] = useState({ data: null, loading: true, notFound: false })
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    setState((s) => ({ ...s, loading: s.data === null, notFound: false }))
    api(`${endpoint}/${id}`).then((res) => {
      if (cancelled) return
      const data = res.ok ? res.data?.data ?? null : null
      setState({ data, loading: false, notFound: !data })
    })
    return () => {
      cancelled = true
    }
  }, [endpoint, id, version])

  const reload = useCallback(() => setVersion((v) => v + 1), [])
  return { ...state, reload }
}
