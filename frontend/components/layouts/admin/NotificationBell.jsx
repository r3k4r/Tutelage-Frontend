"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Bell, Edit, Eye, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/hooks/useAuth"
import { api } from "@/common/utils/api"

const ACTION_ICON = { CREATE: Plus, UPDATE: Edit, DELETE: Trash2 }
const ACTION_COLOR = { CREATE: "border-s-emerald-500", UPDATE: "border-s-blue-500", DELETE: "border-s-red-500" }
const POLL_MS = 30_000

const titleOf = (approval) =>
  approval.payload?.title ||
  approval.enhancedPayload?.changes?.title ||
  `${approval.resourceType} ${approval.resourceId || "New"}`

/** Pending approval requests (ADMIN only), polled every 30s. */
export default function NotificationBell() {
  const { user } = useAuth()
  const [approvals, setApprovals] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user?.role !== "ADMIN") return
    const load = async () => {
      const res = await api("/api/approvals", { query: { status: "PENDING" } })
      if (res.ok) setApprovals(res.data?.approvals || [])
    }
    load()
    const id = setInterval(load, POLL_MS)
    return () => clearInterval(id)
  }, [user?.role])

  if (user?.role !== "ADMIN") return null
  const count = approvals.length

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Approval requests (${count} pending)`}>
          <Bell className="size-5" />
          {count > 0 && (
            <span className="absolute -end-0.5 -top-0.5 flex min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-semibold leading-4 text-white">
              {count > 99 ? "99+" : count}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="border-b p-4">
          <p className="font-semibold">Approval requests</p>
          <p className="text-sm text-muted-foreground">
            {count} pending request{count === 1 ? "" : "s"}
          </p>
        </div>
        <div className="max-h-96 overflow-y-auto p-2">
          {count === 0 ? (
            <p className="p-4 text-center text-sm text-muted-foreground">No pending requests</p>
          ) : (
            <ul className="space-y-2">
              {approvals.slice(0, 5).map((approval) => {
                const Icon = ACTION_ICON[approval.action] || Eye
                return (
                  <li key={approval.id}>
                    <Link
                      href={`/admin-dashboard/approvals#approval-${approval.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3 rounded-md border border-s-4 p-2 transition-colors hover:bg-primary/10 ${ACTION_COLOR[approval.action] || "border-s-muted-foreground"}`}
                    >
                      <Icon className="mt-0.5 size-4 shrink-0" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs text-muted-foreground">
                          <span className="font-medium uppercase tracking-wide text-foreground">{approval.action}</span>{" "}
                          {approval.resourceType}
                        </span>
                        <span className="block truncate text-sm font-medium">{titleOf(approval)}</span>
                        <span className="block text-xs text-muted-foreground">
                          {new Date(approval.createdAt).toLocaleDateString()}
                        </span>
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        {count > 0 && (
          <div className="border-t p-3">
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link href="/admin-dashboard/approvals" onClick={() => setOpen(false)}>
                <Eye className="size-4" />
                Show all requests
              </Link>
            </Button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
