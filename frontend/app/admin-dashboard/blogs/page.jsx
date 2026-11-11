'use client'

import AdminResourcePage from '@/components/shared/admin-resources/AdminResourcePage'
import BlogForm from '@/components/form/BlogForm'

export default function Page() {
  return <AdminResourcePage resource="blogs" slug="blogs" title="Blogs" label="Blog" Form={BlogForm} />
}
