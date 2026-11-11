import Image from 'next/image'

/**
 * Page title, optional wide hero image and intro text — the header block of
 * library, skill-level and detail pages. `action` sits beside the title (e.g. a Back button).
 */
export default function PageHero({ title, image, imageAlt = '', action, children }) {
  return (
    <header className="container-page space-y-6 pb-10 pt-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <h1 className="min-w-0 break-words text-2xl font-bold text-foreground sm:text-4xl lg:text-5xl">{title}</h1>
        {action}
      </div>
      {image && (
        <div className="relative h-56 w-full overflow-hidden rounded-lg shadow-lg sm:h-80 md:h-96 lg:h-[28rem]">
          <Image src={image} alt={imageAlt} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}
      {children && <div className="max-w-5xl text-lg leading-relaxed text-muted-foreground">{children}</div>}
    </header>
  )
}
