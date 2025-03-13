'use client';

import { useEffect, useRef } from 'react';

export default function InstagramFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create Instagram embed
    const createInstagramEmbed = () => {
      // Clear existing content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Create Instagram embed iframe
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.instagram.com/mockydigital/embed';
      iframe.width = '100%';
      iframe.height = '400';
      iframe.setAttribute('frameborder', '0');
      iframe.setAttribute('scrolling', 'no');
      iframe.setAttribute('allowtransparency', 'true');
      iframe.style.background = 'white';
      iframe.style.maxWidth = '540px';
      iframe.style.width = '100%';
      iframe.style.margin = '0 auto';
      iframe.style.display = 'block';
      iframe.style.borderRadius = '3px';

      // Append to container
      containerRef.current?.appendChild(iframe);
    };

    createInstagramEmbed();

    // Reinitialize Instagram embed when window is resized
    const handleResize = () => {
      createInstagramEmbed();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="transform hover:scale-[1.02] transition-transform duration-300">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
        <div className="border-b border-gray-100 p-4 flex items-center gap-3">
          <i className="fab fa-instagram text-[#E4405F] text-2xl"></i>
          <span className="font-semibold text-gray-800">Instagram</span>
        </div>
        <div ref={containerRef} className="p-4 flex justify-center" />
      </div>
    </div>
  );
} 