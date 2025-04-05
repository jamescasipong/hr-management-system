import LoginPage from "@/app/(auth)/signin/components/LoginPage";

export const metadata = {
  title: 'Login - HRConnect',
  description: 'Sign in to your HRConnect account. Access your dashboard and manage your HR tools with ease.',
  keywords: ['HRConnect', 'HR software', 'employee management', 'login', 'sign in', 'HR tools'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'Login to HRConnect',
    description: 'Enter your credentials to sign in to HRConnect. Manage your HR activities in one place.',
    url: 'https://hrconnect.vercel.app/signin',
    siteName: 'HRConnect',
    images: [
      {
        url: '/login-og-image.png',
        width: 1200,
        height: 630,
        alt: 'HRConnect Login',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login to HRConnect',
    description: 'Sign in to HRConnect to access your HR tools and dashboard.',
    images: ['/login-twitter-image.png'],
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
  canonical: 'https://hrconnect.vercel.app/signin',
  viewport: 'width=device-width, initial-scale=1',
};


export default function Page(){
  return <LoginPage />;
}