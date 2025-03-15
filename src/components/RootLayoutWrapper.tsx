'use client';

import { usePathname } from 'next/navigation';
import ClientLayout from '@/components/ClientLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');

  useEffect(() => {
    const handleError = (event) => {
      console.error('Unhandled error:', event.error);
      
      // You can add reporting/analytics here
      // Or show a user-friendly error message
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  if (isAdminPath) {
    return (
      <>
        <Toaster position="top-right" />
        {children}
      </>
    );
  }

  return (
    <>
      <div id="fb-root"></div>
      <Navbar />
      <ClientLayout>{children}</ClientLayout>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
} 