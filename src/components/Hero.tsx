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
            {/* Welcome Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20
              backdrop-blur-sm shadow-inner shadow-accent/5">
              <div className="flex space-x-1">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[pulse_1.5s_ease-in-out_infinite]" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[pulse_1.5s_ease-in-out_0.3s_infinite]" />
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-[pulse_1.5s_ease-in-out_0.6s_infinite]" />
              </div>
              <span className="text-sm font-medium text-accent/90">Welcome to Mocky Graphics LTD</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover pb-2">
                  Transform
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-navy-200 to-navy-400 pb-2">
                  Your Digital
                </div>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-navy-300 to-navy-400">
                  Presence
                </div>
              </h1>
              
              <p className="max-w-xl text-lg text-navy-100/80 leading-relaxed mt-6">
                We create effective visual experiences that drive growth
                through strategic branding and innovative digital solutions.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-8">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-full bg-accent px-8 py-4 inline-flex items-center justify-center
                  text-white transition-all duration-300 hover:bg-accent-hover hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                <span className="relative z-10 flex items-center text-lg font-medium">
                  Get Started
                  <i className="fab fa-whatsapp ml-3 text-xl transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <a
                href="#work"
                className="group relative overflow-hidden rounded-full bg-white/5 backdrop-blur-sm border border-white/10 
                  px-8 py-4 inline-flex items-center justify-center text-white transition-all duration-300 
                  hover:bg-white/10 hover:scale-105 hover:shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10 flex items-center text-lg font-medium">
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