import { describe, expect, test } from 'vitest'
import { ADMIN_SIDEBAR, isActiveItem, sidebarFor } from '@/common/constants/admin-sidebar'

describe('sidebarFor', () => {
  test('ADMIN sees every entry', () => {
    expect(sidebarFor('ADMIN')).toHaveLength(ADMIN_SIDEBAR.length)
  })

  test('MAIN_MANAGER does not see the ADMIN-only pages the middleware blocks', () => {
    const names = sidebarFor('MAIN_MANAGER').map((i) => i.name)
    expect(names).not.toEqual(expect.arrayContaining(['Users']))
    for (const hidden of ['Users', 'Approvals', 'Quiz']) expect(names).not.toContain(hidden)
    expect(names).toContain('Readings')
  })
})

describe('isActiveItem', () => {
  test.each([
    ['/admin-dashboard', '/admin-dashboard', true],
    ['/admin-dashboard', '/admin-dashboard/readings', false], // dashboard is not a prefix match
    ['/admin-dashboard/readings', '/admin-dashboard/readings', true],
    ['/admin-dashboard/readings', '/admin-dashboard/readings/157', true], // detail page keeps its section
    ['/admin-dashboard/readings', '/admin-dashboard/readingsX', false],
  ])('%s on %s -> %s', (href, pathname, expected) => {
    expect(isActiveItem(href, pathname)).toBe(expected)
  })
})
