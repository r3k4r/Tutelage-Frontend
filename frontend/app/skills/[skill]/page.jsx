import { notFound } from 'next/navigation'
import SkillOverview from '@/components/pages/skills/SkillOverview'
import { SKILLS } from '@/common/data/skills'
import { constructMetadata } from '@/common/utils/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(SKILLS).map((skill) => ({ skill }))
}

export async function generateMetadata({ params }) {
  const { skill } = await params
  return constructMetadata(SKILLS[skill]?.seo)
}

export default async function Page({ params }) {
  const { skill } = await params
  if (!SKILLS[skill]) notFound()
  return <SkillOverview skill={skill} />
}
