'use client'

import AdminResourceDetail from '@/components/shared/admin-resources/AdminResourceDetail'
import BlogForm from '@/components/form/BlogForm'

export default function Page() {
  return <AdminResourceDetail resource="blogs" slug="blogs" label="Blog" Form={BlogForm} />
}
