'use client'

import React from "react"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Camera,
  Bell,
  Settings,
  TrendingUp,
  FileText,
  Users,
  LogOut,
  User,
  ChevronUp,
  Shield,
  BadgeAlert,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useAuthStore } from "@/store/auth-store"
import { useRouter } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()
  const logout = useAuthStore((state) => state.logout)
  const user = useAuthStore((state) => state.user)
  const router = useRouter()

  function handleLogout() {
    logout()
    router.push("/login")
  }

  function NavLink({
    href,
    icon: Icon,
    children,
  }: {
    href: string
    icon: React.ComponentType<{ className?: string }>
    children: React.ReactNode
  }) {
    const isActive = pathname === href
    return (
      <Link href={href}>
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            isActive
              ? 'bg-primary/10 text-primary'
              : 'text-foreground/70 hover:bg-muted hover:text-foreground'
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="flex-1">{children}</span>
        </div>
      </Link>
    )
  }

  return (
    <aside className="sticky top-0 flex h-screen w-64 flex-col border-r border-border bg-card hidden lg:flex">
      <div className="flex h-16 items-center gap-3 border-b border-border px-6">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center">
          <Image src="/icon-192.png" alt="AI Manhole Detector Logo" width={32} height={32} priority={true} className='object-contain' />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-foreground">AI Manhole Detector</span>
          <span className="text-xs text-muted-foreground">Infrastructure Monitoring</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        <NavLink href="/dashboard" icon={LayoutDashboard}>
          Dashboard
        </NavLink>
        <NavLink href="/dashboard/cameras" icon={Camera}>
          <span className="flex-1">Cameras</span>
        </NavLink>
        <NavLink href="/dashboard/alerts" icon={Bell}>
          <span className="flex-1">Alerts</span>
        </NavLink>
        <NavLink href="/dashboard/settings" icon={Settings}>
          Settings
        </NavLink>

        <div className="my-4 border-t border-border" />

        <div className="space-y-1">
          <NavLink href="/dashboard/detections" icon={BadgeAlert}>
            AI Inspector
          </NavLink>
          <NavLink href="/dashboard/analytics" icon={TrendingUp}>
            Analytics
          </NavLink>
          <NavLink href="/dashboard/reports" icon={FileText}>
            Reports
          </NavLink>
          <NavLink href="/dashboard/team" icon={Users}>
            Team
          </NavLink>
        </div>
      </nav>

      <div className="border-t border-border p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 px-2 hover:bg-muted"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary text-white text-xs font-bold">
                  A
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium text-foreground">{user?.full_name || 'Operator'}</span>
                <span className="text-xs text-muted-foreground">{user?.email || 'operator@manhole.ai'}</span>
              </div>
              <ChevronUp className="ml-auto h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  )
}
