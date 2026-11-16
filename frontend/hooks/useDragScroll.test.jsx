import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { useDragScroll } from '@/hooks/useDragScroll'

function Track({ onCardClick }) {
  const drag = useDragScroll()
  return (
    <div data-testid="track" {...drag}>
      <a href="#card" onClick={onCardClick}>
        Card
      </a>
    </div>
  )
}

const pointer = (type, el, clientX, extra = {}) =>
  fireEvent[type](el, { pointerId: 1, pointerType: 'mouse', button: 0, clientX, ...extra })

describe('useDragScroll', () => {
  test('dragging moves scrollLeft and always lets go on release', () => {
    render(<Track />)
    const track = screen.getByTestId('track')
    track.scrollLeft = 100
    pointer('pointerDown', track, 300)
    pointer('pointerMove', track, 220)
    expect(track.scrollLeft).toBe(180)
    expect(track.dataset.dragging).toBe('')
    pointer('pointerUp', track, 220)
    expect(track.dataset.dragging).toBeUndefined()
    // after release, moving the mouse no longer scrolls (the old slider stayed "grabbed")
    pointer('pointerMove', track, 0)
    expect(track.scrollLeft).toBe(180)
  })

  test('a drag does not open the card it started on, a plain click does', () => {
    const onCardClick = vi.fn((e) => e.preventDefault())
    render(<Track onCardClick={onCardClick} />)
    const track = screen.getByTestId('track')
    const card = screen.getByText('Card')

    pointer('pointerDown', track, 300)
    pointer('pointerMove', track, 250)
    pointer('pointerUp', track, 250)
    fireEvent.click(card)
    expect(onCardClick).not.toHaveBeenCalled()

    pointer('pointerDown', track, 300)
    pointer('pointerUp', track, 301) // under the drag threshold: a click
    fireEvent.click(card)
    expect(onCardClick).toHaveBeenCalledTimes(1)
  })

  test('touch is left to native scrolling', () => {
    render(<Track />)
    const track = screen.getByTestId('track')
    track.scrollLeft = 50
    pointer('pointerDown', track, 300, { pointerType: 'touch' })
    pointer('pointerMove', track, 100, { pointerType: 'touch' })
    expect(track.scrollLeft).toBe(50)
  })
})
