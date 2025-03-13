'use client';

import { useEffect } from 'react';

export default function SocialFeeds() {
  useEffect(() => {
    // Reinitialize Facebook SDK
    if (window.FB) {
      window.FB.XFBML.parse();
    }

    // Load Twitter widgets
    if (window.twttr && window.twttr.widgets) {
      window.twttr.widgets.load();
    }

    // Create TikTok embed script
    const loadTikTokWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://www.tiktok.com/embed.js';
      script.async = true;
      document.body.appendChild(script);
    };
    loadTikTokWidget();
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#0A2647] to-[#144272]">
            Stay Connected
          </h2>
          <p className="text-gray-600 text-lg">
            Join our community and stay updated with our latest projects, insights, and design inspiration
          </p>
        </div>

        {/* Social Feeds Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Facebook Feed */}
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
              <div className="border-b border-gray-100 p-4 flex items-center gap-3">
                <i className="fab fa-facebook text-[#1877F2] text-2xl"></i>
                <span className="font-semibold text-gray-800">Facebook</span>
              </div>
              <div 
                className="fb-page" 
                data-href="https://www.facebook.com/mockydigital"
                data-tabs="timeline"
                data-width=""
                data-height="400"
                data-small-header="true"
                data-adapt-container-width="true"
                data-hide-cover="false"
                data-show-facepile="true"
              />
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
              <div className="border-b border-gray-100 p-4 flex items-center gap-3">
                <i className="fab fa-instagram text-[#E4405F] text-2xl"></i>
                <span className="font-semibold text-gray-800">Instagram</span>
              </div>
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/mockydigital/"
                data-instgrm-version="14"
                style={{ 
                  minWidth: '326px',
                  height: '400px'
                }}
              />
            </div>
          </div>

          {/* Twitter/X Feed */}
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
              <div className="border-b border-gray-100 p-4 flex items-center gap-3">
                <i className="fab fa-x-twitter text-black text-2xl"></i>
                <span className="font-semibold text-gray-800">Twitter/X</span>
              </div>
              <div className="p-4">
                <a 
                  className="twitter-timeline" 
                  data-height="400"
                  data-theme="light"
                  href="https://twitter.com/mockydigital"
                >
                  Tweets by Mocky Digital
                </a>
              </div>
            </div>
          </div>

          {/* TikTok Feed */}
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
        </div>

        {/* Follow Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-12">
          <a 
            href="https://www.facebook.com/mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#1877F2] text-white rounded-full hover:bg-[#1877F2]/90 transition-colors"
          >
            <i className="fab fa-facebook"></i>
            Follow on Facebook
          </a>
          <a 
            href="https://www.instagram.com/mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#E4405F] text-white rounded-full hover:bg-[#E4405F]/90 transition-colors"
          >
            <i className="fab fa-instagram"></i>
            Follow on Instagram
          </a>
          <a 
            href="https://twitter.com/mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-colors"
          >
            <i className="fab fa-x-twitter"></i>
            Follow on X
          </a>
          <a 
            href="https://www.tiktok.com/@mockydigital" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 bg-[#000000] text-white rounded-full hover:bg-[#000000]/90 transition-colors"
          >
            <i className="fab fa-tiktok"></i>
            Follow on TikTok
          </a>
        </div>
      </div>
    </section>
  );
} 