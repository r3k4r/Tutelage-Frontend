"use client"

import Link from "next/link"
import { ExternalLink, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import ThemeToggle from "@/components/app/ThemeToggle"
import NotificationBell from "@/components/layouts/admin/NotificationBell"
import ProfileBlock from "@/components/layouts/admin/ProfileBlock"

/** Admin top bar: menu button on phones; notifications, theme, site link and profile on the right. */
export default function Header({ onOpenMenu }) {
  return (
    <header className="z-30 flex h-14 w-full shrink-0 items-center gap-2 border-b bg-background/95 px-2 backdrop-blur md:px-4">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onOpenMenu} aria-label="Open menu">
        <Menu className="size-5" />
      </Button>
      <div className="ms-auto flex items-center gap-1 sm:gap-2">
        <NotificationBell />
        <ThemeToggle />
        <Button asChild variant="ghost" size="icon" title="View site">
          <Link href="/" aria-label="View site">
            <ExternalLink className="size-5" />
          </Link>
        </Button>
        <span className="mx-1 h-6 w-px bg-border" aria-hidden />
        <ProfileBlock />
      </div>
    </header>
  )
}
