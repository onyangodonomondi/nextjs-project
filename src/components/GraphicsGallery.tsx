'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';

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
    flyers: ImageItem[];
    brochures: ImageItem[];
  };
}

interface Props {
  categories: Categories;
}

// Keep only one type definition
type CategoryTitles = {
  [key: string]: string;  // Allow string indexing
  all: string;
  branding: string;
  packaging: string;
  cards: string;
  fliers: string;
  letterheads: string;
}

export default function GraphicsGallery({ categories }: Props) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<keyof CategoryTitles>('all');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // The categoryTitles object remains the same
  const categoryTitles: CategoryTitles = {
    all: 'All Graphics',
    branding: 'Branding',
    packaging: 'Packaging',
    cards: 'Cards',
    fliers: 'Fliers',
    letterheads: 'Letterheads'
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
            onClick={() => setSelectedImage(item)}
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
    <div className="pt-20">
      <PageHero 
        title="Graphics Gallery"
        description="Explore our creative designs and visual solutions"
      />
      
      {/* Category Navigation - Desktop */}
      <div className="hidden md:block">
        <section className="py-8 bg-gray-50 sticky top-20 z-30 border-b">
          <div className="container">
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Work
              </button>
              {Object.entries(categoryTitles).slice(1).map(([key, title]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(key as keyof CategoryTitles)}
                  className={`px-6 py-3 rounded-full font-medium transition-colors ${
                    selectedCategory === key as keyof CategoryTitles
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
      <div className="md:hidden sticky top-20 z-30 bg-white border-b">
        <div className="container py-4">
          <div className="relative">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="w-full px-6 py-3 bg-white border rounded-lg shadow-sm flex items-center justify-between"
            >
              <span>{categoryTitles[selectedCategory]}</span>
              <i className={`fas fa-chevron-down transition-transform ${showMobileMenu ? 'rotate-180' : ''}`}></i>
            </button>

            {showMobileMenu && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg shadow-lg overflow-hidden">
                {Object.entries(categoryTitles).map(([key, title]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedCategory(key as keyof CategoryTitles);
                      setShowMobileMenu(false);
                    }}
                    className={`w-full px-6 py-3 text-left transition-colors ${
                      selectedCategory === key as keyof CategoryTitles
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
          {(selectedCategory === 'all' || selectedCategory === 'branding') && 
            renderSection(
              'Merchandise',
              'Complete branding solutions for businesses',
              categories.branding
            )}

          {/* Packaging Section */}
          {(selectedCategory === 'all' || selectedCategory === 'packaging') && 
            renderSection(
              'Identity Mockups',
              'Creative packaging designs that stand out',
              categories.packaging
            )}

          {/* Business Cards Section */}
          {(selectedCategory === 'all' || selectedCategory === 'cards') && 
            renderSection(
              'Business Cards',
              'Professional business card designs',
              categories.portfolio.cards,
              'aspect-[1.6/1]'
            )}

          {/* Fliers Section */}
          {(selectedCategory === 'all' || selectedCategory === 'fliers') && 
            renderSection(
              'Marketing Fliers',
              'Eye-catching flier designs',
              categories.portfolio.flyers,
              'aspect-[3/4]'
            )}

          {/* Letterheads Section */}
          {(selectedCategory === 'all' || selectedCategory === 'letterheads') && 
            renderSection(
              'Corporate Letterheads',
              'Professional letterhead designs that enhance your business communication',
              categories.portfolio.brochures,
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
              src={selectedImage.src}
              alt={selectedImage.alt}
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
    </div>
  );
} 