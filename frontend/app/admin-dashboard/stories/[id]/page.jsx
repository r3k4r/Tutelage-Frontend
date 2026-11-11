'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import StoryForm from '@/components/form/StoryForm'

export default function Page() {
  return <AdminResourceDetail resource="stories" slug="stories" label="Story" Form={StoryForm} />
}
