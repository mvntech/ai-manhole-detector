'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Clock, MapPin, Camera as CameraIcon, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const alertDetails = {
  id: '1',
  severity: 'critical',
  status: 'unresolved',
  camera: 'Camera #12',
  location: 'Main St & 5th Ave',
  type: 'Manhole Hazard',
  description: 'Detected exposed manhole with no cover',
  detectedAt: '2024-01-26T10:30:00Z',
  coordinates: '40.7128° N, 74.0060° W',
  confidence: '99.7%',

  analysis: {
    detectionType: 'Exposed Manhole',
    area: '2.5 m²',
    depth: 'Surface level',
    riskLevel: 'Critical',
    recommendedAction: 'Immediate inspection and cover placement',
  },

  timeline: [
    { type: 'detection', title: 'Alert triggered', description: 'Manhole hazard detected', time: '2 minutes ago' },
    { type: 'notification', title: 'Notification sent', description: 'Alert team notified', time: '1 minute ago' },
    { type: 'status', title: 'Status: Unresolved', description: 'Awaiting response', time: '1 minute ago' },
  ],

  relatedAlerts: [
    { id: '2', camera: 'Camera #8', type: 'Damaged Cover', time: '15 minutes ago' },
    { id: '3', camera: 'Camera #5', type: 'Elevated Risk', time: '1 hour ago' },
  ],
}

export default function AlertDetailPage() {
  const params = useParams()
  const alertId = params.id

  return (
    <div className="space-y-6 p-6">
      <div>
        <Link href="/dashboard/alerts">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Alerts
          </Button>
        </Link>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">{alertDetails.type}</h1>
            <Badge variant="destructive" className="text-base">{alertDetails.severity}</Badge>
          </div>
          <p className="text-muted-foreground mt-2 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            {alertDetails.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-foreground bg-transparent">
            Mark as Resolved
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            Take Action
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Detected At</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">2 minutes ago</div>
            <p className="text-xs text-muted-foreground">10:30 AM</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Camera</CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/dashboard/cameras/12`}>
              <Button variant="link" className="p-0 h-auto font-semibold text-base">
                {alertDetails.camera}
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-1">View camera</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm font-semibold">{alertDetails.confidence}</div>
            <p className="text-xs text-muted-foreground">Detection accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Coordinates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs font-semibold">{alertDetails.coordinates}</div>
            <p className="text-xs text-muted-foreground mt-1">GPS location</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="related">Related Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Alert Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-foreground">{alertDetails.description}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Status</p>
                  <Badge variant="secondary">Unresolved</Badge>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Risk Level</p>
                  <Badge variant="destructive">{alertDetails.analysis.riskLevel}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Evidence</CardTitle>
              </CardHeader>
              <CardContent className="h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <CameraIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground text-sm">Alert image/video</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis Results</CardTitle>
              <CardDescription>Detailed detection and risk assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Detection Type</p>
                    <p className="text-sm font-semibold">{alertDetails.analysis.detectionType}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Affected Area</p>
                    <p className="text-sm font-semibold">{alertDetails.analysis.area}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Depth Assessment</p>
                    <p className="text-sm font-semibold">{alertDetails.analysis.depth}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Risk Level</p>
                    <Badge variant="destructive">{alertDetails.analysis.riskLevel}</Badge>
                  </div>
                </div>

                <div className="border-t border-border pt-4 space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">Recommended Action</p>
                  <p className="text-sm font-semibold text-foreground">{alertDetails.analysis.recommendedAction}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
              <CardDescription>Complete history of this alert</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {alertDetails.timeline.map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-10 w-10 rounded-full flex items-center justify-center ${event.type === 'detection' ? 'bg-destructive' :
                          event.type === 'notification' ? 'bg-blue-500' :
                            'bg-green-500'
                        }`}>
                        {event.type === 'detection' && <AlertCircle className="h-5 w-5 text-white" />}
                        {event.type === 'notification' && <Clock className="h-5 w-5 text-white" />}
                        {event.type === 'status' && <CheckCircle2 className="h-5 w-5 text-white" />}
                      </div>
                      {index < alertDetails.timeline.length - 1 && (
                        <div className="h-12 border-l-2 border-border my-2" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-semibold text-foreground">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="related">
          <Card>
            <CardHeader>
              <CardTitle>Related Alerts</CardTitle>
              <CardDescription>Other alerts in the same area or time period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertDetails.relatedAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <div>
                      <p className="font-medium text-foreground">{alert.type}</p>
                      <p className="text-sm text-muted-foreground">{alert.camera}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">{alert.time}</p>
                      <Link href={`/dashboard/alerts/${alert.id}`}>
                        <Button variant="link" className="p-0 h-auto text-xs">
                          View Alert →
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
