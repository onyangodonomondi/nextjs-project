'use client';

import { useEffect } from 'react';

export default function FacebookFeed() {
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <div className="transform hover:scale-[1.02] transition-transform duration-300">
      <div className="bg-white rounded-2xl shadow-lg shadow-gray-200/60 overflow-hidden min-h-[500px]">
        <div className="border-b border-gray-100 p-4 flex items-center gap-3">
          <i className="fab fa-facebook text-[#1877F2] text-2xl"></i>
          <span className="font-semibold text-gray-800">Facebook</span>
        </div>
        <div id="fb-root"></div>
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
  );
} 