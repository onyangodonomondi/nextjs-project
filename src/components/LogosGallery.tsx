'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

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

  // Add better logging to see what's coming from the API
  useEffect(() => {
    console.log("Logos data received:", logos.length);
  }, [logos]);

  // State for managing displayed logos
  const [allLogos, setAllLogos] = useState<ImageItem[]>([]);
  const [displayedLogos, setDisplayedLogos] = useState<ImageItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleRows, setVisibleRows] = useState(3); // Start with 3 rows (12 logos)

  // Initialize logos data
  useEffect(() => {
    if (logos && logos.length > 0) {
      console.log("Setting all logos:", logos.length);
      setAllLogos(logos);
      
      // Show initial logos (12 - first 3 rows)
      setDisplayedLogos(logos.slice(0, 12));
      setIsLoading(false);
    } else if (allLogos.length === 0) {
      // If we don't have logos but also don't have all logos yet,
      // set some placeholder logos
      console.log("Using placeholder logos");
      const placeholders = [
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
        }
      ];
      
      // Repeat placeholders to fill 12 slots
      const extendedPlaceholders = [...placeholders, ...placeholders, ...placeholders];
      setAllLogos(extendedPlaceholders);
      setDisplayedLogos(extendedPlaceholders.slice(0, 12));
      setIsLoading(false);
    }
  }, [logos]);

  // Handle "Load More" button click
  const handleLoadMore = useCallback(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      // Calculate next batch of logos to display
      const nextRowCount = visibleRows + 1;
      const nextLogosCount = nextRowCount * 4; // 4 logos per row
      
      setVisibleRows(nextRowCount);
      setDisplayedLogos(allLogos.slice(0, nextLogosCount));
      setIsLoading(false);
    }, 500); // Add a small delay for loading state to be visible
  }, [allLogos, visibleRows]);

  // Handle image click to open modal
  const handleImageClick = useCallback((imageSrc: string | undefined | null) => {
    if (!imageSrc) return;
    setSelectedImage(imageSrc);
  }, []);

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

  const [showHumanIcon, setShowHumanIcon] = useState(true);
  const [isButtonExpanded, setIsButtonExpanded] = useState(true);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const lastScrollY = useRef(0);
  
  // Handle scrolling to hide/show the button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show button when scrolling up, hide when scrolling down
      if (currentScrollY > lastScrollY.current + 50) {
        setIsButtonVisible(false);
        setIsButtonExpanded(false);
      } else if (currentScrollY < lastScrollY.current - 50) {
        setIsButtonVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Auto-hide the text after 5 seconds of inactivity
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isButtonExpanded) {
      timeout = setTimeout(() => {
        setIsButtonExpanded(false);
      }, 5000);
    }
    
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isButtonExpanded]);
  
  // Toggle between human and assistant icons every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowHumanIcon(prev => !prev);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-24 bg-gradient-to-b from-gray-50 to-white">
      <PageHero 
        title="Logo Design Portfolio"
        description="Explore our collection of unique and memorable logo designs."
      />

      {/* Logo Types Section */}
      <section className="py-12 border-b border-gray-100">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-gray-800">Logo Types We Specialize In</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choose from a variety of logo styles to perfectly represent your brand's identity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
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

      {/* Redesigned Portfolio Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1.5 bg-[#FF5400] text-white text-sm font-medium rounded-full mb-3 shadow-sm">SHOWCASE</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Logo Designs</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through our collection of professionally crafted logos that have helped businesses establish strong brand identities
            </p>
          </div>

          {/* New Gallery Grid - Consistently 4 images per row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {displayedLogos.map((logo, index) => (
              <div
                key={`logo-${logo.id || index}`}
                className="group relative aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-500 cursor-pointer"
                onClick={() => handleImageClick(logo.src || logo.imageUrl || null)}
              >
                {/* Background gradient for smooth loading */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-200"></div>
                
                <Image
                  src={updateLogoPath(logo.src || logo.imageUrl)}
                  alt={logo.alt || logo.title || 'Logo Design'}
                  fill
                  sizes="(max-width: 640px) 50vw, 25vw"
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  loading={index < 8 ? "eager" : "lazy"}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI6dtiLOgAAAABJRU5ErkJggg=="
                />
                
                {/* Overlay with gradient for better text visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h3 className="text-white text-lg font-medium">
                    {logo.title || logo.alt || 'Logo Design'}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {allLogos.length > displayedLogos.length && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading More...
                  </>
                ) : (
                  <>
                    Load More Logos
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Request Form Button */}
      <AnimatePresence>
        {isButtonVisible && (
          <motion.div 
            className="fixed bottom-8 right-8 z-40"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          >
            <motion.button
              onMouseEnter={() => setIsButtonExpanded(true)}
              onClick={() => setShowRequestForm(true)}
              className="bg-primary text-white px-6 py-4 rounded-full shadow-lg hover:bg-primary-dark transition-all duration-300 flex items-center gap-2 group"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {showHumanIcon ? (
                  <motion.div
                    key="human-icon"
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div
                    key="assistant-icon"
                    initial={{ rotate: -30, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 30, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isButtonExpanded && (
                  <motion.span
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "auto", opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="whitespace-nowrap overflow-hidden"
                  >
                    Request Logo Design
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Form Modal */}
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