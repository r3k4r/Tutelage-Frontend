'use client'

import { useId, useRef, useState } from 'react'
import { FileText, Plus, RotateCcw, Trash2, Upload, X } from 'lucide-react'
import { FormActions, FormField, FormPage, FormSection } from '@/components/form/FormLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { LEVEL_OPTIONS, RESOURCE_FORMS, levelValueOf } from '@/common/constants/resource-forms'

const fileName = (url) => decodeURIComponent(String(url).split('/').pop() || 'file.pdf')

function initialValues(config, item) {
  const values = { level: levelValueOf(item?.level), tags: item?.tags ?? [] }
  for (const f of config.fields) values[f.name] = item?.[f.name] ?? ''
  return values
}

/**
 * Create/edit form for any content type, laid out as cards: Content (main column) and
 * Media · Classification · Files (side column). `onSubmit(values)` gets the text fields plus
 * level, tags, `pdf` (new File or null), `taskPdfs` (new Files) and `deletedTaskPdfIds`.
 * Renders its own sticky action bar; `children` is the header placed above the scrolling body.
 */
export default function ResourceForm({ resource, item, onSubmit, onCancel, submitting, children }) {
  const config = RESOURCE_FORMS[resource]
  const [values, setValues] = useState(() => initialValues(config, item))
  const [errors, setErrors] = useState({})
  const [pdf, setPdf] = useState(null)
  const [taskPdfs, setTaskPdfs] = useState([])
  const [deletedTaskPdfIds, setDeletedTaskPdfIds] = useState([])
  const existingTaskPdfs = item?.taskPdfs ?? item?.tasks ?? []
  const formRef = useRef(null)

  const set = (name) => (value) => {
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest)
  }

  const validate = () => {
    const next = {}
    for (const f of config.fields) if (f.required && !String(values[f.name] ?? '').trim()) next[f.name] = `${f.label} is required`
    if (config.levelRequired && !values.level) next.level = 'Level is required'
    setErrors(next)
    return next
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const found = validate()
    const first = Object.keys(found)[0]
    if (first) {
      formRef.current?.querySelector(`[data-field="${first}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    onSubmit({ ...values, pdf, taskPdfs, deletedTaskPdfIds })
  }

  const content = config.fields.filter((f) => f.section === 'content')
  const media = config.fields.filter((f) => f.section === 'media')

  return (
    <FormPage
      formRef={formRef}
      onSubmit={handleSubmit}
      header={children}
      actions={
        <FormActions
          submitting={submitting}
          submitLabel={item ? 'Save changes' : 'Create'}
          onCancel={onCancel}
          error={Object.keys(errors).length > 0 && 'Fix the highlighted fields.'}
        />
      }
    >
        <div className="grid items-start gap-4 xl:grid-cols-3">
          <FormSection title="Content" className="xl:col-span-2">
            {content.map((f) => (
              <Field key={f.name} field={f} value={values[f.name]} onChange={set(f.name)} error={errors[f.name]} />
            ))}
          </FormSection>

          <div className="space-y-4">
            {media.length > 0 && (
              <FormSection title="Media">
                {media.map((f) => (
                  <Field key={f.name} field={f} value={values[f.name]} onChange={set(f.name)} error={errors[f.name]} />
                ))}
              </FormSection>
            )}

            <FormSection title="Classification" description="Level and tags drive where this appears on the site.">
              <Field
                field={{ name: 'level', label: 'Level', kind: 'select', options: LEVEL_OPTIONS, required: config.levelRequired }}
                value={values.level}
                onChange={set('level')}
                error={errors.level}
              />
              <TagsField value={values.tags} onChange={set('tags')} />
            </FormSection>

            <FormSection title="Files">
              <PdfField existingUrl={item?.pdf} file={pdf} onChange={setPdf} />
              <TaskPdfsField
                existing={existingTaskPdfs}
                deletedIds={deletedTaskPdfIds}
                onToggleDelete={(id) =>
                  setDeletedTaskPdfIds((ids) => (ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]))
                }
                files={taskPdfs}
                onChange={setTaskPdfs}
              />
            </FormSection>
          </div>
        </div>
    </FormPage>
  )
}

function Field({ field, value, onChange, error }) {
  const id = useId()
  const describedBy = error ? `${id}-error` : undefined
  const common = { id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy }

  return (
    <FormField label={field.label} htmlFor={id} required={field.required} error={error} errorId={describedBy} name={field.name}>
      {field.kind === 'textarea' ? (
        // the Textarea grows with its content (field-sizing), so long fields need a starting height
        <Textarea
          {...common}
          rows={field.rows}
          className={field.rows >= 8 ? 'min-h-48' : field.rows >= 5 ? 'min-h-32' : undefined}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : field.kind === 'select' ? (
        <Select value={value || undefined} onValueChange={onChange}>
          <SelectTrigger {...common} className="w-full">
            <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
          </SelectTrigger>
          <SelectContent>
            {field.options.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input {...common} type={field.kind === 'url' ? 'url' : 'text'} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </FormField>
  )
}

function TagsField({ value, onChange }) {
  const id = useId()
  const [draft, setDraft] = useState('')

  const add = () => {
    const tags = draft.split(',').map((t) => t.trim()).filter(Boolean)
    if (tags.length) onChange([...new Set([...value, ...tags])])
    setDraft('')
  }

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>Tags</Label>
      <div className="flex gap-2">
        <Input
          id={id}
          value={draft}
          placeholder="Type a tag and press Enter"
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ',') {
              e.preventDefault()
              add()
            } else if (e.key === 'Backspace' && !draft && value.length) onChange(value.slice(0, -1))
          }}
        />
        <Button type="button" variant="outline" size="icon" onClick={add} aria-label="Add tag">
          <Plus className="size-4" />
        </Button>
      </div>
      {value.length > 0 && (
        <ul className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <li key={tag} className="flex items-center gap-1 rounded-md bg-primary/10 py-0.5 ps-2 pe-1 text-xs font-medium text-primary">
              {tag}
              <button
                type="button"
                onClick={() => onChange(value.filter((t) => t !== tag))}
                className="rounded p-0.5 hover:bg-primary/20"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="size-3" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/** Hidden file input + button; resets the input so picking the same file again still fires. */
function FilePicker({ label, multiple, onFiles }) {
  const ref = useRef(null)
  return (
    <>
      <input
        ref={ref}
        type="file"
        accept="application/pdf,.pdf"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          const files = Array.from(e.target.files || [])
          e.target.value = ''
          if (files.length) onFiles(files)
        }}
      />
      <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()}>
        <Upload className="size-4" />
        {label}
      </Button>
    </>
  )
}

function FileRow({ name, note, tone = 'default', action }) {
  return (
    <li
      className={cn(
        'flex items-center gap-2 rounded-md border px-3 py-2 text-sm',
        tone === 'new' && 'border-primary/30 bg-primary/5',
        tone === 'removed' && 'opacity-60',
      )}
    >
      <FileText className="size-4 shrink-0 text-muted-foreground" />
      <span className={cn('min-w-0 flex-1 truncate', tone === 'removed' && 'line-through')} title={name}>
        {name}
      </span>
      {note && <span className="shrink-0 text-xs text-muted-foreground">{note}</span>}
      {action}
    </li>
  )
}

function PdfField({ existingUrl, file, onChange }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <Label>Preparation PDF</Label>
      <ul className="w-full space-y-1.5">
        {file ? (
          <FileRow
            name={file.name}
            note={existingUrl ? 'replaces current' : 'new'}
            tone="new"
            action={
              <IconAction label="Remove" onClick={() => onChange(null)}>
                <X className="size-3.5" />
              </IconAction>
            }
          />
        ) : (
          existingUrl && <FileRow name={fileName(existingUrl)} note="current" />
        )}
      </ul>
      <FilePicker label={existingUrl || file ? 'Replace PDF' : 'Choose PDF'} onFiles={([f]) => onChange(f)} />
    </div>
  )
}

function TaskPdfsField({ existing, deletedIds, onToggleDelete, files, onChange }) {
  const key = (f) => `${f.name}:${f.size}`
  return (
    <div className="flex flex-col items-start gap-2">
      <Label>Task PDFs</Label>
      {(existing.length > 0 || files.length > 0) && (
        <ul className="w-full space-y-1.5">
          {existing.map((t) => {
            const removed = deletedIds.includes(t.id)
            return (
              <FileRow
                key={t.id}
                name={t.fileName || fileName(t.filePath)}
                note={removed ? 'will be removed' : 'saved'}
                tone={removed ? 'removed' : 'default'}
                action={
                  <IconAction label={removed ? 'Undo remove' : 'Remove'} onClick={() => onToggleDelete(t.id)} destructive={!removed}>
                    {removed ? <RotateCcw className="size-3.5" /> : <Trash2 className="size-3.5" />}
                  </IconAction>
                }
              />
            )
          })}
          {files.map((f, i) => (
            <FileRow
              key={key(f)}
              name={f.name}
              note="new"
              tone="new"
              action={
                <IconAction label="Remove" onClick={() => onChange(files.filter((_, j) => j !== i))}>
                  <X className="size-3.5" />
                </IconAction>
              }
            />
          ))}
        </ul>
      )}
      <FilePicker
        label="Add task PDFs"
        multiple
        onFiles={(picked) => {
          const seen = new Set(files.map(key))
          onChange([...files, ...picked.filter((f) => !seen.has(key(f)))])
        }}
      />
    </div>
  )
}

function IconAction({ label, onClick, destructive, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        'shrink-0 rounded p-1 text-muted-foreground transition-colors',
        destructive ? 'hover:bg-destructive/10 hover:text-destructive' : 'hover:bg-primary/10 hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
