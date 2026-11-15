import { describe, expect, it } from 'vitest'
import { firstFreeRange, sectionRuns } from '@/components/pages/admin/quiz/SectionQuestionMap'

const p = (id, startPosition, endPosition) => ({ id, title: `P${id}`, startPosition, endPosition })
const shape = (runs) => runs.map((r) => `${r.kind}:${r.start}-${r.end}`)

describe('sectionRuns', () => {
  it('splits a section into passages and the random numbers between them', () => {
    expect(shape(sectionRuns(10, [p(1, 1, 4), p(2, 7, 8)]))).toEqual(['passage:1-4', 'random:5-6', 'passage:7-8', 'random:9-10'])
  })

  it('keeps two touching passages apart', () => {
    expect(shape(sectionRuns(6, [p(1, 1, 3), p(2, 4, 6)]))).toEqual(['passage:1-3', 'passage:4-6'])
  })

  it('marks the edited range and where it overlaps another passage', () => {
    expect(shape(sectionRuns(8, [p(1, 1, 4)], { start: 3, end: 6 }))).toEqual(['passage:1-2', 'clash:3-4', 'active:5-6', 'random:7-8'])
  })

  it('a section without passages is one random run', () => {
    expect(shape(sectionRuns(5))).toEqual(['random:1-5'])
  })
})

describe('firstFreeRange', () => {
  it('suggests up to four free numbers', () => {
    expect(firstFreeRange(10, [p(1, 1, 4)])).toEqual({ start: 5, end: 8 })
    expect(firstFreeRange(10, [p(1, 1, 8)])).toEqual({ start: 9, end: 10 })
    expect(firstFreeRange(4, [p(1, 1, 4)])).toBeNull()
  })
})
