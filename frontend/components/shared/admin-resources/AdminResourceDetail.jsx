'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ConfirmDialog from '@/components/app/dialogs/ConfirmDialog'
import PdfButton from '@/components/app/pdf/PdfButton'
import PdfModal from '@/components/app/pdf/PdfModal'
import CompactAudioPlayer from '@/components/app/players/CompactAudioPlayer'
import { resourceImage } from '@/components/shared/resources/ResourceCard'
import { usePdfModal } from '@/hooks/usePdfModal'
import { useResource } from '@/hooks/useResource'
import { useResourceMutations } from '@/hooks/useResourceMutations'
import { youtubeEmbedUrl } from '@/common/utils/youtube'
import { RESOURCES } from '@/common/constants/resources'

/**
 * Admin view of one item of any RESOURCES type, with edit and delete.
 * Sections appear only for the fields the item has, so one view serves every type.
 */
export default function AdminResourceDetail({ resource, slug, label, Form }) {
  const { id } = useParams()
  const router = useRouter()
  const { data: item, loading, notFound, reload } = useResource(RESOURCES[resource].item, id)
  const { save, remove, busy } = useResourceMutations(resource, label)
  const [dialog, setDialog] = useState(null) // 'edit' | 'delete' | null
  const pdf = usePdfModal()
  const listHref = `/admin-dashboard/${slug}`

  if (loading) return <p className="py-24 text-center text-muted-foreground">Loading…</p>
  if (notFound) {
    return (
      <div className="py-24 text-center">
        <h1 className="mb-4 text-2xl font-bold">{label} not found</h1>
        <Button variant="outline" onClick={() => router.push(listHref)}>Back to the list</Button>
      </div>
    )
  }

  const image = resourceImage(item)
  const embed = youtubeEmbedUrl(item.videoRef)
  const levels = [].concat(item.level ?? []).filter(Boolean)
  const tasks = item.taskPdfs ?? item.tasks ?? []

  const submit = async (values) => {
    if (!(await save(values, item.id))) return
    setDialog(null)
    reload()
  }

  const confirmDelete = async () => {
    if (await remove(item.id)) router.push(listHref)
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Button variant="outline" onClick={() => router.push(listHref)}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setDialog('edit')}>
            <Edit className="size-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={() => setDialog('delete')}>
            <Trash2 className="size-4" />
            Delete
          </Button>
        </div>
      </div>

      <h1 className="break-words text-3xl font-bold text-foreground">{item.title}</h1>

      {embed ? (
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <iframe src={embed} title={item.title} className="absolute inset-0 size-full border-0" allowFullScreen />
        </div>
      ) : (
        image && (
          <div className="relative h-64 w-full overflow-hidden rounded-lg sm:h-80 md:h-96">
            <Image src={image} alt="" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 1024px" />
          </div>
        )
      )}

      {item.audioRef && (
        <Section title="Audio">
          <div className="rounded-md border bg-card p-4">
            <CompactAudioPlayer src={item.audioRef} youtubeUrl={item.audioRef} />
          </div>
        </Section>
      )}

      <TextSection title="Description" text={item.description} muted />
      {item.contentImageUrl && (
        <Section title="Content image">
          <Image src={item.contentImageUrl} alt="" width={1200} height={600} className="h-auto w-full rounded" />
        </Section>
      )}
      <TextSection title="Content" text={item.content ?? item.contentText} boxed />
      <TextSection title="Transcript" text={item.transcript} boxed />

      {item.pdf && (
        <Section title="PDF Resource">
          <PdfButton pdfUrl={item.pdf} onOpen={(url) => pdf.openPdf(url, 'Resource PDF')} label="Resource PDF" />
        </Section>
      )}

      {tasks.length > 0 && (
        <Section title="Task PDFs">
          <div className="flex flex-col gap-2">
            {tasks.map((task, i) => {
              const name = task.fileName || `Task PDF ${i + 1}`
              return <PdfButton key={task.id ?? i} pdfUrl={task.filePath} onOpen={(url) => pdf.openPdf(url, name)} label={name} />
            })}
          </div>
        </Section>
      )}

      <Chips title="Tags" values={item.tags} className="bg-primary/10 text-primary" />
      <Chips title="Level" values={levels} className="bg-secondary text-secondary-foreground" />

      <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-3">
        {[
          ['Category', item.category],
          ['Word count', item.wordCount],
          ['Author', item.author?.name],
          ['Created', item.createdAt && new Date(item.createdAt).toLocaleString()],
        ]
          .filter(([, value]) => value)
          .map(([term, value]) => (
            <div key={term}>
              <dt className="font-semibold">{term}</dt>
              <dd className="text-muted-foreground">{value}</dd>
            </div>
          ))}
      </dl>

      {item.metrics && (
        <Section title="Analytics">
          <dl className="grid grid-cols-3 gap-4">
            {['views', 'plays', 'downloads'].map((metric) => (
              <div key={metric} className="rounded border bg-card p-4">
                <dd className="text-2xl font-bold">{item.metrics[metric] || 0}</dd>
                <dt className="text-sm capitalize text-muted-foreground">{metric}</dt>
              </div>
            ))}
          </dl>
        </Section>
      )}

      <Dialog open={dialog === 'edit'} onOpenChange={(open) => !open && setDialog(null)}>
        <DialogContent className="max-h-[90dvh] w-full max-w-md overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>Edit {label}</DialogTitle>
          </DialogHeader>
          <Form mode="edit" initialValues={item} onSuccess={submit} onCancel={() => setDialog(null)} />
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={dialog === 'delete'}
        onOpenChange={(open) => !open && setDialog(null)}
        title={`Delete ${label}`}
        busy={busy}
        onConfirm={confirmDelete}
      >
        Are you sure you want to delete <span className="font-semibold text-foreground">{item.title}</span>? This
        can&apos;t be undone.
      </ConfirmDialog>

      <PdfModal isOpen={pdf.isOpen} onClose={pdf.closePdf} pdfUrl={pdf.pdfUrl} title={pdf.title} />
    </div>
  )
}

function Section({ title, children }) {
  return (
    <section>
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      {children}
    </section>
  )
}

function TextSection({ title, text, boxed, muted }) {
  if (!text) return null
  return (
    <Section title={title}>
      <p
        className={
          boxed
            ? 'whitespace-pre-wrap rounded-md border bg-card p-4 text-foreground'
            : muted
              ? 'leading-relaxed text-muted-foreground'
              : 'whitespace-pre-wrap'
        }
      >
        {text}
      </p>
    </Section>
  )
}

function Chips({ title, values, className }) {
  if (!values?.length) return null
  return (
    <Section title={title}>
      <ul className="flex flex-wrap gap-2">
        {values.map((value) => (
          <li key={value} className={`rounded px-3 py-1 text-sm ${className}`}>{value}</li>
        ))}
      </ul>
    </Section>
  )
}
