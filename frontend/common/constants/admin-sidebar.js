import {
  Bell,
  BookOpen,
  ChartArea,
  FileQuestion,
  FileVolume,
  Headphones,
  Home,
  Monitor,
  MonitorCog,
  Newspaper,
  PenTool,
  Users,
  Video,
} from 'lucide-react'

// Admin sidebar entries. `adminOnly` items are hidden from MAIN_MANAGER — keep them in step
// with the ADMIN-only paths in middleware.js.
export const ADMIN_SIDEBAR = [
  { icon: Home, name: 'Dashboard', href: '/admin-dashboard' },
  { icon: ChartArea, name: 'Analytics', href: '/admin-dashboard/analytics' },
  { icon: Bell, name: 'Approvals', href: '/admin-dashboard/approvals', adminOnly: true },
  { icon: Users, name: 'Users', href: '/admin-dashboard/users', adminOnly: true },
  { icon: Video, name: 'Speakings', href: '/admin-dashboard/speakings' },
  { icon: FileVolume, name: 'Listening', href: '/admin-dashboard/listenings' },
  { icon: FileVolume, name: 'Readings', href: '/admin-dashboard/readings' },
  { icon: PenTool, name: 'Writings', href: '/admin-dashboard/writings' },
  { icon: Monitor, name: 'ESL Videos', href: '/admin-dashboard/eslVideos' },
  { icon: Headphones, name: 'ESL Audios', href: '/admin-dashboard/eslAudios' },
  { icon: BookOpen, name: 'Stories', href: '/admin-dashboard/stories' },
  { icon: Newspaper, name: 'Blogs', href: '/admin-dashboard/blogs' },
  { icon: FileQuestion, name: 'Quiz', href: '/admin-dashboard/quiz', adminOnly: true },
  { icon: MonitorCog, name: 'Landing', href: '/admin-dashboard/landing' },
]

/** Entries the given role may see. */
export const sidebarFor = (role) => ADMIN_SIDEBAR.filter((item) => !(item.adminOnly && role === 'MAIN_MANAGER'))

/** Active for its own page and any page under it (a resource's detail pages), except the bare dashboard. */
export const isActiveItem = (href, pathname) =>
  href === '/admin-dashboard' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)
