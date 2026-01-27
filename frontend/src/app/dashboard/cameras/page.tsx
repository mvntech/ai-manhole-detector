'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Camera, Download, Eye, Filter, MapPin, MoreVertical, Plus, Settings, Trash } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { useCameras } from "@/hooks/use-cameras"
import type { Camera as CameraType } from "@/types/camera"

export default function CamerasPage() {
  const [filter, setFilter] = useState('all')
  const { cameras, isLoading } = useCameras();

  const filteredCameras = (cameras || []).filter((camera: CameraType) => {
    if (filter === 'all') return true
    return camera.status.toLowerCase() === filter
  })

  if (isLoading) return <div className="p-6">Loading cameras...</div>

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Cameras</h1>
          <p className="text-muted-foreground mt-1">Manage and monitor your camera network</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Link href="/dashboard/cameras/add">
            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4" />
              Add Camera
            </Button>
          </Link>
        </div>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">
            All Cameras
            <Badge variant="secondary" className="ml-2">
              {(cameras || []).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active
            <Badge variant="secondary" className="ml-2">
              {cameras.filter((c) => c.status.toLowerCase() === 'active').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="inactive">
            Inactive
            <Badge variant="secondary" className="ml-2">
              {cameras.filter((c) => c.status.toLowerCase() === 'inactive').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="error">
            Error
            <Badge variant="destructive" className="ml-2">
              {cameras.filter((c) => c.status.toLowerCase() === 'error').length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCameras.map((camera) => (
          <CameraCard key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  )
}

function CameraCard({
  camera,
}: {
  camera: CameraType
}) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-video bg-muted flex items-center justify-center">
        <Camera className="h-12 w-12 text-muted-foreground" />
        {camera.status.toLowerCase() === 'active' && (
          <div className="absolute top-2 right-2 flex items-center gap-1 rounded-full bg-destructive px-2 py-1 text-xs font-semibold text-destructive-foreground">
            <div className="h-2 w-2 animate-pulse rounded-full bg-white" />
            LIVE
          </div>
        )}
        <Badge
          variant={
            camera.status.toLowerCase() === 'active' ? 'default' : camera.status.toLowerCase() === 'error' ? 'destructive' : 'secondary'
          }
          className="absolute bottom-2 left-2"
        >
          {camera.status}
        </Badge>
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-lg">{camera.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {camera.location}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/cameras/${camera.id}`} className="cursor-pointer">
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Configure
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download Footage
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash className="mr-2 h-4 w-4" />
                Delete Camera
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Stream Status</span>
            <span className={cn("font-medium", camera.is_active ? "text-green-500" : "text-muted-foreground")}>
              {camera.is_active ? "Stready" : "Idle"}
            </span>
          </div>
        </div>
        <Link href={`/dashboard/cameras/${camera.id}`}>
          <Button variant="outline" className="w-full bg-transparent">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
