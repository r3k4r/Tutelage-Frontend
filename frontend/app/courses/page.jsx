'use client'

import { useTranslation } from 'react-i18next'
import CoursesHero from '@/components/pages/courses/CoursesHero'
import CoursesShowcase from '@/components/pages/courses/CoursesShowcase'
import CoursesCTA from '@/components/pages/courses/CoursesCTA'

export default function CoursesPage() {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ku'

  return (
    <>
      <CoursesHero />
      <CoursesShowcase />
      <CoursesCTA />
    </>
  )
}
