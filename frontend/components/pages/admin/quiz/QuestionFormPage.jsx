'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHeader from '@/components/layouts/admin/PageHeader'
import { FormActions, FormField, FormPage, FormSection, FormSkeleton, LoadError } from '@/components/form/FormLayout'
import { useResource } from '@/hooks/useResource'
import { api } from '@/common/utils/api'
import { cn } from '@/lib/utils'

const questionSchema = z.object({
  sectionId: z.coerce.number().min(1, 'Section is required'),
  level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2'], { required_error: 'Level is required' }),
  text: z.string().min(1, 'Question text is required').max(1000, 'Max 1000 characters'),
  optionA: z.string().min(1, 'Option A is required').max(500, 'Max 500 characters'),
  optionB: z.string().min(1, 'Option B is required').max(500, 'Max 500 characters'),
  optionC: z.string().min(1, 'Option C is required').max(500, 'Max 500 characters'),
  optionD: z.string().min(1, 'Option D is required').max(500, 'Max 500 characters'),
  correctAnswer: z.coerce.number().min(0, 'Must be 0-3').max(3, 'Must be 0-3'),
  isActive: z.boolean(),
})

const LIST_HREF = '/admin-dashboard/quiz/questions'
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const OPTIONS = ['A', 'B', 'C', 'D']

/** /admin-dashboard/quiz/questions/new and …/[id]/edit */
export default function QuestionFormPage({ mode }) {
  const { id } = useParams()
  const editing = mode === 'edit'
  const { data: question, loading, notFound, reload } = useResource('/api/admin/quiz/questions', editing ? id : null)
  const [sections, setSections] = useState(null)

  useEffect(() => {
    api('/api/admin/quiz/sections').then((res) => setSections(res.ok && Array.isArray(res.data?.data) ? res.data.data : []))
  }, [])

  const header = (
    <PageHeader
      crumbs={[
        { label: 'Quiz', href: '/admin-dashboard/quiz' },
        { label: 'Questions', href: LIST_HREF },
        { label: editing ? 'Edit question' : 'New question' },
      ]}
      backHref={LIST_HREF}
    />
  )

  if ((editing && (loading || notFound)) || sections === null) {
    return (
      <div className="flex h-full flex-col gap-4">
        {header}
        {editing && notFound ? <LoadError what="question" onRetry={reload} /> : <FormSkeleton />}
      </div>
    )
  }
  return <QuestionForm key={question?.id ?? 'new'} question={editing ? question : null} sections={sections} header={header} />
}

function QuestionForm({ question, sections, header }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      sectionId: question?.sectionId || sections[0]?.id || '',
      level: question?.level || 'A1',
      text: question?.text || '',
      optionA: question?.optionA || '',
      optionB: question?.optionB || '',
      optionC: question?.optionC || '',
      optionD: question?.optionD || '',
      correctAnswer: question?.correctAnswer ?? 0,
      isActive: question?.isActive ?? true,
    },
  })

  const onSubmit = async (values) => {
    const res = await api(question ? `/api/admin/quiz/questions/${question.id}` : '/api/admin/quiz/questions', {
      method: question ? 'PUT' : 'POST',
      body: values,
    })
    if (!res.ok) return toast.error(res.message || 'Could not save the question')
    toast.success(question ? 'Question updated' : 'Question created')
    router.push(LIST_HREF)
  }

  const err = (name) => errors[name]?.message
  const correct = Number(watch('correctAnswer'))

  return (
    <FormPage
      header={header}
      onSubmit={handleSubmit(onSubmit)}
      actions={
        <FormActions
          submitting={isSubmitting}
          submitLabel={question ? 'Save changes' : 'Create question'}
          onCancel={() => router.push(LIST_HREF)}
          error={Object.keys(errors).length > 0 && 'Fix the highlighted fields.'}
        />
      }
    >
      <div className="grid items-start gap-4 xl:grid-cols-3">
        <FormSection title="Question" className="xl:col-span-2">
          <FormField label="Question text" htmlFor="text" required error={err('text')} hint="Use ______ for blanks.">
            <Textarea id="text" rows={3} aria-invalid={Boolean(err('text'))} {...register('text')} />
          </FormField>
          <div className="grid gap-4 md:grid-cols-2">
            {OPTIONS.map((letter, index) => (
              <FormField key={letter} label={`Option ${letter}`} htmlFor={`option${letter}`} required error={err(`option${letter}`)}>
                <Input
                  id={`option${letter}`}
                  aria-invalid={Boolean(err(`option${letter}`))}
                  className={cn(correct === index && 'border-primary ring-1 ring-primary/40')}
                  {...register(`option${letter}`)}
                />
              </FormField>
            ))}
          </div>
          <FormField label="Correct answer" required error={err('correctAnswer')} hint="The highlighted option is marked correct.">
            {/* segmented control: faster than a dropdown for four choices */}
            <div role="radiogroup" aria-label="Correct answer" className="inline-flex rounded-md border p-0.5">
              {OPTIONS.map((letter, index) => (
                <button
                  key={letter}
                  type="button"
                  role="radio"
                  aria-checked={correct === index}
                  onClick={() => setValue('correctAnswer', index, { shouldDirty: true })}
                  className={cn(
                    'min-w-10 rounded px-3 py-1.5 text-sm font-medium transition-colors',
                    correct === index ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-primary/10 hover:text-primary',
                  )}
                >
                  {letter}
                </button>
              ))}
            </div>
          </FormField>
        </FormSection>

        <FormSection title="Placement">
          <FormField label="Section" htmlFor="sectionId" required error={err('sectionId')}>
            <Select value={watch('sectionId')?.toString()} onValueChange={(v) => setValue('sectionId', parseInt(v, 10))}>
              <SelectTrigger id="sectionId" className="w-full" aria-invalid={Boolean(err('sectionId'))}>
                <SelectValue placeholder="Select section" />
              </SelectTrigger>
              <SelectContent>
                {sections.map((s) => (
                  <SelectItem key={s.id} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Level" htmlFor="level" required error={err('level')}>
            <Select value={watch('level')} onValueChange={(v) => setValue('level', v)}>
              <SelectTrigger id="level" className="w-full">
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
          </FormField>
          <FormField label="Status" htmlFor="isActive" required>
            <Select value={watch('isActive') ? 'active' : 'inactive'} onValueChange={(v) => setValue('isActive', v === 'active')}>
              <SelectTrigger id="isActive" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </FormField>
        </FormSection>
      </div>
    </FormPage>
  )
}
