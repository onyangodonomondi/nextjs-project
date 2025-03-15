'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { useVirtualizer } from '@tanstack/react-virtual';
import dynamic from 'next/dynamic';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  imageUrl?: string;
  title?: string;
}

interface LogoType {
  title: string;
  description: string;
  examples: string;
  image: string;
}

interface Props {
  logos: ImageItem[];
}

const logoTypes: LogoType[] = [
  {
    title: 'Wordmark Logos',
    description: 'Text-based logos that focus on your company name',
    examples: 'Like Coca-Cola, Google, or Disney',
    image: '/images/portfolio/logo-types/wordmark.png'
  },
  {
    title: 'Lettermark Logos',
    description: 'Initials or acronyms of your company name',
    examples: 'Like IBM, CNN, or HP',
    image: '/images/portfolio/logo-types/lettermark.png'
  },
  {
    title: 'Symbol Logos',
    description: 'Iconic designs that represent your brand',
    examples: 'Like Apple\'s apple or Twitter\'s bird',
    image: '/images/portfolio/logo-types/symbol.png'
  },
  {
    title: 'Combination Marks',
    description: 'Text and symbols combined into one logo',
    examples: 'Like Burger King or Adidas',
    image: '/images/portfolio/logo-types/combination.png'
  },
  {
    title: 'Emblem Logos',
    description: 'Text inside a symbol or icon',
    examples: 'Like Starbucks or Harvard University',
    image: '/images/portfolio/logo-types/emblem.png'
  },
  {
    title: 'Dynamic Logos',
    description: 'Logos that can change while keeping their basic identity',
    examples: 'Like Google Doodles',
    image: '/images/portfolio/logo-types/dynamic.png'
  }
];

const updateLogoPath = (path: string | undefined): string => {
  if (!path) return '/images/portfolio/logos/placeholder-logo.jpg';
  
  if (path.includes('/portfolio/logos/')) return path;
  
  if (path.includes('/logos/')) {
    return path.replace('/logos/', '/portfolio/logos/');
  }
  
  if (!path.startsWith('/')) {
    return `/images/portfolio/logos/${path}`;
  }
  
  return `/images/portfolio/logos/${path.split('/').pop()}`;
};

// Dynamically import the modal component
const LogoModal = dynamic(() => import('@/components/LogoModal'), {
  loading: () => <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
  </div>,
  ssr: false // Modal doesn't need server rendering
});

export default function LogosGallery({ logos }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    logoType: '',
    description: '',
    color: '',
    reference: ''
  });

  // Initialize AOS only on the client side to prevent hydration errors
  useEffect(() => {
    // Only import and initialize AOS on the client side
    if (typeof window !== 'undefined') {
      // Check if AOS is being used
      const AOS = (window as any).AOS;
      if (AOS) {
        AOS.init({
          once: true,
          disable: 'phone',
          duration: 700,
          easing: 'ease-out-cubic',
        });
      }
    }
  }, []);

  // Add better logging to see what's coming from the API
  useEffect(() => {
    console.log("Logos data received:", logos);
  }, [logos]);

  // Create a stable state for the logo data with proper typing
  const [stableLogos, setStableLogos] = useState<ImageItem[]>([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);
  // Add loading state for pagination to prevent flickering
  const [isChangingPage, setIsChangingPage] = useState(false);

  // Stabilize the logos data to prevent flickering
  useEffect(() => {
    if (logos && logos.length > 0) {
      console.log("Setting stable logos:", logos.length);
      setStableLogos(logos);
      // Set a timeout to ensure the UI has time to stabilize before rendering images
      setTimeout(() => setIsImagesLoaded(true), 100);
    } else if (stableLogos.length === 0) {
      // If we don't have logos but also don't have stable logos yet,
      // set some placeholder logos
      console.log("Using placeholder logos");
      setStableLogos([
        {
          id: 1,
          title: "Logo Example 1",
          src: "/images/portfolio/logo-types/wordmark.png",
          alt: "Logo Example 1",
        },
        {
          id: 2,
          title: "Logo Example 2",
          src: "/images/portfolio/logo-types/lettermark.png",
          alt: "Logo Example 2",
        },
        {
          id: 3,
          title: "Logo Example 3",
          src: "/images/portfolio/logo-types/symbol.png",
          alt: "Logo Example 3",
        },
        {
          id: 4,
          title: "Logo Example 4",
          src: "/images/portfolio/logo-types/combination.png",
          alt: "Logo Example 4",
        },
      ]);
      // Set a timeout to ensure the UI has time to stabilize before rendering images
      setTimeout(() => setIsImagesLoaded(true), 100);
    }
  }, [logos]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission
    // For now, we'll redirect to WhatsApp with the information
    const message = encodeURIComponent(
      `Hi Mocky Digital,\n\nI'm interested in a logo design:\n` +
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `Logo Type: ${formData.logoType}\n` +
      `Description: ${formData.description}\n` +
      `Preferred Colors: ${formData.color}\n` +
      `Reference Examples: ${formData.reference}`
    );
    window.open(`https://wa.me/254741590670?text=${message}`, '_blank');
  };

  // 1. Add pagination to avoid loading all 54 images at once
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  const totalPages = Math.ceil((stableLogos?.length || 0) / imagesPerPage);

  // Improved page changing function with loading state
  const changePage = useCallback((newPage: number) => {
    if (newPage === currentPage) return;
    setIsChangingPage(true);
    setIsImagesLoaded(false);
    
    // Use setTimeout to ensure state updates don't cause layout thrashing
    setTimeout(() => {
      setCurrentPage(newPage);
      // Give time for the new page to render before showing images
      setTimeout(() => {
        setIsImagesLoaded(true);
        setIsChangingPage(false);
      }, 100);
    }, 10);
  }, [currentPage]);

  // Get current logos for pagination
  const currentLogos = useMemo(() => {
    return stableLogos.slice(
      (currentPage - 1) * imagesPerPage,
      currentPage * imagesPerPage
    );
  }, [stableLogos, currentPage, imagesPerPage]);

  // Create a reference to the parent container
  const parentRef = useRef(null);

  // Calculate items per row based on screen size
  const getItemsPerRow = useCallback(() => {
    if (typeof window === 'undefined') return 4; // Default for SSR
    
    const width = window.innerWidth;
    if (width < 640) return 2; // Mobile: 2 items per row
    if (width < 1024) return 3; // Tablet: 3 items per row
    if (width < 1280) return 4; // Small desktop: 4 items per row
    return 5; // Large desktop: 5 items per row
  }, []);

  // Calculate the number of items per row
  const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow());

  // Update items per row on window resize
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setItemsPerRow(getItemsPerRow());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getItemsPerRow]);

  // Calculate rows for virtualization
  const rows = useMemo(() => {
    if (!stableLogos || !Array.isArray(stableLogos)) {
      console.warn('stableLogos is not an array:', stableLogos);
      return [];
    }
    
    const rowCount = Math.ceil(stableLogos.length / itemsPerRow);
    const rowData = Array(rowCount).fill(0).map((_, rowIndex) => {
      const startIndex = rowIndex * itemsPerRow;
      const endIndex = Math.min(startIndex + itemsPerRow, stableLogos.length);
      return stableLogos.slice(startIndex, endIndex);
    });
    return rowData;
  }, [stableLogos, itemsPerRow]);

  // Add memoized size measurement to prevent recalculations causing flicker
  const estimateSize = useCallback(() => 240, []);

  // Set up the virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 5, // Increase overscan to reduce flickering on scroll
    scrollToFn: (offset, options = {}) => {
      // Add a safer scrollTo function with guards
      try {
        if (parentRef.current) {
          (parentRef.current as Element).scrollTo({
            top: offset,
            behavior: options.behavior || 'auto'
          });
        }
      } catch (e) {
        console.error('Error in scrollToFn:', e);
      }
    }
  });

  // Handle image click with smooth transitions
  const handleImageClick = useCallback((imageSrc: string | undefined | null) => {
    if (!imageSrc) return;
    
    // Slightly delay modal opening to avoid layout shifts
    setTimeout(() => {
      setSelectedImage(imageSrc);
    }, 50);
  }, []);

  return (
    <main className="pt-24 bg-gradient-to-b from-gray-50 to-white">
      <PageHero 
        title="Logo Design Portfolio"
        description="Explore our collection of unique and memorable logo designs."
      />

      {/* Logo Types Section - Redesigned as a list without images */}
      <section className="py-12 border-b border-gray-100">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Logo Types We Specialize In</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from a variety of logo styles to perfectly represent your brand's identity
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {logoTypes.map((type) => (
              <div 
                key={type.title}
                className="px-4 py-2 rounded-full bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-100 cursor-pointer"
                onClick={() => setFormData({...formData, logoType: type.title})}
              >
                <span className="font-medium text-primary">{type.title}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {logoTypes.map((type) => (
              <div key={type.title} className="bg-white p-6 rounded-lg shadow-sm hover:shadow transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{type.title}</h3>
                <p className="text-gray-600 mb-2">{type.description}</p>
                <p className="text-sm text-gray-500 italic">{type.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section - Improved UI */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-primary-light text-primary text-sm font-medium rounded-full mb-3">SHOWCASE</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Logo Designs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our collection of professionally crafted logos that have helped businesses establish strong brand identities
            </p>
          </div>

          <div 
            ref={parentRef} 
            className="h-[800px] overflow-auto rounded-xl bg-gray-50 p-4"
            style={{ 
              contain: 'strict',
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E0 #F7FAFC',
              willChange: 'transform', // Hint to browser to optimize rendering
              backfaceVisibility: 'hidden', // Prevent flickering in some browsers
            }}
          >
            <div
              style={{
                height: `${rowVirtualizer.getTotalSize()}px`,
                width: '100%',
                position: 'relative',
                willChange: 'contents', // Optimize rendering of dynamic content
                contain: 'size layout', // Improve rendering performance
              }}
            >
              {rowVirtualizer?.getVirtualItems()?.map(virtualRow => (
                <div
                  key={virtualRow.index}
                  className="absolute top-0 left-0 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6"
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`,
                    willChange: 'transform', // Optimize transforms
                    containIntrinsicSize: `auto ${virtualRow.size}px`, // Stable size hint for browser
                    contain: 'layout', // Improve rendering performance
                  }}
                >
                  {rows[virtualRow.index]?.map((item, colIndex) => (
                    <div
                      key={`${virtualRow.index}-${colIndex}`}
                      className="group relative aspect-square bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                      onClick={() => handleImageClick(item.src || item.imageUrl || null)}
                      style={{ minHeight: '200px' }} // Add fixed minimum height to prevent layout shifts
                    >
                      {(item.src || item.imageUrl) ? (
                        <>
                          {isImagesLoaded && (
                            <Image
                              src={updateLogoPath(item.src || item.imageUrl)}
                              alt={item.alt || item.title || 'Logo'}
                              fill
                              loading="lazy"
                              placeholder="blur"
                              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI6dtiLOgAAAABJRU5ErkJggg=="
                              className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                              quality={75}
                              onError={(e) => {
                                console.log("Image error:", item.src || item.imageUrl);
                                const target = e.target as HTMLImageElement;
                                target.src = '/images/portfolio/logo-types/wordmark.png';
                              }}
                            />
                          )}
                          {!isImagesLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 animate-pulse">
                              <div className="w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-3 text-white">
                              <p className="font-medium text-sm truncate">{item.title || item.alt || 'View Logo'}</p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls - Improved UI */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button 
                onClick={() => changePage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1 || isChangingPage}
                className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Show first page, last page, current page, and pages around current
                  let pageToShow;
                  if (totalPages <= 5) {
                    pageToShow = i + 1;
                  } else if (currentPage <= 3) {
                    pageToShow = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageToShow = totalPages - 4 + i;
                  } else {
                    pageToShow = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageToShow}
                      onClick={() => changePage(pageToShow)}
                      disabled={isChangingPage}
                      className={`w-10 h-10 rounded-md flex items-center justify-center ${
                        currentPage === pageToShow 
                          ? 'bg-primary text-white shadow-md' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      {pageToShow}
                    </button>
                  );
                })}
              </div>
              
              <button 
                onClick={() => changePage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || isChangingPage}
                className="px-4 py-2 rounded-md bg-white border border-gray-200 text-gray-600 disabled:opacity-50 hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section - New */}
      <section className="py-16 bg-gradient-to-r from-primary-dark to-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to create your brand identity?</h2>
            <p className="text-xl mb-8 opacity-90">
              Partner with us to design a logo that captures your brand's essence and resonates with your audience.
            </p>
            <button
              onClick={() => setShowRequestForm(true)}
              className="px-8 py-4 rounded-full bg-white text-primary font-medium hover:bg-gray-100 transition-colors shadow-lg"
            >
              Request Your Custom Logo
            </button>
          </div>
        </div>
      </section>

      {/* Request Form Button - Redesigned */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={() => setShowRequestForm(true)}
          className="bg-primary text-white px-6 py-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center gap-2 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Request Logo Design
        </button>
      </div>

      {/* Request Form Modal - Improved UI */}
      {showRequestForm && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setShowRequestForm(false)}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Request Logo Design</h3>
              <button 
                onClick={() => setShowRequestForm(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Company Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  value={formData.company}
                  onChange={e => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Preferred Logo Type</label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors appearance-none bg-white"
                  value={formData.logoType}
                  onChange={e => setFormData({...formData, logoType: e.target.value})}
                  required
                >
                  <option value="">Select a logo type</option>
                  {logoTypes.map(type => (
                    <option key={type.title} value={type.title}>{type.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Description of Your Business</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  rows={4}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Preferred Colors</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="e.g., Blue and Gold, Modern and Professional colors"
                  value={formData.color}
                  onChange={e => setFormData({...formData, color: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Reference Examples (Optional)</label>
                <textarea
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  rows={2}
                  placeholder="Links or descriptions of logos you like"
                  value={formData.reference}
                  onChange={e => setFormData({...formData, reference: e.target.value})}
                ></textarea>
              </div>
              <div className="flex justify-end gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => setShowRequestForm(false)}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <LogoModal 
          src={updateLogoPath(selectedImage)} 
          onClose={() => setSelectedImage(null)} 
        />
      )}
    </main>
  );
} 