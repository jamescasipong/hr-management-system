"use client"

import type React from "react"
import { useState, useEffect, useContext } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Bell,
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Home,
  Settings,
  User,
  Users,
  Menu,
  Moon,
  Sun,
  Shield,
  Palette,
  BellRing,
  Globe,
  LogOut,
  Key,
  Smartphone,
  Mail,
  AlertTriangle,
  Check,
  Camera,
  Upload,
} from "lucide-react"
import { toast } from "sonner"
import { SideDark } from "@/contextComponent/SideDark"
import { useTheme } from "next-themes"

export default function UserSettings() {
    const { setTheme } = useTheme()
    const { theme } = useTheme()
    const [activeTab, setActiveTab] = useState("profile")
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)
    const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false)
    const [isUploadAvatarOpen, setIsUploadAvatarOpen] = useState(false)

    const context = useContext(SideDark);
    if (!context) {
        throw new Error("SideDark context is undefined");
    }
    const { isSidebarOpen, toggleSidebar: contextToggleSidebar } = context;

  // Profile state
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    jobTitle: "Software Engineer",
    department: "Engineering",
    bio: "Experienced software engineer with a passion for building user-friendly applications.",
    avatar: "https://github.com/shadcn.png",
  })

  // Security state
  const [securityData, setSecurityData] = useState({
    isTwoFactorEnabled: false,
    twoFactorMethod: "email",
    lastPasswordChange: "2024-03-15",
    activeSessions: [
      { device: "Windows PC", browser: "Chrome", location: "New York, USA", lastActive: "Now" },
      { device: "iPhone 13", browser: "Safari", location: "New York, USA", lastActive: "2 hours ago" },
    ],
  })

  // Theme state
  const [themeData, setThemeData] = useState({
    theme: theme || "light",
    colorScheme: "blue",
    reducedMotion: false,
    fontSize: "medium",
  })

  useEffect(() => {
    setTheme(themeData.theme)
  }, [themeData.theme])


  // Notification state
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    inAppNotifications: true,
    notifyOnLeaveApproval: true,
    notifyOnPayslip: true,
    notifyOnAnnouncements: true,
    notifyOnMessages: true,
  })

  // Account state
  const [accountData, setAccountData] = useState({
    language: "english",
    timeZone: "America/New_York",
    dateFormat: "MM/DD/YYYY",
    timeFormat: "12h",
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  const toggleSidebar = () => {
    contextToggleSidebar();
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    setThemeData((prev) => ({
      ...prev,
      theme: prev.theme === "light" ? "dark" : "light",
    }))
    document.body.classList.toggle("dark")
  }


  const handleProfileUpdate = () => {
    toast("Profile updated", {
      description: "Your profile information has been updated successfully.",
      duration: 3000,
    })
  }

  const handleSecurityUpdate = () => {
    toast("Security settings updated", {
      description: "Your security preferences have been saved.",
      duration: 3000,
    })
  }

  const handlePasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast("Passwords don't match", {
        description: "New password and confirmation must match.",
        duration: 3000,
      })
      return
    }

    // Simulate password change
    toast("Password changed", {
      description: "Your password has been updated successfully.",
      duration: 3000,
    })

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    })

    setIsChangePasswordOpen(false)
  }

  const handleDeleteAccount = () => {
    // Simulate account deletion
    toast("Account scheduled for deletion", {
      description: "Your account will be deleted after the cooling period.",
      duration: 5000,
    })

    setIsDeleteAccountOpen(false)
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfileData((prev) => ({
          ...prev,
          avatar: reader.result as string,
        }))

        toast("Avatar updated", {
          description: "Your profile picture has been updated successfully.",
          duration: 3000,
        })

        setIsUploadAvatarOpen(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const toggleTwoFactor = (enabled: boolean) => {
    setSecurityData((prev) => ({
      ...prev,
      isTwoFactorEnabled: enabled,
    }))

    toast(enabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled", {
      description: enabled ? "Your account is now more secure." : "Two-factor authentication has been disabled.",
      duration: 3000,
    })
  }

  return (
    <div
      className={`flex h-[100%] transition-colors duration-200`}
    >


      {/* Main Content */}
      <main className={`flex-1 transition-all duration-200`}>
        {/* Header */}
        
        {/* className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8" */}
        {/* Settings Content */}
        <div className={`mx-auto py-6 sm:px-6  lg:px-8 p-1 ${
            isSidebarOpen ? "" : "pt-24  w-full max-w-[1500px]  lg:w-full"
          }`}>
          <Tabs  defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-8 border border-border">
              <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
              <BellRing className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and profile information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col items-center space-y-4 mb-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profileData.avatar} alt="Profile" />
                        <AvatarFallback className="text-2xl">
                          {profileData.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <Dialog open={isUploadAvatarOpen} onOpenChange={setIsUploadAvatarOpen}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="flex items-center gap-2">
                            <Camera className="h-4 w-4" />
                            Change Picture
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Upload Profile Picture</DialogTitle>
                            <DialogDescription>
                              Choose a new profile picture to upload. JPG, PNG or GIF.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="flex flex-col items-center justify-center gap-4">
                              <Avatar className="h-32 w-32">
                                <AvatarImage src={profileData.avatar} alt="Profile" />
                                <AvatarFallback className="text-4xl">
                                  {profileData.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <Label htmlFor="avatar-upload" className="cursor-pointer">
                                <div className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md">
                                  <Upload className="h-4 w-4" />
                                  Upload Image
                                </div>
                                <Input
                                  id="avatar-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleAvatarUpload}
                                />
                              </Label>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsUploadAvatarOpen(false)}>
                              Cancel
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <Button onClick={handleProfileUpdate}>Save Changes</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Work Information</CardTitle>
                    <CardDescription>Update your job details and department information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        value={profileData.jobTitle}
                        onChange={(e) => setProfileData({ ...profileData, jobTitle: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={profileData.department}
                        onValueChange={(value: string) => setProfileData({ ...profileData, department: value })}
                      >
                        <SelectTrigger id="department">
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Engineering">Engineering</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                          <SelectItem value="Operations">Operations</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Employment Details</h3>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employee ID</p>
                          <p>EMP-2024-0042</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date Joined</p>
                          <p>Jan 15, 2022</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Employment Type</p>
                          <p>Full-time</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Work Location</p>
                          <p>New York Office</p>
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleProfileUpdate}>Save Changes</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Password & Authentication</CardTitle>
                    <CardDescription>Manage your password and authentication methods</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Password</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Last changed on {securityData.lastPasswordChange}
                          </p>
                        </div>
                        <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
                          <DialogTrigger asChild>
                            <Button variant="outline">Change Password</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Change Password</DialogTitle>
                              <DialogDescription>
                                Enter your current password and a new password to update your credentials.
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="space-y-2">
                                <Label htmlFor="current-password">Current Password</Label>
                                <Input
                                  id="current-password"
                                  type="password"
                                  value={passwordData.currentPassword}
                                  onChange={(e) =>
                                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="new-password">New Password</Label>
                                <Input
                                  id="new-password"
                                  type="password"
                                  value={passwordData.newPassword}
                                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="confirm-password">Confirm New Password</Label>
                                <Input
                                  id="confirm-password"
                                  type="password"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) =>
                                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                                  }
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsChangePasswordOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handlePasswordChange}>Update Password</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Add an extra layer of security to your account
                          </p>
                        </div>
                        <Switch checked={securityData.isTwoFactorEnabled} onCheckedChange={toggleTwoFactor} />
                      </div>

                      {securityData.isTwoFactorEnabled && (
                        <div className="mt-4 space-y-4">
                          <Label>Authentication Method</Label>
                          <RadioGroup
                            value={securityData.twoFactorMethod}
                            onValueChange={(value) => setSecurityData({ ...securityData, twoFactorMethod: value })}
                            className="space-y-3"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="email" id="auth-email" />
                              <Label htmlFor="auth-email" className="flex items-center gap-2 cursor-pointer">
                                <Mail className="h-4 w-4" />
                                Email Verification Code
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sms" id="auth-sms" />
                              <Label htmlFor="auth-sms" className="flex items-center gap-2 cursor-pointer">
                                <Smartphone className="h-4 w-4" />
                                SMS Verification Code
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="app" id="auth-app" />
                              <Label htmlFor="auth-app" className="flex items-center gap-2 cursor-pointer">
                                <Key className="h-4 w-4" />
                                Authenticator App
                              </Label>
                            </div>
                          </RadioGroup>

                          <Button onClick={handleSecurityUpdate} className="mt-2">
                            Save Authentication Method
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Active Sessions</CardTitle>
                    <CardDescription>Manage your active sessions and devices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {securityData.activeSessions.map((session, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-4 border rounded-lg dark:border-gray-700"
                      >
                        <div className="space-y-1">
                          <p className="font-medium">
                            {session.device} • {session.browser}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {session.location} • {session.lastActive}
                          </p>
                        </div>
                        {session.lastActive === "Now" ? (
                          <span className="text-sm text-green-500 font-medium">Current Session</span>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-red-500">
                            <LogOut className="h-4 w-4 mr-1" /> Logout
                          </Button>
                        )}
                      </div>
                    ))}

                    <Button variant="outline" className="w-full mt-2">
                      Logout from all other devices
                    </Button>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Account Security</CardTitle>
                    <CardDescription>Manage your account security settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Login Notifications</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Get notified when someone logs into your account from a new device or browser.
                        </p>
                        <div className="flex items-center space-x-2">
                          <Switch id="login-notifications" />
                          <Label htmlFor="login-notifications">Enable login notifications</Label>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Globe className="h-5 w-5 text-blue-500" />
                          <h3 className="font-medium">Trusted Devices</h3>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Manage the list of devices that don't require two-factor authentication.
                        </p>
                        <Button variant="outline" size="sm">
                          Manage Trusted Devices
                        </Button>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                      <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Account Deletion</AlertTitle>
                        <AlertDescription>
                          Permanently delete your account and all of your data. This action cannot be undone.
                        </AlertDescription>
                      </Alert>

                      <Dialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
                        <DialogTrigger asChild>
                          <Button variant="destructive">Delete Account</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Account</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete your account? All of your data will be permanently
                              removed. This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="flex items-start space-x-4">
                              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                              <div>
                                <h4 className="font-medium">You will lose:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-500 dark:text-gray-400 space-y-1 mt-2">
                                  <li>All personal information and profile data</li>
                                  <li>Access to the HR Management System</li>
                                  <li>Your attendance and leave records</li>
                                  <li>Payroll history and documents</li>
                                </ul>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="confirm-delete">Type "DELETE" to confirm</Label>
                              <Input id="confirm-delete" placeholder="DELETE" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteAccountOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteAccount}>
                              Delete Account
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Theme</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${themeData.theme === "light" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "dark:border-gray-700"}`}
                        onClick={() => {
                          setThemeData({ ...themeData, theme: "light" })
                          setIsDarkMode(false)
                          document.body.classList.remove("dark")
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Light</span>
                          {themeData.theme === "light" && <Check className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="h-20 bg-white rounded-md shadow-sm"></div>
                      </div>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${themeData.theme === "dark" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "dark:border-gray-700"}`}
                        onClick={() => {
                          setThemeData({ ...themeData, theme: "dark" })
                          setIsDarkMode(true)
                          document.body.classList.add("dark")
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">Dark</span>
                          {themeData.theme === "dark" && <Check className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="h-20 bg-green-800 border border-gray-800 rounded-md shadow-sm"></div>
                      </div>

                      <div
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${themeData.theme === "system" ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "dark:border-gray-700"}`}
                        onClick={() => {
                          setThemeData({ ...themeData, theme: "system" })
                          const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
                          setIsDarkMode(prefersDark)
                          if (prefersDark) {
                            document.body.classList.add("dark")
                          } else {
                            document.body.classList.remove("dark")
                          }
                        }}
                      >
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-medium">System</span>
                          {themeData.theme === "system" && <Check className="h-4 w-4 text-blue-500" />}
                        </div>
                        <div className="h-20 bg-gradient-to-r from-white to-gray-900 border rounded-md shadow-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Color Scheme</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {["blue", "purple", "green", "orange"].map((color) => (
                        <div
                          key={color}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${themeData.colorScheme === color ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "dark:border-gray-700"}`}
                          onClick={() => setThemeData({ ...themeData, colorScheme: color })}
                        >
                          <div className="flex justify-between items-center mb-2">
                            <span className="capitalize font-medium">{color}</span>
                            {themeData.colorScheme === color && <Check className="h-4 w-4 text-blue-500" />}
                          </div>
                          <div className={`h-8 rounded-md bg-${color}-500`}></div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator /> */}

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Accessibility</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="reduced-motion" className="font-medium">
                            Reduced Motion
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Minimize animations and transitions
                          </p>
                        </div>
                        <Switch
                          id="reduced-motion"
                          checked={themeData.reducedMotion}
                          onCheckedChange={(checked: boolean) => setThemeData({ ...themeData, reducedMotion: checked })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="font-size">Font Size</Label>
                        <Select
                          value={themeData.fontSize}
                          onValueChange={(value: string) => setThemeData({ ...themeData, fontSize: value })}
                        >
                          <SelectTrigger id="font-size">
                            <SelectValue placeholder="Select font size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      toast("Appearance settings saved", {
                        description: "Your appearance preferences have been updated.",
                        duration: 3000,
                      })
                    }}
                  >
                    Save Appearance Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how and when you receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications" className="font-medium">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={notificationData.emailNotifications}
                          onCheckedChange={(checked: boolean) =>
                            setNotificationData({ ...notificationData, emailNotifications: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications" className="font-medium">
                            Push Notifications
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications on your device
                          </p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={notificationData.pushNotifications}
                          onCheckedChange={(checked: boolean) =>
                            setNotificationData({ ...notificationData, pushNotifications: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="in-app-notifications" className="font-medium">
                            In-App Notifications
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Receive notifications within the application
                          </p>
                        </div>
                        <Switch
                          id="in-app-notifications"
                          checked={notificationData.inAppNotifications}
                          onCheckedChange={(checked:boolean) =>
                            setNotificationData({ ...notificationData, inAppNotifications: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Types</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="leave-approval" className="font-medium">
                            Leave Approvals
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications about leave request approvals or rejections
                          </p>
                        </div>
                        <Switch
                          id="leave-approval"
                          checked={notificationData.notifyOnLeaveApproval}
                          onCheckedChange={(checked:boolean) =>
                            setNotificationData({ ...notificationData, notifyOnLeaveApproval: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="payslip" className="font-medium">
                            Payslip Availability
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications when new payslips are available
                          </p>
                        </div>
                        <Switch
                          id="payslip"
                          checked={notificationData.notifyOnPayslip}
                          onCheckedChange={(checked:boolean) =>
                            setNotificationData({ ...notificationData, notifyOnPayslip: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="announcements" className="font-medium">
                            Company Announcements
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications about company-wide announcements
                          </p>
                        </div>
                        <Switch
                          id="announcements"
                          checked={notificationData.notifyOnAnnouncements}
                          onCheckedChange={(checked:boolean) =>
                            setNotificationData({ ...notificationData, notifyOnAnnouncements: checked })
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="messages" className="font-medium">
                            Direct Messages
                          </Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Notifications when you receive direct messages
                          </p>
                        </div>
                        <Switch
                          id="messages"
                          checked={notificationData.notifyOnMessages}
                          onCheckedChange={(checked:boolean) =>
                            setNotificationData({ ...notificationData, notifyOnMessages: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      toast("Notification settings saved", {
                        description: "Your notification preferences have been updated.",
                        duration: 3000,
                      })
                    }}
                  >
                    Save Notification Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences and regional settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Regional Settings</h3>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select
                          value={accountData.language}
                          onValueChange={(value:string) => setAccountData({ ...accountData, language: value })}
                        >
                          <SelectTrigger id="language">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Spanish</SelectItem>
                            <SelectItem value="french">French</SelectItem>
                            <SelectItem value="german">German</SelectItem>
                            <SelectItem value="chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select
                          value={accountData.timeZone}
                          onValueChange={(value:string) => setAccountData({ ...accountData, timeZone: value })}
                        >
                          <SelectTrigger id="timezone">
                            <SelectValue placeholder="Select time zone" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                            <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                            <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                            <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                            <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                            <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="date-format">Date Format</Label>
                        <Select
                          value={accountData.dateFormat}
                          onValueChange={(value:string) => setAccountData({ ...accountData, dateFormat: value })}
                        >
                          <SelectTrigger id="date-format">
                            <SelectValue placeholder="Select date format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                            <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                            <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time-format">Time Format</Label>
                        <Select
                          value={accountData.timeFormat}
                          onValueChange={(value:string) => setAccountData({ ...accountData, timeFormat: value })}
                        >
                          <SelectTrigger id="time-format">
                            <SelectValue placeholder="Select time format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                            <SelectItem value="24h">24-hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Management</h3>

                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <h4 className="font-medium mb-2">Export Your Data</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Download a copy of your personal data, including profile information, attendance records, and
                          payroll history.
                        </p>
                        <Button variant="outline">Request Data Export</Button>
                      </div>

                      <div className="p-4 border rounded-lg dark:border-gray-700">
                        <h4 className="font-medium mb-2">Account Deactivation</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Temporarily deactivate your account. You can reactivate it at any time by logging in.
                        </p>
                        <Button variant="outline">Deactivate Account</Button>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      toast("Account settings saved", {
                        description: "Your account preferences have been updated.",
                        duration: 3000,
                      })
                    }}
                  >
                    Save Account Settings
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

