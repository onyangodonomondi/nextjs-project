'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import GraphicsRequestForm from './GraphicsRequestForm';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
}

interface Categories {
  branding: ImageItem[];
  packaging: ImageItem[];
  portfolio: {
    cards: ImageItem[];
    fliers: ImageItem[];
    letterheads: ImageItem[];
  };
}

interface Props {
  categories: Categories;
}

export default function GraphicsGallery({ categories }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const categoryTitles = {
    all: 'All Work',
    branding: 'Merchandise',
    packaging: 'Identity Mockups',
    cards: 'Business Cards',
    fliers: 'Marketing Fliers',
    letterheads: 'Corporate Letterheads'
  };

  const renderSection = (title: string, description: string, items: ImageItem[], aspectRatio: string = 'aspect-square') => (
    <div className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 text-orange-500">{title}</h2>
        <p className="text-xl text-gray-600">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`group relative ${aspectRatio} bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer`}
            data-aos="fade-up"
            onClick={() => setSelectedImage(item.src)}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              loading={index < 6 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Graphics Design Portfolio"
          description="Explore our creative designs and find the perfect style for your brand"
        />

        {/* Request Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-primary text-white px-6 py-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <i className="fas fa-pencil-alt"></i>
            Request Graphics Design
          </button>
        </div>

        {/* Graphics Request Form */}
        <GraphicsRequestForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
        />

        {/* Category Navigation - Desktop */}
        <div className="hidden md:block">
          <section className="py-8 bg-gray-50 sticky top-24 z-30 border-b">
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
                {Object.entries(categoryTitles).slice(1).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => setActiveCategory(key)}
                    className={`px-6 py-3 rounded-full font-medium transition-colors ${
                      activeCategory === key
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {title}
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Category Dropdown - Mobile */}
        <div className="md:hidden sticky top-24 z-30 bg-white border-b">
          <div className="container py-4">
            <div className="relative">
              <button
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="w-full px-6 py-3 bg-white border rounded-lg shadow-sm flex items-center justify-between"
              >
                <span>{categoryTitles[activeCategory]}</span>
                <i className={`fas fa-chevron-down transition-transform ${showMobileMenu ? 'rotate-180' : ''}`}></i>
              </button>

              {showMobileMenu && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden">
                  {Object.entries(categoryTitles).map(([key, title]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setActiveCategory(key);
                        setShowMobileMenu(false);
                      }}
                      className={`w-full px-6 py-3 text-left transition-colors ${
                        activeCategory === key
                          ? 'bg-primary text-white'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Portfolio Sections */}
        <section className="py-20">
          <div className="container">
            {/* Branding Section */}
            {(activeCategory === 'all' || activeCategory === 'branding') && 
              renderSection(
                'Merchandise',
                'Complete branding solutions for businesses',
                categories.branding
              )}

            {/* Packaging Section */}
            {(activeCategory === 'all' || activeCategory === 'packaging') && 
              renderSection(
                'Identity Mockups',
                'Creative packaging designs that stand out',
                categories.packaging
              )}

            {/* Business Cards Section */}
            {(activeCategory === 'all' || activeCategory === 'cards') && 
              renderSection(
                'Business Cards',
                'Professional business card designs',
                categories.portfolio.cards,
                'aspect-[1.6/1]'
              )}

            {/* Fliers Section */}
            {(activeCategory === 'all' || activeCategory === 'fliers') && 
              renderSection(
                'Marketing Fliers',
                'Eye-catching flier designs',
                categories.portfolio.fliers,
                'aspect-[3/4]'
              )}

            {/* Letterheads Section */}
            {(activeCategory === 'all' || activeCategory === 'letterheads') && 
              renderSection(
                'Corporate Letterheads',
                'Professional letterhead designs that enhance your business communication',
                categories.portfolio.letterheads,
                'aspect-[1/1.4]'
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
                quality={90}
                priority
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
      </main>
    </>
  );
} 