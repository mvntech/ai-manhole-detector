'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AddCameraPage() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    ipAddress: '',
    username: '',
    password: '',
    sensitivity: 'medium',
    enableAlerts: true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

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

      <div>
        <h1 className="text-3xl font-bold">Add New Camera</h1>
        <p className="text-muted-foreground mt-1">Configure and connect a new camera to your network</p>
      </div>
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Camera Configuration</CardTitle>
            <CardDescription>Enter the camera details to add it to your system</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>

                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium text-foreground">
                    Camera Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="e.g., Camera #1"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium text-foreground">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    placeholder="e.g., Main St & 5th Ave"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground">Network Information</h3>

                <div className="space-y-2">
                  <label htmlFor="ipAddress" className="block text-sm font-medium text-foreground">
                    IP Address
                  </label>
                  <input
                    id="ipAddress"
                    type="text"
                    name="ipAddress"
                    placeholder="e.g., 192.168.1.100"
                    value={formData.ipAddress}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="username" className="block text-sm font-medium text-foreground">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Camera username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-medium text-foreground">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Camera password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="text-sm font-semibold text-foreground">Settings</h3>

                <div className="space-y-2">
                  <label htmlFor="sensitivity" className="block text-sm font-medium text-foreground">
                    Detection Sensitivity
                  </label>
                  <select
                    id="sensitivity"
                    name="sensitivity"
                    value={formData.sensitivity}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    id="enableAlerts"
                    type="checkbox"
                    name="enableAlerts"
                    checked={formData.enableAlerts}
                    onChange={handleChange}
                    className="rounded border border-border"
                  />
                  <label htmlFor="enableAlerts" className="text-sm font-medium text-foreground cursor-pointer">
                    Enable alerts for this camera
                  </label>
                </div>
              </div>

              <div className="flex gap-3 border-t border-border pt-6">
                <Button type="submit" className="bg-primary hover:bg-primary/90">
                  Add Camera
                </Button>
                <Link href="/dashboard/cameras">
                  <Button variant="outline">Cancel</Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
