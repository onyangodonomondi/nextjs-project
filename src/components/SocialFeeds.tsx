'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Loading component
const LoadingCard = ({ platform }: { platform: string }) => (
  <div className="transform hover:scale-[1.02] transition-transform duration-300">
    <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
      <div className="border-b border-gray-100 p-4 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
        <span className="font-semibold text-gray-800">{platform}</span>
      </div>
      <div className="p-4 flex items-center justify-center h-[400px]">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="text-gray-400">Loading {platform} feed...</div>
        </div>
      </div>
    </div>
  </div>
);

// Dynamically import components with loading fallback
const FacebookFeed = dynamic(
  () => import('./social/FacebookFeed'),
  { loading: () => <LoadingCard platform="Facebook" />, ssr: false }
);

const InstagramFeed = dynamic(
  () => import('./social/InstagramFeed'),
  { loading: () => <LoadingCard platform="Instagram" />, ssr: false }
);

const TwitterFeed = dynamic(
  () => import('./social/TwitterFeed'),
  { loading: () => <LoadingCard platform="Twitter" />, ssr: false }
);

const TikTokFeed = dynamic(
  () => import('./social/TikTokFeed'),
  { loading: () => <LoadingCard platform="TikTok" />, ssr: false }
);

// Add type definition for Facebook SDK
declare global {
  interface Window {
    FB?: {
      XFBML: {
        parse: () => void;
      };
    };
    twttr?: {
      widgets: {
        load: (element?: HTMLElement | null) => void;
        createTimeline: (options: any) => void;
      };
      ready: (callback: () => void) => void;
    };
  }
}

export default function SocialFeeds() {
  const [scriptsLoaded, setScriptsLoaded] = useState(false);

  useEffect(() => {
    // Load all social media scripts
    const loadScripts = async () => {
      try {
        await Promise.all([
          // Facebook
          loadScript('https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v17.0'),
          // Twitter
          loadScript('https://platform.twitter.com/widgets.js'),
          // Instagram
          loadScript('https://www.instagram.com/static/bundles/es6/EmbedSDK.js/47c7ec92d91e.js')
        ]);
        setScriptsLoaded(true);
      } catch (error) {
        console.error('Error loading social media scripts:', error);
      }
    };

    loadScripts();

    return () => {
      // Cleanup scripts on unmount
      const scripts = document.querySelectorAll('script[data-social-script]');
      scripts.forEach(script => script.remove());
    };
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
          {scriptsLoaded ? (
            <>
              <FacebookFeed />
              <InstagramFeed />
              <TwitterFeed />
              <TikTokFeed />
            </>
          ) : (
            <>
              <LoadingCard platform="Facebook" />
              <LoadingCard platform="Instagram" />
              <LoadingCard platform="Twitter" />
              <LoadingCard platform="TikTok" />
            </>
          )}
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

// Helper function to load scripts
function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute('data-social-script', 'true');
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.body.appendChild(script);
  });
} 