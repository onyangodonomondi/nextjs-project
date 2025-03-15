"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { safeJsonParse } from '@/utils/safeJson';

// Sample logos for fallback
const sampleLogos = [
  {
    id: 1,
    title: "Wordmark Logo",
    src: "/images/portfolio/logo-types/wordmark.png",
    alt: "Wordmark Logo Example",
  },
  {
    id: 2,
    title: "Lettermark Logo",
    src: "/images/portfolio/logo-types/lettermark.png",
    alt: "Lettermark Logo Example",
  },
  {
    id: 3,
    title: "Symbol Logo",
    src: "/images/portfolio/logo-types/symbol.png",
    alt: "Symbol Logo Example",
  },
  {
    id: 4,
    title: "Combination Logo",
    src: "/images/portfolio/logo-types/combination.png",
    alt: "Combination Logo Example",
  },
];

// Use NoSSR to completely prevent server rendering of the component
// This ensures there are no hydration mismatches
const NoSSR = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return isClient ? children : <LoadingSpinner />;
};

// Safely import with error boundary - use dynamic import with ssr: false
const LogosGallery = dynamic(() => import('@/components/LogosGallery'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Disable SSR for this component
});

const ErrorFallback = () => (
  <div className="container mx-auto p-8 text-center">
    <h2 className="text-2xl font-bold mb-4 text-red-500">Something went wrong</h2>
    <p>We're having trouble loading the logos gallery. Please try again later.</p>
  </div>
);

export default function LogosPage() {
  const [logos, setLogos] = useState(sampleLogos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize with sample logos immediately to show content
    setLogos(sampleLogos);
    
    const fetchLogos = async () => {
      try {
        setLoading(true);
        
        // Use the origin for API URL and add cache parameters
        const apiUrl = `${window.location.origin}/api/logos`;
        
        // Implement proper caching strategy
        const response = await fetch(apiUrl, { 
          // Use cache: 'default' to respect Cache-Control headers from the API
          cache: 'default'
        });
        
        if (!response.ok) {
          throw new Error(`Error fetching logos: HTTP ${response.status}`);
        }
        
        // Parse JSON directly
        const data = await response.json();
        
        if (data && Array.isArray(data) && data.length > 0) {
          setLogos(data);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
        setError(error instanceof Error ? error.message : String(error));
        // Keep the sample logos in place
      } finally {
        setLoading(false);
      }
    };

    fetchLogos();
  }, []);

  // Use NoSSR to completely prevent server-side rendering of the gallery
  // This ensures there are no hydration mismatches
  return (
    <ErrorBoundary 
      fallback={<ErrorFallback />}
      onError={(error) => console.error("Error in logos page:", error)}
    >
      <NoSSR>
        <LogosGallery logos={logos} />
      </NoSSR>
      {loading && logos.length <= 4 && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <LoadingSpinner />
        </div>
      )}
    </ErrorBoundary>
  );
} 