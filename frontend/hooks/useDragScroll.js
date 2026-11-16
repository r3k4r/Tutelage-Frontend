'use client'

import { useRef } from 'react'

// movement (px) after which a press counts as a drag, not a click
const DRAG_THRESHOLD = 6

/**
 * Click-and-drag scrolling for a horizontal scroll container (a mouse has no swipe; touch and
 * trackpads already scroll natively, so only mouse pointers are handled). Spread the returned
 * props on the scroll element. The pointer is captured, so releasing anywhere ends the drag;
 * scrollLeft is written directly (no React state per frame); a drag never fires the click of
 * the link it started on. While dragging, `data-dragging` is set so CSS can pause scroll-snap.
 */
export function useDragScroll() {
  const drag = useRef(null)

  const end = (e) => {
    const el = e.currentTarget
    if (!drag.current) return
    if (el.hasPointerCapture?.(e.pointerId)) el.releasePointerCapture(e.pointerId)
    delete el.dataset.dragging // snap back on: the browser glides to the nearest card
    // keep `moved` just long enough to swallow the click that follows this pointerup (same task);
    // cleared right after, so a release with no click never eats the next real click
    const { moved } = drag.current
    drag.current = moved ? { moved, done: true } : null
    if (moved) setTimeout(() => { if (drag.current?.done) drag.current = null }, 0)
  }

  return {
    onPointerDown(e) {
      drag.current = null
      if (e.pointerType !== 'mouse' || e.button !== 0) return
      drag.current = { startX: e.clientX, startLeft: e.currentTarget.scrollLeft, moved: false, id: e.pointerId }
    },
    onPointerMove(e) {
      const d = drag.current
      if (!d || d.done || e.pointerId !== d.id) return
      const dx = e.clientX - d.startX
      if (!d.moved) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return
        d.moved = true
        e.currentTarget.setPointerCapture?.(e.pointerId)
        e.currentTarget.dataset.dragging = ''
      }
      e.currentTarget.scrollLeft = d.startLeft - dx
    },
    onPointerUp: end,
    onPointerCancel: end,
    onLostPointerCapture: end,
    // a drag that ends over a card must not open it
    onClickCapture(e) {
      if (drag.current?.moved) {
        e.preventDefault()
        e.stopPropagation()
      }
      drag.current = null
    },
    // stop the browser's own link/image drag-and-drop, which swallowed the release before
    onDragStart: (e) => e.preventDefault(),
  }
}
