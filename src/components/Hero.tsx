'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    // Initialize AOS if it exists
    if (typeof window !== 'undefined' && (window as any).AOS) {
      (window as any).AOS.init({
        duration: 800,
        once: true
      });
    }
  }, []);

  return (
    <section className="hero relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-90"></div>
      <div className="container relative z-10">
        <div className="hero-wrapper grid lg:grid-cols-2 gap-8 items-center min-h-[calc(100vh-6rem)] py-20">
          <div className="hero-content text-white" data-aos="fade-right">
            <span className="hero-tag inline-block bg-white bg-opacity-10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
              Welcome to Mocky Digital
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Transform Your <span className="text-accent">Digital Presence</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              We create effective visual experiences that drive growth through strategic branding and innovative digital solutions.
            </p>
            <div className="hero-buttons flex flex-wrap gap-4">
              <Link href="/contact" 
                className="cta-button group flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg">
                Get Started
                <i className="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
              </Link>
              <a 
                href="https://www.facebook.com/mockydigital/" 
                className="secondary-button group flex items-center gap-2 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Our Work
                <i className="fas fa-external-link-alt transition-transform group-hover:translate-x-1"></i>
              </a>
            </div>
          </div>
          <div className="hero-image relative" data-aos="fade-left">
            <div className="floating-shapes absolute inset-0">
              <div className="shape shape-1"></div>
              <div className="shape shape-2"></div>
              <div className="shape shape-3"></div>
            </div>
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              <Image
                src="/assets/images/digital-transformation-01.svg"
                alt="Digital Transformation Illustration"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 