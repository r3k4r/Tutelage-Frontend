'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useDragScroll } from '@/hooks/useDragScroll'
import { api } from '@/common/utils/api'
import { cn } from '@/lib/utils'

// cards per view: ~1.2 on phones, 2 on tablets, 3 on laptops, 3.5 on wide screens (gap-4 = 1rem)
const CARD = 'shrink-0 snap-start basis-[82%] sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)] xl:basis-[calc((100%-3rem)/3.5)]'

/**
 * Home "Practice anytime" carousel of the day's featured resources. A native horizontal
 * scroller with snap points: touch and trackpads swipe with momentum, a mouse can drag it
 * (useDragScroll), and the arrows move one card. Hidden when nothing is featured.
 */
export default function Practice() {
  const [items, setItems] = useState(null) // null = loading
  const [ends, setEnds] = useState({ start: true, end: false })
  const trackRef = useRef(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const drag = useDragScroll()

  useEffect(() => {
    let mounted = true
    api('/api/esl-resources/daily-featured').then((res) => {
      if (mounted) setItems(res.ok && Array.isArray(res.data?.data) ? res.data.data : [])
    })
    return () => {
      mounted = false
    }
  }, [])

  // which ends are reached, to disable the arrows there (read once per frame while scrolling)
  const frame = useRef(0)
  const updateEnds = useCallback(() => {
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const el = trackRef.current
      if (!el) return
      setEnds({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 })
    })
  }, [])
  useEffect(() => {
    updateEnds()
    window.addEventListener('resize', updateEnds)
    return () => window.removeEventListener('resize', updateEnds)
  }, [items, updateEnds])

  // one card (its width plus the gap) per click; the browser's smooth scroll does the animation
  const step = (direction) => {
    const el = trackRef.current
    const card = el?.firstElementChild
    if (!card) return
    el.scrollBy({ left: direction * (card.getBoundingClientRect().width + 16), behavior: 'smooth' })
  }

  // nothing featured (or the request failed): leave the section out of the page entirely
  if (items && items.length === 0) return null

  // at an end the arrow stays in place, greyed out and inert
  const arrow =
    'absolute top-1/2 z-10 hidden size-12 -translate-y-1/2 rounded-full shadow-lg md:inline-flex disabled:bg-muted disabled:text-muted-foreground disabled:opacity-100 disabled:shadow-none'

  return (
    <section ref={sectionRef} className="bg-background px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
        >
          Practice anytime with our free resources
        </motion.h2>

        <div className="relative md:px-16">
          <Button size="icon" className={cn(arrow, 'left-0')} onClick={() => step(-1)} disabled={ends.start} aria-label="Previous resources">
            <ChevronLeft className="size-6" />
          </Button>

          <ul
            ref={trackRef}
            {...drag}
            onScroll={updateEnds}
            aria-label="Free practice resources"
            className={cn(
              'flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-smooth pb-4 select-none',
              '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:cursor-grab',
              // while a mouse drags: follow the hand exactly (no snapping, no smoothing)
              'data-[dragging]:cursor-grabbing data-[dragging]:snap-none data-[dragging]:scroll-auto motion-reduce:scroll-auto',
            )}
          >
            {items === null
              ? Array.from({ length: 4 }, (_, i) => (
                  <li key={i} className={CARD} aria-hidden>
                    <div className="overflow-hidden rounded-lg border bg-card">
                      <div className="aspect-video animate-pulse bg-muted" />
                      <div className="space-y-2 p-5">
                        <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                        <div className="h-4 w-full animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  </li>
                ))
              : items.map((item) => (
                  <li key={`${item.resourceType}-${item.id}`} className={CARD}>
                    <Link
                      href={item.link || `/esl-resources/blogs/${item.id}`}
                      draggable={false}
                      className="block h-full overflow-hidden rounded-lg border bg-card shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <div className="aspect-video overflow-hidden bg-muted">
                        {(item.imageRef || item.imageUrl) && (
                          <img
                            src={item.imageRef || item.imageUrl}
                            alt=""
                            loading="lazy"
                            draggable={false}
                            className="size-full object-cover"
                            // a dead image link leaves the quiet muted block, not a broken-image icon
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        )}
                      </div>
                      <div className="p-4 sm:p-5">
                        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-foreground sm:text-xl">{item.title}</h3>
                        {item.description && <p className="line-clamp-2 text-sm text-muted-foreground sm:text-base">{item.description}</p>}
                      </div>
                    </Link>
                  </li>
                ))}
          </ul>

          <Button size="icon" className={cn(arrow, 'right-0')} onClick={() => step(1)} disabled={ends.end} aria-label="Next resources">
            <ChevronRight className="size-6" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 flex justify-center"
        >
          <Button asChild size="lg" className="px-8 py-6 text-base font-semibold shadow-md sm:text-lg">
            <Link href="/esl-resources">All Resources</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
