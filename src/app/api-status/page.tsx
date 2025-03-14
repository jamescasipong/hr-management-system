"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, XCircle, Clock, RefreshCw, Calendar, Bell } from "lucide-react"
import { Footer } from "@/components/footer"

// Mock data for API status
const apiServices = [
  { name: "Authentication API", status: "operational", uptime: "99.99%" },
  { name: "Employee API", status: "operational", uptime: "99.98%" },
  { name: "Attendance API", status: "operational", uptime: "99.95%" },
  { name: "Leave Management API", status: "degraded", uptime: "98.75%" },
  { name: "Payroll API", status: "operational", uptime: "99.97%" },
  { name: "Reporting API", status: "operational", uptime: "99.93%" },
  { name: "Notification API", status: "operational", uptime: "99.91%" },
  { name: "Webhooks", status: "operational", uptime: "99.89%" },
]

// Mock data for incidents
const incidents = [
  {
    id: "INC-2023-06-15",
    title: "Leave Management API Degraded Performance",
    status: "investigating",
    date: "June 15, 2023",
    updates: [
      {
        timestamp: "2023-06-15T10:30:00Z",
        message: "We are investigating reports of slow response times in the Leave Management API.",
      },
      {
        timestamp: "2023-06-15T11:15:00Z",
        message: "We have identified the issue as high database load due to increased traffic.",
      },
      {
        timestamp: "2023-06-15T12:00:00Z",
        message: "We are scaling up database resources to address the performance issues.",
      },
    ],
  },
  {
    id: "INC-2023-05-22",
    title: "Authentication API Outage",
    status: "resolved",
    date: "May 22, 2023",
    updates: [
      {
        timestamp: "2023-05-22T08:15:00Z",
        message: "We are investigating reports of users unable to authenticate.",
      },
      {
        timestamp: "2023-05-22T08:45:00Z",
        message: "We have identified an issue with our authentication provider.",
      },
      {
        timestamp: "2023-05-22T09:30:00Z",
        message: "The issue has been resolved and authentication services are back to normal.",
      },
    ],
  },
]

export default function ApiStatusPage() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [isRefreshing, setIsRefreshing] = useState(false)

  const refreshStatus = () => {
    setIsRefreshing(true)

    // Simulate API call
    setTimeout(() => {
      setLastUpdated(new Date())
      setIsRefreshing(false)
    }, 1000)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800"
          >
            <CheckCircle className="h-3 w-3 mr-1" /> Operational
          </Badge>
        )
      case "degraded":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 border-yellow-200 dark:border-yellow-800"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Degraded
          </Badge>
        )
      case "outage":
        return (
          <Badge
            variant="outline"
            className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800"
          >
            <XCircle className="h-3 w-3 mr-1" /> Outage
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            <Clock className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  const getIncidentStatusBadge = (status: string) => {
    switch (status) {
      case "investigating":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
            Investigating
          </Badge>
        )
      case "identified":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Identified
          </Badge>
        )
      case "monitoring":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Monitoring
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            Resolved
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
            Unknown
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 border-b-[1px] dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">HR</span>
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Connect</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/documentation">
              <Button variant="ghost" size="sm">
                Documentation
              </Button>
            </Link>
            <Link href="/guides">
              <Button variant="ghost" size="sm">
                Guides
              </Button>
            </Link>
            <Link href="/contact-us">
              <Button variant="ghost" size="sm">
                Contact Us
              </Button>
            </Link>
            <Link href="/login">
              <Button size="sm">Sign In</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">API Status</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Current operational status of HRConnect API services
            </p>
          </div>
          <Button variant="outline" onClick={refreshStatus} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
          Last updated: {lastUpdated.toLocaleString()}
        </div>

        {/* System Status Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current status of all API services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {apiServices.map((service, index) => (
                <div key={index} className="p-4 border rounded-lg flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{service.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Uptime: {service.uptime}</p>
                  </div>
                  <div>{getStatusBadge(service.status)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Incidents */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Incidents</h2>

          <Tabs defaultValue="current">
            <TabsList className="mb-4">
              <TabsTrigger value="current">Current Incidents</TabsTrigger>
              <TabsTrigger value="past">Past Incidents</TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              {incidents.filter((i) => i.status !== "resolved").length > 0 ? (
                <div className="space-y-4">
                  {incidents
                    .filter((incident) => incident.status !== "resolved")
                    .map((incident) => (
                      <Card key={incident.id}>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle>{incident.title}</CardTitle>
                              <CardDescription>
                                {incident.date} - {incident.id}
                              </CardDescription>
                            </div>
                            <div>{getIncidentStatusBadge(incident.status)}</div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {incident.updates.map((update, index) => (
                              <div key={index} className="border-l-2 border-blue-500 pl-4 py-1">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatDate(update.timestamp)}
                                </p>
                                <p className="text-gray-700 dark:text-gray-300">{update.message}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">All Systems Operational</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">There are no ongoing incidents at this time.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {incidents
                  .filter((incident) => incident.status === "resolved")
                  .map((incident) => (
                    <Card key={incident.id}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{incident.title}</CardTitle>
                            <CardDescription>
                              {incident.date} - {incident.id}
                            </CardDescription>
                          </div>
                          <div>{getIncidentStatusBadge(incident.status)}</div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {incident.updates.map((update, index) => (
                            <div key={index} className="border-l-2 border-gray-300 pl-4 py-1">
                              <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(update.timestamp)}</p>
                              <p className="text-gray-700 dark:text-gray-300">{update.message}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Scheduled Maintenance */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Scheduled Maintenance</h2>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Maintenance</CardTitle>
              <CardDescription>Planned maintenance activities that may affect API availability</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-6 text-center">
                <Calendar className="mx-auto h-12 w-12 text-blue-500" />
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No Scheduled Maintenance</h3>
                <p className="mt-1 text-gray-500 dark:text-gray-400">
                  There are no maintenance activities scheduled at this time.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Subscribe to Updates */}
        <Card>
          <CardHeader>
            <CardTitle>Stay Updated</CardTitle>
            <CardDescription>Subscribe to receive notifications about API status changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-blue-500" />
                  Email Notifications
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  Receive email notifications when there are changes to our API status.
                </p>
                <Button className="mt-4" variant="outline">
                  Subscribe to Emails
                </Button>
              </div>

              <div className="flex-1 p-4 border rounded-lg">
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-blue-500" />
                  Webhook Notifications
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm">
                  Set up webhooks to receive real-time notifications about API status changes.
                </p>
                <Button className="mt-4" variant="outline">
                  Configure Webhooks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer></Footer>
    </div>
  )
}

