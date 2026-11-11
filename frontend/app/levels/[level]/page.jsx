import { notFound } from 'next/navigation'
import LevelPageContent from '@/components/pages/levels/LevelPageContent'
import { LEVELS } from '@/common/data/levels'
import { constructMetadata } from '@/common/utils/seo'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(LEVELS).map((level) => ({ level }))
}

export async function generateMetadata({ params }) {
  const { level } = await params
  return constructMetadata(LEVELS[level]?.seo)
}

export default async function Page({ params }) {
  const { level } = await params
  if (!LEVELS[level]) notFound()
  return <LevelPageContent level={level} />
}
