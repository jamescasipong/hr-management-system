import ForgotPasswordPage from "./components/ForgotPasswordPage";

export const metadata = {
  title: 'Reset Password - HRConnect',
  description: 'Reset your HRConnect account password. Enter your email address and we\'ll send you a password reset link.',
  keywords: ['reset password', 'forgot password', 'account recovery', 'HRConnect password reset', 'password reset link'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'Reset Your Password - HRConnect',
    description: 'Forgot your password? Enter your email and we\'ll send you a secure link to reset your HRConnect account password.',
    url: 'https://hrconnect.vercel.app/forgot-password',
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
    description: 'Forgot your password? Enter your email and we\'ll send you a secure link to reset your HRConnect account password.',
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
  canonical: 'https://hrconnect.vercel.app/forgot-password',
  viewport: 'width=device-width, initial-scale=1',
}

export default function Page(){
  return <ForgotPasswordPage/>;
}