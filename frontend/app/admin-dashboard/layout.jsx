import Sidebar from "@/components/layouts/admin/Sidebar"
import Header from "@/components/layouts/admin/Header"

export const metadata = {
  title: "Admin Dashboard | Tutelage",
  description: "Comprehensive admin dashboard for Tutelage language learning platform. Manage users, content, and analytics. Access ESL resources including videos, audios, readings, writings, speaking exercises, blogs, stories, quizzes, and landing pages. Monitor platform statistics and user engagement with real-time analytics and insights.",
}

// The shell is exactly one screen tall: the page scrolls inside <main>, never the body.
// A page that adds `h-full` to its root fills <main> and scrolls its own list instead.
export default function AdminDashboardLayout({ children }) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header />
        <main className="min-h-0 flex-1 overflow-y-auto p-2 md:p-4">{children}</main>
      </div>
    </div>
  )
}
