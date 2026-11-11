import { beforeEach, describe, expect, test, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'

// Minimal App Router double: the URL lives in `current`, router.push rewrites it.
const nav = vi.hoisted(() => ({ current: new URL('http://site.test/esl-resources/blogs'), push: null }))
vi.mock('next/navigation', () => ({
  usePathname: () => nav.current.pathname,
  useSearchParams: () => nav.current.searchParams,
  useRouter: () => ({ push: nav.push }),
}))
vi.mock('@/common/utils/api', () => ({ api: vi.fn() }))

const { api } = await import('@/common/utils/api')
const { usePaginatedList } = await import('@/hooks/usePaginatedList')

const pageOf = (ids, totalPages = 3) => ({
  ok: true,
  data: { success: true, data: { blogs: ids.map((id) => ({ id })), pagination: { totalPages, totalItems: 25 } } },
})

beforeEach(() => {
  nav.current = new URL('http://site.test/esl-resources/blogs')
  nav.push = vi.fn((href) => {
    nav.current = new URL(href, 'http://site.test')
  })
  api.mockReset()
})

describe('usePaginatedList', () => {
  test('loads page 1 with the limit and params', async () => {
    api.mockResolvedValue(pageOf([1, 2]))
    const { result } = renderHook(() =>
      usePaginatedList('/api/blogs/paginated', { listKey: 'blogs', limit: 6, params: { level: 'A1' } }),
    )
    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(api).toHaveBeenCalledWith('/api/blogs/paginated', { query: { level: 'A1', page: 1, limit: 6 } })
    expect(result.current.items).toEqual([{ id: 1 }, { id: 2 }])
    expect(result.current).toMatchObject({ page: 1, totalPages: 3, totalItems: 25, error: null })
  })

  test('reads the starting page from ?page=', async () => {
    nav.current = new URL('http://site.test/esl-resources/blogs?page=3')
    api.mockResolvedValue(pageOf([9]))
    const { result } = renderHook(() => usePaginatedList('/api/blogs/paginated', { listKey: 'blogs' }))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.page).toBe(3)
    expect(api.mock.calls[0][1].query.page).toBe(3)
  })

  test('setPage writes ?page= without scrolling, and page 1 removes it', () => {
    api.mockResolvedValue(pageOf([1]))
    const { result } = renderHook(() => usePaginatedList('/api/blogs/paginated', { listKey: 'blogs' }))
    act(() => result.current.setPage(2))
    expect(nav.push).toHaveBeenLastCalledWith('/esl-resources/blogs?page=2', { scroll: false })
    act(() => result.current.setPage(1))
    expect(nav.push).toHaveBeenLastCalledWith('/esl-resources/blogs', { scroll: false })
  })

  test('changing params returns to page 1', async () => {
    nav.current = new URL('http://site.test/admin/blogs?page=4')
    api.mockResolvedValue(pageOf([1]))
    const { rerender } = renderHook(({ search }) => usePaginatedList('/api/x', { listKey: 'blogs', params: { search } }), {
      initialProps: { search: '' },
    })
    expect(nav.push).not.toHaveBeenCalled() // first render honors ?page=4
    rerender({ search: 'grammar' })
    expect(nav.push).toHaveBeenCalledWith('/admin/blogs', { scroll: false })
  })

  test('API failure surfaces the message and clears items', async () => {
    api.mockResolvedValue({ ok: false, status: 500, data: null, message: 'boom' })
    const { result } = renderHook(() => usePaginatedList('/api/x', { listKey: 'blogs' }))
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current).toMatchObject({ items: [], error: 'boom', totalPages: 1 })
  })

  test('reload refetches the same page', async () => {
    api.mockResolvedValue(pageOf([1]))
    const { result } = renderHook(() => usePaginatedList('/api/x', { listKey: 'blogs' }))
    await waitFor(() => expect(result.current.loading).toBe(false))
    act(() => result.current.reload())
    await waitFor(() => expect(api).toHaveBeenCalledTimes(2))
  })

  test('a stale response cannot overwrite a newer one', async () => {
    let resolveFirst
    api.mockImplementationOnce(() => new Promise((r) => { resolveFirst = r }))
    api.mockResolvedValueOnce(pageOf([2]))
    const { result } = renderHook(() => usePaginatedList('/api/x', { listKey: 'blogs' }))
    act(() => result.current.reload())
    await waitFor(() => expect(result.current.items).toEqual([{ id: 2 }]))
    await act(async () => resolveFirst(pageOf([1])))
    expect(result.current.items).toEqual([{ id: 2 }])
  })
})
