import DocumentationPage from "@/app/(home)/(pages)/documentation/components/DocumentationPage";
import {Metadata} from "next";

export const metadata = {
  title: 'HRConnect Documentation',
  description: 'Explore HRConnect Documentation to get started with the platform, learn about features, integrations, and API references.',
  keywords: ['HRConnect', 'documentation', 'API guide', 'HR software integration', 'employee management', 'user guide'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'HRConnect Documentation',
    description: 'Access the complete documentation for HRConnect and start integrating or using HRConnect efficiently.',
    url: 'https://hrconnect.vercel.app/documentation',
    siteName: 'HRConnect',
    images: [
      {
        url: '/documentation-og-image.png',
        width: 1200,
        height: 630,
        alt: 'HRConnect Documentation Overview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HRConnect Documentation',
    description: 'Get detailed information and resources for using and integrating HRConnect.',
    images: ['/documentation-twitter-image.png'],
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
  canonical: 'https://hrconnect.vercel.app/documentation',
  viewport: 'width=device-width, initial-scale=1',
};


export default function Page(){
  return <DocumentationPage/>
}