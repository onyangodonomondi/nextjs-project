'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
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

  // Stabilize the logos data to prevent flickering
  useEffect(() => {
    if (logos && logos.length > 0) {
      console.log("Setting stable logos:", logos.length);
      setStableLogos(logos);
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

  // Add these optimizations to your LogosGallery component

  // 1. Add pagination to avoid loading all 54 images at once
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 12;
  const totalPages = Math.ceil((stableLogos?.length || 0) / imagesPerPage);

  // Get current logos for pagination
  const currentLogos = stableLogos.slice(
    (currentPage - 1) * imagesPerPage,
    currentPage * imagesPerPage
  );

  // Create a reference to the parent container
  const parentRef = useRef(null);

  // Calculate items per row based on screen size
  const getItemsPerRow = useCallback(() => {
    if (typeof window === 'undefined') return 4; // Default for SSR
    
    const width = window.innerWidth;
    if (width < 640) return 2; // Mobile: 2 items per row
    if (width < 1024) return 4; // Tablet: 4 items per row
    if (width < 1280) return 5; // Small desktop: 5 items per row
    return 6; // Large desktop: 6 items per row
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

  // Set up the virtualizer
  const rowVirtualizer = useVirtualizer({
    count: rows?.length || 0,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 240,
    overscan: 3,
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

  return (
    <>
      <Navbar />
      <main className="pt-24">
        <PageHero 
          title="Logo Design Portfolio"
          description="Explore our collection of unique and memorable logo designs."
        />

        {/* Logo Types Section */}
        <section className="py-16 bg-gray-50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-primary">Types of Logos We Create</h2>
              <p className="text-xl text-gray-600">
                Choose the perfect logo style for your brand
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {logoTypes.map((type) => (
                <div 
                  key={type.title}
                  className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full aspect-square mb-4 max-w-[200px] mx-auto">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 200px"
                    />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-primary">{type.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                  <p className="text-xs text-gray-500">{type.examples}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4 text-orange-500">Our Logo Designs</h2>
              <p className="text-xl text-gray-600">
                Browse through our collection of professional logo designs
              </p>
            </div>

            <div 
              ref={parentRef} 
              className="h-[800px] overflow-auto"
              style={{ 
                contain: 'strict',
              }}
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                {rowVirtualizer?.getVirtualItems()?.map(virtualRow => (
                  <div
                    key={virtualRow.index}
                    className="absolute top-0 left-0 w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {rows[virtualRow.index]?.map((item, colIndex) => (
                      <div
                        key={`${virtualRow.index}-${colIndex}`}
                        className="group relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedImage(item.src || item.imageUrl || null)}
                      >
                        {(item.src || item.imageUrl) ? (
                          <Image
                            src={updateLogoPath(item.src || item.imageUrl)}
                            alt={item.alt || item.title || 'Logo'}
                            fill
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI6dtiLOgAAAABJRU5ErkJggg=="
                            className="object-contain"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16.66vw"
                            quality={75}
                            onError={(e) => {
                              console.log("Image error:", item.src || item.imageUrl);
                              const target = e.target as HTMLImageElement;
                              target.src = '/images/portfolio/logo-types/wordmark.png';
                            }}
                          />
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Prev
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-full ${
                      currentPage === i + 1 
                        ? 'bg-primary text-white' 
                        : 'bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Request Form Button */}
        <div className="fixed bottom-8 right-8 z-40">
          <button
            onClick={() => setShowRequestForm(true)}
            className="bg-primary text-white px-6 py-4 rounded-full shadow-lg hover:bg-primary-dark transition-colors flex items-center gap-2"
          >
            <i className="fas fa-pencil-alt"></i>
            Request Logo Design
          </button>
        </div>

        {/* Request Form Modal */}
        {showRequestForm && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowRequestForm(false)}
          >
            <div 
              className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6">Request Logo Design</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border rounded-lg"
                    value={formData.company}
                    onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Logo Type</label>
                  <select
                    className="w-full px-4 py-2 border rounded-lg"
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
                  <label className="block text-sm font-medium mb-2">Description of Your Business</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                    value={formData.description}
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Colors</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg"
                    placeholder="e.g., Blue and Gold, Modern and Professional colors"
                    value={formData.color}
                    onChange={e => setFormData({...formData, color: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Reference Examples (Optional)</label>
                  <textarea
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={2}
                    placeholder="Links or descriptions of logos you like"
                    value={formData.reference}
                    onChange={e => setFormData({...formData, reference: e.target.value})}
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowRequestForm(false)}
                    className="px-6 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
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
    </>
  );
} 