'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // WhatsApp link
  const whatsappMessage = encodeURIComponent(
    "Hello Mocky Digital! I'm interested in your services. Can you help me with my project?"
  );
  const whatsappLink = `https://wa.me/254741590670?text=${whatsappMessage}`;

  return (
    <section className="min-h-screen bg-[#111827] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1E293B]/90 via-[#111827]/80 to-[#0F172A]/90" />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 md:py-0">
          {/* Text Content */}
          <div className={`text-white space-y-6 transition-all duration-1000 relative ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              Welcome to Mocky Digital
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-orange-500">Transform</span> Your<br />
              <span className="text-blue-400">Digital Presence</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 max-w-xl">
              We create effective visual experiences that drive growth
              through strategic branding and innovative digital solutions.
            </p>

            {/* Buttons Container */}
            <div className="flex flex-wrap gap-4 pt-8">
              {/* Get Started - WhatsApp Link */}
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-[#FF4500] text-white hover:bg-[#FF4500]/90 
                transition-all duration-300 text-lg font-medium group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <i className="fab fa-whatsapp ml-2 text-xl group-hover:translate-x-1 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/0 via-white/10 to-[#FF4500]/0 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>
              
              {/* View Our Work - Facebook Link */}
              <a
                href="https://www.facebook.com/mockydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-[#1E3A5F] text-white hover:bg-[#1E3A5F]/90 
                transition-all duration-300 text-lg font-medium group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  View Our Work
                  <i className="fas fa-arrow-up-right-from-square ml-2 group-hover:translate-x-1 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1E3A5F]/0 via-white/10 to-[#1E3A5F]/0 
                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </a>
            </div>
          </div>

          {/* Single Image with Animation */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              <Image
                src="/images/hero/2.svg"
                alt="Digital Marketing Illustration"
                width={600}
                height={600}
                className="object-contain animate-float hover:animate-pulse"
                priority
              />
              
              {/* Decorative Elements */}
              <div className="absolute -z-10 inset-0 animate-pulse-slow">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-blue-500/20 rounded-full blur-3xl" />
              </div>
              <div className="absolute -z-10 inset-0 animate-pulse-slower">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-orange-500/20 rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}