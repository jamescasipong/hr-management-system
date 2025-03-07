"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Calendar, Clock, CreditCard, Users } from "lucide-react";
import { useCallback, useContext, useEffect, useState } from "react";
import "../app/globals.css";
import { AuthContext } from "@/context/authContext";
import { useRouter } from "next/navigation";
import VerificationCodeWithTimer from "@/customComponents/verification-code/verification-code-with-timer";

export default function Home() {
  const router = useRouter();

  // const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);


  const {isLoading, setLoading, login, data }: {isLoading: boolean, setLoading: (state: boolean) => void, login: (e: React.FormEvent, email: string, password: string) => Promise<{success: boolean, message: string, data: any}>, data: object} = useContext<any>(AuthContext);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      setEmailError("");
    },
    []
  );


  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      setPasswordError("");
    },
    []
  );


  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();


      try {
        setLoading(true);
        const response = await login(e, email, password);

        if (response.data.twoFactor && !response.success){
            setTwoFactorEnabled(true);
        }

        if (response.success) {
            router.push("/dashboard");
            router.refresh();

        } else {
          setTimeout(() => {
            setLoading(false);
            }, 3000);
          // setEmailError(response.message);
          setPasswordError(response.message);
        }
      }
      catch (error) {
        setLoading(false);
        // setEmailError("An error occurred");
        setPasswordError("An error occurred");
      }
      finally{
        setLoading(false);
      }
    
    },
    [email, password]
  );


  return (
    twoFactorEnabled ? <VerificationCodeWithTimer className="flex h-screen w-full justify-center items-center" email={email} password={password}/> : <div className="min-h-screen flex items-center justify-center flex-col gap-4 bg-gray-100 dark:bg-gray-900  sm:p-6 p-2">
    <Card className="w-full max-w-xl z-50 shadow-lg">
      <form onSubmit={handleSubmit}>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-row items-center">
              <img
                src="/hrlogo.png"
                alt="logo"
                className="sm:w-14 w-10 sm:h-14 h-10"
              />
              <CardTitle className="sm:text-3xl text-lg font-bold">
                HRConnect
              </CardTitle>
            </div>
            {/* <div className="flex items-center space-x-3">
              <Label
                htmlFor="admin-mode"
                className={`sm:text-lg text-sm ${
                  isAdmin ? "text-primary" : "text-muted-foreground"
                }`}
              >
                Admin
              </Label>
              <Switch
                id="admin-mode"
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
                className={`sm:scale-125 scale-90  ${
                  isAdmin ? "dark:bg-blue-500" : "dark:bg-gray-600"
                }`}
              />
            </div> */}
          </div>
          <CardDescription className="sm:text-lg text-sm ">
            Sign in to manage your {"work activities"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="sm:text-lg text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="lightyagami@outlook.com"
              required
              className="sm:text-lg text-sm p-6"
              value={email}
              onChange={handleEmailChange}
            />
            {emailError && (
              <p className="text-red-500 text-sm animate-fadeIn">
                {emailError}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="sm:text-lg text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              className="sm:text-lg text-sm p-6"
              value={password}
              onChange={handlePasswordChange}
            />
            {passwordError && (
              <p className="text-red-500 text-sm animate-fadeIn">
                {passwordError}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="sm:flex hidden  space-x-4 sm:text-lg text-sm">
              <Clock className="w-6 h-6" />
              <Users className="w-6 h-6" />
              <CreditCard className="w-6 h-6" />
              <Calendar className="w-6 h-6" />
            </div>
            <a
              href="#"
              className="sm:text-lg text-sm text-primary hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex-col space-y-4">
          <Button type="submit" className={`w-full sm:text-lg text-sm py-6 disabled:opacity-50 ${isLoading ? "bg-gray-500 disabled" : "bg-primary enabled"}`}>
            {isLoading ? "Loading..." : "Sign in"}
          </Button>
          {/* <div className="text-center sm:text-lg  text-sm text-muted-foreground">
            {isAdmin
              ? "Access attendance, payroll, and HR management tools"
              : "Clock in/out, view schedules, and manage your work activities"}
          </div> */}
        </CardFooter>
      </form>
    </Card>
    <p className="text-gray-500 text-sm">
      © 2024 HRConnect, Inc. All Rights Reserved
    </p>
  </div>
  );
}
