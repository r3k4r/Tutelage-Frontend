'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import WritingForm from '@/components/form/WritingForm'

export default function Page() {
  return <AdminResourcePage resource="writings" slug="writings" title="Writings" label="Writing" Form={WritingForm} />
}
