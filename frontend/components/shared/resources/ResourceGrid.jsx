'use client'

import { Suspense, useRef, useState } from 'react'
import { BookOpen, CloudOff, RotateCcw, Search, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import EmptyState from '@/components/app/EmptyState'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import ResourceCard from '@/components/shared/resources/ResourceCard'
import Pagination from '@/components/app/Pagination'
import ResourceCardSkeleton from '@/components/skeletons/ResourceCardSkeleton'
import { usePaginatedList } from '@/hooks/usePaginatedList'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'
import { RESOURCES } from '@/common/constants/resources'

const ALL = 'all'

/**
 * Paginated card grid for any entry in RESOURCES.
 * @param resource   key of RESOURCES (e.g. 'blogs', 'speakings')
 * @param hrefBase   detail link prefix, e.g. '/esl-resources/blogs' -> /esl-resources/blogs/:id
 * @param level      optional CEFR filter ('A1'...)
 * @param searchable show a search box
 * @param categories optional [{ value, label }] filter options ("All" is added)
 */
export default function ResourceGrid(props) {
  const limit = props.limit ?? 6
  return (
    <Suspense fallback={<GridShell title={props.title}><SkeletonCards count={limit} /></GridShell>}>
      <Grid {...props} limit={limit} />
    </Suspense>
  )
}

function Grid({ resource, hrefBase, title, level, limit, searchable = false, categories, emptyText }) {
  const { list, listKey, noun } = RESOURCES[resource]
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(ALL)
  const debouncedSearch = useDebouncedValue(search.trim())
  const sectionRef = useRef(null)

  const { items, page, totalPages, loading, error, setPage, reload } = usePaginatedList(list, {
    listKey,
    limit,
    params: { level, search: debouncedSearch, category: category === ALL ? undefined : category },
  })

  const goTo = (p) => {
    setPage(p)
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const filters = (searchable || categories) && (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
      {searchable && (
        <label className="relative flex-1 sm:max-w-md">
          <span className="sr-only">Search {noun}s</span>
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            type="search"
            placeholder={`Search ${noun}s…`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 pl-10"
          />
        </label>
      )}
      {categories && (
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="h-11 w-full sm:w-48" aria-label="Category">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  )

  return (
    <GridShell title={title} sectionRef={sectionRef} filters={filters}>
      {loading ? (
        <SkeletonCards count={limit} />
      ) : error ? (
        <EmptyState
          tone="error"
          icon={CloudOff}
          title={`Couldn't load the ${noun}s`}
          action={
            <Button variant="outline" onClick={reload}>
              <RotateCcw className="size-4" />
              Try again
            </Button>
          }
        >
          Check your connection, then try again.
        </EmptyState>
      ) : items.length === 0 ? (
        debouncedSearch || category !== ALL ? (
          <EmptyState
            icon={SearchX}
            title={debouncedSearch ? `No ${noun}s match “${debouncedSearch}”` : `No ${noun}s in this category`}
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('')
                  setCategory(ALL)
                }}
              >
                Clear search
              </Button>
            }
          >
            Try a different word or another category.
          </EmptyState>
        ) : (
          <EmptyState icon={BookOpen} title={emptyText || `No ${noun}s here yet`}>
            New {noun}s are added regularly. Check back soon.
          </EmptyState>
        )
      ) : (
        items.map((item) => <ResourceCard key={item.id} href={`${hrefBase}/${item.id}`} item={item} />)
      )}
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={goTo}
        disabled={loading}
        className="col-span-full mt-4"
      />
    </GridShell>
  )
}

function GridShell({ title, sectionRef, filters, children }) {
  return (
    <section ref={sectionRef} className="scroll-mt-24 py-16">
      <div className="container-page">
        {title && <h2 className="mb-10 text-center text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{title}</h2>}
        {filters}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">{children}</div>
      </div>
    </section>
  )
}

function SkeletonCards({ count }) {
  return Array.from({ length: count }, (_, i) => <ResourceCardSkeleton key={i} />)
}
