'use client'

import { useState } from 'react'
import { Bell, Lock, Mail, Shield, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function SettingsPage() {
  const [saveSuccess, setSaveSuccess] = useState(false)

  const handleSave = () => {
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account and system preferences</p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Lock className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="organization" className="gap-2">
            <Shield className="h-4 w-4" />
            Organization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    defaultValue="Admin"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    defaultValue="admin@city.gov"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Department</label>
                  <input
                    type="text"
                    defaultValue="Infrastructure Management"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-border bg-background">
                    <option selected>Administrator</option>
                    <option>Manager</option>
                    <option>Operator</option>
                    <option>Viewer</option>
                  </select>
                </div>
              </div>

              {saveSuccess && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-3 text-sm text-green-700">
                  Profile updated successfully
                </div>
              )}

              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm Password</label>
                  <input
                    type="password"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>Enhance your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Not enabled</p>
                </div>
                <Button variant="outline">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Active Sessions</CardTitle>
              <CardDescription>Manage your login sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Current Session</p>
                  <p className="text-sm text-muted-foreground">Chrome on macOS • 192.168.1.1</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: now</p>
                </div>
                <Badge>Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div>
                  <p className="font-medium text-foreground">Mobile Session</p>
                  <p className="text-sm text-muted-foreground">Safari on iOS • 192.168.1.50</p>
                  <p className="text-xs text-muted-foreground mt-1">Last active: 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm">Sign Out</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notifications</CardTitle>
              <CardDescription>Choose what emails you want to receive</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Critical Alerts', description: 'Urgent infrastructure hazards', checked: true },
                { label: 'High Priority Alerts', description: 'Important detections', checked: true },
                { label: 'Weekly Report', description: 'Summary of detections', checked: true },
                { label: 'System Updates', description: 'Platform updates and maintenance', checked: false },
                { label: 'Security Alerts', description: 'Account security notifications', checked: true },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <input type="checkbox" defaultChecked={item.checked} className="rounded" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>In-App Notifications</CardTitle>
              <CardDescription>Configure push notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: 'Critical Alerts', checked: true },
                { label: 'Camera Offline', checked: true },
                { label: 'New Messages', checked: false },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                  <input type="checkbox" defaultChecked={item.checked} className="rounded" />
                  <label className="text-sm font-medium cursor-pointer flex-1">{item.label}</label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
            Save Notification Settings
          </Button>
        </TabsContent>

        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>
              <CardDescription>Manage your organization details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization Name</label>
                  <input
                    type="text"
                    defaultValue="City Infrastructure Department"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Organization Email</label>
                  <input
                    type="email"
                    defaultValue="infrastructure@city.gov"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <input
                    type="text"
                    defaultValue="123 Main St, City, State 12345"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Contact Number</label>
                  <input
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background"
                  />
                </div>
              </div>

              <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
                Save Organization Details
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Admin', email: 'admin@city.gov', role: 'Administrator' },
                  { name: 'John Manager', email: 'john@city.gov', role: 'Manager' },
                  { name: 'Jane Operator', email: 'jane@city.gov', role: 'Operator' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-foreground">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.email}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{member.role}</Badge>
                      <Button variant="ghost" size="sm" className="mt-2">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 bg-transparent">
                + Add Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
