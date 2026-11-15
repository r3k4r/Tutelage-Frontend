'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useFieldArray, useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHeader from '@/components/layouts/admin/PageHeader'
import { FormActions, FormField, FormPage, FormSection, FormSkeleton, LoadError } from '@/components/form/FormLayout'
import SectionQuestionMap, { firstFreeRange, rangeError } from '@/components/pages/admin/quiz/SectionQuestionMap'
import PassageQuestionSlot, { LEVELS, blankQuestion, fromBank } from '@/components/pages/admin/quiz/PassageQuestionSlot'
import { useResource } from '@/hooks/useResource'
import { api } from '@/common/utils/api'

const LIST_HREF = '/admin-dashboard/quiz/passages'
const list = (res) => (res.ok && Array.isArray(res.data?.data) ? res.data.data : null)

const slotSchema = z.object({
  id: z.number().nullable(),
  level: z.enum(LEVELS, { message: 'Pick a level' }),
  text: z.string().trim().min(1, 'Write the question').max(1000, 'Max 1000 characters'),
  optionA: z.string().trim().min(1, 'Write answer A').max(500, 'Max 500 characters'),
  optionB: z.string().trim().min(1, 'Write answer B').max(500, 'Max 500 characters'),
  optionC: z.string().trim().min(1, 'Write answer C').max(500, 'Max 500 characters'),
  optionD: z.string().trim().min(1, 'Write answer D').max(500, 'Max 500 characters'),
  correctAnswer: z.number().int().min(0).max(3),
})

/**
 * The form keeps every slot it has ever shown, so narrowing the range and widening it again never
 * loses what was typed; only the first `size` slots are checked and saved.
 */
function makeSchema(sections, passages, editingId) {
  return z
    .object({
      title: z.string().trim().min(1, 'Give the passage a title').max(200, 'Max 200 characters'),
      text: z.string().trim().min(1, 'Write or paste the reading text'),
      sectionId: z.number({ message: 'Choose a section' }),
      startPosition: z.number(),
      endPosition: z.number(),
      isActive: z.boolean(),
      questions: z.array(z.any()),
    })
    .superRefine((v, ctx) => {
      const section = sections.find((s) => s.id === v.sectionId)
      const others = passages.filter((p) => p.sectionId === v.sectionId && p.id !== editingId)
      const error = rangeError(v.startPosition, v.endPosition, section?.questionCount ?? 0, others)
      if (error) ctx.addIssue({ code: 'custom', path: ['endPosition'], message: error })
      v.questions.slice(0, v.endPosition - v.startPosition + 1).forEach((q, i) => {
        const result = slotSchema.safeParse(q)
        if (!result.success) {
          for (const issue of result.error.issues) ctx.addIssue({ code: 'custom', path: ['questions', i, ...issue.path], message: issue.message })
        }
      })
    })
}

/** /admin-dashboard/quiz/passages/new (?sectionId=&start=&end=) and …/[id]/edit */
export default function PassageFormPage({ mode, preset = {} }) {
  const { id } = useParams()
  const editing = mode === 'edit'
  const { data: passage, loading, notFound, reload } = useResource('/api/admin/quiz/passages', editing ? id : null)
  const [lists, setLists] = useState({ status: 'loading' })

  const loadLists = () => {
    setLists({ status: 'loading' })
    Promise.all([api('/api/admin/quiz/sections'), api('/api/admin/quiz/passages')]).then((results) => {
      const [sections, passages] = results.map(list)
      setLists(sections && passages ? { status: 'ready', sections, passages } : { status: 'error' })
    })
  }
  useEffect(loadLists, [])

  const header = (
    <PageHeader
      crumbs={[
        { label: 'Quiz', href: '/admin-dashboard/quiz' },
        { label: 'Passages', href: LIST_HREF },
        { label: editing ? passage?.title ?? 'Edit passage' : 'New passage' },
      ]}
      backHref={LIST_HREF}
    />
  )

  const failed = (editing && notFound) || lists.status === 'error'
  if (failed || (editing && loading) || lists.status === 'loading') {
    return (
      <div className="flex h-full flex-col gap-4">
        {header}
        {failed ? <LoadError what="passage" onRetry={editing && notFound ? reload : loadLists} /> : <FormSkeleton />}
      </div>
    )
  }
  if (lists.sections.length === 0) {
    return (
      <div className="flex h-full flex-col gap-4">
        {header}
        <p className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Passages live inside a quiz section. Create a section first.
        </p>
      </div>
    )
  }
  return (
    <PassageForm
      key={passage?.id ?? 'new'}
      passage={editing ? passage : null}
      sections={lists.sections}
      passages={lists.passages}
      preset={preset}
      header={header}
    />
  )
}

function initialValues(passage, sections, passages, preset) {
  if (passage) {
    return {
      title: passage.title,
      text: passage.text,
      sectionId: passage.sectionId,
      startPosition: passage.startPosition,
      endPosition: passage.endPosition,
      isActive: passage.isActive,
      questions: Array.from({ length: passage.endPosition - passage.startPosition + 1 }, (_, i) =>
        passage.questions?.[i] ? fromBank(passage.questions[i]) : blankQuestion(),
      ),
    }
  }
  const sectionId = sections.some((s) => s.id === Number(preset.sectionId)) ? Number(preset.sectionId) : sections[0].id
  const section = sections.find((s) => s.id === sectionId)
  const free = firstFreeRange(section.questionCount, passages.filter((p) => p.sectionId === sectionId))
  const start = Number(preset.start) || free?.start || 1
  const end = Number(preset.end) || free?.end || start
  return {
    title: '',
    text: '',
    sectionId,
    startPosition: start,
    endPosition: end,
    isActive: true,
    questions: Array.from({ length: Math.max(1, end - start + 1) }, blankQuestion),
  }
}

function PassageForm({ passage, sections, passages, preset, header }) {
  const router = useRouter()
  const schema = useMemo(() => makeSchema(sections, passages, passage?.id), [sections, passages, passage?.id])
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm({ resolver: zodResolver(schema), defaultValues: initialValues(passage, sections, passages, preset) })
  const { fields, append } = useFieldArray({ control, name: 'questions', keyName: 'key' })
  const [sectionId, start, end, text, questions, isActive] = useWatch({
    control,
    name: ['sectionId', 'startPosition', 'endPosition', 'text', 'questions', 'isActive'],
  })

  const section = sections.find((s) => s.id === sectionId)
  const count = section?.questionCount ?? 0
  const others = passages.filter((p) => p.sectionId === sectionId && p.id !== passage?.id)
  const size = end >= start ? end - start + 1 : 0

  // Grow the slot list when the range widens (it never shrinks, see makeSchema).
  useEffect(() => {
    if (size > fields.length) append(Array.from({ length: size - fields.length }, blankQuestion), { shouldFocus: false })
  }, [size, fields.length, append])

  // question id -> the number of the slot using it, so the picker can grey it out elsewhere
  const usedIds = new Map((questions ?? []).slice(0, size).flatMap((q, i) => (q?.id ? [[q.id, start + i]] : [])))

  const changeSection = (value) => {
    const next = Number(value)
    const nextSection = sections.find((s) => s.id === next)
    const free = firstFreeRange(nextSection.questionCount, passages.filter((p) => p.sectionId === next && p.id !== passage?.id))
    setValue('sectionId', next, { shouldDirty: true })
    if (free) {
      setValue('startPosition', free.start, { shouldDirty: true })
      setValue('endPosition', Math.min(nextSection.questionCount, free.start + Math.max(size, 1) - 1), { shouldDirty: true })
    }
    // bank questions belong to the old section; keep the words as new questions in this one
    getValues('questions').forEach((_, i) => setValue(`questions.${i}.id`, null))
  }

  const changeStart = (value) => {
    const next = Number(value)
    setValue('startPosition', next, { shouldDirty: true, shouldValidate: isSubmitted })
    // keep the number of questions when possible
    setValue('endPosition', Math.min(count, next + Math.max(size, 1) - 1), { shouldDirty: true, shouldValidate: isSubmitted })
  }

  const onSubmit = async (values) => {
    const body = { ...values, questions: values.questions.slice(0, size) }
    const res = await api(passage ? `/api/admin/quiz/passages/${passage.id}` : '/api/admin/quiz/passages', {
      method: passage ? 'PUT' : 'POST',
      body,
    })
    if (!res.ok) return toast.error(res.message || 'Could not save the passage')
    toast.success(passage ? 'Passage saved' : 'Passage created')
    router.push(LIST_HREF)
  }

  const words = text?.trim() ? text.trim().split(/\s+/).length : 0
  const dropped = passage ? passage.questions.length - Math.min(passage.questions.length, size) : 0
  const questionErrors = errors.questions?.slice?.(0, size).filter(Boolean).length ?? 0

  return (
    <FormPage
      header={header}
      onSubmit={handleSubmit(onSubmit)}
      actions={
        <FormActions
          submitting={isSubmitting}
          submitLabel={passage ? 'Save passage' : 'Create passage'}
          onCancel={() => router.push(LIST_HREF)}
          error={
            Object.keys(errors).length > 0 &&
            (questionErrors > 0 ? `${questionErrors} question${questionErrors > 1 ? 's need' : ' needs'} attention.` : 'Fix the highlighted fields.')
          }
        />
      }
    >
      <div className="grid items-start gap-4 xl:grid-cols-3">
        <div className="grid min-w-0 gap-4 xl:col-span-2">
          <FormSection title="Reading text" description="Students read this beside its questions. Line breaks are kept.">
            <FormField label="Title" htmlFor="title" required error={errors.title?.message} hint="Shown above the text, e.g. “A day at the market”.">
              <Input id="title" aria-invalid={Boolean(errors.title)} {...register('title')} />
            </FormField>
            <FormField
              label="Text"
              htmlFor="text"
              required
              error={errors.text?.message}
              hint={words ? `${words} words` : 'Paste or type the passage.'}
            >
              <Textarea id="text" rows={14} className="leading-relaxed" aria-invalid={Boolean(errors.text)} {...register('text')} />
            </FormField>
          </FormSection>

          <div className="flex items-baseline justify-between gap-4 px-1 pt-2">
            <h2 className="text-base font-semibold">
              Questions <span className="tabular-nums">{size > 1 ? `${start}–${end}` : start}</span>
            </h2>
            <p className="text-sm text-muted-foreground">
              {size} question{size === 1 ? '' : 's'} about this text
            </p>
          </div>
          {fields.slice(0, size).map((field, i) => (
            <PassageQuestionSlot
              key={field.key}
              index={i}
              number={start + i}
              value={questions?.[i]}
              errors={errors.questions?.[i]}
              register={register}
              setValue={setValue}
              sectionId={sectionId}
              passageId={passage?.id}
              usedIds={usedIds}
            />
          ))}
        </div>

        <div className="grid gap-4 xl:sticky xl:top-0">
          <FormSection title="Where it goes" description="The passage takes these question numbers in its section. The other numbers stay random.">
            <FormField label="Section" htmlFor="sectionId" required>
              <Select value={String(sectionId)} onValueChange={changeSection}>
                <SelectTrigger id="sectionId" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name} · {s.questionCount} questions
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            <FormField
              label="Questions"
              htmlFor="startPosition"
              required
              error={errors.endPosition?.message}
              hint={dropped > 0 ? `Questions past ${end} leave this passage and are switched off.` : `Out of ${count} in ${section?.name}.`}
            >
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">From</span>
                <NumberSelect id="startPosition" label="First question" value={start} from={1} to={count} onChange={changeStart} />
                <span className="text-sm text-muted-foreground">to</span>
                <NumberSelect
                  id="endPosition"
                  label="Last question"
                  value={end}
                  from={start}
                  to={count}
                  invalid={Boolean(errors.endPosition)}
                  onChange={(v) => setValue('endPosition', Number(v), { shouldDirty: true, shouldValidate: isSubmitted })}
                />
              </div>
            </FormField>

            <SectionQuestionMap
              sectionId={sectionId}
              questionCount={count}
              passages={others}
              active={{ start, end }}
              className="-mx-1 px-1"
            />

            <FormField label="Status" htmlFor="isActive" hint="When off, these numbers get random questions instead.">
              <Select value={isActive ? 'on' : 'off'} onValueChange={(v) => setValue('isActive', v === 'on', { shouldDirty: true })}>
                <SelectTrigger id="isActive" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">On: shown in the quiz</SelectItem>
                  <SelectItem value="off">Off</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </FormSection>
        </div>
      </div>
    </FormPage>
  )
}

function NumberSelect({ id, label, value, from, to, invalid, onChange }) {
  const options = to >= from ? Array.from({ length: to - from + 1 }, (_, i) => from + i) : []
  return (
    <Select value={String(value)} onValueChange={onChange}>
      <SelectTrigger id={id} aria-label={label} aria-invalid={invalid} className="w-20 tabular-nums">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-72">
        {options.map((n) => (
          <SelectItem key={n} value={String(n)} className="tabular-nums">
            {n}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
