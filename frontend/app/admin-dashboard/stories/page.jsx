'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import StoryForm from '@/components/form/StoryForm'

export default function Page() {
  return <AdminResourcePage resource="stories" slug="stories" title="Stories" label="Story" Form={StoryForm} />
}
