'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AlertCircle, ArrowRight, Filter, MapPin, Plus, Search, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { useAlerts } from "@/hooks/use-alerts"
import type { Alert as AlertType } from "@/types/alert"

export default function AlertsPage() {
  const [filter, setFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const { alerts, isLoading } = useAlerts();

  const filteredAlerts = (alerts || []).filter((alert: AlertType) => {
    if (filter === 'unresolved') return alert.status !== 'RESOLVED'
    if (filter === 'resolved') return alert.status === 'RESOLVED'
    if (filter === 'critical') return alert.severity === 'CRITICAL'
    return true
  }).filter((alert: AlertType) =>
    alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    alert.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (isLoading) return <div className="p-6">Loading alerts...</div>

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
          <p className="text-muted-foreground mt-1">Monitor and respond to infrastructure hazards</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by camera, location, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-muted/50 border-0"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">{alerts.filter(a => a.severity === 'CRITICAL').length}</div>
              <p className="text-xs text-muted-foreground mt-1">Critical Alerts</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-500">{alerts.filter(a => a.severity === 'HIGH').length}</div>
              <p className="text-xs text-muted-foreground mt-1">High Priority</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-500">{alerts.filter(a => a.status !== 'RESOLVED').length}</div>
              <p className="text-xs text-muted-foreground mt-1">Unresolved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">{alerts.filter(a => a.status === 'RESOLVED').length}</div>
              <p className="text-xs text-muted-foreground mt-1">Resolved</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={filter} onValueChange={setFilter}>
        <TabsList>
          <TabsTrigger value="all">
            All Alerts
            <Badge variant="secondary" className="ml-2">
              {(alerts || []).length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="unresolved">
            Unresolved
            <Badge variant="destructive" className="ml-2">
              {alerts.filter(a => a.status !== 'RESOLVED').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="critical">
            Critical
            <Badge variant="destructive" className="ml-2">
              {alerts.filter(a => a.severity === 'CRITICAL').length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved
            <Badge variant="secondary" className="ml-2">
              {alerts.filter(a => a.status === 'RESOLVED').length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert as any} />
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No alerts found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function AlertCard({
  alert,
}: {
  alert: AlertType
}) {
  const severityColor: Record<string, string> = {
    CRITICAL: 'bg-destructive/10 border-destructive/20 text-destructive',
    HIGH: 'bg-orange-500/10 border-orange-500/20 text-orange-600',
    MEDIUM: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600',
    LOW: 'bg-blue-500/10 border-blue-500/20 text-blue-600',
  }

  const dotColor: Record<string, string> = {
    CRITICAL: 'bg-destructive',
    HIGH: 'bg-orange-500',
    MEDIUM: 'bg-yellow-500',
    LOW: 'bg-blue-500',
  }

  const isResolved = alert.status === 'RESOLVED'
  const severity = alert.severity.toUpperCase()

  return (
    <Card
      className={cn(
        'cursor-pointer hover:shadow-lg transition-shadow border',
        severityColor[severity] || severityColor.MEDIUM
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={cn('h-3 w-3 rounded-full mt-1.5 flex-shrink-0', dotColor[severity] || dotColor.MEDIUM)} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-foreground">{alert.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {alert.severity}
                </Badge>
                {isResolved && (
                  <Badge variant="outline" className="text-xs">
                    Resolved
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-2">{alert.description}</p>

              <div className="flex flex-col md:flex-row md:items-center gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <span className="font-medium">Camera: {alert.camera_id.split('-')[0]}</span>
                </div>
                <div className="hidden md:block">•</div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>Detection Site</span>
                </div>
                <div className="hidden md:block">•</div>
                <div>{new Date(alert.created_at).toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 flex-shrink-0">
            <Link href={`/dashboard/alerts/${alert.id}`}>
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
