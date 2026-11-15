'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import ListingPageHeader from '@/components/layouts/admin/ListingPageHeader'
import ConfirmDialog from '@/components/app/dialogs/ConfirmDialog'
import { LoadError } from '@/components/form/FormLayout'
import SectionQuestionMap, { firstFreeRange } from '@/components/pages/admin/quiz/SectionQuestionMap'
import { api } from '@/common/utils/api'

const BASE = '/admin-dashboard/quiz/passages'
const list = (res) => (res.ok && Array.isArray(res.data?.data) ? res.data.data : null)
const range = (p) => (p.startPosition === p.endPosition ? `Question ${p.startPosition}` : `Questions ${p.startPosition}–${p.endPosition}`)

/** /admin-dashboard/quiz/passages: every section's questions as a map, with its reading passages. */
export default function PassageListPage() {
  const [data, setData] = useState({ status: 'loading' })
  const [toDelete, setToDelete] = useState(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    const [sections, passages] = (await Promise.all([api('/api/admin/quiz/sections'), api('/api/admin/quiz/passages')])).map(list)
    setData(sections && passages ? { status: 'ready', sections, passages } : { status: 'error' })
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const confirmDelete = async () => {
    setDeleting(true)
    const res = await api(`/api/admin/quiz/passages/${toDelete.id}`, { method: 'DELETE' })
    setDeleting(false)
    if (!res.ok) return toast.error(res.message || 'Could not delete the passage')
    toast.success(`"${toDelete.title}" deleted`)
    setToDelete(null)
    load()
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <ListingPageHeader
        title="Reading passages"
        description="A passage sits on some of a section's question numbers. Students read it, then answer those questions. Every other number gets a random question."
      >
        <Button asChild>
          <Link href={`${BASE}/new`}>
            <Plus className="size-4" />
            Add passage
          </Link>
        </Button>
      </ListingPageHeader>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {data.status === 'loading' && <ListSkeleton />}
        {data.status === 'error' && <LoadError what="passages" onRetry={load} />}
        {data.status === 'ready' && data.sections.length === 0 && (
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">Passages live inside a quiz section. Create a section first.</p>
            <Button asChild variant="outline" className="mt-4">
              <Link href="/admin-dashboard/quiz/sections/new">Create a section</Link>
            </Button>
          </div>
        )}
        {data.status === 'ready' && (
          <div className="grid gap-4">
            {data.sections.map((section) => (
              <SectionPanel
                key={section.id}
                section={section}
                passages={data.passages.filter((p) => p.sectionId === section.id)}
                onDelete={setToDelete}
              />
            ))}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={Boolean(toDelete)}
        onOpenChange={(open) => !open && setToDelete(null)}
        title={`Delete "${toDelete?.title}"?`}
        busy={deleting}
        onConfirm={confirmDelete}
      >
        Its numbers go back to random questions. Its {toDelete?.questionCount} question(s) stay in the Questions list, switched off, so
        they never appear without the text.
      </ConfirmDialog>
    </div>
  )
}

function SectionPanel({ section, passages, onDelete }) {
  const free = firstFreeRange(section.questionCount, passages)
  return (
    <section aria-labelledby={`section-${section.id}`} className="rounded-lg border bg-card">
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4">
        <div className="min-w-0">
          <h2 id={`section-${section.id}`} className="text-base font-semibold">
            {section.name}
            {!section.isActive && <span className="ms-2 text-sm font-normal text-muted-foreground">(section off)</span>}
          </h2>
          <p className="text-sm text-muted-foreground">
            {section.questionCount} questions in the quiz · {passages.length === 0 ? 'no passages' : passages.length === 1 ? '1 passage' : `${passages.length} passages`}
          </p>
        </div>
        {free ? (
          <Button asChild variant="outline" size="sm">
            <Link href={`${BASE}/new?sectionId=${section.id}&start=${free.start}&end=${free.end}`}>
              <Plus className="size-4" />
              Add passage
            </Link>
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">Every number has a passage</p>
        )}
      </header>

      <SectionQuestionMap sectionId={section.id} questionCount={section.questionCount} passages={passages} linked className="px-4 pt-3" />

      {passages.length > 0 && (
        <ul className="mt-3 divide-y border-t">
          {passages.map((p) => {
            const needed = p.endPosition - p.startPosition + 1
            const missing = needed - p.questionCount
            return (
              <li key={p.id} className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50">
                <div className="min-w-0 flex-1">
                  <Link href={`${BASE}/${p.id}/edit`} className="block truncate text-sm font-medium hover:text-primary">
                    {p.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    <span className="tabular-nums">{range(p)}</span>
                    {missing > 0 && <span className="text-destructive"> · {missing} question{missing > 1 ? 's' : ''} missing</span>}
                    {!p.isActive && ' · off, so these numbers get random questions'}
                  </p>
                </div>
                <Button asChild size="icon" variant="ghost" aria-label={`Edit ${p.title}`}>
                  <Link href={`${BASE}/${p.id}/edit`}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  aria-label={`Delete ${p.title}`}
                  onClick={() => onDelete(p)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </li>
            )
          })}
        </ul>
      )}
      {passages.length === 0 && <div className="pb-4" />}
    </section>
  )
}

function ListSkeleton() {
  return (
    <div className="grid gap-4" aria-busy="true" aria-label="Loading passages">
      {[0, 1].map((i) => (
        <div key={i} className="space-y-3 rounded-lg border bg-card p-4">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-56" />
          <Skeleton className="h-14 w-full" />
        </div>
      ))}
    </div>
  )
}
