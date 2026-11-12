"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown, LogOut, PanelLeft, PanelLeftClose, X } from "lucide-react"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { logout } from "@/common/utils/auth"
import { isActiveGroup, isActiveItem, sidebarFor } from "@/common/constants/admin-sidebar"

const itemClass = (active, collapsed) =>
  cn(
    "flex items-center gap-3 rounded-md p-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
    collapsed && "justify-center",
    active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
  )

function NavLink({ item, pathname, collapsed, onNavigate, nested = false }) {
  const Icon = item.icon
  const active = isActiveItem(item.href, pathname)
  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      title={collapsed ? item.name : undefined}
      className={cn(itemClass(active, collapsed), nested && !collapsed && "py-1.5")}
    >
      <Icon className={cn("shrink-0", nested && !collapsed ? "size-4" : "size-5")} />
      {!collapsed && <span className="truncate">{item.name}</span>}
    </Link>
  )
}

function NavGroup({ group, pathname, collapsed, open, onToggle, onNavigate }) {
  // Icon rail: no headers to expand, so show the children's own icons in a block.
  if (collapsed) {
    return (
      <div className="flex flex-col gap-1 border-t pt-1">
        {group.items.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} collapsed onNavigate={onNavigate} />
        ))}
      </div>
    )
  }

  const Icon = group.icon
  const active = isActiveGroup(group, pathname)
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-3 rounded-md p-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
          active ? "font-medium text-foreground" : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
        )}
      >
        <Icon className="size-5 shrink-0" />
        <span className="truncate">{group.name}</span>
        <ChevronDown className={cn("ms-auto size-4 shrink-0 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {/* grid-rows trick: animates open/closed without knowing the panel's height */}
      <div className={cn("grid transition-[grid-template-rows] duration-200", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="ms-4 flex flex-col gap-0.5 border-s py-1 ps-3">
            {group.items.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} onNavigate={onNavigate} nested />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarContent({ collapsed, onToggleCollapsed, onClose, onNavigate }) {
  const pathname = usePathname()
  const { user } = useAuth()
  const entries = sidebarFor(user?.role)
  // Open the current page's group in the very first render, so it never snaps open after load.
  const [openGroups, setOpenGroups] = useState(
    () => new Set(entries.filter((e) => e.items && isActiveGroup(e, pathname)).map((e) => e.key)),
  )

  // The group holding the current page is always open (also after client-side navigation).
  useEffect(() => {
    const active = entries.find((e) => e.items && isActiveGroup(e, pathname))
    if (active) setOpenGroups((prev) => (prev.has(active.key) ? prev : new Set(prev).add(active.key)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, user?.role])

  const toggleGroup = (key) =>
    setOpenGroups((prev) => {
      const next = new Set(prev)
      next.has(key) ? next.delete(key) : next.add(key)
      return next
    })

  const signOut = async () => {
    const res = await logout()
    if (!res.ok && res.status !== 401) toast.error(res.message)
    window.location.href = "/"
  }

  return (
    <>
      <div className={cn("flex h-14 shrink-0 items-center gap-2 border-b px-3", collapsed && "justify-center")}>
        {!collapsed && (
          <Link href="/admin-dashboard" className="flex min-w-0 items-center gap-2.5" onClick={onNavigate}>
            <Image src="/only-logo-black-border-yellow-bg.svg" alt="" width={28} height={28} />
            <span className="truncate text-base font-bold">Tutelage</span>
          </Link>
        )}
        {onToggleCollapsed && (
          <button
            type="button"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={cn("rounded-md p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary", !collapsed && "ms-auto")}
          >
            {collapsed ? <PanelLeft className="size-5" /> : <PanelLeftClose className="size-5" />}
          </button>
        )}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ms-auto rounded-md p-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
          >
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav aria-label="Admin" className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden px-3 py-2">
        {entries.map((entry) =>
          entry.items ? (
            <NavGroup
              key={entry.key}
              group={entry}
              pathname={pathname}
              collapsed={collapsed}
              open={openGroups.has(entry.key)}
              onToggle={() => toggleGroup(entry.key)}
              onNavigate={onNavigate}
            />
          ) : (
            <NavLink key={entry.href} item={entry} pathname={pathname} collapsed={collapsed} onNavigate={onNavigate} />
          ),
        )}
      </nav>

      <div className="shrink-0 border-t px-3 py-2">
        <button
          type="button"
          onClick={signOut}
          title={collapsed ? "Log out" : undefined}
          className={cn(
            "flex w-full items-center gap-3 rounded-md p-2 text-sm text-muted-foreground outline-none transition-colors hover:bg-destructive hover:text-white focus-visible:ring-2 focus-visible:ring-ring",
            collapsed && "justify-center",
          )}
        >
          <LogOut className="size-5 shrink-0" />
          {!collapsed && "Log out"}
        </button>
      </div>
    </>
  )
}

export default function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile }) {
  const pathname = usePathname()

  // Close the drawer on navigation (back/forward included).
  useEffect(() => onCloseMobile(), [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <aside
        className={cn(
          "hidden h-full shrink-0 flex-col border-e bg-card transition-[width] duration-200 md:flex",
          collapsed ? "w-16" : "w-60",
        )}
      >
        <SidebarContent collapsed={collapsed} onToggleCollapsed={onToggleCollapsed} />
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
            />
            <motion.aside
              className="fixed start-0 top-0 z-50 flex h-dvh w-[75%] max-w-64 flex-col border-e bg-card md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
            >
              <SidebarContent collapsed={false} onClose={onCloseMobile} onNavigate={onCloseMobile} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
