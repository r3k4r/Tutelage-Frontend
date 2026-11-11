import CallToAction from '@/components/shared/cta/CallToAction'
import PageHero from '@/components/app/PageHero'
import ResourceGrid from '@/components/shared/resources/ResourceGrid'
import { ESL_LIBRARIES } from '@/common/data/eslLibraries'

/** /esl-resources/<slug>: hero, how-to steps, the paginated grid and the CTA. */
export default function LibraryPage({ slug }) {
  const lib = ESL_LIBRARIES[slug]
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <PageHero title={lib.title} image={lib.heroImage}>
        <p>{lib.intro}</p>
        <div className="mt-8 rounded-lg bg-muted/20 p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold text-foreground sm:text-2xl">{lib.howToTitle}</h2>
          <ul className="space-y-4">
            {lib.steps.map(([title, description]) => (
              <li key={title} className="flex items-start gap-3">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                <span className="text-base sm:text-lg">
                  <strong className="font-semibold text-foreground">{title}</strong> – {description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </PageHero>
      <ResourceGrid
        resource={lib.resource}
        hrefBase={`/esl-resources/${slug}`}
        title={lib.gridTitle}
        searchable={lib.searchable}
        categories={lib.categories}
      />
      <CallToAction />
    </div>
  )
}
