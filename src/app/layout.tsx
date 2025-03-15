import { Metadata } from 'next';
import './globals.css';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import PreloadResources from '@/components/PreloadResources';

export const metadata: Metadata = {
  metadataBase: new URL('https://mocky.co.ke'),
  title: {
    default: 'Mocky Digital - Professional Web Design & Digital Marketing Agency Kenya',
    template: '%s | Mocky Digital Kenya'
  },
  description: 'Leading digital agency in Nairobi offering professional web design, graphic design, and digital marketing services.',
  keywords: 'web design kenya, graphic design nairobi, digital marketing agency, seo services, professional branding, website development, social media marketing',
  openGraph: {
    title: 'Mocky Digital - Professional Digital Agency in Kenya',
    description: 'Expert web design, graphic design, and digital marketing services in Nairobi',
    url: 'https://mocky.co.ke',
    siteName: 'Mocky Digital',
    locale: 'en_KE',
    type: 'website',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mocky Digital'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image'
  },
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'sw-KE': '/sw-KE',
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="font-sans">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://unpkg.com/aos@next/dist/aos.css" 
        />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
        <PreloadResources />
      </head>
      <body className="min-h-screen bg-gray-50">
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
