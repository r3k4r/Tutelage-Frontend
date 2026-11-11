import { notFound } from 'next/navigation'
import ResourceDetail from '@/components/shared/resources/ResourceDetail'
import { SKILLS, SKILL_RESOURCE } from '@/common/data/skills'

const KIND = { listening: 'audio', reading: 'text', speaking: 'video', writing: 'text' }

export default async function Page({ params }) {
  const { skill, level } = await params
  if (!SKILLS[skill]?.levels[level]) notFound()
  return <ResourceDetail resource={SKILL_RESOURCE[skill]} kind={KIND[skill]} backHref={`/skills/${skill}/${level}`} />
}
