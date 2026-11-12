'use client'

import { useEffect, useState } from 'react'
import Sidebar from '@/components/layouts/admin/Sidebar'
import Header from '@/components/layouts/admin/Header'

const COLLAPSED_KEY = 'admin-sidebar-collapsed'

/**
 * Admin frame: sidebar + header + the scrolling <main>. Exactly one screen tall, the body never scrolls;
 * a page with `h-full` on its root fills <main> and scrolls its own list instead.
 */
export default function AdminShell({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Read after mount so the server render and first client render agree.
  useEffect(() => {
    try {
      setCollapsed(localStorage.getItem(COLLAPSED_KEY) === '1')
    } catch {
      // storage blocked: start expanded
    }
  }, [])

  const toggleCollapsed = () =>
    setCollapsed((value) => {
      try {
        localStorage.setItem(COLLAPSED_KEY, value ? '0' : '1')
      } catch {
        // storage blocked: the choice lasts until reload
      }
      return !value
    })

  return (
    <div className="flex h-dvh overflow-hidden bg-background text-foreground">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapsed={toggleCollapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onOpenMenu={() => setMobileOpen(true)} />
        <main className="min-h-0 flex-1 overflow-y-auto p-2 md:p-4">{children}</main>
      </div>
    </div>
  )
}
