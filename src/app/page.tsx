"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, CreditCard, Users } from "lucide-react";
import { useCallback, useState } from "react";
import '../app/globals.css';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setEmailError("")
  }, [])

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    setPasswordError("")
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let isValid = true

    if (!email) {
      setEmailError("Email is required")
      isValid = false;
      return;
    }

    if (!password) {
      setPasswordError("Password is required")
      isValid = false;
      return;
    }

    if (isValid) {
      // Proceed with sign-in logic here
      window.location.href = isAdmin ? "/admin/dashboard" : "dashboard"
      console.log("Sign in attempted with", { email, password, isAdmin })
    }
  }, [email, password, isAdmin])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900  sm:p-6 p-2 ">
      <Card className="w-full max-w-xl ">
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-2">
            <div className="flex items-center justify-between">
              <CardTitle className="sm:text-3xl text-lg font-bold">HRConnect</CardTitle>
              <div className="flex items-center space-x-3">
                <Label htmlFor="admin-mode" className={`sm:text-lg text-sm ${isAdmin ? "text-primary" : "text-muted-foreground"}`}>Admin</Label>
                <Switch
                  id="admin-mode"
                  checked={isAdmin}
                  onCheckedChange={setIsAdmin}
                  className={`sm:scale-125 scale-90  ${isAdmin ? "dark:bg-blue-500" : "dark:bg-gray-600"}`}
                />
              </div>
            </div>
            <CardDescription className="sm:text-lg text-sm ">
              Sign in to manage your {isAdmin ? "HR tasks" : "work activities"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="sm:text-lg text-sm">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="m@example.com" 
                required 
                className="sm:text-lg text-sm p-6"
                value={email}
                onChange={handleEmailChange}
              />
              {emailError && <p className="text-red-500 text-sm animate-fadeIn">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="sm:text-lg text-sm">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                className="sm:text-lg text-sm p-6"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className="text-red-500 text-sm animate-fadeIn">{passwordError}</p>}
            </div>
            <div className="flex justify-between items-center">
              <div className="sm:flex hidden  space-x-4 sm:text-lg text-sm">
                <Clock className="w-6 h-6" />
                <Users className="w-6 h-6" />
                <CreditCard className="w-6 h-6" />
                <Calendar className="w-6 h-6" />
              </div>
              <a href="#" className="sm:text-lg text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
          </CardContent>
          <CardFooter className="flex-col space-y-4">
            <Button type="submit" className="w-full sm:text-lg text-sm   py-6">Sign In</Button>
            <div className="text-center sm:text-lg  text-sm text-muted-foreground">
              {isAdmin
                ? "Access attendance, payroll, and HR management tools"
                : "Clock in/out, view schedules, and manage your work activities"}
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}