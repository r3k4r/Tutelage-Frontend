'use client'

import { useAuth } from '@/hooks/useAuth'

const ROLE_LABEL = { ADMIN: 'Admin', MAIN_MANAGER: 'Manager' }

const initialsOf = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('') || '?'

/** Signed-in user chip for the header: initials avatar, name and role (name hides on phones). */
export default function ProfileBlock() {
  const { user, loading } = useAuth()
  if (loading) return <span className="size-9 animate-pulse rounded-full bg-muted" aria-hidden />
  if (!user) return null

  return (
    <div className="flex max-w-56 shrink-0 items-center gap-2.5" title={user.email}>
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
        {initialsOf(user.name)}
      </span>
      <span className="hidden min-w-0 flex-col leading-tight sm:flex">
        <span className="truncate text-sm font-medium">{user.name || user.email}</span>
        <span className="truncate text-xs text-muted-foreground">{ROLE_LABEL[user.role] || user.role}</span>
      </span>
    </div>
  )
}
