import { describe, expect, it } from 'vitest'
import { MAX_TAGS, addTags } from '@/common/utils/tags'

describe('addTags', () => {
  it('adds trimmed tags and skips duplicates ignoring case', () => {
    expect(addTags(['Grammar'], ' grammar , Past tense,,')).toEqual({ tags: ['Grammar', 'Past tense'], error: null })
  })

  it('accepts Kurdish and Arabic', () => {
    expect(addTags([], 'ڕێزمان, قواعد').error).toBeNull()
  })

  it('rejects bad input without adding anything', () => {
    expect(addTags(['a'], 'x'.repeat(51))).toMatchObject({ tags: ['a'], error: expect.stringMatching(/too long/) })
    expect(addTags([], '<b>').error).toMatch(/only use letters/)
    const full = Array.from({ length: MAX_TAGS }, (_, i) => `t${i}`)
    expect(addTags(full, 'one more')).toMatchObject({ tags: full, error: expect.stringMatching(/at most/) })
  })
})
