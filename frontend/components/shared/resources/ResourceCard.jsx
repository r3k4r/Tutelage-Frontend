import Image from 'next/image'
import Link from 'next/link'
import { youtubeThumbnail } from '@/common/utils/youtube'

/** Best image for a resource: explicit thumbnail, then YouTube still, then uploaded image. */
export function resourceImage(item) {
  return item?.thumbnailUrl || youtubeThumbnail(item?.videoRef) || item?.imageUrl || item?.imageRef || null
}

export default function ResourceCard({ href, item }) {
  const image = resourceImage(item)
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-lg border border-border bg-card shadow-md transition-shadow duration-300 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-primary"
    >
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="mb-3 truncate text-xl font-bold text-foreground" title={item.title}>
          {item.title}
        </h3>
        {item.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground" title={item.description}>
            {item.description}
          </p>
        )}
      </div>
    </Link>
  )
}
