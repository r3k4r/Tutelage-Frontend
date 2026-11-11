'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PdfButton from '@/components/app/pdf/PdfButton'
import PdfModal from '@/components/app/pdf/PdfModal'
import CompactAudioPlayer from '@/components/app/players/CompactAudioPlayer'
import SingleSourceCTA from '@/components/shared/cta/SingleSourceCTA'
import Collapsible from '@/components/app/Collapsible'
import PageHero from '@/components/app/PageHero'
import { resourceImage } from '@/components/shared/resources/ResourceCard'
import { usePdfModal } from '@/hooks/usePdfModal'
import { useResource } from '@/hooks/useResource'
import { youtubeEmbedUrl } from '@/common/utils/youtube'
import { RESOURCES } from '@/common/constants/resources'

const LEVEL_PAGES = ['a1', 'a2', 'b1', 'b2', 'c1']

/** "B1 Intermediate" -> /levels/b1; unknown levels go to the levels overview. */
export function levelHref(level) {
  const code = String(level).trim().slice(0, 2).toLowerCase()
  return LEVEL_PAGES.includes(code) ? `/levels/${code}` : '/levels'
}

/**
 * Detail page for any resource. `kind` picks the main body:
 *   video (YouTube + transcript) | audio (player + transcript) | text (reading text) | story (audio + story text)
 * `backHref` is where Back goes when there is no in-site history (direct visit).
 */
export default function ResourceDetail({ resource, kind, backHref }) {
  const { id } = useParams()
  const router = useRouter()
  const { data: item, loading, notFound } = useResource(RESOURCES[resource].item, id)
  const pdf = usePdfModal()

  const goBack = () => (window.history.length > 1 ? router.back() : router.push(backHref))

  if (notFound) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-2xl font-bold">We couldn&apos;t find that {RESOURCES[resource].noun}.</h1>
        <Button asChild variant="outline">
          <Link href={backHref}>Back to the list</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="bg-background pt-4">
      <PageHero
        title={loading ? <span className="inline-block h-10 w-2/3 animate-pulse rounded bg-muted" aria-label="Loading" /> : item.title}
        image={item && resourceImage(item)}
        action={
          <Button variant="outline" size="lg" onClick={goBack}>
            <ArrowLeft className="size-5" />
            Back
          </Button>
        }
      >
        {item?.description && <p>{item.description}</p>}
      </PageHero>

      {item && (
        <div className="container-page space-y-6 pb-16">
          {item.pdf && (
            <Collapsible title="Preparation exercise">
              <PdfButton pdfUrl={item.pdf} onOpen={(url) => pdf.openPdf(url, 'Preparation PDF')} label="Preparation PDF" />
            </Collapsible>
          )}

          <Body kind={kind} item={item} />

          {item.tasks?.length > 0 && (
            <div className="space-y-4">
              {item.tasks.map((task, i) => (
                <Collapsible key={task.id ?? i} title={`Task ${i + 1}`}>
                  {task.content && <p className="text-sm leading-relaxed text-foreground">{task.content}</p>}
                  {task.filePath && (
                    <PdfButton pdfUrl={task.filePath} onOpen={(url) => pdf.openPdf(url, `Task ${i + 1}`)} label="Task PDF" />
                  )}
                </Collapsible>
              ))}
            </div>
          )}

          <Pills title="Tags" items={item.tags} render={(tag) => <span className="rounded bg-black px-4 py-3 text-sm font-semibold text-white">{tag}</span>} />
          <Pills
            title="Language Level"
            items={[].concat(item.level ?? [])}
            render={(level) => (
              <Link href={levelHref(level)} className="rounded bg-primary/90 px-4 py-3 font-semibold text-white hover:bg-primary">
                {level}
              </Link>
            )}
          />
        </div>
      )}

      <SingleSourceCTA />
      <PdfModal isOpen={pdf.isOpen} onClose={pdf.closePdf} pdfUrl={pdf.pdfUrl} title={pdf.title} />
    </div>
  )
}

function Body({ kind, item }) {
  if (kind === 'video') {
    const embed = youtubeEmbedUrl(item.videoRef)
    return (
      <>
        <div className="overflow-hidden rounded-lg shadow-lg">
          {embed ? (
            <div className="relative aspect-video">
              <iframe
                src={embed}
                title={item.title}
                className="absolute inset-0 size-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="p-6 text-muted-foreground">This video can&apos;t be embedded.</p>
          )}
        </div>
        <Transcript text={item.transcript} />
      </>
    )
  }

  if (kind === 'audio') {
    return (
      <>
        {item.audioRef && <AudioBox title="Audio Player" src={item.audioRef} />}
        <Transcript text={item.transcript} />
      </>
    )
  }

  if (kind === 'story') {
    return (
      <>
        {item.audioRef && <AudioBox title="Audio Story" src={item.audioRef} />}
        <TextBox title="Story Content" text={item.contentText} footer={item.wordCount && `Word count: ${item.wordCount}`} />
      </>
    )
  }

  return <TextBox title="Reading Text" text={item.content} image={item.contentImageUrl} />
}

function AudioBox({ title, src }) {
  return (
    <section className="rounded-lg border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <CompactAudioPlayer src={src} youtubeUrl={src} />
    </section>
  )
}

function Transcript({ text }) {
  return (
    <Collapsible title="Transcript">
      {text ? (
        <p className="whitespace-pre-wrap leading-relaxed text-foreground">{text}</p>
      ) : (
        <p className="text-sm text-muted-foreground">Transcript will be added soon.</p>
      )}
    </Collapsible>
  )
}

function TextBox({ title, text, image, footer }) {
  if (!text && !image) return null
  return (
    <section className="overflow-hidden rounded-md border">
      <h2 className="border-b bg-card px-6 py-4 text-2xl font-bold text-foreground sm:text-3xl">{title}</h2>
      <div className="px-6 py-6">
        {image && (
          <Image src={image} alt="" width={1200} height={600} className="mb-6 h-auto w-full rounded object-cover" />
        )}
        {text && <div className="max-w-none whitespace-pre-wrap text-lg leading-relaxed text-foreground">{text}</div>}
        {footer && <p className="mt-4 text-sm text-muted-foreground">{footer}</p>}
      </div>
    </section>
  )
}

function Pills({ title, items, render }) {
  if (!items?.length) return null
  return (
    <section>
      <h2 className="mb-6 text-3xl font-bold text-foreground">{title}</h2>
      <ul className="flex flex-wrap gap-3">
        {items.map((value) => (
          <li key={value}>{render(value)}</li>
        ))}
      </ul>
    </section>
  )
}
