'use client'

import { useParams, useRouter } from 'next/navigation'
import PageHeader from '@/components/layouts/admin/PageHeader'
import ResourceForm from '@/components/form/ResourceForm'
import { FormSkeleton, LoadError } from '@/components/form/FormLayout'
import { useResource } from '@/hooks/useResource'
import { useResourceMutations } from '@/hooks/useResourceMutations'
import { RESOURCES } from '@/common/constants/resources'

/**
 * /admin-dashboard/<slug>/new and /admin-dashboard/<slug>/<id>/edit — one page, one form.
 * Edit never shows an empty form when the record failed to load: saving it would blank the record.
 */
export default function AdminResourceFormPage({ resource, slug, title, label, mode }) {
  const { id } = useParams()
  const router = useRouter()
  const editing = mode === 'edit'
  const { data: item, loading, notFound, reload } = useResource(RESOURCES[resource].item, editing ? id : null)
  const { save, busy } = useResourceMutations(resource, label)

  const listHref = `/admin-dashboard/${slug}`
  const detailHref = (itemId) => `${listHref}/${itemId}`
  const crumbs = [
    { label: title, href: listHref },
    ...(editing && item ? [{ label: item.title, href: detailHref(id) }] : []),
    { label: editing ? 'Edit' : `New ${label.toLowerCase()}` },
  ]
  const backHref = editing ? detailHref(id) : listHref

  const submit = async (values) => {
    const body = await save(values, editing ? id : undefined)
    if (!body) return
    const savedId = editing ? id : body.data?.id ?? body.id
    router.push(savedId ? detailHref(savedId) : listHref)
  }

  const header = <PageHeader crumbs={crumbs} backHref={backHref} />

  if (editing && loading) {
    return (
      <div className="flex h-full flex-col gap-4">
        {header}
        <FormSkeleton />
      </div>
    )
  }

  if (editing && notFound) {
    return (
      <div className="flex h-full flex-col gap-4">
        {header}
        <LoadError what={label.toLowerCase()} onRetry={reload} />
      </div>
    )
  }

  return (
    <ResourceForm
      key={item?.id ?? 'new'}
      resource={resource}
      item={editing ? item : null}
      onSubmit={submit}
      onCancel={() => router.push(backHref)}
      submitting={busy}
    >
      {header}
    </ResourceForm>
  )
}
