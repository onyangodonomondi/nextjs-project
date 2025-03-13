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
    "Hello Mocky Graphics! I'm interested in your services. Can you help me with my project?"
  );
  const whatsappLink = `https://wa.me/254741590670?text=${whatsappMessage}`;

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A1929]">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        {/* Asymmetric Shapes */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-navy-400/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        
        {/* Animated Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#205295_50%,transparent_100%)] opacity-20 blur-sm
              animate-[move_5s_linear_infinite] -skew-y-12" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,#1A75FF_50%,transparent_100%)] opacity-10 blur-sm
              animate-[move_7s_linear_infinite] skew-y-12" />
          </div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] 
          bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Content Container */}
      <div className="container relative mx-auto px-4">
        <div className="grid min-h-screen lg:grid-cols-2 gap-12 lg:gap-0 items-center">
          {/* Text Content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            {/* Enhanced Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10
              backdrop-blur-sm shadow-inner shadow-white/5">
              <div className="flex space-x-1.5">
                <span className="h-2 w-2 rounded-full bg-white animate-[pulse_1.5s_ease-in-out_infinite]" />
                <span className="h-2 w-2 rounded-full bg-white animate-[pulse_1.5s_ease-in-out_0.3s_infinite]" />
                <span className="h-2 w-2 rounded-full bg-white animate-[pulse_1.5s_ease-in-out_0.6s_infinite]" />
              </div>
              <span className="text-sm font-medium text-white">Welcome to Mocky Graphics LTD</span>
            </div>

            {/* Enhanced Typography */}
            <div className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <div className="relative inline-block">
                  <span className="absolute -inset-2 bg-accent/20 blur-xl rounded-full"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    Transform
                  </span>
                </div>
                
                <div className="relative mt-2 inline-block">
                  <span className="absolute -inset-2 bg-navy-400/20 blur-xl rounded-full"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-navy-200 via-navy-100 to-white 
                    drop-shadow-[0_0_10px_rgba(179,209,255,0.25)]">
                    Your Digital
                  </span>
                </div>
                
                <div className="relative mt-2 inline-block">
                  <span className="absolute -inset-2 bg-accent/20 blur-xl rounded-full"></span>
                  <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-white via-navy-100 to-navy-200
                    drop-shadow-[0_0_10px_rgba(255,255,255,0.25)]">
                    Presence
                  </span>
                </div>
              </h1>
              
              <p className="max-w-xl text-lg text-white/90 leading-relaxed mt-6 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                We create effective visual experiences that drive growth
                through strategic branding and innovative digital solutions.
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 inline-flex items-center justify-center
                  text-navy-900 font-semibold transition-all duration-300 hover:bg-accent hover:text-white hover:scale-105 
                  hover:shadow-lg hover:shadow-white/25"
              >
                <span className="relative z-10 flex items-center text-lg">
                  Get Started
                  <i className="fab fa-whatsapp ml-3 text-xl transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="#work"
                className="group relative overflow-hidden rounded-full bg-transparent border-2 border-white/20 
                  px-8 py-4 inline-flex items-center justify-center text-white font-semibold transition-all duration-300 
                  hover:border-white hover:scale-105 hover:shadow-lg hover:shadow-white/10"
              >
                <span className="relative z-10 flex items-center text-lg">
                  View Our Work
                  <i className="fas fa-arrow-right ml-3 text-xl transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative aspect-square max-w-[600px] mx-auto">
              {/* Image Glow Effects */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent blur-2xl scale-95 animate-pulse-slow" />
                <div className="absolute inset-0 bg-gradient-conic from-accent/30 via-transparent to-navy-400/30 rounded-full blur-2xl animate-spin-slow" />
              </div>
              
              <Image
                src="/images/hero/2.svg"
                alt="Digital Marketing Illustration"
                width={600}
                height={600}
                className="relative z-10 object-contain animate-float drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}