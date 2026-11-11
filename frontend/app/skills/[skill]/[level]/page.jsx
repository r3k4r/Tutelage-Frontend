import { notFound } from 'next/navigation'
import SkillLevelPage from '@/components/pages/skills/SkillLevelPage'
import { SKILLS } from '@/common/data/skills'
import { constructMetadata } from '@/common/utils/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.entries(SKILLS).flatMap(([skill, data]) => Object.keys(data.levels).map((level) => ({ skill, level })))
}

export async function generateMetadata({ params }) {
  const { skill, level } = await params
  return constructMetadata(SKILLS[skill]?.levels[level]?.seo)
}

export default async function Page({ params }) {
  const { skill, level } = await params
  if (!SKILLS[skill]?.levels[level]) notFound()
  return <SkillLevelPage skill={skill} level={level} />
}
