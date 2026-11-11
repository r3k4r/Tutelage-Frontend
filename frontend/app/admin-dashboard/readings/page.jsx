'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import ReadingForm from '@/components/form/ReadingForm'

export default function Page() {
  return <AdminResourcePage resource="readings" slug="readings" title="Readings" label="Reading" Form={ReadingForm} />
}
