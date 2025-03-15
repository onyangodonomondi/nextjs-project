import { getImagesFromServer } from '@/utils/serverUtils';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/LoadingSpinner';

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
      {/* Hero Section with Blue Background from Footer */}
      <section className="bg-[#00A3FF] text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl text-white mb-8">
              Explore our creative work showcasing design excellence and innovative solutions
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="#logos" 
                className="px-6 py-3 bg-white text-[#00A3FF] hover:bg-blue-50 rounded-full font-medium transition-colors"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
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

      {/* Logo Design Section */}
      <section id="logos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Logo Design</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional logos that establish brand identity and make lasting impressions
          </p>
          
          <Suspense fallback={<div className="text-center py-8"><LoadingSpinner /></div>}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
              {shuffledLogos.slice(0, 6).map((logo, index) => (
                <div 
                  key={`logo-${index}`}
                  className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all aspect-square"
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt || 'Logo Design'}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 16vw"
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    loading={index < 2 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/logos"
                className="px-6 py-3 bg-[#00A3FF] text-white rounded-full inline-block hover:bg-[#00A3FF]/90 transition-colors"
              >
                Load More Logos
              </Link>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Fliers Section */}
      <section id="fliers" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Fliers & Marketing Materials</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Eye-catching fliers and marketing materials designed to capture attention and drive engagement
          </p>
          
          <Suspense fallback={<div className="text-center py-8"><LoadingSpinner /></div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shuffledFliers.slice(0, 6).map((flier, index) => (
                <div 
                  key={`flier-${index}`}
                  className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-[3/4]"
                >
                  <Image
                    src={flier.src}
                    alt={flier.alt || 'Marketing Material'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">{flier.alt}</h3>
                    <p className="text-white/80 mt-2">Marketing Material</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/fliers"
                className="px-6 py-3 bg-[#00A3FF] text-white rounded-full inline-block hover:bg-[#00A3FF]/90 transition-colors"
              >
                Load More Fliers
              </Link>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Cards Section */}
      <section id="cards" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Business Cards</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional business card designs that make a lasting first impression
          </p>
          
          <Suspense fallback={<div className="text-center py-8"><LoadingSpinner /></div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shuffledCards.slice(0, 6).map((card, index) => (
                <div 
                  key={`card-${index}`}
                  className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-[16/9]"
                >
                  <Image
                    src={card.src}
                    alt={card.alt || 'Business Card'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">{card.alt}</h3>
                    <p className="text-white/80 mt-2">Business Card</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/cards"
                className="px-6 py-3 bg-[#00A3FF] text-white rounded-full inline-block hover:bg-[#00A3FF]/90 transition-colors"
              >
                Load More Cards
              </Link>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Letterheads Section */}
      <section id="letterheads" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Letterheads</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional letterhead designs for your business correspondence
          </p>
          
          <Suspense fallback={<div className="text-center py-8"><LoadingSpinner /></div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shuffledLetterheads.slice(0, 6).map((letterhead, index) => (
                <div 
                  key={`letterhead-${index}`}
                  className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-[3/4]"
                >
                  <Image
                    src={letterhead.src}
                    alt={letterhead.alt || 'Letterhead Design'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">{letterhead.alt}</h3>
                    <p className="text-white/80 mt-2">Letterhead</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/letterheads"
                className="px-6 py-3 bg-[#00A3FF] text-white rounded-full inline-block hover:bg-[#00A3FF]/90 transition-colors"
              >
                Load More Letterheads
              </Link>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Profiles Section */}
      <section id="profiles" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Company Profiles</h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Professional company profile designs that showcase your business
          </p>
          
          <Suspense fallback={<div className="text-center py-8"><LoadingSpinner /></div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shuffledProfiles.slice(0, 6).map((profile, index) => (
                <div 
                  key={`profile-${index}`}
                  className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all aspect-[3/4]"
                >
                  <Image
                    src={profile.src}
                    alt={profile.alt || 'Company Profile'}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-medium">{profile.alt}</h3>
                    <p className="text-white/80 mt-2">Company Profile</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <Link 
                href="/profiles"
                className="px-6 py-3 bg-[#00A3FF] text-white rounded-full inline-block hover:bg-[#00A3FF]/90 transition-colors"
              >
                Load More Profiles
              </Link>
            </div>
          </Suspense>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-[#00A3FF] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-white/90 mb-10">
              Let's create something amazing together that elevates your brand and drives results
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-[#00A3FF] hover:bg-blue-50 font-medium rounded-full transition-colors"
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