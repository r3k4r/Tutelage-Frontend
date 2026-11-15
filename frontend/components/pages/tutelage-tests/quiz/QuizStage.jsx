'use client'

import { useEffect, useState } from 'react'
import { Check, ChevronDown, ChevronUp, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const LETTERS = ['A', 'B', 'C', 'D']

/** Indexes of the run of questions around `index` that share its passage (they are served together). */
function passageGroup(questions, index) {
  const id = questions[index]?.passage?.id
  if (!id) return null
  let first = index
  let last = index
  while (questions[first - 1]?.passage?.id === id) first--
  while (questions[last + 1]?.passage?.id === id) last++
  return { first, last }
}

const formatTime = (seconds) => `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`

/**
 * The question screen of the placement test. A question with a reading passage shows the text
 * beside it (above it on a phone); the text stays put for each of that passage's questions.
 * Keys: A-D or 1-4 choose an answer, Enter goes on.
 */
export default function QuizStage({ questions, index, answer, onAnswer, onNext, timeLeft, sections, currentSectionIndex, sectionProgress }) {
  const question = questions[index]
  const group = passageGroup(questions, index)
  const isLast = index === questions.length - 1

  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.target.closest?.('input, textarea, select, [contenteditable]')) return
      const key = e.key.toUpperCase()
      const choice = LETTERS.indexOf(key) !== -1 ? LETTERS.indexOf(key) : ['1', '2', '3', '4'].indexOf(key)
      if (choice !== -1 && choice < (question?.options.length ?? 0)) onAnswer(choice)
      else if (e.key === 'Enter' && answer !== undefined && e.target.tagName !== 'BUTTON') onNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [question, answer, onAnswer, onNext])

  return (
    // fills the screen under the site navbar (h-16); on lg the two panes scroll on their own
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col bg-background lg:h-[calc(100dvh-4rem)] lg:min-h-0">
      <QuizBar
        index={index}
        total={questions.length}
        timeLeft={timeLeft}
        sections={sections}
        currentSectionIndex={currentSectionIndex}
        sectionProgress={sectionProgress}
      />

      <main className={cn('min-h-0 flex-1', group ? 'lg:grid lg:grid-cols-2' : 'overflow-y-auto')}>
        {group && <ReadingPane key={question.passage.id} passage={question.passage} first={group.first} last={group.last} />}

        <div className={cn('px-4 py-8 sm:px-6 lg:py-12', group && 'lg:overflow-y-auto lg:px-10')}>
          <div className="mx-auto w-full max-w-2xl">
            <p className="text-sm text-muted-foreground">
              <span className="tabular-nums">Question {index + 1}</span>
              {group && (
                <span>
                  {' '}· {index - group.first + 1} of {group.last - group.first + 1} about the text
                </span>
              )}
            </p>
            <h1 id="question" className="mt-2 text-xl font-semibold leading-snug text-foreground sm:text-2xl">
              {question.text}
            </h1>

            <div role="radiogroup" aria-labelledby="question" className="mt-6 grid gap-2">
              {question.options.map((option, i) => {
                const selected = answer === i
                return (
                  <button
                    key={i}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onAnswer(i)}
                    className={cn(
                      'group flex w-full items-center gap-4 rounded-lg border px-4 py-3.5 text-left transition-colors',
                      selected ? 'border-primary bg-primary/10' : 'hover:border-primary/60 hover:bg-primary/5',
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        'flex size-8 shrink-0 items-center justify-center rounded-md border text-sm font-semibold transition-colors',
                        selected ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground group-hover:text-primary',
                      )}
                    >
                      {LETTERS[i]}
                    </span>
                    <span className={cn('min-w-0 flex-1 text-base text-foreground', selected && 'font-medium')}>{option}</span>
                  </button>
                )
              })}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
              <p className="hidden text-sm text-muted-foreground sm:block">
                Press <kbd className="rounded border px-1.5 py-0.5 text-xs">A</kbd>–<kbd className="rounded border px-1.5 py-0.5 text-xs">D</kbd> to choose,{' '}
                <kbd className="rounded border px-1.5 py-0.5 text-xs">Enter</kbd> to go on. You can&apos;t go back.
              </p>
              <Button size="lg" onClick={onNext} disabled={answer === undefined} className="ms-auto min-w-32">
                {isLast ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function QuizBar({ index, total, timeLeft, sections, currentSectionIndex, sectionProgress }) {
  const lowTime = timeLeft <= 60
  const current = sections[currentSectionIndex]
  return (
    <header className="shrink-0 border-b bg-background">
      <div className="flex items-center gap-4 px-4 py-3 sm:px-6">
        <nav aria-label="Test sections" className="min-w-0 flex-1">
          {/* phone: just where you are */}
          <p className="truncate text-sm sm:hidden">
            <span className="text-muted-foreground">
              Part {currentSectionIndex + 1} of {sections.length} ·{' '}
            </span>
            <span className="font-medium">{current?.name}</span>
          </p>
          <ol className="hidden items-center gap-1 sm:flex">
            {sections.map((section, i) => {
              const done = sectionProgress[i]?.completed && i !== currentSectionIndex
              const active = i === currentSectionIndex
              return (
                <li key={section.id} className="flex min-w-0 items-center gap-1">
                  {i > 0 && <span aria-hidden className="mx-1 h-px w-4 bg-border" />}
                  <span
                    aria-current={active ? 'step' : undefined}
                    className={cn(
                      'flex min-w-0 items-center gap-1.5 rounded-md px-2 py-1 text-sm',
                      active ? 'bg-primary/10 font-medium text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {done ? <Check className="size-3.5 shrink-0 text-primary" aria-label="done" /> : <span className="tabular-nums">{i + 1}</span>}
                    <span className="truncate">{section.name}</span>
                  </span>
                </li>
              )
            })}
          </ol>
        </nav>

        <div
          className={cn('flex shrink-0 items-center gap-1.5 text-sm tabular-nums', lowTime ? 'font-semibold text-destructive' : 'text-muted-foreground')}
          role="timer"
          aria-label={`${formatTime(timeLeft)} left`}
        >
          <Clock className="size-4" aria-hidden />
          {formatTime(timeLeft)}
        </div>
      </div>
      <div
        className="h-1 bg-muted"
        role="progressbar"
        aria-label="Progress"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index + 1}
        aria-valuetext={`Question ${index + 1} of ${total}`}
      >
        <div className="h-full bg-primary transition-[width] duration-300 ease-out" style={{ width: `${((index + 1) / total) * 100}%` }} />
      </div>
    </header>
  )
}

/** The reading text: its own scroll beside the question on a wide screen, a foldable block on a phone. */
function ReadingPane({ passage, first, last }) {
  const [open, setOpen] = useState(true)
  return (
    <section aria-labelledby="passage-title" className="border-b bg-muted/40 lg:min-h-0 lg:overflow-y-auto lg:border-e lg:border-b-0">
      <div className="mx-auto w-full max-w-[68ch] px-4 py-6 sm:px-6 lg:px-10 lg:py-12">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm text-muted-foreground">
              Read the text, then answer questions <span className="tabular-nums">{first + 1}–{last + 1}</span>
            </p>
            <h2 id="passage-title" className="mt-1 text-lg font-semibold text-foreground">
              {passage.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="passage-text"
            className="flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary lg:hidden"
          >
            {open ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
            {open ? 'Hide text' : 'Show text'}
          </button>
        </div>
        <div
          id="passage-text"
          className={cn(
            'mt-4 max-h-[45dvh] overflow-y-auto whitespace-pre-line text-[1.0625rem] leading-[1.75] text-foreground lg:max-h-none lg:overflow-visible',
            !open && 'hidden lg:block',
          )}
        >
          {passage.text}
        </div>
      </div>
    </section>
  )
}
