'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import EslAudioForm from '@/components/form/EslAudioForm'

export default function Page() {
  return <AdminResourceDetail resource="eslAudios" slug="eslAudios" label="ESL Audio" Form={EslAudioForm} />
}
