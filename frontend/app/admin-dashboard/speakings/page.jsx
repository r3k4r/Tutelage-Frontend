'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import VideoForm from '@/components/form/VideoForm'

export default function Page() {
  return <AdminResourcePage resource="speakings" slug="speakings" title="Speakings" label="Speaking" Form={VideoForm} />
}
