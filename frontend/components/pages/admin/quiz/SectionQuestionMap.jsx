'use client'

import Link from 'next/link'
import { BookOpen, Plus, Shuffle } from 'lucide-react'
import { cn } from '@/lib/utils'

const PASSAGES_HREF = '/admin-dashboard/quiz/passages'

/**
 * Splits a section's question numbers 1..count into runs: one per passage, the editor's current
 * range (`active`), overlaps with it ("clash"), and the random numbers between them.
 * Pure, so the editor can also use it to find a free range.
 */
export function sectionRuns(count, passages = [], active = null) {
  const owner = Array.from({ length: count }, () => ({ kind: 'random' }))
  for (const p of passages) {
    for (let n = Math.max(1, p.startPosition); n <= Math.min(count, p.endPosition); n++) owner[n - 1] = { kind: 'passage', passage: p }
  }
  if (active) {
    for (let n = Math.max(1, active.start); n <= Math.min(count, active.end); n++) {
      owner[n - 1] = owner[n - 1].kind === 'passage' ? { kind: 'clash', passage: owner[n - 1].passage } : { kind: 'active' }
    }
  }
  const runs = []
  owner.forEach((o, i) => {
    const last = runs.at(-1)
    if (last && last.kind === o.kind && last.passage?.id === o.passage?.id) last.end = i + 1
    else runs.push({ ...o, start: i + 1, end: i + 1 })
  })
  return runs
}

/** First run of free numbers, as the range a new passage starts with (up to 4 questions). */
export function firstFreeRange(count, passages) {
  const free = sectionRuns(count, passages).find((r) => r.kind === 'random')
  return free ? { start: free.start, end: Math.min(free.end, free.start + 3) } : null
}

/** Same rule as the backend's passageRangeError: message for a bad or overlapping range, else null. */
export function rangeError(start, end, count, others = []) {
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 1 || end < start) return 'Choose a range like "from question 1 to 4".'
  if (end > count) return `This section has only ${count} questions.`
  const clash = others.find((o) => start <= o.endPosition && o.startPosition <= end)
  return clash ? `Questions ${clash.startPosition}–${clash.endPosition} already belong to "${clash.title}".` : null
}

const range = (r) => (r.start === r.end ? `${r.start}` : `${r.start}–${r.end}`)

/**
 * The section's questions as a numbered track: each passage covers its numbers, the rest are
 * random questions. `linked` turns passages into edit links and random runs into "add a passage
 * here"; `active` draws the range being edited.
 */
export default function SectionQuestionMap({ sectionId, questionCount, passages = [], active = null, linked = false, className }) {
  if (!questionCount) return <p className="text-sm text-muted-foreground">This section has no questions yet.</p>
  // random numbers are drawn one cell each, so the track reads as "question 1, 2, 3…"
  const runs = sectionRuns(questionCount, passages, active).flatMap((run) =>
    run.kind === 'random'
      ? Array.from({ length: run.end - run.start + 1 }, (_, i) => ({ ...run, start: run.start + i, end: run.start + i, freeEnd: run.end }))
      : [run],
  )

  return (
    <div className={cn('overflow-x-auto pb-1', className)}>
      <ol
        aria-label={`Questions 1 to ${questionCount}`}
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${questionCount}, minmax(1.75rem, 1fr))` }}
      >
        {runs.map((run) => (
          <li key={`${run.kind}-${run.start}`} style={{ gridColumn: `${run.start} / ${run.end + 1}` }} className="min-w-0">
            <Run run={run} sectionId={sectionId} linked={linked} />
          </li>
        ))}
      </ol>
    </div>
  )
}

function Run({ run, sectionId, linked }) {
  const wide = run.end - run.start >= 2
  const base = 'flex h-14 w-full min-w-0 flex-col justify-center gap-0.5 rounded-md border px-2 text-left text-xs transition-colors'
  const label = <span className="font-semibold tabular-nums">Q{range(run)}</span>

  if (run.kind === 'random') {
    const cls = cn(base, 'group items-center gap-1 border-dashed px-0 text-center text-muted-foreground')
    const content = (
      <>
        <span className="font-semibold tabular-nums text-foreground group-hover:text-primary">{run.start}</span>
        <Shuffle className={cn('size-3', linked && 'group-hover:hidden')} aria-hidden />
        {linked && <Plus className="hidden size-3 group-hover:block" aria-hidden />}
      </>
    )
    if (!linked) return <div className={cls} title={`Question ${run.start}: a random question`}>{content}</div>
    return (
      <Link
        href={`${PASSAGES_HREF}/new?sectionId=${sectionId}&start=${run.start}&end=${Math.min(run.freeEnd, run.start + 3)}`}
        className={cn(cls, 'hover:border-primary hover:bg-primary/10 hover:text-primary')}
        title={`Question ${run.start} gets a random question. Click to start a reading passage here.`}
        aria-label={`Start a passage at question ${run.start}`}
      >
        {content}
      </Link>
    )
  }

  if (run.kind === 'active') {
    return (
      <div className={cn(base, 'border-primary bg-primary text-primary-foreground')} title={`This passage: questions ${range(run)}`}>
        {label}
        {wide && <span className="truncate">This passage</span>}
      </div>
    )
  }

  if (run.kind === 'clash') {
    return (
      <div
        className={cn(base, 'border-destructive bg-destructive/10 text-destructive')}
        title={`Questions ${range(run)} already belong to "${run.passage.title}"`}
      >
        {label}
        {wide && <span className="truncate">Taken</span>}
      </div>
    )
  }

  const { passage } = run
  const content = (
    <>
      {label}
      {wide && (
        <span className="flex min-w-0 items-center gap-1">
          <BookOpen className="size-3 shrink-0" />
          <span className="truncate">{passage.title}</span>
        </span>
      )}
    </>
  )
  const cls = cn(base, 'border-border bg-muted text-foreground', passage.isActive === false && 'opacity-60')
  const title = `${passage.title}: questions ${range(run)}${passage.isActive === false ? ' (off)' : ''}`
  if (!linked) return <div className={cls} title={title}>{content}</div>
  return (
    <Link href={`${PASSAGES_HREF}/${passage.id}/edit`} className={cn(cls, 'hover:border-primary hover:bg-primary/10 hover:text-primary')} title={title}>
      {content}
    </Link>
  )
}
