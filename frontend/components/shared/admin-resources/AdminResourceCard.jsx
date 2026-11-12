'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Edit, MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { resourceImage } from '@/components/shared/resources/ResourceCard'

/**
 * Compact admin card: a fixed-height cover (never grows with the column width), title, two lines of
 * description, level chips, and a footer with author/date and the ⋮ menu (Edit / Delete).
 * The whole card links to the item's admin detail page.
 */
export default function AdminResourceCard({ item, href, onEdit, onDelete }) {
  const image = resourceImage(item)
  const levels = [].concat(item.level ?? []).filter(Boolean)

  return (
    <article className="group relative flex flex-col gap-2 rounded-lg border bg-card p-3 transition-colors hover:border-primary/50">
      <div className="relative h-32 w-full overflow-hidden rounded-md bg-muted">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1680px) 33vw, 17vw"
          />
        )}
      </div>

      <h2 className="truncate text-sm font-semibold text-foreground" title={item.title}>
        {/* stretched link: the whole card is clickable, the ⋮ menu sits above it */}
        <Link href={href} className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ring">
          {item.title}
        </Link>
      </h2>
      <p className="line-clamp-2 min-h-8 text-xs leading-4 text-muted-foreground">{item.description}</p>

      {levels.length > 0 && (
        <ul className="flex flex-wrap gap-1">
          {levels.map((level) => (
            <li key={level} className="rounded bg-primary/10 px-1.5 py-0.5 text-[11px] font-medium text-primary">
              {level}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 border-t pt-2">
        <p className="min-w-0 truncate text-xs text-muted-foreground">
          {item.author?.name && <>{item.author.name} · </>}
          {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
        </p>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative z-10 size-7 shrink-0" aria-label={`Actions for ${item.title}`}>
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onSelect={() => onEdit(item)}>
              <Edit className="size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onSelect={() => onDelete(item)}>
              <Trash2 className="size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </article>
  )
}

/** Same footprint as the card, for the loading state. */
export function AdminResourceCardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-2 rounded-lg border bg-card p-3" aria-hidden>
      <div className="h-32 rounded-md bg-muted" />
      <div className="h-4 w-3/4 rounded bg-muted" />
      <div className="h-8 rounded bg-muted" />
      <div className="mt-1 h-5 w-1/3 rounded bg-muted" />
      <div className="h-6 border-t pt-2" />
    </div>
  )
}
