import ResetPasswordPage from "@/app/(auth)/reset-password/components/ResetPasswordPage";

export const metadata = {
  title: 'Reset Password - HRConnect',
  description: 'Reset your HRConnect account password. Enter your new password and confirm it to secure your account.',
  keywords: ['reset password', 'HRConnect password reset', 'forgot password', 'account recovery', 'password reset link'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'Reset Your Password - HRConnect',
    description: 'Enter your new password to reset your HRConnect account password and regain access.',
    url: 'https://hrconnect.vercel.app/reset-password',
    siteName: 'HRConnect',
    images: [
      {
        url: '/reset-password-og-image.png',
        width: 1200,
        height: 630,
        alt: 'HRConnect Password Reset',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reset Your Password - HRConnect',
    description: 'Forgot your password? Enter your new password and we\'ll secure your HRConnect account.',
    images: ['/reset-password-twitter-image.png'],
    creator: '@hrconnect',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  canonical: 'https://hrconnect.vercel.app/reset-password',
  viewport: 'width=device-width, initial-scale=1',
}

export default function Page(){
  return <ResetPasswordPage/>
}