import { describe, expect, test, vi } from 'vitest'

vi.mock('next/navigation', () => ({ useParams: () => ({}), useRouter: () => ({}) }))
const { levelHref } = await import('@/components/shared/resources/ResourceDetail')
const { resourceImage } = await import('@/components/shared/resources/ResourceCard')

describe('levelHref', () => {
  test.each([
    ['A1', '/levels/a1'],
    ['b1 Intermediate', '/levels/b1'],
    [' C1 Advanced', '/levels/c1'],
    ['C2 Proficient', '/levels'], // no C2 page
    ['Beginner', '/levels'],
  ])('%s -> %s', (level, href) => expect(levelHref(level)).toBe(href))
})

describe('resourceImage', () => {
  test('prefers an explicit thumbnail, then the YouTube still, then uploaded images', () => {
    expect(resourceImage({ thumbnailUrl: 't.jpg', videoRef: 'https://youtu.be/dQw4w9WgXcQ', imageUrl: 'i.jpg' })).toBe('t.jpg')
    expect(resourceImage({ videoRef: 'https://youtu.be/dQw4w9WgXcQ', imageUrl: 'i.jpg' })).toBe(
      'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    )
    expect(resourceImage({ imageUrl: 'i.jpg', imageRef: 'r.jpg' })).toBe('i.jpg')
    expect(resourceImage({ imageRef: 'r.jpg' })).toBe('r.jpg')
  })

  test('null when there is nothing to show (cards render a placeholder instead of crashing next/image)', () => {
    expect(resourceImage({})).toBeNull()
    expect(resourceImage({ videoRef: 'https://example.com/a.mp4' })).toBeNull()
  })
})
