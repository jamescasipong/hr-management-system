import VerificationCode from "./verification-code"

interface VerificationCodeProps {
  length?: number;
  onComplete?: (code: string) => void;
}

export default function VerificationPage(props: VerificationCodeProps) {
  const { length = 6, onComplete } = props
  const handleComplete = (code: string) => {
    console.log("Verification code:", code)
    // Here you would typically send the code to your backend for verification
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md space-y-8 bg-background p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify Your Identity</h1>
          <p className="mt-2 text-muted-foreground">
            We've sent a verification code to your email address. Please enter it below to continue.
          </p>
        </div>

        <VerificationCode length={length} onComplete={onComplete} />

        <div className="text-center text-sm text-muted-foreground">
          <p>
            Didn't receive an email? Check your spam folder or{" "}
            <button className="text-primary underline">use a different email address</button>
          </p>
        </div>
      </div>
    </div>
  )
}

