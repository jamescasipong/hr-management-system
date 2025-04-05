import SignupPage from "@/app/(auth)/signup/components/SignupPage";

export const metadata = {
  title: 'Signup - HRConnect',
  description: 'Create an account on HRConnect. Sign up and get started with managing your HR activities.',
  keywords: ['HRConnect', 'HR software', 'sign up', 'employee management', 'create account'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'Sign up for HRConnect',
    description: 'Join HRConnect and start managing your HR activities. Register for an account today.',
    url: 'https://hrconnect.vercel.app/signup',
    siteName: 'HRConnect',
    images: [
      {
        url: '/signup-og-image.png',
        width: 1200,
        height: 630,
        alt: 'HRConnect Signup',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign up for HRConnect',
    description: 'Sign up for HRConnect and access HR tools to manage your employees.',
    images: ['/signup-twitter-image.png'],
    creator: '@hrconnect',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  canonical: 'https://hrconnect.vercel.app/signup',
  viewport: 'width=device-width, initial-scale=1',
};


export default function Page(){
  return <SignupPage />;
}