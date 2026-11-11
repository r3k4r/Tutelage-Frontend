'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import EslVideoForm from '@/components/form/EslVideoForm'

export default function Page() {
  return <AdminResourcePage resource="eslVideos" slug="eslVideos" title="ESL Videos" label="ESL Video" Form={EslVideoForm} />
}
