import { describe, expect, test } from 'vitest'
import { pageItems, readPage } from '@/common/utils/pagination'

describe('pageItems', () => {
  test.each([
    [1, 1, [1]],
    [1, 0, [1]],
    [1, 3, [1, 2, 3]],
    [1, 10, [1, 2, '…', 10]],
    [5, 10, [1, '…', 4, 5, 6, '…', 10]],
    [10, 10, [1, '…', 9, 10]],
    [3, 5, [1, 2, 3, 4, 5]],
  ])('page %i of %i -> %j', (current, total, expected) => {
    expect(pageItems(current, total)).toEqual(expected)
  })

  test('always includes first, last and current exactly once', () => {
    for (let total = 2; total <= 30; total++) {
      for (let current = 1; current <= total; current++) {
        const nums = pageItems(current, total).filter((i) => i !== '…')
        expect(nums[0]).toBe(1)
        expect(nums.at(-1)).toBe(total)
        expect(nums).toContain(current)
        expect(new Set(nums).size).toBe(nums.length)
        expect(nums).toEqual([...nums].sort((a, b) => a - b))
      }
    }
  })
})

describe('readPage', () => {
  test('nested shape { data: { key, pagination } }', () => {
    const json = { success: true, data: { blogs: [{ id: 1 }], pagination: { totalPages: 4, totalItems: 30 } } }
    expect(readPage(json, 'blogs')).toEqual({ items: [{ id: 1 }], totalPages: 4, totalItems: 30 })
  })

  test('flat shape { data: [], pagination }', () => {
    const json = { success: true, data: [{ id: 2 }], pagination: { totalPages: 2, totalItems: 12 } }
    expect(readPage(json, 'ignored')).toEqual({ items: [{ id: 2 }], totalPages: 2, totalItems: 12 })
  })

  test('missing or malformed data yields an empty first page', () => {
    expect(readPage(null, 'blogs')).toEqual({ items: [], totalPages: 1, totalItems: 0 })
    expect(readPage({ data: { other: [] } }, 'blogs')).toEqual({ items: [], totalPages: 1, totalItems: 0 })
    expect(readPage({ data: { blogs: [], pagination: { totalPages: 0 } } }, 'blogs').totalPages).toBe(1)
  })
})
