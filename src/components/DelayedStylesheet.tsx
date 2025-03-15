'use client';

import React, { useEffect } from 'react';

interface DelayedStylesheetProps {
  href: string;
}

export default function DelayedStylesheet({ href }: DelayedStylesheetProps) {
  useEffect(() => {
    // Simplified implementation that loads the stylesheet
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = href;
    document.head.appendChild(linkElement);
    
    return () => {
      try {
        document.head.removeChild(linkElement);
      } catch (e) {
        console.error('Error removing stylesheet:', e);
      }
    };
  }, [href]);
  
  // Return an empty fragment instead of null for better React compatibility
  return <React.Fragment></React.Fragment>;
} 