import FreeTrialPage from "@/app/(home)/(pages)/free-trial/components/FreeTrialPage";

export const metadata = {
  title: 'Free Trial - HRConnect',
  description: 'Start your free trial with HRConnect. Explore all the HR management features with no obligations.',
  keywords: ['HRConnect', 'free trial', 'HR software', 'employee management', 'free demo', 'HR tools'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'Start your Free Trial with HRConnect',
    description: 'Explore HRConnect with a free trial and access all HR management tools for your business.',
    url: 'https://hrconnect.vercel.app/free-trial',
    siteName: 'HRConnect',
    images: [
      {
        url: '/free-trial-og-image.png',
        width: 1200,
        height: 630,
        alt: 'HRConnect Free Trial',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Start your Free Trial with HRConnect',
    description: 'Get started with HRConnect’s free trial and experience top-notch HR management features.',
    images: ['/free-trial-twitter-image.png'],
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
  canonical: 'https://hrconnect.vercel.app/free-trial',
  viewport: 'width=device-width, initial-scale=1',
};


export default function Page(){
  return <FreeTrialPage/>
}