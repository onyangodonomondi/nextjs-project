import { Metadata } from 'next';
import './globals.css';
import RootLayoutWrapper from '@/components/RootLayoutWrapper';
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
        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://unpkg.com" />
        
        {/* Critical CSS first */}
        <link rel="stylesheet" href="/styles/critical.css" />
        
        {/* Preload critical images */}
        <link rel="preload" href="/images/logo.png" as="image" />
        
        {/* Optimized font loading */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Preload fonts
                var fontLink = document.createElement('link');
                fontLink.rel = 'preload';
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
                fontLink.as = 'style';
                document.head.appendChild(fontLink);
                
                // Load fonts with non-blocking strategy
                var fontStyle = document.createElement('link');
                fontStyle.rel = 'stylesheet';
                fontStyle.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
                fontStyle.media = 'print';
                fontStyle.onload = function() { 
                  this.media = 'all';
                  console.log('Fonts loaded');
                };
                document.head.appendChild(fontStyle);
                
                // Load animations later
                var animationLink = document.createElement('link');
                animationLink.rel = 'stylesheet';
                animationLink.href = '/styles/animations.css';
                document.head.appendChild(animationLink);
                
                // Performance monitoring
                if (typeof window !== 'undefined' && 'performance' in window && 'getEntriesByType' in performance) {
                  window.addEventListener('load', function() {
                    setTimeout(function() {
                      var pageNav = performance.getEntriesByType('navigation')[0];
                      if (pageNav) {
                        console.log('Page loading time: ' + Math.round(pageNav.loadEventEnd - pageNav.startTime) + 'ms');
                      }
                    }, 0);
                  });
                }
              })();
            `
          }}
        />
        
        {/* Optimized loading of non-critical CSS */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var loadStylesheet = function(src) {
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = src;
                link.media = 'print';
                link.onload = function() { this.media = 'all'; };
                document.head.appendChild(link);
              };
              
              loadStylesheet('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
              loadStylesheet('https://unpkg.com/aos@next/dist/aos.css');
            })();
          `
        }} />
        
        {/* Viewport for better responsive behavior */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* Load non-critical scripts in a non-blocking way */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              setTimeout(function() {
                var phosphorScript = document.createElement('script');
                phosphorScript.src = 'https://unpkg.com/@phosphor-icons/web';
                phosphorScript.async = true;
                document.head.appendChild(phosphorScript);
              }, 100);
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
