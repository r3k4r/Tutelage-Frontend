'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Site-wide framer-motion settings. `reducedMotion="user"` follows the device's "reduce motion"
 * setting: movement (transform/layout) is skipped and only fades remain.
 */
export default function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
