/**
 * Page buttons to show: first, last, and a window around the current page,
 * with '…' for gaps. e.g. (5, 10) -> [1, '…', 4, 5, 6, '…', 10]
 */
export function pageItems(current, total, siblings = 1) {
  if (total <= 1) return [1]
  const start = Math.max(2, current - siblings)
  const end = Math.min(total - 1, current + siblings)
  const items = [1]
  if (start > 2) items.push('…')
  for (let p = start; p <= end; p++) items.push(p)
  if (end < total - 1) items.push('…')
  items.push(total)
  return items
}

/**
 * Normalizes the backend's two paginated shapes:
 *   { data: { <listKey>: [...], pagination } }  (blogs, readings, stories, ...)
 *   { data: [...], pagination }                 (esl-audios, esl-videos)
 */
export function readPage(json, listKey) {
  const nested = json?.data && !Array.isArray(json.data)
  const items = nested ? json.data[listKey] : json?.data
  const pagination = (nested ? json.data.pagination : json?.pagination) || {}
  return {
    items: Array.isArray(items) ? items : [],
    totalPages: Math.max(1, Number(pagination.totalPages) || 1),
    totalItems: Number(pagination.totalItems) || 0,
  }
}
