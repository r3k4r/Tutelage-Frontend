'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Plus, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ConfirmDialog from '@/components/app/dialogs/ConfirmDialog'
import ListingPageHeader from '@/components/layouts/admin/ListingPageHeader'
import AdminResourceCard, { AdminResourceCardSkeleton } from '@/components/shared/admin-resources/AdminResourceCard'
import Pagination from '@/components/app/Pagination'
import { usePaginatedList } from '@/hooks/usePaginatedList'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { useResourceMutations } from '@/hooks/useResourceMutations'
import { RESOURCES } from '@/common/constants/resources'

// 6 per page fills whole rows at every column count (1 / 2 / 3 / 6).
const PAGE_SIZE = 6

/**
 * Admin list for any RESOURCES entry: search, paginated cards and delete confirm. Create and edit are
 * their own pages (<slug>/new, <slug>/<id>/edit).
 * @param resource  RESOURCES key      @param slug  admin route segment (/admin-dashboard/<slug>/<id>)
 * @param title     page heading        @param label singular label for buttons ("ESL Audio")
 */
export default function AdminResourcePage(props) {
  return (
    <Suspense fallback={<p className="py-12 text-center text-muted-foreground">Loading…</p>}>
      <AdminList {...props} />
    </Suspense>
  )
}

function AdminList({ resource, slug, title, label }) {
  const router = useRouter()
  const { list, listKey } = RESOURCES[resource]
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebouncedValue(search.trim())
  const { items, page, totalPages, totalItems, loading, error, setPage, reload } = usePaginatedList(list, {
    listKey,
    limit: PAGE_SIZE,
    params: { search: debouncedSearch },
  })

  const [deleting, setDeleting] = useState(null)
  const { remove, busy } = useResourceMutations(resource, label)
  const noun = title.toLowerCase()

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
        <Button asChild>
          <Link href={`/admin-dashboard/${slug}/new`}>
            <Plus className="size-4" />
            Create {label}
          </Link>
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
        {!loading && <span className="ms-auto whitespace-nowrap text-sm text-muted-foreground">{totalItems} total</span>}
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {error ? (
          <p role="alert" className="rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </p>
        ) : !loading && items.length === 0 ? (
          <p className="rounded-lg border border-dashed p-12 text-center text-sm text-muted-foreground">
            {debouncedSearch ? `No ${noun} match “${debouncedSearch}”.` : `No ${noun} yet.`}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6" aria-busy={loading}>
            {loading
              ? Array.from({ length: PAGE_SIZE }, (_, i) => <AdminResourceCardSkeleton key={i} />)
              : items.map((item) => (
                  <AdminResourceCard
                    key={item.id}
                    item={item}
                    href={`/admin-dashboard/${slug}/${item.id}`}
                    onEdit={(item) => router.push(`/admin-dashboard/${slug}/${item.id}/edit`)}
                    onDelete={setDeleting}
                  />
                ))}
          </div>
        )}
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} disabled={loading} className="shrink-0" />


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
