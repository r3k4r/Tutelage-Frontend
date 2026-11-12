// One entry per backend content type.
//   list    page-based list endpoint      listKey  array key in its response (flat responses ignore it)
//   item    detail / create / update / delete root
// Each type's admin form fields live in resource-forms.js.
export const RESOURCES = {
  blogs: { list: '/api/blogs/paginated', listKey: 'blogs', item: '/api/blogs', noun: 'blog' },
  stories: { list: '/api/stories', listKey: 'stories', item: '/api/stories', noun: 'story' },
  eslAudios: { list: '/api/esl-audios', listKey: 'audios', item: '/api/esl-audios', noun: 'audio' },
  eslVideos: { list: '/api/esl-videos', listKey: 'videos', item: '/api/esl-videos', noun: 'video' },
  readings: { list: '/api/readings/paginated', listKey: 'readings', item: '/api/readings', noun: 'reading' },
  writings: { list: '/api/writings/paginated', listKey: 'writings', item: '/api/writings', noun: 'writing' },
  speakings: { list: '/api/speakings/paginated', listKey: 'speakings', item: '/api/speakings', noun: 'speaking' },
  listenings: { list: '/api/audios/paginated', listKey: 'audios', item: '/api/audios', noun: 'listening' },
}
