'use client';

import React, { useEffect } from 'react';

// List of critical resources to preload - update these based on your site's needs
const criticalImages = [
  '/images/logo.png',
  '/images/hero/hero-illustration.svg'
];

export default function PreloadResources() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Add connection preload for resource origins
    const origins = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      'https://cdnjs.cloudflare.com'
    ];

    origins.forEach(origin => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = origin;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });

    // Preload critical images
    criticalImages.forEach(imagePath => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imagePath;
      document.head.appendChild(link);
    });

    // Prefetch routes for performance
    const routesToPrefetch = [
      '/about',
      '/services',
      '/contact',
    ];

    // Delay prefetching slightly to prioritize critical content
    setTimeout(() => {
      routesToPrefetch.forEach(route => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = route;
        document.head.appendChild(link);
      });
    }, 1000);

    // Add browser hints for optimization
    if ('loading' in HTMLImageElement.prototype) {
      console.log('Native lazy loading supported');
    }

    // Optional: Report performance metrics
    if ('performance' in window && 'getEntriesByType' in performance) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const pageNavigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          if (pageNavigation) {
            console.log(`Page loading time: ${Math.round(pageNavigation.loadEventEnd - pageNavigation.startTime)}ms`);
          }
        }, 0);
      });
    }
  }, []);

  return null;
} 