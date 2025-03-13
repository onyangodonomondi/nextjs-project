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
      <div className="container mx-auto px-4 pt-16">
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

            <div className="flex flex-wrap gap-4 pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-[#FF5400] text-white rounded-full hover:bg-[#FF5400]/90 transition-colors text-lg font-medium"
              >
                Get Started
                <i className="fas fa-arrow-right ml-2"></i>
              </Link>
              
              <Link
                href="/portfolio"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors text-lg font-medium backdrop-blur-sm"
              >
                View Our Work
                <i className="fas fa-external-link-alt ml-2"></i>
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