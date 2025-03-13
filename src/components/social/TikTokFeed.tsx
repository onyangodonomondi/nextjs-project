'use client';

import { useEffect } from 'react';

export default function TikTokFeed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://www.tiktok.com/embed.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="transform hover:scale-[1.02] transition-transform duration-300">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
        <div className="border-b border-gray-100 p-4 flex items-center gap-3">
          <i className="fab fa-tiktok text-black text-2xl"></i>
          <span className="font-semibold text-gray-800">TikTok</span>
        </div>
        <blockquote 
          className="tiktok-embed"
          cite="https://www.tiktok.com/@mockydigital"
          data-unique-id="mockydigital"
          data-embed-type="creator"
          style={{ maxWidth: '780px', minWidth: '288px' }}
        >
          <section>
            <a target="_blank" href="https://www.tiktok.com/@mockydigital">@mockydigital</a>
          </section>
        </blockquote>
      </div>
    </div>
  );
} 