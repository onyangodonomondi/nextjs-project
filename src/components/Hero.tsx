'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

// Temporary placeholder images
const heroImages = [
  '/images/hero/1.svg',
  '/images/hero/2.svg',
  '/images/hero/3.svg'
];

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    alpha: number;
  }>>([]);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Rotate through images every 5 seconds with smooth transitions
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[#0A2647] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/80 to-secondary/90" />
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="lines">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="line hidden md:block" />
          ))}
          {[...Array(3)].map((_, i) => (
            <div key={i + 3} className="line hidden lg:block" />
          ))}
        </div>
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
                href={`https://wa.me/254756331327?text=${encodeURIComponent(
                  "Hello Mocky Digital! I'm interested in your services. Can you help me with my project?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#FF4500] text-white rounded-full hover:bg-[#FF4500]/90 transition-all duration-300 text-lg font-medium transform hover:scale-105 active:scale-95"
              >
                Get Started
                <i className="fab fa-whatsapp ml-2 text-xl"></i>
              </a>
              
              {/* View Our Work - Facebook Link */}
              <a
                href="https://www.facebook.com/mockydigital"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-[#1E3A5F] text-white rounded-full hover:bg-[#1E3A5F]/90 transition-all duration-300 text-lg font-medium transform hover:scale-105 active:scale-95"
              >
                View Our Work
                <i className="fas fa-arrow-up-right-from-square ml-2"></i>
              </a>
            </div>
          </div>

          {/* Illustration Section */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative w-full aspect-square max-w-[600px] mx-auto">
              {!imageError ? (
                heroImages.map((src, index) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`Digital Transformation Illustration ${index + 1}`}
                    width={600}
                    height={600}
                    className={`absolute top-0 left-0 object-contain transition-all duration-1000 
                      ${currentImageIndex === index 
                        ? 'opacity-100 transform scale-100 rotate-0 translate-y-0' 
                        : 'opacity-0 transform scale-90 rotate-6 translate-y-8'
                      }
                      ${index === ((currentImageIndex + 1) % heroImages.length) 
                        ? 'z-10' 
                        : 'z-0'
                      }`}
                    priority={index === 0}
                    onError={() => setImageError(true)}
                  />
                ))
              ) : (
                // Fallback content if images fail to load
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <p>Digital Solutions</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {ripples.map(ripple => (
          <div
            key={ripple.id}
            className="absolute rounded-full ripple-gradient transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: `${ripple.size}px`,
              height: `${ripple.size}px`,
              opacity: ripple.alpha,
            }}
          />
        ))}
        <div 
          className="absolute w-20 h-20 rounded-full bg-white/5 blur-md transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100 ease-out"
          style={{
            left: mousePos.x,
            top: mousePos.y,
          }}
        />
      </div>
    </section>
  );
}