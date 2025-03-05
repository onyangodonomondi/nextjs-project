'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';

// Define categories and their images
const categories = {
  branding: Array.from({ length: 16 }, (_, i) => ({
    id: i + 1,
    src: `/images/branding/${i + 1}.jpg`,
    alt: `Branding Design ${i + 1}`
  })),
  packaging: Array.from({ length: 29 }, (_, i) => ({
    id: i + 1,
    src: `/images/packaging/${i + 1}.jpg`,
    alt: `Packaging Design ${i + 1}`
  })),
  portfolio: {
    cards: Array.from({ length: 21 }, (_, i) => ({
      id: i + 1,
      src: `/images/portfolio/cards/${i + 1}.jpg`,
      alt: `Business Card Design ${i + 1}`
    })),
    fliers: Array.from({ length: 27 }, (_, i) => ({
      id: i + 1,
      src: `/images/portfolio/fliers/${i + 1}.jpg`,
      alt: `Flier Design ${i + 1}`
    })),
    letterheads: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      src: `/images/portfolio/letterheads/${i + 1}.jpg`,
      alt: `Letterhead Design ${i + 1}`
    }))
  }
};

const categoryTitles: { [key: string]: string } = {
  branding: 'Merchandise',
  packaging: 'Identity Mockups',
  cards: 'Business Cards',
  fliers: 'Marketing Fliers',
  letterheads: 'Corporate Letterheads'
};

export default function Graphics() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Graphics Design Portfolio"
          description="Explore our diverse collection of professional design work across various categories."
        />

        {/* Category Navigation */}
        <section className="py-8 bg-gray-50 sticky top-24 z-30 border-b category-navigation">
          <div className="container">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Work
              </button>
              {Object.keys(categoryTitles).map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {categoryTitles[category]}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Sections */}
        <section className="py-20">
          <div className="container">
            {/* Branding Section */}
            {(activeCategory === 'all' || activeCategory === 'branding') && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-orange-500">Merchandise</h2>
                  <p className="text-xl text-gray-600">Complete branding solutions for businesses</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.branding.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-[4/3] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                      data-aos="fade-up"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Packaging Section */}
            {(activeCategory === 'all' || activeCategory === 'packaging') && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-orange-500">Identity Mockups</h2>
                  <p className="text-xl text-gray-600">Creative packaging designs that stand out</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.packaging.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                      data-aos="fade-up"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Business Cards Section */}
            {(activeCategory === 'all' || activeCategory === 'cards') && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-orange-500">Business Cards</h2>
                  <p className="text-xl text-gray-600">Professional business card designs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.portfolio.cards.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-[1.6/1] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                      data-aos="fade-up"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Fliers Section */}
            {(activeCategory === 'all' || activeCategory === 'fliers') && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-orange-500">Marketing Fliers</h2>
                  <p className="text-xl text-gray-600">Eye-catching flier designs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.portfolio.fliers.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-[3/4] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                      data-aos="fade-up"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Letterheads Section */}
            {(activeCategory === 'all' || activeCategory === 'letterheads') && (
              <div className="mb-20">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4 text-orange-500">Corporate Letterheads</h2>
                  <p className="text-xl text-gray-600">Professional letterhead designs</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categories.portfolio.letterheads.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-[1/1.4] bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                      data-aos="fade-up"
                      onClick={() => setSelectedImage(item.src)}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative w-full max-w-5xl">
              <Image
                src={selectedImage}
                alt="Enlarged design"
                width={1920}
                height={1080}
                className="object-contain w-full h-auto"
              />
              <button
                className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(null);
                }}
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="bg-primary text-white py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Start Your Design Project?</h2>
              <p className="text-xl text-gray-200 mb-8">
                Let's create stunning designs that elevate your brand and captivate your audience.
              </p>
              <a
                href="https://wa.me/254741590670?text=Hi%20Mocky%20Digital,%20I'm%20interested%20in%20Graphics%20Design%20services."
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-full transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start Your Design Project
                <i className="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
} 