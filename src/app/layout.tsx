import { Metadata } from 'next';
import './globals.css';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
import PreloadResources from '@/components/PreloadResources';
import type { NextWebVitalsMetric } from 'next/app';

declare global {
  interface Window {
    gtag?: (command: string, action: string, params: object) => void;
  }
}

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
        <link rel="stylesheet" href="/styles/critical.css" />
        <link rel="stylesheet" href="/styles/fonts.css" />
        <link rel="preload" as="style" href="/styles/animations.css" />
        <PreloadResources />
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = '/styles/animations.css';
                document.head.appendChild(link);
              })();
            `
          }}
        />
      </head>
      <body className="min-h-screen bg-gray-50">
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  try {
    console.log(metric);
    
    // You can send these metrics to your analytics platform
    // Example for Google Analytics:
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }
  } catch (error) {
    console.error('Error in reportWebVitals:', error);
  }
}
