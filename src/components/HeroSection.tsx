'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const heroSlides = [
  {
    image: '/images/hero/1.svg',
    alt: 'Digital Marketing Solutions'
  },
  {
    image: '/images/hero/2.svg',
    alt: 'Web Development'
  },
  {
    image: '/images/hero/3.svg',
    alt: 'Graphic Design'
  },
  {
    image: '/images/hero/4.svg',
    alt: 'Brand Strategy'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero-section relative bg-gradient-to-br from-white to-gray-50 pt-32 pb-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-primary">Digital Solutions</span> for Your Business Growth
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Transform your digital presence with our comprehensive design and development services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="#contact"
                className="btn-primary"
              >
                Get Started
                <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <a
                href="#services"
                className="btn-secondary"
              >
                Our Services
                <i className="fas fa-list ml-2"></i>
              </a>
            </div>
          </div>

          {/* Image Slider */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.image}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  currentSlide === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  priority={index === 0}
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 