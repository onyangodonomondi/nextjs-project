import { getImagesFromServer } from '@/utils/serverUtils';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import ClientGallerySection from '@/components/ClientGallerySection';

// Shuffles an array using Fisher-Yates algorithm for randomization
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// This needs to be a Server Component to use async
export default async function PortfolioPage() {
  // Get initial data for server-side rendering, with parallel requests for better performance
  const [cards, fliers, letterheads, logos, profiles] = await Promise.all([
    getImagesFromServer('/images/portfolio/cards'),
    getImagesFromServer('/images/portfolio/fliers'),
    getImagesFromServer('/images/portfolio/letterheads'),
    getImagesFromServer('/images/logos'),
    getImagesFromServer('/images/portfolio/profiles')
  ]);

  // Prepare the data with category labels
  const cardsWithCategory = cards.map(item => ({ ...item, category: 'card' }));
  const fliersWithCategory = fliers.map(item => ({ ...item, category: 'flier' }));
  const letterheadsWithCategory = letterheads.map(item => ({ ...item, category: 'letterhead' }));
  const logosWithCategory = logos.map(item => ({ ...item, category: 'logo' }));
  const profilesWithCategory = profiles.map(item => ({ ...item, category: 'profile' }));

  // Shuffle each array to randomize display
  const shuffledCards = shuffleArray(cardsWithCategory);
  const shuffledFliers = shuffleArray(fliersWithCategory);
  const shuffledLetterheads = shuffleArray(letterheadsWithCategory);
  const shuffledLogos = shuffleArray(logosWithCategory);
  const shuffledProfiles = shuffleArray(profilesWithCategory);

  // Select a few random items for the featured section
  const featuredItems = shuffleArray([
    ...shuffledCards.slice(0, 2),
    ...shuffledFliers.slice(0, 2),
    ...shuffledLetterheads.slice(0, 2),
    ...shuffledLogos.slice(0, 2),
    ...shuffledProfiles.slice(0, 2)
  ]).slice(0, 8);

  return (
    <main className="pt-16 md:pt-20 bg-white">
      {/* Hero Section with Navy Blue Background from Footer */}
      <section className="bg-[#0A1929] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-white mb-8">
              Explore our creative work showcasing design excellence and innovative solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="#logos" 
                className="px-6 py-3 bg-white text-[#0A1929] hover:bg-blue-50 rounded-full font-medium transition-colors"
              >
                Logos
              </Link>
              <Link 
                href="#fliers" 
                className="px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors"
              >
                Fliers
              </Link>
              <Link 
                href="#cards" 
                className="px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors"
              >
                Cards
              </Link>
              <Link 
                href="#letterheads" 
                className="px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors"
              >
                Letterheads
              </Link>
              <Link 
                href="#profiles" 
                className="px-6 py-3 bg-transparent border border-white hover:bg-white/10 text-white rounded-full font-medium transition-colors"
              >
                Profiles
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Portfolio Section - Visually Appealing Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Featured Projects</h2>
          
          <Suspense fallback={<div className="py-20 text-center"><LoadingSpinner size="lg" /></div>}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((image, index) => (
                <div 
                  key={`featured-${index}`}
                  className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  {/* Static placeholder that's immediately visible */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl"></div>
                  
                  {/* Image with priority for first 4 items to improve LCP */}
                  <Image
                    src={image.src}
                    alt={image.alt || 'Portfolio piece'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 25vw, 25vw"
                    className="object-cover transition-all group-hover:scale-105 duration-500"
                    loading={index < 4 ? "eager" : "lazy"}
                    quality={75}
                    fetchPriority={index < 2 ? "high" : "auto"}
                  />
                  
                  {/* Overlay with info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white text-lg font-medium">{image.alt}</h3>
                    <p className="text-white/80 text-sm capitalize">
                      {image.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </section>

      {/* Logo Design Section - Client Component for refresh functionality */}
      <section id="logos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Logo Design</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional logos that establish brand identity and make lasting impressions
          </p>
          
          <ClientGallerySection 
            items={shuffledLogos} 
            gridCols="grid-cols-2 md:grid-cols-4"
            aspectRatio="aspect-square"
            objectFit="object-cover"
            category="logos"
          />
        </div>
      </section>

      {/* Fliers Section - Client Component for refresh functionality */}
      <section id="fliers" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Fliers & Marketing Materials</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Eye-catching fliers and marketing materials designed to capture attention and drive engagement
          </p>
          
          <ClientGallerySection 
            items={shuffledFliers} 
            gridCols="grid-cols-2 md:grid-cols-4"
            aspectRatio="aspect-[3/4]"
            objectFit="object-cover"
            category="fliers"
          />
        </div>
      </section>

      {/* Cards Section - Client Component for refresh functionality */}
      <section id="cards" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Business Cards</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional business card designs that make a lasting first impression
          </p>
          
          <ClientGallerySection 
            items={shuffledCards} 
            gridCols="grid-cols-2 md:grid-cols-4"
            aspectRatio="aspect-[16/9]"
            objectFit="object-cover"
            category="cards"
          />
        </div>
      </section>

      {/* Letterheads Section - Client Component for refresh functionality */}
      <section id="letterheads" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Letterheads</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional letterhead designs for your business correspondence
          </p>
          
          <ClientGallerySection 
            items={shuffledLetterheads} 
            gridCols="grid-cols-2 md:grid-cols-4"
            aspectRatio="aspect-[3/4]"
            objectFit="object-cover"
            category="letterheads"
          />
        </div>
      </section>

      {/* Profiles Section - Client Component for refresh functionality */}
      <section id="profiles" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Company Profiles</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional company profile designs that showcase your business
          </p>
          
          <ClientGallerySection 
            items={shuffledProfiles} 
            gridCols="grid-cols-2 md:grid-cols-4"
            aspectRatio="aspect-[3/4]"
            objectFit="object-cover"
            category="profiles"
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#0A1929] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/90 mb-10">
              Let's create something amazing together that elevates your brand and drives results
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-[#0A1929] hover:bg-blue-50 font-medium rounded-full transition-colors"
              >
                Get in Touch
              </Link>
              <Link 
                href="/services" 
                className="px-8 py-4 bg-transparent border-2 border-white hover:bg-white/10 text-white font-medium rounded-full transition-colors"
              >
                View Services
              </Link>
            </div>
      </div>
    </div>
      </section>
    </main>
  );
}

export const metadata = {
  title: 'Portfolio | Mocky Digital Kenya',
  description: 'Browse our diverse portfolio of logos, fliers, business cards, letterheads, and company profiles.',
  keywords: 'logo design, fliers, business cards, letterheads, company profiles, graphic design, kenya, nairobi'
}; 