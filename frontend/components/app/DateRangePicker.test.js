import { expect, test } from 'vitest'
import { rangeDays, rangeLabel } from '@/components/app/DateRangePicker'

const presets = [
  { label: 'Real-time', value: 'realtime' },
  { label: 'Last 7 Days', value: 7 },
]

test('rangeDays counts both ends, ignoring the time of day', () => {
  expect(rangeDays({ from: new Date(2026, 0, 1, 23, 0), to: new Date(2026, 0, 1, 1, 0) })).toBe(1)
  expect(rangeDays({ from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) })).toBe(31)
  expect(rangeDays({ from: new Date(2026, 2, 1), to: new Date(2026, 2, 31) })).toBe(31) // across a DST change
})

test('rangeLabel shows a preset label or the custom dates', () => {
  expect(rangeLabel(7, presets)).toBe('Last 7 Days')
  expect(rangeLabel({ from: new Date(2026, 0, 1), to: new Date(2026, 0, 31) }, presets)).toBe('Jan 1, 2026 – Jan 31, 2026')
  expect(rangeLabel('nope', presets)).toBe('Select range')
})
