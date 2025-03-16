'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import ClientLayout from '@/components/ClientLayout';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export default function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error('Unhandled error:', event.error);
      
      // You can add reporting/analytics here
      // Or show a user-friendly error message
    };
    
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    // Mark as fully loaded after everything is ready
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', () => setIsLoaded(true));
      
      // Fallback in case the load event doesn't fire
      setTimeout(() => setIsLoaded(true), 3000);
    }
    
    // Initialize AOS (Animate on Scroll) with optimized settings
    const initAOS = () => {
      try {
        if (typeof window !== 'undefined' && (window as any).AOS) {
          (window as any).AOS.init({
            once: true, // Only animate elements once
            disable: 'phone', // Disable on mobile for better performance
            duration: 600, // Shorter animation duration for better performance
            easing: 'ease-out-cubic',
            delay: 0, // No delay to prevent layout shifts
            throttleDelay: 99, // Better throttling
          });
        }
      } catch (error) {
        console.error('Error initializing AOS:', error);
      }
    };

    // Load AOS script dynamically
    const loadAOS = () => {
      if (typeof window !== 'undefined' && !(window as any).AOS) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/aos@next/dist/aos.js';
        script.async = true;
        script.onload = initAOS;
        document.body.appendChild(script);
      } else {
        initAOS();
      }
    };

    // Delay the loading of non-critical scripts
    const timer = setTimeout(() => {
      loadAOS();
    }, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', () => setIsLoaded(true));
    };
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
      {!isLoaded && (
        <div 
          id="loading-indicator"
          className="fixed top-0 left-0 w-full h-1 bg-primary-light z-[9999]"
          style={{
            animation: 'loadingProgress 2s ease-in-out',
            transformOrigin: 'left',
          }}
        />
      )}
      <ClientLayout>{children}</ClientLayout>
      <Footer />
      <Toaster position="top-right" />
    </>
  );
} 