import AdminShell from "@/components/layouts/admin/AdminShell"

export const metadata = {
  title: "Admin Dashboard | Tutelage",
  description: "Comprehensive admin dashboard for Tutelage language learning platform. Manage users, content, and analytics. Access ESL resources including videos, audios, readings, writings, speaking exercises, blogs, stories, quizzes, and landing pages. Monitor platform statistics and user engagement with real-time analytics and insights.",
}

export default function AdminDashboardLayout({ children }) {
  return <AdminShell>{children}</AdminShell>
}
