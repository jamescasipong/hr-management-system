import ContactUsPage from "./components/ContactUsPage";

export const metadata = {
  title: 'Contact Us - HRConnect',
  description: "Get in touch with the HRConnect team. We're here to help with any questions, technical support, or sales inquiries you may have.",
  keywords: ['HRConnect contact', 'HR software support', 'HR platform help', 'technical support', 'sales inquiry', 'contact form'],
  authors: [{ name: 'HRConnect Team' }],
  openGraph: {
    title: 'Contact Us - HRConnect',
    description: "Reach out to our team with any questions or feedback. We're here to help you get the most out of your HR management platform.",
    url: "https://hrconnect.vercel.app/contact",
    siteName: 'HRConnect',
    images: [
      {
        url: '/contact-og-image.png',
        width: 1200,
        height: 630,
        alt: 'Contact HRConnect Team',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - HRConnect',
    description: "Reach out to our team with any questions or feedback. We're here to help you get the most out of your HR management platform.",
    images: ['/contact-twitter-image.png'],
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
  canonical: "https://hrconnect.vercel.app/contact",
  viewport: 'width=device-width, initial-scale=1',
};


export default function Page() {
  return <ContactUsPage />;
}