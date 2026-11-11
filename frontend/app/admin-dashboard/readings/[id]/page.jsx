'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import ReadingForm from '@/components/form/ReadingForm'

export default function Page() {
  return <AdminResourceDetail resource="readings" slug="readings" label="Reading" Form={ReadingForm} />
}
