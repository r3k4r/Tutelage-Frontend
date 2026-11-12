import {
  Bell,
  BookOpen,
  ChartArea,
  FileQuestion,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  Library,
  Mic,
  MonitorCog,
  MonitorPlay,
  Newspaper,
  PenTool,
  Settings2,
  Users,
  Video,
  FileText,
} from 'lucide-react'

// Admin navigation. A group (has `items`) expands in place; `adminOnly` entries are hidden from
// MAIN_MANAGER — keep them in step with the ADMIN-only paths in middleware.js.
export const ADMIN_SIDEBAR = [
  { icon: LayoutDashboard, name: 'Dashboard', href: '/admin-dashboard' },
  { icon: ChartArea, name: 'Analytics', href: '/admin-dashboard/analytics' },
  {
    key: 'skills',
    icon: GraduationCap,
    name: 'Skills',
    items: [
      { icon: Mic, name: 'Speaking', href: '/admin-dashboard/speakings' },
      { icon: Headphones, name: 'Listening', href: '/admin-dashboard/listenings' },
      { icon: FileText, name: 'Reading', href: '/admin-dashboard/readings' },
      { icon: PenTool, name: 'Writing', href: '/admin-dashboard/writings' },
    ],
  },
  {
    key: 'library',
    icon: Library,
    name: 'ESL Library',
    items: [
      { icon: MonitorPlay, name: 'ESL Videos', href: '/admin-dashboard/eslVideos' },
      { icon: Video, name: 'ESL Audios', href: '/admin-dashboard/eslAudios' },
      { icon: BookOpen, name: 'Stories', href: '/admin-dashboard/stories' },
      { icon: Newspaper, name: 'Blogs', href: '/admin-dashboard/blogs' },
    ],
  },
  {
    key: 'management',
    icon: Settings2,
    name: 'Management',
    items: [
      { icon: Bell, name: 'Approvals', href: '/admin-dashboard/approvals', adminOnly: true },
      { icon: Users, name: 'Users', href: '/admin-dashboard/users', adminOnly: true },
      { icon: FileQuestion, name: 'Quiz', href: '/admin-dashboard/quiz', adminOnly: true },
      { icon: MonitorCog, name: 'Landing', href: '/admin-dashboard/landing' },
    ],
  },
]

const allowed = (item, role) => !(item.adminOnly && role === 'MAIN_MANAGER')

/** Navigation the given role may see; groups left empty are dropped. */
export const sidebarFor = (role) =>
  ADMIN_SIDEBAR.flatMap((entry) => {
    if (!entry.items) return allowed(entry, role) ? [entry] : []
    const items = entry.items.filter((item) => allowed(item, role))
    return items.length ? [{ ...entry, items }] : []
  })

/** Active for its own page and any page under it (a resource's detail pages), except the bare dashboard. */
export const isActiveItem = (href, pathname) =>
  href === '/admin-dashboard' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

/** A group is active when one of its children is. */
export const isActiveGroup = (group, pathname) => group.items.some((item) => isActiveItem(item.href, pathname))
