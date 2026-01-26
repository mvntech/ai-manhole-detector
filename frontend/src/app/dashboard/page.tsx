'use client'

import React from "react"

import { Activity, AlertCircle, Camera, Clock, Eye, TrendingDown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const chartData = [
  { date: 'Jan 1', detections: 45 },
  { date: 'Jan 5', detections: 52 },
  { date: 'Jan 10', detections: 48 },
  { date: 'Jan 15', detections: 61 },
  { date: 'Jan 20', detections: 55 },
  { date: 'Jan 25', detections: 67 },
  { date: 'Jan 30', detections: 72 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Admin</h1>
        <p className="text-muted-foreground mt-1">
          Here's what's happening with your infrastructure today
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Cameras"
          value="12"
          change="+2 from last month"
          trend="up"
          icon={Camera}
        />
        <StatsCard
          title="Total Detections"
          value="456"
          change="+23 this week"
          trend="up"
          icon={Activity}
        />
        <StatsCard
          title="Critical Alerts"
          value="3"
          change="-1 from yesterday"
          trend="down"
          icon={AlertCircle}
          variant="destructive"
        />
        <StatsCard
          title="Avg Response Time"
          value="12 min"
          change="-3 min improvement"
          trend="down"
          icon={Clock}
          variant="success"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Detection Trends</CardTitle>
            <CardDescription>Manhole detections over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
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
                  dataKey="detections"
                  stroke="var(--primary)"
                  strokeWidth={2}
                  dot={{ fill: 'var(--primary)', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>Latest critical detections</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AlertItem
              severity="critical"
              camera="Camera #12"
              location="Main St & 5th Ave"
              time="2 minutes ago"
            />
            <AlertItem
              severity="high"
              camera="Camera #8"
              location="Park Ave"
              time="15 minutes ago"
            />
            <AlertItem
              severity="medium"
              camera="Camera #5"
              location="Broadway"
              time="1 hour ago"
            />
          </CardContent>
          <CardFooter>
            <Button variant="ghost" className="w-full justify-center">
              View All Alerts →
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Camera Status Map</CardTitle>
            <CardDescription>Real-time camera locations and status</CardDescription>
          </CardHeader>
          <CardContent className="h-80 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Map view placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Feed</CardTitle>
            <CardDescription>Recent system events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ActivityItem
              title="Detection recorded"
              description="Camera #12"
              time="2 min ago"
              icon={AlertCircle}
            />
            <ActivityItem
              title="Camera offline"
              description="Camera #8"
              time="15 min ago"
              icon={Camera}
            />
            <ActivityItem
              title="System update"
              description="Completed successfully"
              time="1 hour ago"
              icon={Activity}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function StatsCard({
  title,
  value,
  change,
  trend,
  icon: Icon,
  variant = 'default',
}: {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: React.ComponentType<{ className?: string }>
  variant?: 'default' | 'destructive' | 'success'
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        <Icon className={cn('h-4 w-4', variant === 'destructive' && 'text-destructive')} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p
          className={cn(
            'text-xs flex items-center gap-1 mt-1',
            trend === 'up' ? 'text-green-600' : 'text-muted-foreground'
          )}
        >
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3" />
          ) : (
            <TrendingDown className="h-3 w-3" />
          )}
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

function AlertItem({
  severity,
  camera,
  location,
  time,
}: {
  severity: 'critical' | 'high' | 'medium'
  camera: string
  location: string
  time: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div
        className={cn(
          'h-3 w-3 rounded-full mt-1.5 flex-shrink-0',
          severity === 'critical' && 'bg-destructive',
          severity === 'high' && 'bg-orange-500',
          severity === 'medium' && 'bg-yellow-500'
        )}
      />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{camera}</p>
        <p className="text-xs text-muted-foreground">{location}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}

function ActivityItem({
  title,
  description,
  time,
  icon: Icon,
}: {
  title: string
  description: string
  time: string
  icon: React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 mt-1 text-muted-foreground flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
        <p className="text-xs text-muted-foreground mt-1">{time}</p>
      </div>
    </div>
  )
}
