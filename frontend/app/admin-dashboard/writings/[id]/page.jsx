'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import WritingForm from '@/components/form/WritingForm'

export default function Page() {
  return <AdminResourceDetail resource="writings" slug="writings" label="Writing" Form={WritingForm} />
}
