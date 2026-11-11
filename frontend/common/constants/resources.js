// One entry per backend content type.
//   list    page-based list endpoint      listKey  array key in its response (flat responses ignore it)
//   item    detail / create / update / delete root
//   fields  text fields the admin form submits (files and deleted task ids are added separately)
export const RESOURCES = {
  blogs: {
    list: '/api/blogs/paginated', listKey: 'blogs', item: '/api/blogs', noun: 'blog',
    fields: ['title', 'content', 'description', 'imageRef', 'level', 'tags'],
  },
  stories: {
    list: '/api/stories', listKey: 'stories', item: '/api/stories', noun: 'story',
    fields: ['title', 'contentText', 'description', 'imageUrl', 'audioRef', 'level', 'tags', 'wordCount'],
  },
  eslAudios: {
    list: '/api/esl-audios', listKey: 'audios', item: '/api/esl-audios', noun: 'audio',
    fields: ['title', 'imageUrl', 'description', 'transcript', 'audioRef', 'level', 'tags'],
  },
  eslVideos: {
    list: '/api/esl-videos', listKey: 'videos', item: '/api/esl-videos', noun: 'video',
    fields: ['title', 'description', 'videoRef', 'level', 'tags', 'category'],
  },
  readings: {
    list: '/api/readings/paginated', listKey: 'readings', item: '/api/readings', noun: 'reading',
    fields: ['title', 'content', 'description', 'imageUrl', 'level', 'tags'],
  },
  writings: {
    list: '/api/writings/paginated', listKey: 'writings', item: '/api/writings', noun: 'writing',
    fields: ['title', 'content', 'contentImageUrl', 'description', 'imageUrl', 'level', 'tags'],
  },
  speakings: {
    list: '/api/speakings/paginated', listKey: 'speakings', item: '/api/speakings', noun: 'speaking',
    fields: ['title', 'content', 'description', 'transcript', 'videoRef', 'level', 'tags'],
  },
  // AudioForm builds its own FormData, so no field list is needed
  listenings: { list: '/api/audios/paginated', listKey: 'audios', item: '/api/audios', noun: 'listening', fields: [] },
}
