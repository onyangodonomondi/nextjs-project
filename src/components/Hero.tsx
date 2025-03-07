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
    <section id="hero-section" className="relative min-h-screen overflow-hidden pt-32 md:pt-20">
      {/* Animated Gradient Mesh Background */}
      <div className="absolute inset-0 bg-gradient-mesh">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary-dark/80 to-secondary/90" />
      </div>

      {/* Animated Lines */}
      <div className="absolute inset-0">
        <div className="lines">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="line hidden md:block" />
          ))}
          {[...Array(3)].map((_, i) => (
            <div key={i + 3} className="line hidden lg:block" />
          ))}
        </div>
      </div>

      {/* Interactive Ripple Effect */}
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

      <div className="container relative z-10 mx-auto px-4 min-h-[calc(100vh-80px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-20 md:py-0">
          {/* Text Content */}
          <div className={`text-white space-y-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium">
              Welcome to Mocky Digital
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-orange-500 animate-gradient">Transform</span> Your<br />
              <span className="text-blue-400 inline-block min-h-[80px]">
                <TypeAnimation
                  sequence={[
                    'Digital Presence',
                    2000,
                    'Brand Identity',
                    2000,
                    'Online Success',
                    2000,
                    'Creative Vision',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="inline-block"
                />
              </span>
            </h1>
            
            <div className="max-w-xl">
              <TypeAnimation
                sequence={[
                  500,
                  'We create effective visual experiences that drive growth through strategic branding and innovative digital solutions.',
                ]}
                wrapper="p"
                speed={50}
                className="text-lg md:text-xl text-gray-200"
                cursor={false}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <Link 
                href="/contact"
                className="inline-flex items-center px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full transition-all transform hover:scale-105 hover:shadow-lg"
              >
                Get Started
                <svg className="w-5 h-5 ml-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              <Link 
                href="https://www.facebook.com/mockydigital"
                className="inline-flex items-center px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white rounded-full transition-all transform hover:scale-105"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Our Work
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </Link>
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
    </section>
  );
}