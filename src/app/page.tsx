import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, CreditCard, Users } from "lucide-react"
import { useState } from "react"

export default function SignInForm() {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">HRConnect</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="admin-mode" className={isAdmin ? "text-primary" : "text-muted-foreground"}>Admin</Label>
              <Switch
                id="admin-mode"
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
              />
            </div>
          </div>
          <CardDescription>
            Sign in to manage your {isAdmin ? "HR tasks" : "work activities"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 text-sm">
              <Clock className="w-4 h-4" />
              <Users className="w-4 h-4" />
              <CreditCard className="w-4 h-4" />
              <Calendar className="w-4 h-4" />
            </div>
            <a href="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </a>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign In</Button>
        </CardFooter>
        <div className="px-6 pb-4 pt-2 text-center text-sm text-muted-foreground">
          {isAdmin
            ? "Access attendance, payroll, and HR management tools"
            : "Clock in/out, view schedules, and manage your work activities"}
        </div>
      </Card>
    </div>
  )
}