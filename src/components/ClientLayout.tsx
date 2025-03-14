'use client';

import { useEffect, useState } from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [isAdminPath, setIsAdminPath] = useState(false);

  useEffect(() => {
    // Check if we're in the admin section after component mounts
    setIsAdminPath(window.location.pathname.startsWith('/admin'));

    // Initialize AOS
    if (typeof window !== 'undefined') {
      const AOS = require('aos');
      AOS.init({
        duration: 800,
        once: true,
      });
    }
  }, []);

  // If it's an admin page, just return the children without wrapping
  if (isAdminPath) {
    return children;
  }

  // Otherwise, apply the client-side layout
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
} 