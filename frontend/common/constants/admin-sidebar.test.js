import { describe, expect, test } from 'vitest'
import { ADMIN_SIDEBAR, isActiveGroup, isActiveItem, sidebarFor } from '@/common/constants/admin-sidebar'

const flatNames = (entries) => entries.flatMap((e) => (e.items ? e.items.map((i) => i.name) : [e.name]))

describe('sidebarFor', () => {
  test('ADMIN sees every entry', () => {
    expect(flatNames(sidebarFor('ADMIN'))).toEqual(flatNames(ADMIN_SIDEBAR))
  })

  test('MAIN_MANAGER does not see the ADMIN-only pages the middleware blocks', () => {
    const names = flatNames(sidebarFor('MAIN_MANAGER'))
    for (const hidden of ['Users', 'Approvals', 'Quiz']) expect(names).not.toContain(hidden)
    expect(names).toEqual(expect.arrayContaining(['Reading', 'Landing']))
  })

  test('a group with no visible children is dropped', () => {
    const managementOnlyAdmin = sidebarFor('MAIN_MANAGER').find((e) => e.key === 'management')
    expect(managementOnlyAdmin.items.map((i) => i.name)).toEqual(['Landing'])
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

  test('a group is active through its children', () => {
    const skills = ADMIN_SIDEBAR.find((e) => e.key === 'skills')
    expect(isActiveGroup(skills, '/admin-dashboard/writings/3')).toBe(true)
    expect(isActiveGroup(skills, '/admin-dashboard/blogs')).toBe(false)
  })
})
