'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import AudioForm from '@/components/form/AudioForm'

export default function Page() {
  return <AdminResourceDetail resource="listenings" slug="listenings" label="Listening" Form={AudioForm} />
}
