'use client';

import { useEffect, useRef } from 'react';

export default function TwitterFeed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadTwitterWidget = async () => {
      try {
        // Clear existing content
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Create Twitter embed script
        const script = document.createElement('script');
        script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
        script.setAttribute('async', 'true');
        document.body.appendChild(script);

        // Create Twitter Timeline
        const timeline = document.createElement('a');
        timeline.className = 'twitter-timeline';
        timeline.setAttribute('data-theme', 'light');
        timeline.setAttribute('data-height', '400');
        timeline.setAttribute('data-chrome', 'noheader nofooter transparent');
        timeline.setAttribute('data-tweet-limit', '5');
        timeline.href = 'https://twitter.com/mockydigital';

        // Append timeline to container
        containerRef.current?.appendChild(timeline);

        // Initialize Twitter widgets
        script.onload = () => {
          if (window.twttr) {
            window.twttr.widgets.load(containerRef.current);
          }
        };
      } catch (error) {
        console.error('Error loading Twitter widget:', error);
      }
    };

    loadTwitterWidget();

    return () => {
      // Cleanup
      const scripts = document.querySelectorAll('script[src*="platform.twitter.com"]');
      scripts.forEach(script => script.remove());
    };
  }, []);

  return (
    <div className="transform hover:scale-[1.02] transition-transform duration-300">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
        <div className="border-b border-gray-100 p-4 flex items-center gap-3">
          <i className="fab fa-x-twitter text-black text-2xl"></i>
          <span className="font-semibold text-gray-800">Twitter/X</span>
        </div>
        <div 
          ref={containerRef} 
          className="p-4 h-[400px] overflow-hidden flex justify-center items-center"
        />
      </div>
    </div>
  );
} 