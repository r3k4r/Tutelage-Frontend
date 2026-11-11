'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import EslAudioForm from '@/components/form/EslAudioForm'

export default function Page() {
  return <AdminResourcePage resource="eslAudios" slug="eslAudios" title="ESL Audios" label="ESL Audio" Form={EslAudioForm} />
}
