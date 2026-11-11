'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import AudioForm from '@/components/form/AudioForm'

export default function Page() {
  return <AdminResourcePage resource="listenings" slug="listenings" title="Listenings" label="Listening" Form={AudioForm} />
}
