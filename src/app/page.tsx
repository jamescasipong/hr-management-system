import HomePage from "@/app/components/HomePage";
import {Footer} from "./(home)/components/footer";

export const metadata = {
    title: 'HRConnect - Simplify Your HR Management',
    description: 'Streamline your HR processes, boost employee productivity, and make data-driven decisions with our comprehensive HR management platform.',
    keywords: ['HR management', 'HR software', 'employee management', 'payroll', 'attendance tracking', 'workforce management', 'leave management', 'HR analytics'],
    authors: [{ name: 'HRConnect Team' }],
    openGraph: {
      title: 'HRConnect - Simplify Your HR Management',
      description: 'Streamline your HR processes, boost employee productivity, and make data-driven decisions with our comprehensive HR management platform.',
      url: 'https://hrconnect.vercel.com',
      siteName: 'HRConnect',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'HRConnect Dashboard Preview',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'HRConnect - Simplify Your HR Management',
      description: 'Streamline your HR processes, boost employee productivity, and make data-driven decisions with our comprehensive HR management platform.',
      images: ['/twitter-image.png'],
      creator: '@hrconnect',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    canonical: 'https://hrconnect.vercel.app/contact',
    viewport: 'width=device-width, initial-scale=1',
};

export default function Page() 
{
  return <div>
      <HomePage />
      <Footer/>
  </div>;
}