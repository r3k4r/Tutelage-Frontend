// The placement test in progress, kept in localStorage so a reload continues the same test:
// same questions, answers, position and deadline (the timer counts down to `endsAt`, so a
// reload never gives extra time). Cleared once the results are shown.

const KEY = 'tutelage-placement-test'
const STAGES = ['quiz', 'form']
// an attempt abandoned longer ago than this starts over instead of jumping to the details form
const STALE_AFTER_MS = 24 * 60 * 60 * 1000

/** The saved attempt `{ questions, answers, index, stage, endsAt }`, or null if none/invalid/stale. */
export function loadAttempt(now = Date.now()) {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    const valid =
      saved &&
      Array.isArray(saved.questions) &&
      saved.questions.length > 0 &&
      STAGES.includes(saved.stage) &&
      Number.isFinite(saved.endsAt) &&
      Number.isInteger(saved.index) &&
      saved.index >= 0 &&
      saved.index < saved.questions.length &&
      saved.answers &&
      typeof saved.answers === 'object'
    if (!valid || now - saved.endsAt > STALE_AFTER_MS) {
      clearAttempt()
      return null
    }
    return saved
  } catch {
    return null // unreadable or storage blocked: start a new test
  }
}

export function saveAttempt({ questions, answers, index, stage, endsAt }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ questions, answers, index, stage, endsAt }))
  } catch {
    // storage full or blocked: the test still works, it just won't survive a reload
  }
}

export function clearAttempt() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    // storage blocked: nothing was saved
  }
}

/** Seconds left until `endsAt` (never negative). */
export const secondsLeft = (endsAt, now = Date.now()) => Math.max(0, Math.ceil((endsAt - now) / 1000))
