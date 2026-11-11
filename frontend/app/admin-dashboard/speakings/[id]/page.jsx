'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import VideoForm from '@/components/form/VideoForm'

export default function Page() {
  return <AdminResourceDetail resource="speakings" slug="speakings" label="Speaking" Form={VideoForm} />
}
