// Tag rules shared by the admin forms; the backend checks the same (middlewares/validateTags.js).
export const MAX_TAGS = 20
export const MAX_TAG_LENGTH = 50
// letters and digits in any script (English, Kurdish, Arabic, ...), spaces and - _ & ' . + #
const ALLOWED = /^[\p{L}\p{N}][\p{L}\p{N}\p{M} \-_&'.+#]*$/u

/**
 * Adds the comma-separated `draft` to `tags`: trimmed, duplicates (ignoring case) skipped.
 * Returns `{ tags, error }`; on an error nothing is added, so the draft can be fixed.
 */
export function addTags(tags, draft) {
  const incoming = draft.split(',').map((t) => t.trim()).filter(Boolean)
  const tooLong = incoming.find((t) => t.length > MAX_TAG_LENGTH)
  if (tooLong) return { tags, error: `"${tooLong.slice(0, 20)}…" is too long (max ${MAX_TAG_LENGTH} characters).` }
  const bad = incoming.find((t) => !ALLOWED.test(t))
  if (bad) return { tags, error: `"${bad}" can only use letters, numbers, spaces and - _ & ' . + #` }
  const next = [...tags]
  const seen = new Set(tags.map((t) => t.toLowerCase()))
  for (const tag of incoming) {
    if (!seen.has(tag.toLowerCase())) {
      seen.add(tag.toLowerCase())
      next.push(tag)
    }
  }
  if (next.length > MAX_TAGS) return { tags, error: `Use at most ${MAX_TAGS} tags.` }
  return { tags: next, error: null }
}
