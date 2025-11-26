'use client'

import { User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useAuth } from "@/components/AuthContext"
import BASE_URL from "@/app/config/url"
import { useState } from "react"
import { toast } from "sonner"
import { set } from "zod"

export default function AdminProfileSection({ onLogout }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return null

  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    setIsLoading(true)
    const res = await fetch(`${BASE_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include"
    })
    const data = await res.json()
    if (!res.ok) {
      toast.error(data.message || "Failed to logout")
      setIsLoading(false)
      return
    }
    setIsLoading(false)
    toast.success(data.message || "Logged out successfully")
    if (onLogout) onLogout()
    window.location.href = "/"
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refreshToken")
  }

  return (
    <div>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gray-100">
            {user?.image ? (
              <Image
                src={user.image}
                alt="Provider Logo"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                <User className="h-6 w-6" />
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {user?.name || "Admin"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email || ""}
            </p>
          </div>
        </div>
      </div>
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4" />
            {isLoading ? "Logging out..." : "Logout"}
          </Button>
        </div>
    </div>
  )
}
