import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import PageHero from '@/components/app/PageHero'
import { cn } from '@/lib/utils'
import { SKILLS } from '@/common/data/skills'

/** /skills/<skill>: intro, one card per CEFR level, and the "why use these" CTA. */
export default function SkillOverview({ skill }) {
  const data = SKILLS[skill]
  const levels = Object.entries(data.levels)

  return (
    <div className="relative min-h-screen bg-background pt-4">
      <PageHero title={data.title} image={data.heroImage}>
        <p>{data.description}</p>
      </PageHero>

      <section className="container-page space-y-16 py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">Choose Your Level</h2>
        {levels.map(([code, level], index) => {
          const even = index % 2 === 0
          return (
            <article
              key={code}
              className="overflow-hidden rounded-sm border border-border shadow-lg max-lg:rounded-tl-[2rem] max-lg:rounded-br-[2rem] lg:rounded-tr-[4rem] lg:rounded-bl-[4rem]"
            >
              <div className={cn('flex flex-col-reverse items-stretch', even ? 'lg:flex-row' : 'lg:flex-row-reverse')}>
                <div className="flex w-full items-center px-6 py-10 lg:w-1/2 lg:px-12 lg:py-0">
                  <div>
                    <h3 className="mb-4 text-2xl font-bold text-foreground sm:mb-6 md:text-3xl lg:text-4xl xl:text-5xl">
                      {level.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted-foreground sm:text-base lg:text-lg">{level.description}</p>
                    <Button asChild size="lg" className="px-8 text-lg font-semibold shadow-lg">
                      <Link href={`/skills/${skill}/${code}`}>
                        Explore {level.code}
                        <ChevronRight className="size-5" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 w-full sm:h-[28rem] lg:h-[32rem] lg:w-1/2 xl:h-[36rem]">
                  <Image src={level.image} alt="" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 640px" />
                </div>
              </div>
            </article>
          )
        })}
      </section>

      {data.whyUse && (
        <section className="bg-primary/10 py-16">
          <div className="container-page">
            <div className="max-w-4xl">
              <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">{data.whyUse.title}</h2>
              <p className="mb-8 text-base leading-relaxed text-muted-foreground sm:text-lg">{data.whyUse.content}</p>
              <Button asChild size="lg" className="px-8 text-lg font-semibold shadow-lg">
                <Link href="/courses">
                  {data.coursesButtonText}
                  <ChevronRight className="size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
