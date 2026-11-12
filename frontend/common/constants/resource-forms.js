// Fields of each content type's admin form (create and edit share one page).
// kind: text | url | textarea (rows) | select (options). `section` picks the card:
// content (main column) or media (side column). Level, tags and PDFs are on every form.

export const LEVEL_OPTIONS = [
  { value: 'a1', label: 'A1 Beginner' },
  { value: 'a2', label: 'A2 Pre-intermediate' },
  { value: 'b1', label: 'B1 Intermediate' },
  { value: 'b2', label: 'B2 Upper-Intermediate' },
  { value: 'c1', label: 'C1 Advanced' },
  { value: 'c2', label: 'C2 Proficient' },
]

const VIDEO_CATEGORIES = ['Tutelage', 'Education', 'AudioBooks', 'Science', 'Technology', 'Business', 'Animation', 'Kids-Learning'].map(
  (value) => ({ value, label: value.replace('-', ' ') }),
)

const title = { name: 'title', label: 'Title', kind: 'text', required: true, section: 'content' }
const description = { name: 'description', label: 'Description', kind: 'textarea', rows: 3, section: 'content' }
const image = (name = 'imageUrl', label = 'Image URL') => ({ name, label, kind: 'url', section: 'media', placeholder: 'https://…' })

export const RESOURCE_FORMS = {
  blogs: {
    levelRequired: false,
    fields: [title, description, { name: 'content', label: 'Content', kind: 'textarea', rows: 10, required: true, section: 'content' }, image('imageRef')],
  },
  readings: {
    levelRequired: false,
    fields: [title, description, { name: 'content', label: 'Reading content', kind: 'textarea', rows: 12, required: true, section: 'content' }, image()],
  },
  writings: {
    levelRequired: true,
    fields: [
      title,
      description,
      { name: 'content', label: 'Content / guidance', kind: 'textarea', rows: 8, section: 'content' },
      image('imageUrl', 'Featured image URL'),
      image('contentImageUrl', 'Content image URL'),
    ],
  },
  speakings: {
    levelRequired: true,
    fields: [
      title,
      description,
      { name: 'content', label: 'Content', kind: 'textarea', rows: 6, section: 'content' },
      { name: 'transcript', label: 'Transcript', kind: 'textarea', rows: 8, section: 'content' },
      { name: 'videoRef', label: 'Video URL', kind: 'url', required: true, section: 'media', placeholder: 'https://youtube.com/…' },
    ],
  },
  listenings: {
    levelRequired: true,
    fields: [
      title,
      description,
      { name: 'transcript', label: 'Transcript', kind: 'textarea', rows: 10, section: 'content' },
      { name: 'audioRef', label: 'Audio URL', kind: 'url', required: true, section: 'media', placeholder: 'https://…' },
      image(),
    ],
  },
  eslAudios: {
    levelRequired: false,
    fields: [
      title,
      description,
      { name: 'transcript', label: 'Transcript', kind: 'textarea', rows: 10, section: 'content' },
      { name: 'audioRef', label: 'Audio URL', kind: 'url', required: true, section: 'media', placeholder: 'https://…' },
      image('imageUrl', 'Cover image URL'),
    ],
  },
  eslVideos: {
    levelRequired: true,
    fields: [
      title,
      description,
      { name: 'videoRef', label: 'Video URL', kind: 'url', required: true, section: 'media', placeholder: 'https://youtube.com/…' },
      { name: 'category', label: 'Category', kind: 'select', options: VIDEO_CATEGORIES, section: 'media' },
    ],
  },
  stories: {
    levelRequired: false,
    fields: [
      title,
      description,
      { name: 'contentText', label: 'Story content', kind: 'textarea', rows: 12, section: 'content' },
      image('imageUrl', 'Cover image URL'),
      { name: 'audioRef', label: 'Audio URL', kind: 'url', section: 'media', placeholder: 'https://…' },
    ],
  },
}

/** "B1 Intermediate" (stored label) -> "b1" (the value the API takes); unknown -> ''. */
export const levelValueOf = (level) => {
  const label = Array.isArray(level) ? level[0] : level
  return LEVEL_OPTIONS.find((o) => o.label === label || o.value === label)?.value ?? ''
}
