import { cn } from '@/lib/utils'

/**
 * Opens and closes its children by height, done in CSS (grid rows 0fr -> 1fr) instead of
 * framer-motion's `height: 'auto'`, which re-measures and writes the height from JS on every
 * frame and stutters while React is busy. Closed content stays mounted but `inert` (not
 * focusable, hidden from screen readers), so the close animation needs no AnimatePresence.
 */
export default function Expand({ open, id, className, children }) {
  return (
    <div
      id={id}
      inert={!open}
      className={cn(
        'grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none',
        open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
      )}
    >
      <div className={cn('min-h-0 overflow-hidden', className)}>{children}</div>
    </div>
  )
}
