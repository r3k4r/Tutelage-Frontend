import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/app/PageHero'
import { LEVELS } from '@/common/data/levels'

const SKILL_CARDS = [
  { skill: 'listening', label: 'Listening', image: '/skills/listen.jpg' },
  { skill: 'speaking', label: 'Speaking', image: '/skills/speak.jpg' },
  { skill: 'reading', label: 'Reading', image: '/skills/read.jpg' },
  { skill: 'writing', label: 'Writing', image: '/skills/write.jpg' },
]

/** /levels/<level>: level description and links to its four skill pages. */
export default function LevelPageContent({ level }) {
  const { title, image, description } = LEVELS[level]
  const code = level.toUpperCase()

  return (
    <div className="relative min-h-screen bg-background pt-4">
      <PageHero title={title} image={image}>
        <p>{description}</p>
      </PageHero>

      <section className="bg-muted/20 py-16">
        <div className="container-page">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{title} Resources</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {SKILL_CARDS.map(({ skill, label, image: cardImage }) => (
              <article key={skill} className="overflow-hidden rounded-lg border border-border bg-card shadow-md transition-shadow hover:shadow-xl">
                <div className="relative h-48 w-full">
                  <Image src={cardImage} alt="" fill className="object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                </div>
                <div className="p-6">
                  <h3 className="mb-3 text-xl font-bold text-foreground">{code} {label}</h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                    Here you can find {skill} exercises that match your level, with a brief introduction to help you master each topic.
                  </p>
                  <Button asChild size="lg" className="w-full font-semibold shadow-lg">
                    <Link href={`/skills/${skill}/${level}`}>
                      Explore
                      <ChevronRight className="size-5" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
