'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

// Generate array of logo images from 1 to 55
const logoImages = Array.from({ length: 55 }, (_, i) => ({
  id: i + 1,
  src: `/images/logos/${i + 1}.jpg`,
  alt: `Logo Design ${i + 1}`
}));

export default function Logos() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Logo Design Portfolio"
          description="A showcase of our creative and memorable logo designs for various brands and businesses."
        />

        <section className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Logo Designs</h2>
              <p className="text-xl text-gray-600">
                Browse through our collection of professional logo designs
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {logoImages.map((logo) => (
                <div
                  key={logo.id}
                  className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  data-aos="fade-up"
                  onClick={() => setSelectedImage(logo.src)}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for enlarged image view */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-4xl aspect-square">
              <Image
                src={selectedImage}
                alt="Enlarged logo"
                fill
                className="object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                onClick={() => setSelectedImage(null)}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        <section className="bg-primary text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need a Professional Logo?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Let's create a unique and memorable logo that perfectly represents your brand.
              </p>
              <a
                href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20Logo%20Design%20services."
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Your Logo Project
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 