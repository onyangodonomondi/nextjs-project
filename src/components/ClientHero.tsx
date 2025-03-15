'use client';

import React from 'react';
import Image from 'next/image';

export default function ClientHero() {
  // Precomputed link
  const whatsappLink = "https://wa.me/254741590670?text=Hello%20Mocky%20Graphics!";

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A1929]">
      <div className="container relative mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
              <span className="text-sm font-medium text-white">Welcome to Mocky Graphics</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white">
              <div>Transform Your</div>
              <div className="text-blue-200">Digital Presence</div>
            </h1>
            
            <p className="max-w-xl text-lg text-white/90">
              We create effective visual experiences that drive growth
              through strategic branding and innovative digital solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
                className="bg-white text-[#0A1929] px-6 py-3 rounded-full font-medium">
                Get Started
              </a>
              <a href="#" className="border border-white/20 text-white px-6 py-3 rounded-full font-medium">
                View Our Work
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[300px] md:h-[400px] mx-auto w-full max-w-lg">
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <Image 
                src="/images/logo.png" 
                alt="Mocky Digital"
                width={300}
                height={300}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 