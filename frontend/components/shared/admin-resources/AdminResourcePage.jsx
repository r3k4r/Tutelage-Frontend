'use client'

import { Suspense, useState } from 'react'
import { Plus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import ConfirmDialog from '@/components/app/dialogs/ConfirmDialog'
import ListingPageHeader from '@/components/layouts/admin/ListingPageHeader'
import AdminResourceCard from '@/components/shared/admin-resources/AdminResourceCard'
import Pagination from '@/components/app/Pagination'
import { usePaginatedList } from '@/hooks/usePaginatedList'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useResourceMutations } from '@/hooks/useResourceMutations'
import { RESOURCES } from '@/common/constants/resources'

// 6 per page fills whole rows at every column count (1 / 2 / 3 / 6).
const PAGE_SIZE = 6

/**
 * Admin CRUD list for any RESOURCES entry: search, paginated cards, create/edit dialogs and delete confirm.
 * @param resource  RESOURCES key      @param slug  admin route segment (/admin-dashboard/<slug>/<id>)
 * @param title     page heading        @param label singular label for buttons ("ESL Audio")
 * @param Form      form component taking { mode, initialValues, onSuccess(values), onCancel }
 */
export default function AdminResourcePage(props) {
  return (
    <Suspense fallback={<p className="py-12 text-center text-muted-foreground">Loading…</p>}>
      <AdminList {...props} />
    </Suspense>
  )
}

function AdminList({ resource, slug, title, label, Form }) {
  const { list, listKey } = RESOURCES[resource]
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search.trim())
  const { items, page, totalPages, totalItems, loading, error, setPage, reload } = usePaginatedList(list, {
    listKey,
    limit: PAGE_SIZE,
    params: { search: debouncedSearch },
  })

  const [editing, setEditing] = useState(null) // null | 'new' | item
  const [deleting, setDeleting] = useState(null)
  const { save, remove, busy } = useResourceMutations(resource, label)
  const noun = title.toLowerCase()

  const submit = async (values) => {
    if (!(await save(values, editing === 'new' ? undefined : editing.id))) return
    setEditing(null)
    reload()
  }

  const confirmDelete = async () => {
    if (!(await remove(deleting.id))) return
    setDeleting(null)
    // deleting the last item on a page would leave it empty
    if (items.length === 1 && page > 1) setPage(page - 1)
    else reload()
  }

  return (
    // Fills the dashboard's <main>: header and pagination stay put, only the card grid scrolls.
    <div className="flex h-full flex-col gap-4">
      <ListingPageHeader title={title}>
        <Button onClick={() => setEditing('new')}>
          <Plus className="size-4" />
          Create {label}
        </Button>
      </ListingPageHeader>

      <div className="flex shrink-0 items-center gap-2">
        <Input
          type="search"
          aria-label={`Search ${noun}`}
          placeholder={`Search ${noun}…`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Button variant="outline" size="icon" onClick={reload} disabled={loading} aria-label="Refresh">
          <RefreshCw className={loading ? 'size-4 animate-spin' : 'size-4'} />
        </Button>
        {!loading && <span className="ms-auto text-sm text-muted-foreground">{totalItems} total</span>}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {error ? (
          <p role="alert" className="py-12 text-center text-destructive">{error}</p>
        ) : loading ? (
          <p className="py-12 text-center text-muted-foreground">Loading {noun}…</p>
        ) : items.length === 0 ? (
          <p className="py-12 text-center text-muted-foreground">No {noun} found.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 min-[1680px]:grid-cols-6">
            {items.map((item) => (
              <AdminResourceCard
                key={item.id}
                item={item}
                href={`/admin-dashboard/${slug}/${item.id}`}
                onEdit={setEditing}
                onDelete={setDeleting}
              />
            ))}
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={loading} className="shrink-0" />

      <Dialog open={editing !== null} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="max-h-[90dvh] w-full max-w-md overflow-y-auto" aria-describedby={undefined}>
          <DialogHeader>
            <DialogTitle>{editing === 'new' ? `Create ${label}` : `Edit ${label}`}</DialogTitle>
          </DialogHeader>
          {editing !== null && (
            <Form
              mode={editing === 'new' ? 'create' : 'edit'}
              initialValues={editing === 'new' ? undefined : editing}
              onSuccess={submit}
              onCancel={() => setEditing(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleting !== null}
        onOpenChange={(open) => !open && setDeleting(null)}
        title={`Delete ${label}`}
        busy={busy}
        onConfirm={confirmDelete}
      >
        Are you sure you want to delete <span className="font-semibold text-foreground">{deleting?.title}</span>? This
        can&apos;t be undone.
      </ConfirmDialog>
    </div>
  )
}
