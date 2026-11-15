'use client'

import { use } from 'react'
import PassageFormPage from '@/components/pages/admin/quiz/PassageFormPage'

export default function Page({ searchParams }) {
  // "Add passage" on the map links here with the section and the free range filled in
  const { sectionId, start, end } = use(searchParams)
  return <PassageFormPage mode="create" preset={{ sectionId, start, end }} />
}
