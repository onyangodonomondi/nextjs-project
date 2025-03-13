import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';
import ClientLayout from '@/components/ClientLayout';
import Navbar from '@/components/Navbar';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://mocky.co.ke'),
  title: {
    default: 'Mocky Digital - Professional Web Design & Digital Marketing Agency Kenya',
    template: '%s | Mocky Digital Kenya'
  },
  description: 'Leading digital agency in Nairobi offering professional web design, graphic design, and digital marketing services. Expert branding and SEO solutions for Kenyan businesses.',
  keywords: 'web design kenya, graphic design nairobi, digital marketing agency, seo services, professional branding, website development, social media marketing',
  openGraph: {
    title: 'Mocky Digital - Professional Digital Agency in Kenya',
    description: 'Expert web design, graphic design, and digital marketing services in Nairobi',
    url: 'https://mocky.co.ke',
    siteName: 'Mocky Digital',
    locale: 'en_KE',
    type: 'website',
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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
        <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body className={inter.className}>
        <Navbar />
        <ClientLayout>
          {children}
        </ClientLayout>
        <Footer />
      </body>
    </html>
  );
}
