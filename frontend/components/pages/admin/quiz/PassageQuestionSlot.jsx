'use client'

import { useCallback, useRef, useState } from 'react'
import { Library, PenLine, X } from 'lucide-react'
import SearchSelect from '@/components/app/SearchSelect'
import { api } from '@/common/utils/api'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

export const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const LETTERS = ['A', 'B', 'C', 'D']

export const blankQuestion = () => ({ id: null, level: 'B1', text: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: 0 })

/** A bank question copied into a slot; keeping its id makes the save move it into the passage. */
export const fromBank = (q) => ({
  id: q.id,
  level: q.level,
  text: q.text,
  optionA: q.optionA,
  optionB: q.optionB,
  optionC: q.optionC,
  optionD: q.optionD,
  correctAnswer: q.correctAnswer,
})

/**
 * One numbered question of a passage: write it here, or pick one from the section's bank
 * (then it can still be edited; the change applies to that question everywhere).
 */
export default function PassageQuestionSlot({ index, number, value, errors, register, setValue, sectionId, passageId, usedIds }) {
  const [tab, setTab] = useState('write')
  // read at search time, so the search function stays stable while other slots change
  const used = useRef(usedIds)
  used.current = usedIds

  const loadOptions = useCallback(
    async (search) => {
      const res = await api('/api/admin/quiz/questions', { query: { sectionId, search, freeFor: passageId ?? 'new', limit: 20 } })
      if (!res.ok) throw new Error(res.message)
      return (res.data?.data?.questions ?? []).map((q) => {
        const usedAt = used.current.get(q.id)
        const elsewhere = usedAt && usedAt !== number
        return {
          value: q.id,
          label: q.text,
          hint: `${q.level} · answer ${LETTERS[q.correctAnswer]}${q.isActive ? '' : ' · off'}`,
          note: elsewhere ? `In question ${usedAt}` : undefined,
          disabled: Boolean(elsewhere),
          question: q,
        }
      })
    },
    [sectionId, passageId, number],
  )
  const name = (field) => `questions.${index}.${field}`
  const err = (field) => errors?.[field]?.message
  const set = (field, v) => setValue(name(field), v, { shouldDirty: true, shouldValidate: Boolean(errors) })

  const pick = (q) => {
    const filled = fromBank(q)
    for (const [field, v] of Object.entries(filled)) set(field, v)
    setTab('write')
  }
  const clear = () => {
    for (const [field, v] of Object.entries(blankQuestion())) set(field, v)
  }

  const hasError = errors && Object.keys(errors).length > 0
  return (
    <section
      aria-labelledby={`slot-${index}`}
      className={cn('rounded-lg border bg-card', hasError && 'border-destructive/60')}
    >
      <Tabs value={tab} onValueChange={setTab} className="gap-0">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3">
          <div className="flex items-baseline gap-2">
            <h3 id={`slot-${index}`} className="text-sm font-semibold tabular-nums">
              Question {number}
            </h3>
            {value?.id && <span className="text-xs tabular-nums text-muted-foreground">#{value.id}</span>}
          </div>
          <TabsList className="h-8">
            <TabsTrigger value="write" className="text-xs">
              <PenLine className="size-3.5" />
              {value?.id ? 'Edit' : 'Write'}
            </TabsTrigger>
            <TabsTrigger value="bank" className="text-xs">
              <Library className="size-3.5" />
              Pick from bank
            </TabsTrigger>
          </TabsList>
        </header>

        <TabsContent value="write" className="space-y-4 p-4">
          {value?.id && (
            <p className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
              Changes here update this question everywhere it is used.
              <button type="button" onClick={clear} className="inline-flex items-center gap-1 rounded font-medium text-foreground hover:text-primary">
                <X className="size-3" />
                Write a new one instead
              </button>
            </p>
          )}
          <div className="grid gap-4 sm:grid-cols-[1fr_7rem]">
            <div className="space-y-1.5">
              <label htmlFor={`q${index}-text`} className="text-sm font-medium">
                Question
              </label>
              <Textarea
                id={`q${index}-text`}
                rows={2}
                placeholder="e.g. Why did Sara go to the market early?"
                aria-invalid={Boolean(err('text'))}
                {...register(name('text'))}
              />
              {err('text') && <p className="text-xs text-destructive">{err('text')}</p>}
            </div>
            <div className="space-y-1.5">
              <label htmlFor={`q${index}-level`} className="text-sm font-medium">
                Level
              </label>
              <Select value={value?.level} onValueChange={(v) => set('level', v)}>
                <SelectTrigger id={`q${index}-level`} className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium">Answers</legend>
            <p className="text-xs text-muted-foreground">Click a letter to mark the correct answer.</p>
            <div className="grid gap-2 md:grid-cols-2">
              {LETTERS.map((letter, i) => {
                const correct = Number(value?.correctAnswer) === i
                const optionError = err(`option${letter}`)
                return (
                  <div key={letter} className="flex items-start gap-2">
                    <button
                      type="button"
                      aria-pressed={correct}
                      aria-label={`Mark ${letter} as the correct answer`}
                      onClick={() => set('correctAnswer', i)}
                      className={cn(
                        'flex size-9 shrink-0 items-center justify-center rounded-md border text-sm font-semibold transition-colors',
                        correct ? 'border-primary bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
                      )}
                    >
                      {letter}
                    </button>
                    <div className="min-w-0 flex-1 space-y-1">
                      <Input
                        aria-label={`Answer ${letter}${correct ? ' (correct)' : ''}`}
                        aria-invalid={Boolean(optionError)}
                        className={cn(correct && 'border-primary')}
                        {...register(name(`option${letter}`))}
                      />
                      {optionError && <p className="text-xs text-destructive">{optionError}</p>}
                    </div>
                  </div>
                )
              })}
            </div>
          </fieldset>
        </TabsContent>

        <TabsContent value="bank" className="space-y-2 p-4">
          <label htmlFor={`q${index}-bank`} className="text-sm font-medium">
            Question from the bank
          </label>
          <SearchSelect
            id={`q${index}-bank`}
            selected={value?.id ? { value: value.id, label: value.text } : null}
            onSelect={(option) => pick(option.question)}
            loadOptions={loadOptions}
            placeholder="Choose a question"
            searchPlaceholder="Search this section's questions…"
          />
          <p className="text-xs text-muted-foreground">Questions already in another passage aren&apos;t listed. You can edit it after choosing.</p>
        </TabsContent>
      </Tabs>
    </section>
  )
}

