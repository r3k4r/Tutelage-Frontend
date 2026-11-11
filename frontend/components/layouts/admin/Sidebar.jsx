"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProfileBlock from "@/components/layouts/admin/ProfileBlock"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { isActiveItem, sidebarFor } from "@/common/constants/admin-sidebar"

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <Image src="/only-logo-black-border-yellow-bg.svg" alt="" width={30} height={30} />
      <span className="text-lg font-bold">Tutelage</span>
    </div>
  )
}

function Nav({ items, pathname, onNavigate }) {
  return (
    <nav aria-label="Admin" className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 py-2">
      {items.map(({ icon: Icon, name, href }) => {
        const active = isActiveItem(href, pathname)
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            {name}
          </Link>
        )
      })}
    </nav>
  )
}

export default function Sidebar() {
  const pathname = usePathname()
  const { user, loading } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const items = sidebarFor(user?.role)
  const profile = <ProfileBlock session={user ? { user } : null} loading={loading} />

  // Close the drawer on navigation (back/forward included).
  useEffect(() => setMobileOpen(false), [pathname])

  return (
    <>
      {/* Desktop */}
      <aside className="hidden h-full w-[200px] shrink-0 flex-col border-e bg-card md:flex">
        <div className="flex h-14 shrink-0 items-center border-b px-4">
          <Brand />
        </div>
        <Nav items={items} pathname={pathname} />
        {profile}
      </aside>

      {/* Mobile */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed start-2 top-3 z-40 size-8 md:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="size-4" />
      </Button>
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed start-0 top-0 z-50 flex h-dvh w-[70%] max-w-[250px] flex-col border-e bg-background md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
            >
              <div className="flex h-14 shrink-0 items-center justify-between border-b px-4">
                <Brand />
                <Button variant="ghost" size="icon" className="size-8" onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X className="size-4" />
                </Button>
              </div>
              <Nav items={items} pathname={pathname} onNavigate={() => setMobileOpen(false)} />
              {profile}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
