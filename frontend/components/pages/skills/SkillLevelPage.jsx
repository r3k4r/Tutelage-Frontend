import CallToAction from '@/components/shared/cta/CallToAction'
import PageHero from '@/components/app/PageHero'
import ResourceGrid from '@/components/shared/resources/ResourceGrid'
import { SKILLS, SKILL_RESOURCE } from '@/common/data/skills'

const capitalize = (s) => s[0].toUpperCase() + s.slice(1)

/** /skills/<skill>/<level>: level intro and the lessons for that level. */
export default function SkillLevelPage({ skill, level }) {
  const data = SKILLS[skill].levels[level]
  return (
    <div className="relative min-h-screen bg-background pt-4">
      <PageHero title={`${data.code} ${capitalize(skill)}`} image={data.image}>
        <p>{data.description}</p>
      </PageHero>
      <ResourceGrid
        resource={SKILL_RESOURCE[skill]}
        level={data.code}
        hrefBase={`/skills/${skill}/${level}`}
        title={`Choose a ${skill} lesson`}
      />
      <CallToAction />
    </div>
  )
}
