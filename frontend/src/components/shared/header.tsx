'use client'

import { Bell, Menu, Plus, Search, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'

export function Header() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center gap-4 px-6">
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex-1 md:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search cameras, alerts..."
              className="pl-9 bg-muted/50 border-0 placeholder:text-muted-foreground"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                  3
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto space-y-2 p-2">
                <NotificationItem
                  title="New manhole detected"
                  description="Camera #12 - Main St & 5th Ave"
                  time="2 minutes ago"
                  severity="high"
                />
                <NotificationItem
                  title="Camera offline"
                  description="Camera #8 - Park Ave"
                  time="15 minutes ago"
                  severity="medium"
                />
                <NotificationItem
                  title="System update complete"
                  description="All systems upgraded successfully"
                  time="1 hour ago"
                  severity="low"
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-sm">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" size="sm" className="gap-2 hidden md:flex bg-transparent">
            <Plus className="h-4 w-4" />
            Add Camera
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-white text-xs font-bold">
                    AU
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

function NotificationItem({
  title,
  description,
  time,
  severity,
}: {
  title: string
  description: string
  time: string
  severity: 'high' | 'medium' | 'low'
}) {
  return (
    <div className="rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors cursor-pointer">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
          <p className="text-xs text-muted-foreground mt-2">{time}</p>
        </div>
        <Badge
          variant={severity === 'high' ? 'destructive' : 'secondary'}
          className="text-xs"
        >
          {severity}
        </Badge>
      </div>
    </div>
  )
}
