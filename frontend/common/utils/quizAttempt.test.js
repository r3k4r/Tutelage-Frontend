import { describe, expect, it } from 'vitest'
import { clearAttempt, loadAttempt, saveAttempt, secondsLeft } from '@/common/utils/quizAttempt'

const attempt = (over = {}) => ({ questions: [{ id: 1 }, { id: 2 }], answers: { 0: 2 }, index: 1, stage: 'quiz', endsAt: 1_000_000, ...over })

describe('quizAttempt', () => {
  it('round-trips a test in progress', () => {
    saveAttempt(attempt())
    expect(loadAttempt(900_000)).toEqual(attempt())
    clearAttempt()
    expect(loadAttempt()).toBeNull()
  })

  it('drops broken or finished attempts', () => {
    for (const bad of [{ stage: 'results' }, { questions: [] }, { index: 5 }, { endsAt: 'soon' }, { answers: null }]) {
      saveAttempt(attempt(bad))
      expect(loadAttempt(900_000)).toBeNull()
    }
    localStorage.setItem('tutelage-placement-test', '{not json')
    expect(loadAttempt()).toBeNull()
  })

  it('keeps an expired attempt for a day (to reach the form), then starts over', () => {
    saveAttempt(attempt())
    expect(loadAttempt(1_000_000 + 60_000)).not.toBeNull()
    expect(loadAttempt(1_000_000 + 25 * 60 * 60 * 1000)).toBeNull()
  })

  it('counts down to the deadline, never below zero', () => {
    expect(secondsLeft(10_000, 0)).toBe(10)
    expect(secondsLeft(10_000, 9_500)).toBe(1)
    expect(secondsLeft(10_000, 20_000)).toBe(0)
  })
})
