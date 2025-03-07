"use client";

import { useEffect, useState } from "react";
import { VerificationCodeInput } from "./verification-code-input";
import { CountdownTimer } from "./countdown-timer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, RefreshCw } from "lucide-react";
import instanceApi from "@/api/auth";
import { useRouter } from "next/navigation";

export default function VerificationCodeWithTimer({
  email,
  password,
  className,
}: {
  email: string;
  password: string;
  className?: string;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (error?.includes("Invalid verification code") || error?.includes("An error occurred")) {
      setCode("");
      setTimeout(() => {
        setError(undefined);
      }, 4000);
    }
  }, [error]);

  const handleComplete = (code: string) => {
    setCode(code);
    // setError(undefined);
  };

  const verify = async () => {
    try {
      let response = await instanceApi.post("/user/account/login/verify", {
        email,
        password,
        code,
      });
  
      if (response.status === 200) {
        router.push("/dashboard");
        router.refresh();
        return response.data.success;
      } 
  
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          console.log("Invalid verification code. Please try again.");
          setError("Invalid verification code. Please try again.");
        } else {
          console.log("An error occurred. Please try again later.");
          setError("An error occurred. Please try again later.");
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.log("No response received from the server. Please check your network connection.");
        setError("No response received from the server. Please check your network connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("An error occurred. Please try again later.");
        setError("An error occurred. Please try again later.");
      }
      console.error(error);
    }
  };

  const handleVerify = () => {
    setIsVerifying(true);

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false);

      // For demo purposes, let's say "123456" is the correct code
      if (code) {
        setError(undefined);
        verify();
      } else {
        setError("Invalid verification code. Please try again.");
      }
    }, 1500);
  };

  const handleReset = () => {
    setCode("");
    setError(undefined);
    setIsVerified(false);
  };

  const handleResendCode = async () => {
    // Simulate API call to resend code
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setCode("");
        setError(undefined);
        resolve();
      }, 1500);
    });
  };

  return (
    <div className={className}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Verification Required</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to your device to verify your identity.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isVerified ? (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Check className="h-6 w-6" />
              </div>
              <p className="text-center font-medium">
                Verification successful!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <VerificationCodeInput
                length={6}
                onComplete={handleComplete}
                disabled={isVerifying}
                error={error}
              />

              <div className="flex justify-center">
                <CountdownTimer
                  duration={60}
                  onResend={handleResendCode}
                  className="text-sm h-auto py-1"
                />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="ghost" onClick={handleReset} disabled={isVerifying}>
            Reset
          </Button>
          {!isVerified && (
            <Button
              onClick={handleVerify}
              disabled={code.length !== 6 || isVerifying}
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                "Verify"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}