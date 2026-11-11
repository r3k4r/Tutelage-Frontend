/** Extracts the video id from watch?v=, youtu.be/, embed/ and shorts/ URLs. */
export function youtubeId(url) {
  if (!url) return null
  const match = String(url).match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([a-zA-Z0-9_-]{6,})/)
  return match ? match[1] : null
}

export function youtubeEmbedUrl(url) {
  const id = youtubeId(url)
  return id ? `https://www.youtube.com/embed/${id}` : null
}

/** `hqdefault` always exists; `maxresdefault` is sharper but 404s for some videos. */
export function youtubeThumbnail(url, quality = 'hqdefault') {
  const id = youtubeId(url)
  return id ? `https://img.youtube.com/vi/${id}/${quality}.jpg` : null
}
