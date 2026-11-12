'use client'

import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PageHeader from '@/components/layouts/admin/PageHeader'
import { FormActions, FormField, FormPage, FormSection, FormSkeleton, LoadError } from '@/components/form/FormLayout'
import { useResource } from '@/hooks/useResource'
import { api } from '@/common/utils/api'
import { cn } from '@/lib/utils'

const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
const levelCount = z.coerce.number().int('Whole numbers only').min(0, '0 or more')
const sumLevels = (levels) => LEVELS.reduce((sum, l) => sum + (Number(levels?.[l]) || 0), 0)

const sectionSchema = z
  .object({
    name: z.string().min(1, 'Name is required').max(100, 'Max 100 characters'),
    description: z.string().optional(),
    questionCount: z.coerce.number().min(1, 'Must be at least 1').max(100, 'Max 100 questions per section'),
    displayOrder: z.coerce.number().min(0, 'Must be 0 or greater'),
    isActive: z.boolean(),
    levels: z.object(Object.fromEntries(LEVELS.map((l) => [l, levelCount]))),
  })
  // All zeros = no split (any level); otherwise the split must use exactly the section's questions.
  .superRefine((v, ctx) => {
    const total = sumLevels(v.levels)
    if (total > 0 && total !== v.questionCount) {
      ctx.addIssue({ code: 'custom', path: ['levels'], message: `The levels add up to ${total}; the section has ${v.questionCount} questions.` })
    }
  })

const LIST_HREF = '/admin-dashboard/quiz/sections'
const NO_LEVELS = Object.fromEntries(LEVELS.map((l) => [l, 0]))
// The DB still requires a unique slug (nothing reads it); "Reading Skills" → "reading_skills".
const toSlug = (name) => name.trim().toLowerCase().replace(/\s+/g, '_').slice(0, 50)
const EMPTY = { name: '', description: '', questionCount: 10, displayOrder: 0, isActive: true, levels: NO_LEVELS }

/** /admin-dashboard/quiz/sections/new and …/[id]/edit */
export default function SectionFormPage({ mode }) {
  const { id } = useParams()
  const editing = mode === 'edit'
  const { data: section, loading, notFound, reload } = useResource('/api/admin/quiz/sections', editing ? id : null)
  const header = (
    <PageHeader
      crumbs={[
        { label: 'Quiz', href: '/admin-dashboard/quiz' },
        { label: 'Sections', href: LIST_HREF },
        { label: editing ? `Edit ${section?.name ?? 'section'}` : 'New section' },
      ]}
      backHref={LIST_HREF}
    />
  )

  if (editing && (loading || notFound)) {
    return (
      <div className="flex h-full flex-col gap-4">
        {header}
        {loading ? <FormSkeleton /> : <LoadError what="section" onRetry={reload} />}
      </div>
    )
  }
  return <SectionForm key={section?.id ?? 'new'} section={editing ? section : null} header={header} />
}

function SectionForm({ section, header }) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(sectionSchema),
    defaultValues: section
      ? {
          name: section.name || '',
          description: section.description || '',
          questionCount: section.questionCount || 10,
          displayOrder: section.displayOrder || 0,
          isActive: section.isActive ?? true,
          levels: { ...NO_LEVELS, ...section.levelDistribution },
        }
      : EMPTY,
  })

  const onSubmit = async ({ levels, ...values }) => {
    const res = await api(section ? `/api/admin/quiz/sections/${section.id}` : '/api/admin/quiz/sections', {
      method: section ? 'PUT' : 'POST',
      // null = any level; the backend checks the split adds up to questionCount
      body: { ...values, slug: toSlug(values.name), levelDistribution: sumLevels(levels) > 0 ? levels : null },
    })
    if (!res.ok) return toast.error(res.message || 'Could not save the section')
    toast.success(section ? 'Section updated' : 'Section created')
    router.push(LIST_HREF)
  }

  const err = (name) => errors[name]?.message

  return (
    <FormPage
      header={header}
      onSubmit={handleSubmit(onSubmit)}
      actions={
        <FormActions
          submitting={isSubmitting}
          submitLabel={section ? 'Save changes' : 'Create section'}
          onCancel={() => router.push(LIST_HREF)}
          error={Object.keys(errors).length > 0 && 'Fix the highlighted fields.'}
        />
      }
    >
      <div className="grid items-start gap-4 xl:grid-cols-3">
        <FormSection title="Section" className="xl:col-span-2">
          <FormField label="Section name" htmlFor="name" required error={err('name')}>
            <Input id="name" placeholder="e.g. Grammar" aria-invalid={Boolean(err('name'))} {...register('name')} />
          </FormField>
          <FormField label="Description" htmlFor="description">
            <Input id="description" placeholder="Optional section description" {...register('description')} />
          </FormField>
        </FormSection>

        <FormSection title="Quiz settings">
          <FormField
            label="Question limit"
            htmlFor="questionCount"
            required
            error={err('questionCount')}
            hint="How many of this section's questions appear in a quiz (you can store more)."
          >
            <Input id="questionCount" type="number" min={1} max={100} aria-invalid={Boolean(err('questionCount'))} {...register('questionCount')} />
          </FormField>
          <FormField label="Display order" htmlFor="displayOrder" required error={err('displayOrder')} hint="Lower values appear first.">
            <Input id="displayOrder" type="number" min={0} aria-invalid={Boolean(err('displayOrder'))} {...register('displayOrder')} />
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

        <LevelSplit register={register} levels={watch('levels')} total={Number(watch('questionCount')) || 0} available={section?.availableByLevel} error={errors.levels?.message} />
      </div>
    </FormPage>
  )
}

/** "3 A1, 3 A2, 4 B1" for a 10-question section. All zeros = any level. */
function LevelSplit({ register, levels, total, available, error }) {
  const assigned = sumLevels(levels)
  const done = assigned === 0 || assigned === total
  return (
    <FormSection title="Questions per level" className="xl:col-span-3">
      <p className="text-sm text-muted-foreground">
        Choose how many of the section&apos;s questions come from each level. They appear easy to hard (A1 first), picked at random within each level. Leave every level at 0 to take
        any level.
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {LEVELS.map((level) => {
          const short = available && Number(levels?.[level]) > (available[level] ?? 0)
          return (
            <FormField
              key={level}
              label={level}
              htmlFor={`level-${level}`}
              hint={available && <span className={cn(short && 'font-medium text-destructive')}>{available[level] ?? 0} active{short && ' (not enough)'}</span>}
            >
              <Input id={`level-${level}`} type="number" min={0} aria-invalid={Boolean(error)} {...register(`levels.${level}`)} />
            </FormField>
          )
        })}
      </div>
      <p role="status" className={cn('text-sm font-medium', done ? 'text-muted-foreground' : 'text-destructive')}>
        {assigned === 0 ? 'No split: any level.' : `${assigned} of ${total} assigned`}
        {error && assigned !== 0 && ` · ${error}`}
      </p>
    </FormSection>
  )
}
