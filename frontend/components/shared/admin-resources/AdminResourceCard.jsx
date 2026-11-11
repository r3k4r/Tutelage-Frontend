import Image from 'next/image'
import Link from 'next/link'
import { Edit, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { resourceImage } from '@/components/shared/resources/ResourceCard'

/** Admin list card: links to the item's admin detail page, with edit/delete actions. */
export default function AdminResourceCard({ item, href, onEdit, onDelete }) {
  const image = resourceImage(item)
  const levels = [].concat(item.level ?? []).filter(Boolean)

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-shadow hover:shadow-md">
      <Link href={href} className="flex flex-1 flex-col outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <div className="relative aspect-[16/9] w-full bg-muted">
          {image && <Image src={image} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1680px) 33vw, 17vw" />}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-4">
          <h2 className="truncate text-base font-semibold text-foreground" title={item.title}>{item.title}</h2>
          {item.description && <p className="line-clamp-2 text-sm text-muted-foreground">{item.description}</p>}
          {levels.length > 0 && (
            <ul className="flex flex-wrap gap-1">
              {levels.map((level) => (
                <li key={level} className="rounded-md bg-primary/10 px-2 py-0.5 text-xs text-primary">{level}</li>
              ))}
            </ul>
          )}
          <p className="mt-auto truncate text-xs text-muted-foreground">
            {item.author?.name && <>By {item.author.name} · </>}
            {item.createdAt && new Date(item.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
      <div className="absolute end-2 top-2 flex gap-1">
        <Button size="icon" variant="secondary" className="size-8" onClick={() => onEdit(item)} aria-label={`Edit ${item.title}`}>
          <Edit className="size-4" />
        </Button>
        <Button size="icon" variant="destructive" className="size-8" onClick={() => onDelete(item)} aria-label={`Delete ${item.title}`}>
          <Trash2 className="size-4" />
        </Button>
      </div>
    </article>
  )
}
