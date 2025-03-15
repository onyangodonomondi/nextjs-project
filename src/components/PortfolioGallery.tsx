'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import Image from 'next/image';
import { ImageItem } from '@/utils/getImages';

interface Props {
  initialLogos?: ImageItem[];
  initialGraphics?: ImageItem[];
  initialFliers?: ImageItem[];
  initialWebsites?: ImageItem[];
}

export default function PortfolioGallery({ 
  initialLogos = [], 
  initialGraphics = [], 
  initialFliers = [], 
  initialWebsites = [] 
}: Props) {
  // Process initial data once with memoization
  const processedInitialData = useMemo(() => {
    return {
      logos: initialLogos.map(logo => ({ ...logo, category: 'logo' })),
      graphics: initialGraphics.map(graphic => ({ ...graphic, category: 'graphic' })),
      fliers: initialFliers.map(flier => ({ ...flier, category: 'flier' })),
      websites: initialWebsites.map(website => ({ ...website, category: 'website' }))
    };
  }, [initialLogos, initialGraphics, initialFliers, initialWebsites]);

  // State
  const [filter, setFilter] = useState('all');
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allImages, setAllImages] = useState(processedInitialData);
  const [visibleImages, setVisibleImages] = useState<ImageItem[]>([]);
  
  // Refs for intersection observer and scroll restoration
  const galleryRef = useRef<HTMLDivElement>(null);
  const lastFilter = useRef(filter);

  // Function to fetch images for a specific category if needed
  const fetchImagesIfNeeded = useCallback(async (category: 'logos' | 'graphics' | 'fliers' | 'websites', path: string) => {
    if ((allImages[category]?.length || 0) === 0) {
      try {
        const res = await fetch(`/api/images?path=${path}`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setAllImages(prev => ({
              ...prev,
              [category]: data.map(item => ({ ...item, category: category.slice(0, -1) }))
            }));
          }
        }
      } catch (error) {
        console.error(`Error fetching ${category}:`, error);
      }
    }
  }, [allImages]);

  // Prefetch other categories after initial load
  useEffect(() => {
    // Check which categories need to be fetched
    const fetchMissingData = async () => {
      setIsLoading(true);
      const fetchPromises = [];
      
      if (initialLogos.length === 0) {
        fetchPromises.push(fetchImagesIfNeeded('logos', '/images/logos'));
      }
      
      if (initialGraphics.length === 0) {
        fetchPromises.push(fetchImagesIfNeeded('graphics', '/images/branding'));
      }
      
      if (initialFliers.length === 0) {
        fetchPromises.push(fetchImagesIfNeeded('fliers', '/images/portfolio/fliers'));
      }
      
      if (initialWebsites.length === 0) {
        fetchPromises.push(fetchImagesIfNeeded('websites', '/images/portfolio/websites'));
      }
      
      await Promise.all(fetchPromises);
      setIsLoading(false);
    };
    
    fetchMissingData();
  }, [fetchImagesIfNeeded, initialLogos.length, initialGraphics.length, initialFliers.length, initialWebsites.length]);

  // Scroll to top when filter changes but maintain smooth UX
  useEffect(() => {
    if (filter !== lastFilter.current) {
      // Don't scroll immediately to prevent jumpy behavior
      const timer = setTimeout(() => {
        if (galleryRef.current) {
          galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      
      lastFilter.current = filter;
      return () => clearTimeout(timer);
    }
  }, [filter]);

  // Memoized displayed images to prevent unnecessary recalculations
  const displayedImages = useMemo(() => {
    const getFilteredImages = () => {
      switch (filter) {
        case 'all':
          return [
            ...allImages.logos, 
            ...allImages.graphics, 
            ...allImages.fliers, 
            ...allImages.websites
          ];
        case 'logos':
          return [...allImages.logos];
        case 'graphics':
          return [...allImages.graphics];
        case 'fliers':
          return [...allImages.fliers];
        case 'websites':
          return [...allImages.websites];
        default:
          return [];
      }
    };
    
    // Sort by date descending (newest first)
    return getFilteredImages().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [filter, allImages]);

  // Gradually reveal images to prevent flickering - implements a staggered reveal
  useEffect(() => {
    // Only show images when they're ready to be displayed
    if (displayedImages.length > 0 && !isLoading) {
      // First, clear the current visible images when filter changes
      if (displayedImages[0]?.category !== visibleImages[0]?.category) {
        setVisibleImages([]);
      }
      
      // Then gradually add images to prevent too many simultaneous loading operations
      const totalToShow = displayedImages.length;
      const initialBatch = Math.min(8, totalToShow); // Show first 8 images immediately
      
      // Show initial batch
      setVisibleImages(displayedImages.slice(0, initialBatch));
      
      // Then load the rest gradually
      if (totalToShow > initialBatch) {
        const batchSize = 4; // Load 4 at a time
        let currentCount = initialBatch;
        
        const interval = setInterval(() => {
          const nextCount = Math.min(currentCount + batchSize, totalToShow);
          setVisibleImages(displayedImages.slice(0, nextCount));
          currentCount = nextCount;
          
          if (currentCount >= totalToShow) {
            clearInterval(interval);
          }
        }, 200); // Every 200ms add more images
        
        return () => clearInterval(interval);
      }
    }
  }, [displayedImages, isLoading]);

  return (
    <div className="portfolio-gallery" ref={galleryRef}>
      {/* Category navigation - sticky on mobile, responsive tabs */}
      <div className="sticky top-16 z-10 bg-white/95 backdrop-blur-sm shadow-sm py-4 px-2 overflow-x-auto mb-8">
        <div className="filter-nav flex justify-start md:justify-center gap-2 min-w-max">
          <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
            All Projects
          </FilterButton>
          <FilterButton 
            active={filter === 'logos'} 
            onClick={() => setFilter('logos')}
            id="logos"
          >
            Logos
          </FilterButton>
          <FilterButton 
            active={filter === 'graphics'} 
            onClick={() => setFilter('graphics')}
            id="graphics"
          >
            Graphics
          </FilterButton>
          <FilterButton 
            active={filter === 'fliers'} 
            onClick={() => setFilter('fliers')}
          >
            Fliers
          </FilterButton>
          <FilterButton 
            active={filter === 'websites'} 
            onClick={() => setFilter('websites')}
            id="websites"
          >
            Websites
          </FilterButton>
        </div>
      </div>

      {/* Category Title and Description - Keep consistently visible to prevent layout shift */}
      <div className="category-header mb-8 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {filter === 'all' ? 'All Projects' : 
           filter === 'logos' ? 'Logo Design' :
           filter === 'graphics' ? 'Graphics & Branding' :
           filter === 'fliers' ? 'Fliers & Marketing Materials' : 'Website Projects'}
        </h2>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
          {filter === 'all' ? 'Explore our diverse portfolio of creative projects' : 
           filter === 'logos' ? 'Professional logos that establish brand identity' :
           filter === 'graphics' ? 'Creative graphics that communicate your brand message' :
           filter === 'fliers' ? 'Eye-catching marketing materials that drive engagement' : 'Custom websites built for performance and user experience'}
        </p>
      </div>

      {/* Gallery Grid with Optimized Loading */}
      <div className="min-h-[400px]">
        {isLoading || displayedImages.length === 0 ? (
          <div className="loading-skeleton grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-xl">
                <div className="w-full h-full bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse-subtle rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="gallery-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleImages.map((image, index) => (
              <GalleryItem 
                key={`${image.category}-${image.id}`}
                image={image} 
                onClick={() => setSelectedImage(image)} 
                priority={index < 4} // Load first 4 images with priority
                index={index} // For staggered animation
              />
            ))}
            
            {/* Keep empty placeholders to maintain layout during loading */}
            {visibleImages.length < displayedImages.length && (
              Array(displayedImages.length - visibleImages.length).fill(0).map((_, i) => (
                <div 
                  key={`placeholder-${i}`} 
                  className="aspect-square bg-gray-100 rounded-xl"
                />
              ))
            )}
          </div>
        )}
        
        {/* Empty state - only shown when explicitly empty after loading */}
        {!isLoading && displayedImages.length === 0 && (
          <div className="empty-state text-center py-12">
            <p className="text-gray-500">No images found in this category</p>
          </div>
        )}
      </div>
      
      {/* Image Modal with High-Resolution Viewing */}
      {selectedImage && (
        <ImageModal 
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}

      {/* Custom animation definitions to prevent flickering */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes pulse-subtle {
          0% { opacity: 0.5; }
          50% { opacity: 0.7; }
          100% { opacity: 0.5; }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .gallery-item {
          will-change: transform, opacity;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
}

// FilterButton component with improved accessibility
function FilterButton({ 
  active, 
  onClick, 
  children,
  id
}: { 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors duration-300 whitespace-nowrap ${
        active 
          ? 'bg-accent text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
      aria-current={active ? 'page' : undefined}
    >
      {children}
    </button>
  );
}

// GalleryItem component with improved loading and animation
function GalleryItem({ 
  image, 
  onClick,
  priority = false,
  index = 0
}: { 
  image: ImageItem; 
  onClick: () => void;
  priority?: boolean;
  index?: number;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Don't use hover state to track hover - it causes flickering
  // Instead, use CSS hover effects that are hardware accelerated
  
  return (
    <div 
      className="gallery-item relative aspect-square overflow-hidden rounded-xl cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 transform-gpu"
      onClick={onClick}
      style={{
        // Staggered animation based on index - smoother appearance
        animationDelay: `${Math.min(index * 50, 500)}ms`,
        animationDuration: '400ms',
        animationFillMode: 'both',
        animationName: 'fadeIn',
        // Force hardware acceleration
        backfaceVisibility: 'hidden'
      }}
    >
      {/* Permanent background gradient for placeholder - prevents harsh transitions */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl"></div>
      
      {/* Loading indicator - subtle and non-flickering */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="w-7 h-7 border-2 border-accent/30 border-t-accent rounded-full animate-spin opacity-80"></div>
        </div>
      )}
      
      {/* Optimized image with opacity transition only */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={image.src}
          alt={image.alt || 'Portfolio image'}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => {
            // Delay the loaded state slightly to ensure smooth transition
            setTimeout(() => setIsLoaded(true), 50);
          }}
          loading={priority ? "eager" : "lazy"}
          quality={60} // Lower quality for thumbnails, full quality in modal
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEhAI6dtiLOgAAAABJRU5ErkJggg=="
        />
      </div>
      
      {/* Caption overlay - always present for consistency, only changes opacity */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-4 flex flex-col justify-end transition-opacity duration-300 opacity-70 group-hover:opacity-100"
      >
        <h3 className="text-white text-lg font-medium line-clamp-1">{image.alt}</h3>
        <p className="text-white/80 text-sm">{
          image.category === 'logo' ? 'Logo Design' :
          image.category === 'graphic' ? 'Graphic Design' :
          image.category === 'flier' ? 'Marketing Material' : 'Web Project'
        }</p>
      </div>
      
      {/* Hover overlay effect - hardware accelerated for smoothness */}
      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );
}

// ImageModal component with enhanced viewing experience and smooth transitions
function ImageModal({ 
  image, 
  onClose 
}: { 
  image: ImageItem; 
  onClose: () => void 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Restore scrolling
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm transition-opacity duration-300"
      onClick={onClose}
      style={{ animation: 'fadeIn 300ms ease-out' }}
    >
      <div 
        ref={modalContentRef}
        className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all duration-300 opacity-0"
        onClick={e => e.stopPropagation()}
        style={{ 
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '50ms' 
        }}
      >
        {/* Loading background - stays visible until image loads */}
        <div className="absolute inset-0 bg-gray-100 animate-pulse-subtle"></div>
        
        {/* Image container with aspect ratio preservation */}
        <div className="relative h-[70vh]">
          <Image
            src={image.src}
            alt={image.alt || 'Portfolio image'}
            fill
            className={`object-contain transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            sizes="90vw"
            quality={90}
            priority
            onLoad={() => setIsLoaded(true)}
          />
          
          {/* Loading indicator - centered, removed when loaded */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-3 border-accent/30 border-t-accent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        
        {/* Image info panel */}
        <div className="p-4 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-gray-900">{image.alt}</h3>
              <p className="text-gray-500">{
                image.category === 'logo' ? 'Logo Design' :
                image.category === 'graphic' ? 'Graphic Design' :
                image.category === 'flier' ? 'Marketing Material' : 'Web Project'
              }</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 