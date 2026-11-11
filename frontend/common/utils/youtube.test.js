import { describe, expect, test } from 'vitest'
import { youtubeEmbedUrl, youtubeId, youtubeThumbnail } from '@/common/utils/youtube'

describe('youtubeId', () => {
  test.each([
    ['https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/watch?feature=share&v=dQw4w9WgXcQ&t=10', 'dQw4w9WgXcQ'],
    ['https://youtu.be/dQw4w9WgXcQ?si=abc', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/embed/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
    ['https://www.youtube.com/shorts/dQw4w9WgXcQ', 'dQw4w9WgXcQ'],
  ])('%s', (url, id) => {
    expect(youtubeId(url)).toBe(id)
  })

  test.each([[null], [''], ['https://example.com/audio.mp3'], ['not a url']])('%s -> null', (url) => {
    expect(youtubeId(url)).toBeNull()
  })
})

test('embed and thumbnail URLs', () => {
  const url = 'https://youtu.be/dQw4w9WgXcQ'
  expect(youtubeEmbedUrl(url)).toBe('https://www.youtube.com/embed/dQw4w9WgXcQ')
  expect(youtubeThumbnail(url)).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg')
  expect(youtubeThumbnail(url, 'maxresdefault')).toBe('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg')
  expect(youtubeEmbedUrl('https://example.com/x.mp3')).toBeNull()
})
