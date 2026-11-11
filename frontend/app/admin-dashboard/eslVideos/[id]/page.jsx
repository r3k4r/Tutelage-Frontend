'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import EslVideoForm from '@/components/form/EslVideoForm'

export default function Page() {
  return <AdminResourceDetail resource="eslVideos" slug="eslVideos" label="ESL Video" Form={EslVideoForm} />
}
