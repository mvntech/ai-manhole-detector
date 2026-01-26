'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Activity, ArrowLeft, Camera, Clock, MapPin, Settings, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const cameraData = {
  id: '1',
  name: 'Camera #1',
  location: 'Main St & 5th Ave',
  status: 'active',
  lastUpdate: '2 minutes ago',
  resolution: '4K (3840x2160)',
  fps: '30 FPS',
  codec: 'H.264',
  ipAddress: '192.168.1.100',
  serialNumber: 'CAM-001-2024',
  deployedDate: '2024-01-15',
  totalDetections: 456,
  alertsThisMonth: 12,
  uptime: '99.8%',
}

const detectionChart = [
  { date: 'Day 1', count: 12 },
  { date: 'Day 2', count: 18 },
  { date: 'Day 3', count: 15 },
  { date: 'Day 4', count: 22 },
  { date: 'Day 5', count: 19 },
  { date: 'Day 6', count: 25 },
  { date: 'Day 7', count: 23 },
]

const recentEvents = [
  { type: 'detection', description: 'Manhole detected', time: '2 minutes ago', severity: 'high' },
  { type: 'detection', description: 'Potential hazard', time: '15 minutes ago', severity: 'medium' },
  { type: 'status', description: 'Camera online', time: '1 hour ago', severity: 'low' },
  { type: 'detection', description: 'Manhole detected', time: '2 hours ago', severity: 'high' },
]

export default function CameraDetailPage() {
  const params = useParams()
  const cameraId = params.id

  return (
    <div className="space-y-6 p-6">
      <div>
        <Link href="/dashboard/cameras">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Cameras
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{cameraData.name}</h1>
            <Badge>{cameraData.status}</Badge>
          </div>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {cameraData.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 bg-transparent">
            <Settings className="h-4 w-4" />
            Configure
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Activity className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Detections</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cameraData.totalDetections}</div>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +12 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Alerts This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cameraData.alertsThisMonth}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Clock className="h-3 w-3" />
              Last alert: 15 min ago
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cameraData.uptime}</div>
            <p className="text-xs text-green-600 mt-1">No downtime</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Last Update</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">●</div>
            <p className="text-xs text-muted-foreground mt-1">{cameraData.lastUpdate}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detections">Detections</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Feed</CardTitle>
              </CardHeader>
              <CardContent className="h-80 bg-muted rounded-lg flex items-center justify-center">
                <Camera className="h-16 w-16 text-muted-foreground" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Resolution</p>
                    <p className="text-sm font-semibold">{cameraData.resolution}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Frame Rate</p>
                    <p className="text-sm font-semibold">{cameraData.fps}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Codec</p>
                    <p className="text-sm font-semibold">{cameraData.codec}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">IP Address</p>
                    <p className="text-sm font-semibold">{cameraData.ipAddress}</p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-xs font-medium text-muted-foreground">Serial Number</p>
                  <p className="text-sm font-semibold">{cameraData.serialNumber}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Deployed Date</p>
                  <p className="text-sm font-semibold">{cameraData.deployedDate}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="detections">
          <Card>
            <CardHeader>
              <CardTitle>Detection Trend</CardTitle>
              <CardDescription>Detections over the last 7 days</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={detectionChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="date" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                    }}
                    labelStyle={{ color: 'var(--foreground)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="var(--primary)"
                    strokeWidth={2}
                    dot={{ fill: 'var(--primary)', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>Activity log for this camera</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3 pb-3 border-b border-border last:border-0">
                  <div
                    className={`h-3 w-3 rounded-full mt-1.5 flex-shrink-0 ${event.severity === 'high'
                        ? 'bg-destructive'
                        : event.severity === 'medium'
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{event.description}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {event.severity}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Camera Settings</CardTitle>
              <CardDescription>Configure camera parameters and alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Camera Name</label>
                  <input
                    type="text"
                    defaultValue={cameraData.name}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <input
                    type="text"
                    defaultValue={cameraData.location}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Alert Sensitivity</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                    <option>High</option>
                    <option selected>Medium</option>
                    <option>Low</option>
                  </select>
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
